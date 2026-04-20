import { useEffect, useState, useRef } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import Spotify from "./util/Spotify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const hasInitializedAuth = useRef(false);

  useEffect(() => {
    if (hasInitializedAuth.current) return;
    hasInitializedAuth.current = true;

    async function initializeAuth() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (Spotify.hasValidSession()) {
        setIsAuthenticated(true);
        setIsAuthLoading(false);
        return;
      }

      if (code) {
        try {
          await Spotify.getAccessToken();
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
  }, []);

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
      // Add the playlist tracks
    }
  }

  function removeTrack(track) {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((savedTrack) => savedTrack.id !== track.id),
    );
    // Remove the playlist tracks
  }

  function playlistNameChange(event) {
    setPlaylistName(event.target.value);
    // Update the playlist name
  }

  // Save the playlist to Spotify
  async function savePlaylist() {
    const trackURIs = playlistTracks.map((track) => track.uri);

    if (trackURIs.length === 0) return;

    try {
      await Spotify.savePlaylist(playlistName, trackURIs);
      setPlaylistTracks([]);
      setPlaylistName("My Playlist");
      toast.success("Playlist saved successfully to Spotify! 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save playlist. Please try again.");
    }
  }

  // Search for tracks based on the search term
  async function searchTracks(term) {
    if (term.trim()) {
      setHasSearched(true);
      setIsLoading(true);

      try {
        const tracks = await Spotify.search(term);
        setTracks(tracks);
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

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      <a className="skipLink" href="#main-content">
        Skip to main content
      </a>

      {isAuthLoading ? null : !isAuthenticated ? (
        <main className="app landingPage" id="main-content">
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
          aria-label="Jammming Spotify Playlist Builder"
        >
          <h1 className="srOnly">Jammming — Spotify Playlist Builder</h1>
          <div className="searchBarContainer">
            <SearchBar
              searchTracks={searchTracks}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>

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
                setSearchTerm={setSearchTerm}
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
