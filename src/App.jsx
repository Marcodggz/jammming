import { useEffect, useState, useRef } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import Spotify from "./util/Spotify";
import MockSpotify from "./util/mockSpotify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { Toaster, toast } from "sonner";

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

  function addTrack(track) {
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

  // Save the playlist to Spotify
  async function savePlaylist() {
    const trackURIs = playlistTracks.map((track) => track.uri);

    if (trackURIs.length === 0) return;

    try {
      await spotifyService.savePlaylist(playlistName, trackURIs);
      setPlaylistTracks([]);
      setPlaylistName("My Playlist");

      if (isDemoMode) {
        toast.success("Playlist saved to your library");
      } else {
        toast.success("Playlist saved to Spotify");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save playlist. Please try again.");
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

  return (
    <>
      <Toaster position="top-right" richColors theme="dark" duration={4000} />
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
                aria-label="Try demo mode with sample songs"
              >
                <span className="demoButtonInner">
                  <span className="demoIcon" aria-hidden="true">
                    🎵
                  </span>
                  <span className="demoText">Try Demo</span>
                </span>
              </button>
            </div>

            <p className="privacyNote">
              Secure authentication via Spotify. We only request playlist
              permissions.
            </p>
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
              <span className="demoBannerText">
                🎵 Demo Mode - Using sample songs
              </span>
              <button
                className="exitDemoButton"
                onClick={exitDemoMode}
                aria-label="Exit demo mode"
              >
                Exit Demo
              </button>
            </div>
          )}
          <SearchBar
            searchTracks={searchTracks}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            hasPrevSearch={prevSearchStack.length > 0}
            onGoBack={goBack}
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
              className={`playlist ${
                playlistTracks.length === 0 ? "isEmpty" : ""
              }`}
              aria-labelledby="playlist-heading"
            >
              <Playlist
                playlistName={playlistName}
                playlistTracks={playlistTracks}
                removeTrack={removeTrack}
                playlistNameChange={playlistNameChange}
                savePlaylist={savePlaylist}
                formattedDuration={formattedDuration}
              />
            </section>
          </div>
        </main>
      )}
    </>
  );
}

export default App;
