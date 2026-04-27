// Mock Spotify service for demo mode
// Maintains the same interface as the real Spotify service

import { getFlattenedTracks } from "./mockMusicData.js";

// Get the mock tracks from our curated dataset
const mockTracks = getFlattenedTracks();

// Simulate search delay like a real API
const simulateDelay = () => new Promise((resolve) => setTimeout(resolve, 500));

async function search(term) {
  await simulateDelay();

  if (!term.trim()) return [];

  const searchTerm = term.toLowerCase();

  // Handle artist: and album: queries like real Spotify
  let searchResults;

  if (searchTerm.includes("artist:")) {
    const artistMatch =
      searchTerm.match(/artist:"([^"]+)"/i) ||
      searchTerm.match(/artist:(\w+)/i);
    if (artistMatch) {
      const artistName = artistMatch[1].toLowerCase();
      searchResults = mockTracks.filter((track) =>
        track.artists.some((artist) =>
          artist.toLowerCase().includes(artistName),
        ),
      );
    } else {
      searchResults = [];
    }
  } else if (searchTerm.includes("album:")) {
    const albumMatch =
      searchTerm.match(/album:"([^"]+)"/i) || searchTerm.match(/album:(\w+)/i);
    if (albumMatch) {
      const albumName = albumMatch[1].toLowerCase();
      searchResults = mockTracks.filter((track) =>
        track.album.toLowerCase().includes(albumName),
      );
    } else {
      searchResults = [];
    }
  } else {
    // General search across track name, artist, and album
    searchResults = mockTracks.filter(
      (track) =>
        track.name.toLowerCase().includes(searchTerm) ||
        track.artists.some((artist) =>
          artist.toLowerCase().includes(searchTerm),
        ) ||
        track.album.toLowerCase().includes(searchTerm),
    );
  }

  // Return up to 20 results like the real API
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

function hasValidSession() {
  // In demo mode, we're always "authenticated"
  return true;
}

async function getAccessToken() {
  // Return a mock token for demo mode
  return "demo_token_" + Date.now();
}

function login() {
  // Demo mode doesn't need real login
  console.log("Demo mode - no login required");
}

const MockSpotify = {
  getAccessToken,
  search,
  savePlaylist,
  hasValidSession,
  login,
};

export default MockSpotify;
