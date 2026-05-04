/**
 * demoPlaylists.js
 *
 * Thin localStorage helper for demo-mode playlist persistence.
 * Kept separate from mockSpotify.js so it can be imported by both
 * mockSpotify.js and App.jsx without coupling concerns.
 *
 * localStorage key: "demo_playlists"
 *
 * Stored shape per playlist:
 * {
 *   id: string,          // stable unique local ID ("demo_<timestamp>_<random>")
 *   name: string,
 *   tracks: Track[],     // full track objects (same shape used throughout the app)
 *   createdAt: string,   // ISO date string
 *   updatedAt: string,   // ISO date string
 * }
 */

const DEMO_PLAYLISTS_KEY = "demo_playlists";

/** Generates a stable, unique local ID. */
function generateId() {
  return (
    "demo_" +
    Date.now().toString(36) +
    "_" +
    Math.random().toString(36).slice(2, 8)
  );
}

/** Reads all demo playlists from localStorage. Returns [] on error. */
function loadDemoPlaylists() {
  try {
    const raw = localStorage.getItem(DEMO_PLAYLISTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Writes the full list back to localStorage. */
function persistDemoPlaylists(playlists) {
  localStorage.setItem(DEMO_PLAYLISTS_KEY, JSON.stringify(playlists));
}

/**
 * Creates a new demo playlist and appends it to localStorage.
 * @param {string} name
 * @param {Array} tracks - full track objects
 * @returns {Object} the created playlist
 */
function createDemoPlaylist(name, tracks) {
  const now = new Date().toISOString();
  const playlist = {
    id: generateId(),
    name,
    tracks,
    createdAt: now,
    updatedAt: now,
  };
  const existing = loadDemoPlaylists();
  persistDemoPlaylists([...existing, playlist]);
  return playlist;
}

/**
 * Updates an existing demo playlist by ID.
 * Only updates fields that are provided (name and/or tracks).
 * @param {string} id
 * @param {{ name?: string, tracks?: Array }} updates
 * @returns {Object|null} the updated playlist, or null if not found
 */
function updateDemoPlaylist(id, { name, tracks }) {
  const existing = loadDemoPlaylists();
  let updated = null;

  const next = existing.map((p) => {
    if (p.id !== id) return p;
    updated = {
      ...p,
      name: name !== undefined ? name : p.name,
      tracks: tracks !== undefined ? tracks : p.tracks,
      updatedAt: new Date().toISOString(),
    };
    return updated;
  });

  if (!updated) return null;
  persistDemoPlaylists(next);
  return updated;
}

export {
  DEMO_PLAYLISTS_KEY,
  loadDemoPlaylists,
  createDemoPlaylist,
  updateDemoPlaylist,
  deleteDemoPlaylist,
};

/**
 * Removes a demo playlist from localStorage by ID.
 * @param {string} id
 */
function deleteDemoPlaylist(id) {
  const existing = loadDemoPlaylists();
  persistDemoPlaylists(existing.filter((p) => p.id !== id));
}
