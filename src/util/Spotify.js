const clientId = import.meta.env.VITE_CLIENT_ID;
const redirectUri = `${window.location.origin}/`;

// Required scopes:
// - playlist-modify-private / playlist-modify-public: create/edit playlists
// - playlist-read-private:        read user's private playlists
// - playlist-read-collaborative:  read collaborative playlists the user follows
// - user-read-private:            read user profile (needed for /me)

const scopes =
  "playlist-modify-private playlist-modify-public playlist-read-private playlist-read-collaborative user-read-private";

let accessToken = "";
const TOKEN_KEY = "spotify_access_token";
const EXPIRY_KEY = "spotify_token_expiry";
// Stores the scope string that was in effect when the token was saved.
// If the required scopes change (e.g. new features), old tokens are
// invalidated automatically and the user is sent through auth again.
const SCOPES_KEY = "spotify_token_scopes";

// Generate a random string for the PKCE code_verifier
function generateRandomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

// Redirect user to Spotify login

async function login() {
  await redirectToSpotifyAuth();
}

// Create SHA-256 hash from the verifier
async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

// Convert hash to base64url format
function base64encode(input) {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

// Save the access token, its expiry time, and the scopes it was issued for.

function saveToken(token, expiresIn) {
  accessToken = token;
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(EXPIRY_KEY, String(Date.now() + expiresIn * 1000));
  // Record which scopes this token covers so hasValidSession() can detect
  // when the required scopes have changed since the token was issued.
  sessionStorage.setItem(SCOPES_KEY, scopes);
}

function clearToken() {
  accessToken = "";
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(EXPIRY_KEY);
  sessionStorage.removeItem(SCOPES_KEY);
}

function getStoredToken() {
  const storedToken = sessionStorage.getItem(TOKEN_KEY);
  const storedExpiry = sessionStorage.getItem(EXPIRY_KEY);

  if (!storedToken || !storedExpiry) return null;

  const isExpired = Date.now() >= Number(storedExpiry);

  if (isExpired) {
    clearToken();
    return null;
  }

  accessToken = storedToken;
  return storedToken;
}

function hasValidSession() {
  // If the token was issued with a different set of scopes than what the app
  // currently requires, treat it as invalid and force re-authentication.
  // This happens automatically whenever the required scopes change.
  const storedScopes = sessionStorage.getItem(SCOPES_KEY);
  if (storedScopes !== scopes) {
    clearToken();
    return false;
  }
  return !!getStoredToken();
}

// Redirect user to Spotify authorization page
async function redirectToSpotifyAuth() {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  sessionStorage.setItem("spotify_code_verifier", codeVerifier);

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("scope", scopes);
  authUrl.searchParams.set("code_challenge_method", "S256");
  authUrl.searchParams.set("code_challenge", codeChallenge);
  authUrl.searchParams.set("show_dialog", "true");

  window.location.href = authUrl.toString();
}

// Exchange authorization code for access token
async function exchangeCodeForToken(code) {
  const codeVerifier = sessionStorage.getItem("spotify_code_verifier");

  if (!codeVerifier) {
    throw new Error("Missing code_verifier. Please log in again.");
  }

  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Token exchange error:", data);
    throw new Error("Failed to exchange authorization code for access token.");
  }

  saveToken(data.access_token, data.expires_in);

  // Remove ?code=... from URL
  window.history.replaceState({}, document.title, redirectUri);

  return accessToken;
}

// Main function to retrieve token
async function getAccessToken() {
  const storedToken = getStoredToken();
  if (storedToken) {
    return storedToken;
  }

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const codeVerifier = sessionStorage.getItem("spotify_code_verifier");

  // Inconsistent state: there is a verifier but no code or token
  if (!code && codeVerifier) {
    sessionStorage.removeItem("spotify_code_verifier");
  }

  if (code) {
    try {
      return await exchangeCodeForToken(code);
    } catch (error) {
      console.error("Token exchange failed:", error);

      window.history.replaceState({}, document.title, redirectUri);
      clearToken();
      sessionStorage.removeItem("spotify_code_verifier");

      await redirectToSpotifyAuth();
      return null;
    }
  }

  await redirectToSpotifyAuth();
  return null;
}

// Maps a raw Spotify track object to the app's track shape.
// Album artwork: Spotify provides images in 3 sizes (640px, 300px, 64px).
// We prefer the medium size (index 1, 300px) with fallbacks.
function mapSpotifyTrack(track) {
  return {
    id: track.id,
    name: track.name,
    artists: track.artists.map((artist) => artist.name),
    album: track.album.name,
    albumImage:
      track.album.images[1]?.url ||
      track.album.images[2]?.url ||
      track.album.images[0]?.url ||
      null,
    uri: track.uri,
    durationMs: track.duration_ms,
  };
}

// Search Spotify tracks
async function search(term) {
  const token = await getAccessToken();
  if (!token) return [];

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const url = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}&limit=10`;

  const response = await fetch(url, { headers });
  const json = await response.json();

  if (!response.ok) {
    console.error("Search error:", json);
    throw new Error("Spotify search request failed.");
  }

  return json.tracks.items.map(mapSpotifyTrack);
}

// Returns up to 6 mixed suggestions (artists first, then tracks) for the given
// term. Uses a single search request with type=track,artist to minimize
// round-trips. Returns [] immediately if the trimmed term is shorter than 2
// characters. Does not affect the existing search() function.
async function getSuggestions(term) {
  if (term.trim().length < 2) return [];

  const token = await getAccessToken();
  if (!token) return [];

  // limit=4 gives Spotify room to return up to 4 per type.
  // We then slice to 2 artists + 4 tracks (6 total max).
  const url = `https://api.spotify.com/v1/search?type=track,artist&q=${encodeURIComponent(term.trim())}&limit=4`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) return [];

  const json = await response.json();

  const artists = (json.artists?.items ?? []).slice(0, 2).map((a) => ({
    type: "artist",
    id: a.id,
    name: a.name,
    subtitle: "Artist",
    image: a.images?.[0]?.url || a.images?.[1]?.url || null,
    query: `artist:"${a.name}"`,
  }));

  const tracks = (json.tracks?.items ?? []).slice(0, 4).map((t) => ({
    type: "track",
    id: t.id,
    name: t.name,
    subtitle: t.artists.map((a) => a.name).join(", "),
    image:
      t.album.images?.[1]?.url ||
      t.album.images?.[2]?.url ||
      t.album.images?.[0]?.url ||
      null,
    query: t.name,
  }));

  return [...artists, ...tracks];
}

// Save playlist to user's Spotify account
async function savePlaylist(playlistName, trackUris) {
  if (!playlistName || !trackUris.length) {
    return;
  }

  const token = await getAccessToken();

  if (!token) {
    return;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // Create a new playlist
  const createPlaylistResponse = await fetch(
    `https://api.spotify.com/v1/me/playlists`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: playlistName,
        public: false,
        description: " ",
      }),
    },
  );

  const playlistData = await createPlaylistResponse.json();

  if (!createPlaylistResponse.ok) {
    console.error("Create playlist error:", playlistData);
    throw new Error("Failed to create playlist.");
  }

  const playlistId = playlistData.id;

  // Add tracks to the playlist
  const addTracksResponse = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/items`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        uris: trackUris,
      }),
    },
  );

  const addTracksData = await addTracksResponse.json();

  if (!addTracksResponse.ok) {
    console.error("Add tracks error:", addTracksData);
    throw new Error("Failed to add tracks to playlist.");
  }

  // Return the ID so callers can do an optimistic UI update before the
  // eventual-consistency window closes.
  return playlistId;
}

// ---------------------------------------------------------------------------
// User & playlist read/write functions
// ---------------------------------------------------------------------------

/**
 * Returns the authenticated user's Spotify profile.
 * Shape: { id, displayName }
 */
async function getCurrentUser() {
  const token = await getAccessToken();
  if (!token) return null;

  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();

  if (!response.ok) {
    console.error("getCurrentUser error:", data);
    throw new Error("Failed to fetch user profile.");
  }

  return { id: data.id, displayName: data.display_name };
}

/**
 * Fetches all playlists visible to the authenticated user.
 * Follows Spotify's `next` pagination URL until exhausted.
 *
 * Returned shape per item:
 *   { id, name, trackCount, imageUrl, isOwned }
 *
 * `isOwned` is true only when the playlist owner matches the current user —
 * this drives whether the playlist is editable in the UI.
 *
 * Design note: getCurrentUser() is fetched concurrently with the first
 * playlist page to save a round-trip.  If it fails (e.g. missing scope),
 * we still return the playlists — isOwned simply defaults to false so the
 * user can at least see their library even if editing is blocked.
 */
async function getUserPlaylists() {
  const token = await getAccessToken();
  if (!token) return [];

  const headers = { Authorization: `Bearer ${token}` };

  // Fetch the user profile and the first playlist page concurrently.
  // getCurrentUser() failure is non-fatal — we degrade gracefully.
  const [user, firstResponse] = await Promise.all([
    getCurrentUser().catch((err) => {
      console.warn(
        "getUserPlaylists: could not fetch user profile:",
        err.message,
      );
      return null;
    }),
    fetch("https://api.spotify.com/v1/me/playlists?limit=50", { headers }),
  ]);

  if (!firstResponse.ok) {
    const errBody = await firstResponse.json().catch(() => ({}));
    console.error(
      `getUserPlaylists: GET /v1/me/playlists returned ${firstResponse.status}`,
      errBody,
    );
    throw new Error(
      `Failed to fetch playlists (HTTP ${firstResponse.status}). ` +
        "Make sure the token includes the playlist-read-private scope.",
    );
  }

  const userId = user?.id ?? null;
  const playlists = [];
  let data = await firstResponse.json();

  let hasMore = true;
  while (hasMore) {
    for (const item of data.items ?? []) {
      // Spotify can return null items in the paged list; skip them.
      if (!item) continue;
      playlists.push({
        id: item.id,
        name: item.name,
        // Spotify's Feb 2026 API returns the count under items.total.
        // tracks.total is kept as a fallback for older response shapes.
        trackCount: item.items?.total ?? item.tracks?.total ?? 0,
        // images[0] is the largest; may be absent for newly created playlists
        imageUrl: item.images?.[0]?.url ?? null,
        // Defensive: owner may be absent in rare edge cases.
        // When getCurrentUser() failed (userId === null) we cannot compare
        // owner IDs, so we optimistically mark the playlist as owned.
        // The real Spotify API will return 403 if the user tries to edit a
        // playlist they do not actually own.
        isOwned: userId === null || (item.owner?.id ?? null) === userId,
      });
    }

    if (!data.next) {
      hasMore = false;
    } else {
      const nextResponse = await fetch(data.next, { headers });
      if (!nextResponse.ok) {
        // Return the playlists fetched so far rather than failing entirely.
        console.warn(
          `getUserPlaylists: pagination request returned ${nextResponse.status} — returning partial results`,
        );
        hasMore = false;
      } else {
        data = await nextResponse.json();
      }
    }
  }

  return playlists;
}

/**
 * Fetches every track in a playlist the current user owns or collaborates on.
 *
 * Uses the current endpoint: GET /v1/playlists/{id}/items
 * The deprecated /tracks endpoint was removed by Spotify in February 2026.
 *
 * Follows pagination until all pages are exhausted.
 * Filters out local files, podcast episodes, and unavailable (null) items.
 *
 * Throws a descriptive error on 403 so the caller can show a clear message.
 *
 * Returned track shape: { id, name, artists, album, albumImage, uri, durationMs }
 */
async function getPlaylistTracks(playlistId) {
  const token = await getAccessToken();
  // Throw — not return [] — so the caller's catch block handles it and does
  // not set playlistName with an empty track list (the misleading half-loaded state).
  if (!token)
    throw new Error("No access token — cannot fetch playlist tracks.");

  const headers = { Authorization: `Bearer ${token}` };
  const tracks = [];
  let url = `https://api.spotify.com/v1/playlists/${playlistId}/items?limit=100`;

  while (url) {
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          "PLAYLIST_ACCESS_DENIED: Spotify only allows loading tracks for playlists you own or collaborate on.",
        );
      }
      console.error(
        `getPlaylistTracks: GET /items returned ${response.status}`,
        data,
      );
      throw new Error(
        `Failed to fetch playlist tracks (HTTP ${response.status}).`,
      );
    }

    for (const item of data.items ?? []) {
      // The Spotify /items endpoint (Feb 2026) nests the track under "item",
      // not "track". Fall back to "track" in case of older response shapes.
      const t = item?.item ?? item?.track;
      if (!t || !t.id || !t.uri) continue;
      if (t.type === "episode") continue;

      tracks.push({
        id: t.id,
        name: t.name,
        // artists and album use optional chaining; local files may omit them.
        artists: t.artists?.map((a) => a.name) ?? [],
        album: t.album?.name ?? "",
        albumImage:
          t.album?.images?.[1]?.url ||
          t.album?.images?.[2]?.url ||
          t.album?.images?.[0]?.url ||
          null,
        uri: t.uri,
        durationMs: t.duration_ms ?? 0,
      });
    }

    url = data.next ?? null;
  }

  return tracks;
}

/**
 * Updates a playlist's name (and optionally description).
 * Uses PUT /playlists/{id} — a 200 with no body means success.
 */
async function updatePlaylistDetails(playlistId, name) {
  const token = await getAccessToken();
  if (!token) return;

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    },
  );

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    console.error("updatePlaylistDetails error:", data);
    throw new Error("Failed to update playlist name.");
  }
}

/**
 * Replaces all tracks in an existing playlist with the provided URIs.
 *
 * Uses the current endpoint: PUT /v1/playlists/{id}/items
 * The deprecated /tracks endpoint was removed by Spotify in February 2026.
 *
 * Spotify's PUT /items accepts max 100 URIs in a single request.
 * The first 100 replace the list atomically; any remaining tracks are
 * appended in batches of 100 via POST.
 */
async function replacePlaylistTracks(playlistId, trackUris) {
  const token = await getAccessToken();
  if (!token) return;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // PUT atomically replaces the playlist contents with the first 100 URIs.
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/items`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({ uris: trackUris.slice(0, 100) }),
    },
  );

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    console.error("replacePlaylistTracks error:", data);
    throw new Error("Failed to replace playlist tracks.");
  }

  // Append any remaining tracks in batches of 100.
  for (let i = 100; i < trackUris.length; i += 100) {
    const batch = trackUris.slice(i, i + 100);
    const batchResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/items`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ uris: batch }),
      },
    );

    if (!batchResponse.ok) {
      const data = await batchResponse.json().catch(() => ({}));
      console.error("replacePlaylistTracks batch error:", data);
      throw new Error("Failed to append remaining tracks to playlist.");
    }
  }
}

/**
 * Removes a playlist from the current user's library.
 *
 * Spotify does not expose a "delete playlist" endpoint. Unfollowing a playlist
 * the user owns has the same effect: it disappears from their library.
 * API: DELETE /v1/playlists/{id}/followers
 */
async function deletePlaylist(playlistId) {
  const token = await getAccessToken();
  if (!token) throw new Error("No access token — cannot delete playlist.");

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  // 200 and 204 are both success codes for this endpoint.
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    console.error("deletePlaylist error:", data);
    throw new Error(`Failed to delete playlist (HTTP ${response.status}).`);
  }
}

const Spotify = {
  getAccessToken,
  search,
  getSuggestions,
  savePlaylist,
  getCurrentUser,
  getUserPlaylists,
  getPlaylistTracks,
  updatePlaylistDetails,
  replacePlaylistTracks,
  deletePlaylist,
  hasValidSession,
  login,
};

export default Spotify;
