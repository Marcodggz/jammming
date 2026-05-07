# Code Changes - Detailed Diff

## File: src/App.jsx

### Change 1: Add optimistic playlist ref (Line ~132)

```jsx
// ADDED:
  // Track optimistic playlist summaries after create/update to prevent stale
  // Spotify data from overwriting correct local track counts.
  // Maps playlistId -> { name, trackCount, artworkImages? }
  // Entries are added on successful create/update and consulted when refreshing
  // the playlist list. This ensures multiple creates/updates in one session all
  // keep their correct counts even if Spotify returns eventual-consistency delays.
  const optimisticPlaylistsRef = useRef({});
```

**Rationale**: Provides a persistent reference across multiple save operations to track known-correct playlist summaries. A `useRef` is used because:
1. It survives re-renders
2. It doesn't trigger re-renders when modified
3. It's perfect for session-scoped data that shouldn't affect render logic

---

### Change 2: Cleanup on delete (Line ~456)

```jsx
    // Remove from list state immediately — no need to refresh from Spotify.
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));

    // ADDED: Clean up any optimistic data for this playlist to avoid memory leaks.
    delete optimisticPlaylistsRef.current[playlistId];
```

**Rationale**: Prevents memory accumulation. If a user creates and deletes many playlists in one session, the optimistic map could grow unbounded without cleanup.

---

### Change 3: Restructure savePlaylist Phase 2 (Lines ~586-665)

#### REMOVED (Old Logic):
```jsx
    // --- Phase 2: reset editor and refresh the list (best-effort) ---
    // A refresh failure is non-fatal — the playlist was already saved.
    //
    // Optimistic UI update strategy:
    //  • Edit  → patch the existing entry immediately...
    //  • Create → insert a placeholder with the correct count...
    const trackCount = trackURIs.length;

    if (editedPlaylistId) {
      setPlaylists((prev) =>
        prev.map((p) => {
          if (p.id !== editedPlaylistId) return p;
          const patch = { ...p, name: playlistName, trackCount };
          if (isDemoMode) {
            patch.artworkImages = getArtworkImages(playlistTracks);
          }
          return patch;
        }),
      );
    } else if (!isDemoMode && newPlaylistId) {
      setPlaylists((prev) => [
        ...prev,
        {
          id: newPlaylistId,
          name: playlistName,
          trackCount,
          imageUrl: null,
          isOwned: true,
        },
      ]);
    }
    
    // ... navigation logic ...

    try {
      const refreshed = await loadPlaylistsFromSource(isDemoMode);
      // OLD FRAGILE LOGIC:
      setPlaylists(
        refreshed.map((p) => {
          if (
            editedPlaylistId &&
            p.id === editedPlaylistId &&
            p.trackCount !== trackCount
          ) {
            return { ...p, name: playlistName, trackCount };
          }
          if (newPlaylistId && p.id === newPlaylistId && p.trackCount === 0) {
            return { ...p, trackCount };
          }
          return p;
        }),
      );
    } catch (err) {
      console.warn("savePlaylist: could not refresh playlist list:", err);
    }
```

#### ADDED (New Logic):
```jsx
    // --- Phase 2: record optimistic state and reset editor ---
    // Store the correct summary in optimisticPlaylistsRef so the refresh
    // can preserve it. This handles eventual consistency delays from Spotify.
    const trackCount = trackURIs.length;
    const affectedId = editedPlaylistId || newPlaylistId;

    // STORE IN REF (persists across phases)
    if (affectedId) {
      optimisticPlaylistsRef.current[affectedId] = {
        name: playlistName,
        trackCount,
        ...(isDemoMode && { artworkImages: getArtworkImages(playlistTracks) }),
      };
    }

    // Apply optimistic UI update immediately...
    if (editedPlaylistId) {
      setPlaylists((prev) =>
        prev.map((p) => {
          if (p.id !== editedPlaylistId) return p;
          const patch = { ...p, name: playlistName, trackCount };
          if (isDemoMode) {
            patch.artworkImages = getArtworkImages(playlistTracks);
          }
          return patch;
        }),
      );
    } else if (!isDemoMode && newPlaylistId) {
      setPlaylists((prev) => [
        ...prev,
        {
          id: newPlaylistId,
          name: playlistName,
          trackCount,
          imageUrl: null,
          isOwned: true,
        },
      ]);
    }
    
    // ... navigation logic ...

    // --- Phase 3: refresh from source and merge with optimistic data ---
    try {
      const refreshed = await loadPlaylistsFromSource(isDemoMode);
      // NEW ROBUST LOGIC:
      setPlaylists(
        refreshed.map((p) => {
          // If this playlist was just created or updated, consult the
          // optimistic data to override any stale values from Spotify.
          const optimistic = optimisticPlaylistsRef.current[p.id];
          if (optimistic) {
            return { ...p, ...optimistic };
          }
          return p;
        }),
      );
    } catch (err) {
      console.warn("savePlaylist: could not refresh playlist list:", err);
    }
```

**Rationale**: 
- Old logic had separate conditions for edited vs new playlists
- Could miss stale values that aren't exactly 0
- Fragile to future changes in Spotify API responses
- New logic:
  - Records all correct data in a persistent ref
  - Uses a single, simple merge strategy for all cases
  - More robust to different stale value patterns
  - Same logic applies to both demo and Spotify modes

---

### Change 4: Cleanup on mode exit (Line ~699)

```jsx
  function exitDemoMode() {
    setIsDemoMode(false);
    setIsAuthenticated(false);
    setTracks([]);
    setPlaylistTracks([]);
    setSearchTerm("");
    setHasSearched(false);
    setPlaylists([]);
    setSelectedPlaylistId(null);
    lastExecutedSearchRef.current = "";
    // ADDED: Clear optimistic playlist data when switching modes to avoid applying
    // stale optimistic data from a different session/mode.
    optimisticPlaylistsRef.current = {};
  }
```

**Rationale**: Prevents demo mode optimistic data from being applied when switching to Spotify mode (or vice versa). Each mode/session should start clean.

---

## Summary of Changes

| Line(s) | Type | Purpose |
|---------|------|---------|
| ~132 | Add | Create `optimisticPlaylistsRef` to track correct playlist summaries |
| ~456 | Add | Cleanup optimistic data when playlist is deleted |
| ~596 | Add | Record optimistic data after successful save |
| ~597-659 | Refactor | Rename Phase 2 to Phase 2 + Phase 3; restructure refresh merge logic |
| ~665 | Change | Replace fragile conditional logic with simple optimistic data merge |
| ~699 | Add | Clear optimistic data when exiting demo mode |

## Lines of Code Changed
- **Total modified**: ~25 lines
- **New logic**: ~20 lines  
- **Cleanup/safety**: ~5 lines
- **No deletions of critical logic** (only improvements)

## Impact Analysis

### Affected Functionality
- ✓ Creating new playlists
- ✓ Editing existing playlists  
- ✓ Saving with unsaved changes banner
- ✓ Deleting playlists
- ✓ Switching modes
- ✗ Search (unchanged)
- ✗ Track loading (unchanged)
- ✗ Auth flow (unchanged)

### Risk Assessment
**Low Risk** because:
- Changes are localized to playlist summary refresh logic
- No modifications to API calls or track handling
- Optimistic data is session-scoped (cleared on reload)
- Existing error handling preserved
- No new dependencies introduced
- Backward compatible with existing behavior

### Testing Impact
- Manual test cases provided (9 scenarios)
- All existing tests should continue to pass
- Build and lint verify code quality
- No new browser APIs used
