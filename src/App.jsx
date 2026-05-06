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

  // True when the current editor state differs from the snapshot captured on load.
  // Always false for new (unsaved) playlists — no snapshot exists to compare against.
  // Must be computed AFTER the snapshot state declarations above.
  const hasChanges = hasPlaylistChanges(
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

    if (!meta || !meta.isOwned) return;

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
    }
  }

  // Save or update the playlist
  async function savePlaylist() {
    const trackURIs = playlistTracks.map((track) => track.uri);
    if (trackURIs.length === 0) return;

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
      return; // do not reset the editor if the save itself failed
    }

    // --- Phase 2: reset editor and refresh the list (best-effort) ---
    // A refresh failure is non-fatal — the playlist was already saved.
    //
    // Optimistic UI update strategy:
    //  • Edit  → patch the existing entry immediately so the user sees the
    //            correct name & track count before the Spotify refresh lands.
    //  • Create → insert a placeholder with the correct count; Spotify's index
    //            is eventually-consistent so live-refresh would show 0 tracks
    //            for a newly created playlist.
    const trackCount = trackURIs.length;

    if (editedPlaylistId) {
      setPlaylists((prev) =>
        prev.map((p) =>
          p.id === editedPlaylistId
            ? { ...p, name: playlistName, trackCount }
            : p,
        ),
      );
    } else if (!isDemoMode && newPlaylistId) {
      // Insert a provisional entry with a correct track count.
      // The subsequent refresh will replace it with the real Spotify data
      // (including the cover image, exact snapshot_id, etc.).
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

    startNewPlaylist();
    setPlaylistPanelView("home");
    try {
      const refreshed = await loadPlaylistsFromSource(isDemoMode);
      // Spotify's /me/playlists response is eventually consistent: the track
      // count may still reflect the pre-save value immediately after a create
      // or replace operation. Preserve our locally-computed count for the
      // affected playlist whenever Spotify returns a stale value.
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
      // Keep the optimistically-patched list rather than clearing it.
    }
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
  }

  // Search for tracks based on the search term
  async function searchTracks(term, isDrillDown = false, displayTerm = null) {
    if (term.trim()) {
      if (isDrillDown) {
        setPrevSearchStack((prev) => [...prev, { term: searchTerm, tracks }]);
      } else {
        setPrevSearchStack([]);
      }
      setSearchTerm(displayTerm ?? term);
      setHasSearched(true);
      setIsLoading(true);

      try {
        const results = await spotifyService.search(term);
        setTracks(results);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while searching. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setTracks([]);
      setHasSearched(false);
      setIsLoading(false);
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
                onClick={exitDemoMode}
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
                    handleSelectPlaylist(id);
                    setPlaylistPanelView("editor");
                  }}
                  onDeletePlaylist={handleDeletePlaylist}
                  onStartNew={() => {
                    startNewPlaylist();
                    setPlaylistPanelView("editor");
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
                  onStartNew={startNewPlaylist}
                  onShowBrowser={() => setPlaylistPanelView("browser")}
                  onDeleteCurrentPlaylist={
                    isEditingExisting
                      ? () => handleDeletePlaylist(selectedPlaylistId)
                      : undefined
                  }
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
