/**
 * playlistUtils.js
 *
 * Playlist helpers and playlist-loading utilities extracted from App.jsx.
 * Most helpers are pure and can be unit-tested independently.
 */

import Spotify from "./Spotify";
import { loadDemoPlaylists, seedDemoPlaylists } from "./demoPlaylists";

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/**
 * Returns true when the playlist name is a non-empty, non-whitespace string.
 * Trims before checking so trailing/leading whitespace is treated as empty.
 */
export function isValidPlaylistName(name) {
  return typeof name === "string" && name.trim().length > 0;
}

// ---------------------------------------------------------------------------
// Dirty-state detection
// ---------------------------------------------------------------------------

/**
 * Compares the current editor state against the snapshot captured when the
 * playlist was first loaded.
 *
 * Returns true  when the user has made at least one change (name or tracks).
 * Returns false when nothing has changed, or when there is no snapshot yet.
 *
 * Rules:
 *  - Trims both names before comparing so trailing whitespace is ignored.
 *  - Compares URI arrays in order — reordering tracks counts as a change.
 *  - Does not rely on track count alone.
 */
export function hasPlaylistChanges(
  initialName,
  initialTracks,
  currentName,
  currentTracks,
) {
  if (initialName === null || initialTracks === null) return false;
  if (currentName.trim() !== initialName.trim()) return true;
  const initialUris = initialTracks.map((t) => t.uri);
  const currentUris = currentTracks.map((t) => t.uri);
  if (currentUris.length !== initialUris.length) return true;
  return currentUris.some((uri, i) => uri !== initialUris[i]);
}

// ---------------------------------------------------------------------------
// Artwork helpers
// ---------------------------------------------------------------------------

/** Collects up to 4 unique album-cover URLs from a track list. */
export function getArtworkImages(tracks) {
  const seen = new Set();
  const images = [];
  for (const track of tracks) {
    if (track.albumImage && !seen.has(track.albumImage)) {
      seen.add(track.albumImage);
      images.push(track.albumImage);
      if (images.length === 4) break;
    }
  }
  return images;
}

// ---------------------------------------------------------------------------
// Playlist loading
// ---------------------------------------------------------------------------

/**
 * Loads the user's playlist list from the correct source: demo localStorage or
 * the Spotify API.
 *
 * Returned shape per item:
 * { id, name, trackCount, imageUrl, isOwned, artworkImages? }
 */
export async function loadPlaylistsFromSource(isDemo) {
  if (isDemo) {
    seedDemoPlaylists();
    return loadDemoPlaylists().map((p) => ({
      id: p.id,
      name: p.name,
      trackCount: p.tracks.length,
      imageUrl: null,
      isOwned: true,
      artworkImages: getArtworkImages(p.tracks),
    }));
  }
  return Spotify.getUserPlaylists();
}

// ---------------------------------------------------------------------------
// Duration formatting
// ---------------------------------------------------------------------------

/**
 * Formats the total duration of an array of track objects into a human-readable
 * string such as "3h 12m", "47m 03s", or "58s".
 *
 * Each track must have a `durationMs` number field.
 */
export function formatPlaylistDuration(tracks) {
  const totalDurationMs = tracks.reduce(
    (total, track) => total + (track.durationMs ?? 0),
    0,
  );
  const totalSeconds = Math.floor(totalDurationMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${formattedSeconds}s`;
  return `${formattedSeconds}s`;
}

// ---------------------------------------------------------------------------
// Save-button label
// ---------------------------------------------------------------------------

/**
 * Returns the correct label for the Playlist save / update button.
 *
 * @param {boolean} isSavingPlaylist  - save/update is in progress
 * @param {boolean} isEditingExisting - user is editing an existing playlist
 * @param {boolean} isDemoMode        - app is running in demo mode
 */
export function getSaveButtonText(
  isSavingPlaylist,
  isEditingExisting,
  isDemoMode,
) {
  if (isSavingPlaylist) {
    return isEditingExisting ? "Updating..." : "Saving...";
  }
  if (isEditingExisting) return "Update playlist";
  if (isDemoMode) return "Save playlist";
  return "Save to Spotify";
}
