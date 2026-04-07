const clientId = "40e1ad3d60c947c9b9333035a1d2f6cf";
const redirectUri = `${window.location.origin}/`;

// Required scopes:
// - playlist-modify-private: needed to create/edit private playlists
// - playlist-modify-public: needed to create/edit public playlists

const scopes = "playlist-modify-private playlist-modify-public";

let accessToken = "";

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

  accessToken = data.access_token;

  if (data.expires_in) {
    window.setTimeout(() => {
      accessToken = "";
    }, data.expires_in * 1000);
  }

  // Remove ?code=... from URL
  window.history.replaceState({}, document.title, redirectUri);

  return accessToken;
}

// Main function to retrieve token
async function getAccessToken() {
  if (accessToken) {
    return accessToken;
  }

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (code) {
    try {
      return await exchangeCodeForToken(code);
    } catch (error) {
      console.error("Token exchange failed:", error);

      window.history.replaceState({}, document.title, redirectUri);
      sessionStorage.removeItem("spotify_code_verifier");

      await redirectToSpotifyAuth();
      return null;
    }
  }

  await redirectToSpotifyAuth();
  return null;
}

// Search Spotify tracks
async function search(term) {
  const token = await getAccessToken();
  if (!token) return [];

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const url1 = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}&limit=10&offset=0`;
  const url2 = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}&limit=10&offset=10`;

  const response1 = await fetch(url1, { headers });
  const response2 = await fetch(url2, { headers });

  const json1 = await response1.json();
  const json2 = await response2.json();

  if (!response1.ok || !response2.ok) {
    console.error("Search error:", json1, json2);
    throw new Error("Spotify search request failed.");
  }

  const combinedTracks = [...json1.tracks.items, ...json2.tracks.items];

  // Delete duplicates by id
  const uniqueTracks = combinedTracks.filter(
    (track, index, self) => index === self.findIndex((t) => t.id === track.id),
  );

  return uniqueTracks.map((track) => ({
    id: track.id,
    name: track.name,
    artists: track.artists.map((artist) => artist.name),
    artist: track.artists.map((artist) => artist.name).join(", "),
    album: track.album.name,
    uri: track.uri,
    durationMs: track.duration_ms,
  }));
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
}

const Spotify = {
  getAccessToken,
  search,
  savePlaylist,
};

export default Spotify;
