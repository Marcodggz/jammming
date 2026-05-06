/**
 * demoPlaylists.js
 *
 * Thin localStorage helper for demo-mode playlist persistence.
 * Kept separate from mockSpotify.js so it can be imported by both
 * mockSpotify.js and App.jsx without coupling concerns.
 *
 * localStorage keys:
 *   "demo_playlists"        — persisted playlist array
 *   "demo_playlists_seeded" — written once after the initial seed is applied
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

import { getFlattenedTracks } from "./mockMusicData.js";

const DEMO_PLAYLISTS_KEY = "demo_playlists";
const DEMO_PLAYLISTS_SEEDED_KEY = "demo_playlists_seeded";

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

/**
 * Track IDs for each curated seed playlist.
 * IDs must match entries in the mock music catalog.
 */
const SEED_DEFINITIONS = [
  {
    name: "Late Night Drive",
    trackIds: [
      "weeknd-ah-01",
      "weeknd-ah-05",
      "weeknd-df-09",
      "lana-btd-04",
      "lana-btd-07",
      "frank-bl-07",
      "frank-bl-09",
    ],
  },
  {
    name: "Pop Energy",
    trackIds: [
      "weeknd-ah-09",
      "weeknd-sb-01",
      "dua-fn-02",
      "dua-fn-05",
      "dua-fn-04",
      "dua-ro-02",
      "billie-ww-01",
      "gaga-tfm-01",
    ],
  },
  {
    name: "Focus Mix",
    trackIds: [
      "tyler-ig-02",
      "tyler-ig-03",
      "tyler-fb-04",
      "frank-bl-01",
      "frank-bl-03",
      "frank-bl-10",
      "billie-hte-01",
      "billie-hte-08",
    ],
  },
];

/**
 * Seeds the demo playlists into localStorage on first use.
 *
 * Seeding is skipped when:
 *   - the seeded flag is already set, or
 *   - the user already has playlists in localStorage (pre-existing data).
 *
 * After seeding, the flag "demo_playlists_seeded" is written so the seed
 * is never applied again, even if the user later deletes all seeded playlists.
 */
function seedDemoPlaylists() {
  if (localStorage.getItem(DEMO_PLAYLISTS_SEEDED_KEY)) return;

  const existing = loadDemoPlaylists();
  if (existing.length > 0) {
    localStorage.setItem(DEMO_PLAYLISTS_SEEDED_KEY, "1");
    return;
  }

  const trackIndex = new Map(getFlattenedTracks().map((t) => [t.id, t]));

  SEED_DEFINITIONS.forEach(({ name, trackIds }) => {
    const tracks = trackIds.map((id) => trackIndex.get(id)).filter(Boolean);
    createDemoPlaylist(name, tracks);
  });

  localStorage.setItem(DEMO_PLAYLISTS_SEEDED_KEY, "1");
}

/**
 * Removes a demo playlist from localStorage by ID.
 * @param {string} id
 */
function deleteDemoPlaylist(id) {
  const existing = loadDemoPlaylists();
  persistDemoPlaylists(existing.filter((p) => p.id !== id));
}

export {
  loadDemoPlaylists,
  createDemoPlaylist,
  updateDemoPlaylist,
  deleteDemoPlaylist,
  seedDemoPlaylists,
};
