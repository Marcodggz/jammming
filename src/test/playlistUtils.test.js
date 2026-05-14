import { describe, it, expect } from "vitest";
import {
  isValidPlaylistName,
  hasPlaylistChanges,
  getArtworkImages,
  formatPlaylistDuration,
  getSaveButtonText,
} from "../util/playlistUtils";

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

const makeTrack = (uri, albumImage = null, durationMs = 0) => ({
  uri,
  albumImage,
  durationMs,
});

// ---------------------------------------------------------------------------
// isValidPlaylistName
// ---------------------------------------------------------------------------

describe("isValidPlaylistName", () => {
  it("returns true for a normal string", () => {
    expect(isValidPlaylistName("My Playlist")).toBe(true);
  });

  it("returns false for an empty string", () => {
    expect(isValidPlaylistName("")).toBe(false);
  });

  it("returns false for whitespace-only strings", () => {
    expect(isValidPlaylistName("   ")).toBe(false);
  });

  it("returns false for non-string values", () => {
    expect(isValidPlaylistName(null)).toBe(false);
    expect(isValidPlaylistName(undefined)).toBe(false);
    expect(isValidPlaylistName(42)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// hasPlaylistChanges
// ---------------------------------------------------------------------------

describe("hasPlaylistChanges", () => {
  it("returns false when there is no snapshot (null initial state)", () => {
    expect(hasPlaylistChanges(null, null, "New Name", [])).toBe(false);
  });

  it("returns false when nothing has changed", () => {
    const tracks = [makeTrack("spotify:track:1"), makeTrack("spotify:track:2")];
    expect(hasPlaylistChanges("Name", tracks, "Name", tracks)).toBe(false);
  });

  it("returns true when the name has changed", () => {
    const tracks = [makeTrack("spotify:track:1")];
    expect(hasPlaylistChanges("Old", tracks, "New", tracks)).toBe(true);
  });

  it("ignores leading/trailing whitespace in name comparison", () => {
    const tracks = [makeTrack("spotify:track:1")];
    expect(hasPlaylistChanges("Name", tracks, "  Name  ", tracks)).toBe(false);
  });

  it("returns true when a track is removed", () => {
    const initial = [
      makeTrack("spotify:track:1"),
      makeTrack("spotify:track:2"),
    ];
    const current = [makeTrack("spotify:track:1")];
    expect(hasPlaylistChanges("Name", initial, "Name", current)).toBe(true);
  });

  it("returns true when track order changes", () => {
    const t1 = makeTrack("spotify:track:1");
    const t2 = makeTrack("spotify:track:2");
    expect(hasPlaylistChanges("Name", [t1, t2], "Name", [t2, t1])).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// getArtworkImages
// ---------------------------------------------------------------------------

describe("getArtworkImages", () => {
  it("returns an empty array when tracks have no album images", () => {
    expect(getArtworkImages([makeTrack("t1"), makeTrack("t2")])).toEqual([]);
  });

  it("collects unique album-cover URLs", () => {
    const tracks = [
      makeTrack("t1", "img-a"),
      makeTrack("t2", "img-b"),
      makeTrack("t3", "img-a"), // duplicate — should be skipped
    ];
    expect(getArtworkImages(tracks)).toEqual(["img-a", "img-b"]);
  });

  it("caps the result at 4 images", () => {
    const tracks = ["a", "b", "c", "d", "e"].map((id) =>
      makeTrack(`t-${id}`, `img-${id}`),
    );
    expect(getArtworkImages(tracks)).toHaveLength(4);
  });
});

// ---------------------------------------------------------------------------
// formatPlaylistDuration
// ---------------------------------------------------------------------------

describe("formatPlaylistDuration", () => {
  it('returns "00s" for an empty playlist', () => {
    expect(formatPlaylistDuration([])).toBe("00s");
  });

  it("formats seconds-only durations", () => {
    expect(formatPlaylistDuration([makeTrack("t1", null, 7000)])).toBe("07s");
  });

  it("formats minute+second durations", () => {
    // 2m 05s = 125 000 ms
    expect(formatPlaylistDuration([makeTrack("t1", null, 125_000)])).toBe(
      "2m 05s",
    );
  });

  it("formats hour-range durations (omits seconds)", () => {
    // 1h 5m = 3900 s = 3 900 000 ms
    expect(formatPlaylistDuration([makeTrack("t1", null, 3_900_000)])).toBe(
      "1h 5m",
    );
  });

  it("sums durations across multiple tracks", () => {
    const tracks = [
      makeTrack("t1", null, 60_000), // 1m
      makeTrack("t2", null, 60_000), // 1m
    ];
    expect(formatPlaylistDuration(tracks)).toBe("2m 00s");
  });

  it("treats missing durationMs as 0", () => {
    expect(formatPlaylistDuration([{ uri: "t1" }])).toBe("00s");
  });
});

// ---------------------------------------------------------------------------
// getSaveButtonText
// ---------------------------------------------------------------------------

describe("getSaveButtonText", () => {
  it('shows "Saving..." while saving a new playlist', () => {
    expect(getSaveButtonText(true, false, false)).toBe("Saving...");
  });

  it('shows "Updating..." while saving an existing playlist', () => {
    expect(getSaveButtonText(true, true, false)).toBe("Updating...");
  });

  it('shows "Update playlist" when editing an existing playlist (idle)', () => {
    expect(getSaveButtonText(false, true, false)).toBe("Update playlist");
  });

  it('shows "Save playlist" in demo mode (idle, new playlist)', () => {
    expect(getSaveButtonText(false, false, true)).toBe("Save playlist");
  });

  it('shows "Save to Spotify" in normal mode (idle, new playlist)', () => {
    expect(getSaveButtonText(false, false, false)).toBe("Save to Spotify");
  });
});
