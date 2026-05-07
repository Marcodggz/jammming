import { useEffect, useState, useRef } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import PlaylistHome from "./components/PlaylistHome/PlaylistHome";
import UserPlaylists from "./components/UserPlaylists/UserPlaylists";
import Spotify from "./util/Spotify";
import MockSpotify from "./util/mockSpotify";
import {
  loadDemoPlaylists,
  createDemoPlaylist,
  updateDemoPlaylist,
  deleteDemoPlaylist,
  seedDemoPlaylists,
} from "./util/demoPlaylists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { Toaster, toast } from "sonner";
import DeleteConfirmModal from "./components/DeleteConfirmModal/DeleteConfirmModal";
import DestinationSelector from "./components/DestinationSelector/DestinationSelector";

/**
 * Pure helper — loads the user's playlist list from the correct source.
 * Defined outside the component so it has no closure dependencies and can
 * be called safely inside useEffect without re-creating on every render.
 *
 * Returned shape per item: { id, name, trackCount, imageUrl, isOwned }
 */
/**
 * Pure dirty-state helper — compares current editor state against the snapshot
 * captured when the playlist was first loaded.
 *
 * Returns true when the user has made at least one change (name or tracks).
 * Returns false when nothing has changed, or when there is no snapshot yet.
 *
 * Rules:
 *  - Trims both names before comparing so trailing whitespace is ignored.
 *  - Compares URI arrays in order — reordering tracks counts as a change.
 *  - Does not rely on track count alone.
 */
function hasPlaylistChanges(
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

async function loadPlaylistsFromSource(isDemo) {
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

/** Collects up to 4 unique album-cover URLs from a track list. */
function getArtworkImages(tracks) {
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

function App() {
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [prevSearchStack, setPrevSearchStack] = useState([]);

  // Playlist browser state
  const [playlists, setPlaylists] = useState([]);
  const [playlistsLoading, setPlaylistsLoading] = useState(false);
  const [playlistsError, setPlaylistsError] = useState(null);
  // null  → creating a new playlist
  // truthy → editing an existing playlist with that ID
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const isEditingExisting = selectedPlaylistId !== null;

  // Loading state for an existing playlist being loaded into the editor.
  // This prevents the "My Playlist / No tracks yet" flicker when switching
  // to an existing playlist while its tracks are being fetched.
  // Remains true from when handleSelectPlaylist is called until tracks are loaded.
  const [isLoadingExistingPlaylist, setIsLoadingExistingPlaylist] =
    useState(false);

  // Delete confirmation modal state — holds the id of the playlist pending deletion
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Destination selector state — shown when the user clicks "+" without an active playlist.
  // pendingTrackToAdd: the track object waiting to be routed to a playlist.
  // isDestinationSelectorOpen: controls the selector UI visibility independently,
  //   so the pending track survives when the user navigates to the browser panel.
  // selectorAnchorElement: the "+" button element that triggered the popover (for positioning).
  const [pendingTrackToAdd, setPendingTrackToAdd] = useState(null);
  const [isDestinationSelectorOpen, setIsDestinationSelectorOpen] =
    useState(false);
  const [selectorAnchorElement, setSelectorAnchorElement] = useState(null);

  // Snapshot of the playlist state at the moment it was loaded for editing.
  // Stores full track objects (not just URIs) so we can both detect changes
  // and revert to the exact saved state without touching the API.
  // Both are null when creating a new playlist (no snapshot to compare against).
  const [initialPlaylistName, setInitialPlaylistName] = useState(null);
  const [initialPlaylistTracks, setInitialPlaylistTracks] = useState(null);

  // Track optimistic playlist summaries after create/update to prevent stale
  // Spotify data from overwriting correct local track counts.
  // Maps playlistId -> { name, trackCount, artworkImages? }
  // Entries are added on successful create/update and consulted when refreshing
  // the playlist list. This ensures multiple creates/updates in one session all
  // keep their correct counts even if Spotify returns eventual-consistency delays.
  const optimisticPlaylistsRef = useRef({});

  // Unsaved-changes banner state.
  // pendingActionRef: the navigation/action the user attempted before being shown the banner.
  // showUnsavedBanner: controls banner visibility.
  // isSaving: prevents duplicate save calls triggered from the banner.
  const pendingActionRef = useRef(null);
  const [showUnsavedBanner, setShowUnsavedBanner] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Tracks the last successfully executed search query (normalized: trimmed, lower-cased).
  // Used to prevent redundant re-searches when the user clicks the same artist/album link
  // or submits the same search term a second time.
  const lastExecutedSearchRef = useRef("");

  // For a new (not yet saved) playlist, dirty = tracks added or non-default name.
  // For an existing playlist, dirty = snapshot comparison via hasPlaylistChanges.
  // Must be computed AFTER all snapshot / editor state declarations above.
  const isNewPlaylistDirty =
    !isEditingExisting &&
    (playlistTracks.length > 0 || playlistName.trim() !== "My Playlist");

  const hasChanges =
    isNewPlaylistDirty ||
    hasPlaylistChanges(
      initialPlaylistName,
      initialPlaylistTracks,
      playlistName,
      playlistTracks,
    );

  // Controls which view fills the right panel: "home" (default), "editor", or "browser".
  const [playlistPanelView, setPlaylistPanelView] = useState("home");

  const hasInitializedAuth = useRef(false);

  // Get the appropriate service based on mode
  const spotifyService = isDemoMode ? MockSpotify : Spotify;

  // Track keyboard vs mouse navigation globally.
  // Tab sets data-keyboard on <html>; pointerdown (capture phase) clears it.
  // Capture phase fires before focus events, so the attribute is always in the
  // correct state by the time :focus-within CSS is evaluated.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Tab")
        document.documentElement.setAttribute("data-keyboard", "true");
    };
    const onPointerDown = () =>
      document.documentElement.removeAttribute("data-keyboard");
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown, true); // capture!
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, []);

  useEffect(() => {
    if (hasInitializedAuth.current) return;
    hasInitializedAuth.current = true;

    async function initializeAuth() {
      // Skip real auth in demo mode
      if (isDemoMode) {
        setIsAuthenticated(true);
        setIsAuthLoading(false);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (spotifyService.hasValidSession()) {
        setIsAuthenticated(true);
        setIsAuthLoading(false);
        return;
      }

      if (code) {
        try {
          await spotifyService.getAccessToken();
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Authentication initialization failed:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsAuthLoading(false);
    }

    initializeAuth();
  }, [isDemoMode, spotifyService]);

  // Fetch the user's playlist list whenever they become authenticated.
  // Using a cancellation flag prevents a stale setState if the component
  // unmounts or the mode changes while the request is in-flight.
  useEffect(() => {
    if (!isAuthenticated) {
      setPlaylists([]);
      return;
    }

    let cancelled = false;
    setPlaylistsLoading(true);
    setPlaylistsError(null);

    loadPlaylistsFromSource(isDemoMode)
      .then((result) => {
        if (!cancelled) {
          setPlaylists(result);
          setPlaylistsLoading(false);
        }
      })
      .catch((err) => {
        // Log the real error so it appears in the browser console.
        // This is the first place to look when playlists fail to load.
        console.error("Failed to load playlists:", err);
        if (!cancelled) {
          setPlaylistsError("Could not load playlists.");
          setPlaylistsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, isDemoMode]);

  // Filter out tracks that are already in the playlist
  const visibleTracks = tracks.filter(
    (track) =>
      !playlistTracks.some((playlistTrack) => playlistTrack.id === track.id),
  );

  // Check if all searched tracks are already in playlist
  const allTracksAdded =
    hasSearched && tracks.length > 0 && visibleTracks.length === 0;

  // Calculate the total duration of the playlist
  const totalDurationMs = playlistTracks.reduce(
    (total, track) => total + track.durationMs,
    0,
  );

  const totalSeconds = Math.floor(totalDurationMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedDuration =
    hours > 0
      ? `${hours}h ${minutes}m`
      : minutes > 0
        ? `${minutes}m ${formattedSeconds}s`
        : `${formattedSeconds}s`;

  function addTrack(track, buttonElement) {
    // If no playlist is active, open the destination selector instead of adding.
    if (!hasActivePlaylist) {
      setPendingTrackToAdd(track);
      setSelectorAnchorElement(buttonElement || null);
      setIsDestinationSelectorOpen(true);
      return;
    }
    if (!playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    }
  }

  function removeTrack(track) {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((savedTrack) => savedTrack.id !== track.id),
    );
  }

  function playlistNameChange(event) {
    setPlaylistName(event.target.value);
  }

  /** Resets the Playlist editor to a blank "create new" state. */
  function startNewPlaylist() {
    setSelectedPlaylistId(null);
    setPlaylistName("My Playlist");
    setPlaylistTracks([]);
    // Clear the snapshot — there is nothing to compare against for a new playlist.
    setInitialPlaylistName(null);
    setInitialPlaylistTracks(null);
    // Clear the loading state — not loading an existing playlist anymore.
    setIsLoadingExistingPlaylist(false);
    // Dismiss any active unsaved-changes banner and drop the pending action.
    pendingActionRef.current = null;
    setShowUnsavedBanner(false);
  }

  /**
   * Guards any navigation action that would discard unsaved playlist changes.
   *
   * - If there are no unsaved changes: runs nextAction immediately.
   * - If there are unsaved changes: stores nextAction as pending and shows the
   *   unsaved-changes banner. The user must then choose Save or Discard.
   */
  function guardUnsavedChanges(nextAction) {
    if (!hasChanges) {
      nextAction();
      return;
    }
    pendingActionRef.current = nextAction;
    setShowUnsavedBanner(true);
  }

  /**
   * Banner — "Discard" clicked.
   * Restores the editor to its last saved state (or clears it for new playlists),
   * then executes the originally-intended navigation action.
   */
  function handleBannerDiscard() {
    const action = pendingActionRef.current;
    pendingActionRef.current = null;
    setShowUnsavedBanner(false);

    // Restore editor to the last-saved snapshot, or clear for a new playlist.
    if (initialPlaylistName !== null && initialPlaylistTracks !== null) {
      setPlaylistName(initialPlaylistName);
      setPlaylistTracks(initialPlaylistTracks);
    } else {
      setPlaylistName("My Playlist");
      setPlaylistTracks([]);
    }

    if (action) action();
  }

  /**
   * Banner — "Save" clicked.
   * Persists the playlist via the existing save logic, then executes the
   * originally-intended navigation action on success.
   * If save fails the banner stays open and the pending action is preserved.
   */
  async function handleBannerSave() {
    if (isSaving) return;
    setIsSaving(true);
    const action = pendingActionRef.current;
    try {
      const success = await savePlaylist(action);
      if (success) {
        // The snapshot was already synced inside savePlaylist (before afterSave ran).
        // Just clean up the banner state here.
        pendingActionRef.current = null;
        setShowUnsavedBanner(false);
      }
      // On failure savePlaylist already shows an error toast; banner stays open.
    } finally {
      setIsSaving(false);
    }
  }

  /**
   * Destination selector — "New playlist" chosen.
   * Opens a fresh editor and seeds it with the pending track immediately.
   */
  function handleSelectorNewPlaylist() {
    const track = pendingTrackToAdd;
    setPendingTrackToAdd(null);
    setIsDestinationSelectorOpen(false);
    startNewPlaylist();
    if (track) {
      setPlaylistTracks([track]);
    }
    setPlaylistPanelView("editor");
  }

  /**
   * Destination selector — "My playlists" chosen.
   * Closes the selector overlay and opens the browser panel.
   * The pending track is intentionally kept — it will be consumed
   * when the user picks a playlist in handleSelectPlaylist().
   */
  function handleSelectorMyPlaylists() {
    setIsDestinationSelectorOpen(false);
    setPlaylistPanelView("browser");
  }

  /** Destination selector — cancelled (Escape or backdrop click). */
  function handleSelectorCancel() {
    setPendingTrackToAdd(null);
    setIsDestinationSelectorOpen(false);
  }

  /**
   * Opens the delete confirmation modal for the given playlist.
   * Actual deletion happens in confirmDelete() after the user confirms.
   */
  function handleDeletePlaylist(playlistId) {
    const meta = playlists.find((p) => p.id === playlistId);
    if (!meta) return;
    setPendingDeleteId(playlistId);
  }

  /** Called when the user clicks "Delete" inside the confirmation modal. */
  async function confirmDelete() {
    const playlistId = pendingDeleteId;
    setPendingDeleteId(null); // close modal immediately

    const meta = playlists.find((p) => p.id === playlistId);
    if (!meta) return;

    try {
      if (isDemoMode) {
        deleteDemoPlaylist(playlistId);
      } else {
        await Spotify.deletePlaylist(playlistId);
      }
    } catch (err) {
      console.error("confirmDelete:", err);
      toast.error("Could not delete playlist. Please try again.");
      return; // leave UI unchanged on failure
    }

    // Remove from list state immediately — no need to refresh from Spotify.
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));

    // Clean up any optimistic data for this playlist to avoid memory leaks.
    delete optimisticPlaylistsRef.current[playlistId];

    // If the deleted playlist was open in the editor, reset to a blank state
    // and return to the browser so the user can see the updated list.
    if (selectedPlaylistId === playlistId) {
      startNewPlaylist();
      setPlaylistPanelView("browser");
    }

    toast.success(`"${meta.name}" deleted.`);
  }

  /** Called when the user cancels the confirmation modal. */
  function cancelDelete() {
    setPendingDeleteId(null);
  }

  /**
   * Loads an existing playlist into the editor for editing.
   * Fetches tracks from the appropriate source (localStorage for demo,
   * Spotify API for real mode) then populates the editor state.
   */
  async function handleSelectPlaylist(playlistId) {
    // Clicking the already-selected playlist has no effect
    if (playlistId === selectedPlaylistId) return;

    const meta = playlists.find((p) => p.id === playlistId);

    // Non-owned playlists cannot be loaded — Spotify returns 403 for
    // GET /playlists/{id}/items unless the user owns or collaborates on it.
    if (!meta || !meta.isOwned) return;

    // Begin loading state — prevents the "My Playlist / No tracks yet" flicker.
    setIsLoadingExistingPlaylist(true);

    try {
      let loadedTracks;

      if (isDemoMode) {
        const raw = loadDemoPlaylists().find((p) => p.id === playlistId);
        loadedTracks = raw?.tracks ?? [];
      } else {
        loadedTracks = await Spotify.getPlaylistTracks(playlistId);
      }

      // Capture the baseline from the raw loaded tracks before any pending
      // additions are applied. This ensures dirty-state detection compares
      // against the playlist as it exists in storage, not the modified state.
      const baselineTracks = loadedTracks;

      // If there is a pending track waiting (from the destination selector flow),
      // append it now — but only if it is not already in the loaded playlist.
      let editorTracks = baselineTracks;
      if (
        pendingTrackToAdd &&
        !baselineTracks.find((t) => t.id === pendingTrackToAdd.id)
      ) {
        editorTracks = [...baselineTracks, pendingTrackToAdd];
      }
      // Always clear the pending track once a playlist has been chosen.
      setPendingTrackToAdd(null);

      setPlaylistName(meta.name);
      setPlaylistTracks(editorTracks);
      setSelectedPlaylistId(playlistId);
      // Capture a snapshot of the just-loaded state (full track objects) so we
      // can both detect dirty changes and revert without touching the API.
      // Use baselineTracks (not editorTracks) so pending additions are
      // treated as user changes, not part of the original playlist state.
      setInitialPlaylistName(meta.name);
      setInitialPlaylistTracks(baselineTracks);
    } catch (err) {
      // Distinguish Spotify's access-denied 403 from generic failures.
      if (err.message?.startsWith("PLAYLIST_ACCESS_DENIED")) {
        toast.error(
          "Tracks cannot be loaded — Spotify only allows this for playlists you own or collaborate on.",
        );
      } else {
        console.error("handleSelectPlaylist:", err);
        toast.error("Could not load playlist tracks. Please try again.");
      }
    } finally {
      // End loading state — loading is complete (success or failure).
      setIsLoadingExistingPlaylist(false);
    }
  }

  // Save or update the playlist.
  // afterSave: optional callback invoked instead of the default home navigation
  //   when the call originates from the unsaved-changes banner. The banner
  //   handler passes the originally-intended action so the user lands where
  //   they tried to go after saving.
  // Returns true on success, false on failure (so the banner handler can decide
  //   whether to close the banner or keep it open for error recovery).
  async function savePlaylist(afterSave = null) {
    const trackURIs = playlistTracks.map((track) => track.uri);
    if (trackURIs.length === 0) return false;

    // newPlaylistId is set only when creating a new real-Spotify playlist,
    // so we can add an optimistic entry while Spotify's index catches up.
    // editedPlaylistId is captured before startNewPlaylist() clears selectedPlaylistId
    // so Phase 2 can still apply the correct count to the refreshed list.
    let newPlaylistId = null;
    let editedPlaylistId = null;

    // --- Phase 1: persist the playlist (show error if this fails) ---
    try {
      if (isDemoMode) {
        if (isEditingExisting && selectedPlaylistId) {
          // Capture editedPlaylistId here (same as the Spotify branch) so the
          // optimistic update and refresh stale-count fix both run for demo mode.
          editedPlaylistId = selectedPlaylistId;
          updateDemoPlaylist(selectedPlaylistId, {
            name: playlistName,
            tracks: playlistTracks,
          });
          toast.success("Playlist updated");
        } else {
          createDemoPlaylist(playlistName, playlistTracks);
          toast.success("Playlist saved");
        }
      } else {
        if (isEditingExisting && selectedPlaylistId) {
          editedPlaylistId = selectedPlaylistId;
          await Spotify.updatePlaylistDetails(selectedPlaylistId, playlistName);
          await Spotify.replacePlaylistTracks(selectedPlaylistId, trackURIs);
          toast.success("Playlist updated on Spotify");
        } else {
          // savePlaylist() returns the newly created playlist's ID
          newPlaylistId = await Spotify.savePlaylist(playlistName, trackURIs);
          toast.success("Playlist saved to Spotify");
        }
      }
    } catch (error) {
      console.error("savePlaylist failed:", error);
      toast.error("Failed to save playlist. Please try again.");
      return false; // do not reset the editor if the save itself failed
    }

    // --- Phase 2: record optimistic state and reset editor ---
    // Store the correct summary in optimisticPlaylistsRef so the refresh
    // can preserve it. This handles eventual consistency delays from Spotify.
    const trackCount = trackURIs.length;
    const affectedId = editedPlaylistId || newPlaylistId;

    if (affectedId) {
      optimisticPlaylistsRef.current[affectedId] = {
        name: playlistName,
        trackCount,
        ...(isDemoMode && { artworkImages: getArtworkImages(playlistTracks) }),
      };
    }

    // Apply optimistic UI update immediately so the user sees the correct
    // name & track count before the Spotify refresh lands.
    // For demo mode this also updates the artwork collage so the browser list
    // stays in sync with the just-saved tracks.
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
      // Insert a provisional entry with the correct track count for a new playlist.
      // The subsequent refresh will replace it with real Spotify data, but this
      // optimistic entry ensures the count stays correct if Spotify is delayed.
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

    // Navigate: when called from the unsaved-changes banner the caller supplies
    // the originally-intended action; otherwise fall back to the default
    // "reset editor and go home" behaviour.
    if (typeof afterSave === "function") {
      if (editedPlaylistId) {
        // Existing playlist saved via banner.
        // Sync the snapshot to the saved values so hasChanges evaluates to false.
        // If afterSave calls startNewPlaylist(), its null-setters are queued after
        // ours (last-write wins in a React batch) and correctly clear the snapshot.
        setInitialPlaylistName(playlistName);
        setInitialPlaylistTracks([...playlistTracks]);
      } else {
        // New playlist created via banner.
        // Reset the editor completely: isNewPlaylistDirty uses playlistName and
        // playlistTracks directly (not just the snapshot), so only startNewPlaylist
        // can reliably bring hasChanges back to false for a new playlist.
        startNewPlaylist();
      }
      afterSave();
    } else {
      startNewPlaylist();
      setPlaylistPanelView("home");
    }

    // --- Phase 3: refresh from source and merge with optimistic data ---
    try {
      const refreshed = await loadPlaylistsFromSource(isDemoMode);
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
      // Keep the optimistically-patched list rather than clearing it.
    }

    return true;
  }

  // Demo mode handlers
  function startDemoMode() {
    setIsDemoMode(true);
    setIsAuthenticated(true);
    setIsAuthLoading(false);
  }

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
    // Clear optimistic playlist data when switching modes to avoid applying
    // stale optimistic data from a different session/mode.
    optimisticPlaylistsRef.current = {};
  }

  // Search for tracks based on the search term
  async function searchTracks(term, isDrillDown = false, displayTerm = null) {
    const trimmedTerm = term.trim();
    if (trimmedTerm) {
      // Deduplicate: skip the search if the normalized query matches the last one executed.
      const normalizedTerm = trimmedTerm.toLowerCase();
      if (normalizedTerm === lastExecutedSearchRef.current) {
        return;
      }

      if (isDrillDown) {
        setPrevSearchStack((prev) => [...prev, { term: searchTerm, tracks }]);
      } else {
        setPrevSearchStack([]);
      }
      setSearchTerm(displayTerm ?? term);
      setHasSearched(true);
      setIsLoading(true);
      // Record this query as executed before the async call so that
      // any re-render triggered by state updates above cannot race.
      lastExecutedSearchRef.current = normalizedTerm;

      try {
        const results = await spotifyService.search(term);
        setTracks(results);
      } catch (error) {
        // Reset so the same query can be retried after an error.
        lastExecutedSearchRef.current = "";
        console.error(error);
        toast.error("Something went wrong while searching. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setTracks([]);
      setHasSearched(false);
      setIsLoading(false);
      lastExecutedSearchRef.current = "";
    }
  }

  function goBack() {
    if (prevSearchStack.length === 0) return;
    const prev = prevSearchStack[prevSearchStack.length - 1];
    setSearchTerm(prev.term);
    setTracks(prev.tracks);
    setPrevSearchStack((stack) => stack.slice(0, -1));
    setHasSearched(true);
  }

  // True when the editor is open (new or existing playlist).
  // Single source of truth for "playlist context is active".
  // Controls the enabled/disabled state of "+" buttons in search results.
  const hasActivePlaylist = playlistPanelView === "editor";

  return (
    <>
      <Toaster position="top-right" richColors theme="dark" duration={4000} />

      {pendingDeleteId && (
        <DeleteConfirmModal
          playlistName={
            playlists.find((p) => p.id === pendingDeleteId)?.name ?? ""
          }
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      {isDestinationSelectorOpen && pendingTrackToAdd && (
        <DestinationSelector
          trackName={pendingTrackToAdd.name}
          anchorElement={selectorAnchorElement}
          onNewPlaylist={handleSelectorNewPlaylist}
          onMyPlaylists={handleSelectorMyPlaylists}
          onCancel={handleSelectorCancel}
        />
      )}

      <a
        className="skipLink"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to main content
      </a>

      {isAuthLoading ? null : !isAuthenticated ? (
        <main className="app landingPage" id="main-content" tabIndex="-1">
          <section className="welcomeHome" aria-labelledby="welcome-title">
            <div className="logoContainer">
              <span className="logoIcon">🎧</span>
              <h1 className="logoTitle">
                Ja<span className="logoHighlight">mmm</span>ing
              </h1>
            </div>
            <p id="welcome-title" className="welcomeHeadline">
              Create the perfect playlist
            </p>
            <p className="welcomeSubtitle">
              Search millions of songs, build your dream playlist, and save it
              directly to your Spotify account.
            </p>

            <div className="featuresContainer" aria-label="App features">
              <div className="featureItem">
                <span className="featureIcon" aria-hidden="true">
                  🔍
                </span>
                <span className="featureText">Search songs</span>
              </div>
              <div className="featureItem">
                <span className="featureIcon" aria-hidden="true">
                  ✨
                </span>
                <span className="featureText">Build playlists</span>
              </div>
              <div className="featureItem">
                <span className="featureIcon" aria-hidden="true">
                  💾
                </span>
                <span className="featureText">Save to Spotify</span>
              </div>
            </div>

            <p className="privacyNote">
              Playlist creation only. Your data is never shared.
            </p>

            <div className="authButtons">
              <button
                type="button"
                className="connectButton"
                onClick={Spotify.login}
                aria-label="Connect your Spotify account"
              >
                <span className="connectButtonInner">
                  <FontAwesomeIcon
                    icon={faSpotify}
                    className="spotifyIcon"
                    aria-hidden="true"
                  />
                  <span className="connectText">Connect to Spotify</span>
                </span>
              </button>

              <button
                type="button"
                className="demoButton"
                onClick={startDemoMode}
                aria-label="Create a playlist with sample songs — no account needed"
              >
                Create a playlist
                <span className="demoBadge">Sample songs</span>
              </button>
            </div>
          </section>
        </main>
      ) : (
        <main
          className="app"
          id="main-content"
          tabIndex="-1"
          aria-label="Jammming Spotify Playlist Builder"
        >
          <h1 className="srOnly">Jammming — Spotify Playlist Builder</h1>
          {isDemoMode && (
            <div className="demoModeBanner">
              <span className="demoBannerText">Sample data mode</span>
              <button
                className="exitDemoButton"
                onClick={() => guardUnsavedChanges(exitDemoMode)}
                aria-label="Exit demo mode and connect to Spotify"
              >
                Exit
              </button>
            </div>
          )}
          <SearchBar
            searchTracks={searchTracks}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            hasPrevSearch={prevSearchStack.length > 0}
            onGoBack={goBack}
            getSuggestions={spotifyService.getSuggestions}
          />

          <div className="mainContainer">
            <section
              className={`results ${
                !hasSearched
                  ? "isWelcome"
                  : visibleTracks.length === 0 && !isLoading
                    ? "isNoResults"
                    : ""
              }`}
              aria-labelledby="search-results-heading"
              aria-busy={isLoading}
            >
              <SearchResults
                tracks={visibleTracks}
                addTrack={addTrack}
                searchTracks={searchTracks}
                searchTerm={searchTerm}
                hasSearched={hasSearched}
                isLoading={isLoading}
                allTracksAdded={allTracksAdded}
              />
            </section>

            <section
              className={`playlist ${playlistPanelView === "home" ? "isHome" : ""} ${
                playlistPanelView === "editor" &&
                playlistTracks.length === 0 &&
                !isEditingExisting
                  ? "isEmpty"
                  : ""
              }`}
              aria-label="Playlist panel"
            >
              {playlistPanelView === "home" ? (
                <PlaylistHome
                  onNewPlaylist={() => {
                    startNewPlaylist();
                    setPlaylistPanelView("editor");
                  }}
                  onMyPlaylists={() => setPlaylistPanelView("browser")}
                />
              ) : playlistPanelView === "browser" ? (
                <UserPlaylists
                  playlists={playlists}
                  isLoading={playlistsLoading}
                  error={playlistsError}
                  selectedPlaylistId={selectedPlaylistId}
                  onSelectPlaylist={(id) => {
                    guardUnsavedChanges(() => {
                      handleSelectPlaylist(id);
                      setPlaylistPanelView("editor");
                    });
                  }}
                  onDeletePlaylist={handleDeletePlaylist}
                  onStartNew={() => {
                    guardUnsavedChanges(() => {
                      startNewPlaylist();
                      setPlaylistPanelView("editor");
                    });
                  }}
                  onBack={() =>
                    setPlaylistPanelView(selectedPlaylistId ? "editor" : "home")
                  }
                  isEditingExisting={isEditingExisting}
                />
              ) : (
                <Playlist
                  playlistName={playlistName}
                  playlistTracks={playlistTracks}
                  isLoadingExistingPlaylist={isLoadingExistingPlaylist}
                  removeTrack={removeTrack}
                  playlistNameChange={playlistNameChange}
                  savePlaylist={savePlaylist}
                  formattedDuration={formattedDuration}
                  saveButtonText={
                    isEditingExisting
                      ? "Update playlist"
                      : isDemoMode
                        ? "Save playlist"
                        : "Save to Spotify"
                  }
                  isEditingExisting={isEditingExisting}
                  hasChanges={hasChanges}
                  onStartNew={() =>
                    guardUnsavedChanges(() => {
                      startNewPlaylist();
                      setPlaylistPanelView("editor");
                    })
                  }
                  onShowBrowser={() =>
                    guardUnsavedChanges(() => setPlaylistPanelView("browser"))
                  }
                  onDeleteCurrentPlaylist={
                    isEditingExisting
                      ? () => handleDeletePlaylist(selectedPlaylistId)
                      : undefined
                  }
                  unsavedBannerVisible={showUnsavedBanner}
                  onBannerDiscard={handleBannerDiscard}
                  onBannerSave={handleBannerSave}
                  isSaving={isSaving}
                  canSave={playlistTracks.length > 0}
                />
              )}
            </section>
          </div>
        </main>
      )}
    </>
  );
}

export default App;
