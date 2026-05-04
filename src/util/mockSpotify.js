// Mock Spotify service for demo mode
// Maintains the same interface as the real Spotify service

import {
  getFlattenedTracks,
  getAlbumsByArtist,
  getTracksByAlbum,
} from "./mockMusicData.js";
import { loadDemoPlaylists } from "./demoPlaylists.js";

// Get the mock tracks from our curated dataset
const mockTracks = getFlattenedTracks();

// Simulate search delay like a real API
const simulateDelay = () => new Promise((resolve) => setTimeout(resolve, 500));

/**
 * Fisher-Yates shuffle — returns a new shuffled array, does not mutate input.
 * @param {Array} array
 * @returns {Array}
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Selects up to 20 tracks for a given artist name.
 *
 * For main artists: picks tracks evenly across their albums and shuffles the
 * result so it is always mixed across albums — never grouped by album.
 * Featured appearances in other artists' albums are appended after.
 *
 * For featured-only artists (e.g. Frank Ocean, Ariana Grande): returns all
 * tracks in the flat catalog where that artist appears in the artists array.
 *
 * @param {string} artistName
 * @returns {Array<Object>}
 */
function selectArtistTracks(artistName) {
  const normalizedName = artistName.toLowerCase();
  const albums = getAlbumsByArtist(artistName);

  // All tracks in the catalog where this artist appears (main or featured)
  const allMatching = mockTracks.filter((t) =>
    t.artists.some((a) => a.toLowerCase() === normalizedName),
  );

  if (allMatching.length === 0) return [];

  if (albums.length === 0) {
    // Featured-only artist: return all matching tracks shuffled
    return shuffleArray(allMatching).slice(0, 20);
  }

  // Main artist: pick evenly from each album, then shuffle the combined list
  const tracksPerAlbum = Math.floor(20 / albums.length);
  const selected = [];

  albums.forEach((album) => {
    const shuffled = shuffleArray(album.tracks);
    selected.push(...shuffled.slice(0, tracksPerAlbum));
  });

  // Append featured appearances from other artists' albums (if any)
  const selectedIds = new Set(selected.map((t) => t.id));
  const featuredElsewhere = allMatching.filter((t) => !selectedIds.has(t.id));
  selected.push(...featuredElsewhere);

  return shuffleArray(selected).slice(0, 20);
}

async function search(term) {
  await simulateDelay();

  if (!term.trim()) return [];

  const searchTerm = term.toLowerCase();

  if (searchTerm.includes("artist:")) {
    // Artist search: return 20 shuffled tracks mixed across all 4 albums
    const artistMatch =
      searchTerm.match(/artist:"([^"]+)"/i) ||
      searchTerm.match(/artist:([^"\s]+)/i);

    if (!artistMatch) return [];

    const artistName = artistMatch[1].toLowerCase();

    // Try exact artist match first via the catalog helper
    const results = selectArtistTracks(artistName);

    if (results.length > 0) return results;

    // Fall back to a partial-match filter over the flat track list
    const filtered = mockTracks.filter((track) =>
      track.artists.some((a) => a.toLowerCase().includes(artistName)),
    );
    return shuffleArray(filtered).slice(0, 20);
  }

  if (searchTerm.includes("album:")) {
    // Album search: return all 10 tracks for that album, in track order
    const albumMatch =
      searchTerm.match(/album:"([^"]+)"/i) ||
      searchTerm.match(/album:([^"\s]+)/i);

    if (!albumMatch) return [];

    const albumName = albumMatch[1].toLowerCase();

    // Try exact album match first via the catalog helper
    const results = getTracksByAlbum(albumName);
    if (results.length > 0) return results;

    // Fall back to a partial-match filter over the flat track list
    return mockTracks.filter((track) =>
      track.album.toLowerCase().includes(albumName),
    );
  }

  // General search across track name, artist, and album — up to 20 results
  // If the query exactly matches an artist name, use the same shuffle logic
  // as clicking an artist name so results are always well-mixed across albums.
  const artistExactMatch = selectArtistTracks(searchTerm);
  if (artistExactMatch.length > 0) {
    return artistExactMatch;
  }

  const searchResults = mockTracks.filter(
    (track) =>
      track.name.toLowerCase().includes(searchTerm) ||
      track.artists.some((a) => a.toLowerCase().includes(searchTerm)) ||
      track.album.toLowerCase().includes(searchTerm),
  );

  return searchResults.slice(0, 20);
}

async function savePlaylist(playlistName, trackUris) {
  await simulateDelay();

  if (!playlistName || !trackUris.length) {
    throw new Error("Playlist name and tracks are required");
  }

  // Simulate successful save - in real demo this would just show success message
  return {
    id: "demo_playlist_" + Date.now(),
    name: playlistName,
    tracks: trackUris.length,
  };
}

/**
 * Returns all demo playlists from localStorage in the same shape
 * as the real Spotify.getUserPlaylists() so App.jsx can treat both identically.
 */
async function getUserPlaylists() {
  await simulateDelay();

  return loadDemoPlaylists().map((p) => ({
    id: p.id,
    name: p.name,
    trackCount: p.tracks.length,
    imageUrl: null,
    isOwned: true, // all demo playlists belong to the user
  }));
}

/**
 * Returns the full track list for a demo playlist stored in localStorage.
 */
async function getPlaylistTracks(playlistId) {
  await simulateDelay();

  const found = loadDemoPlaylists().find((p) => p.id === playlistId);
  return found ? found.tracks : [];
}

function hasValidSession() {
  // In demo mode, we're always "authenticated"
  return true;
}

async function getAccessToken() {
  // Return a mock token for demo mode
  return "demo_token_" + Date.now();
}

function login() {
  // Demo mode — no authentication needed
}

const MockSpotify = {
  getAccessToken,
  search,
  savePlaylist,
  getUserPlaylists,
  getPlaylistTracks,
  hasValidSession,
  login,
};

export default MockSpotify;
