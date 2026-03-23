import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import Spotify from "./util/Spotify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    setIsAuthenticated(!!code);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  // Filter out tracks that are already in the playlist
  const visibleTracks = tracks.filter(
    (track) =>
      !playlistTracks.some((playlistTrack) => playlistTrack.id === track.id),
  );

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

    try {
      await Spotify.savePlaylist(playlistName, trackURIs);
      setPlaylistTracks([]);
      setPlaylistName("My Playlist");
    } catch (error) {
      console.error(error);
    }
  }

  // Search for tracks based on the search term
  async function searchTracks(searchTerm) {
    if (searchTerm.trim()) {
      setHasSearched(true);
      setIsLoading(true);
      try {
        const tracks = await Spotify.search(searchTerm);

        setTracks(tracks);
        setIsAuthenticated(true);
        document
          .querySelector(".results")
          .scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the list
      } catch (error) {
        console.error(error);
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
      {!isAuthenticated ? (
        <div className="app">
          <div className="welcomeHome">
            <h1>Ready to build your playlist?</h1>
            <h4>
              Connect your Spotify account to start searching and building
              playlists.
            </h4>
            <button className="connectButton" onClick={Spotify.getAccessToken}>
              <span className="connectButtonInner">
                <FontAwesomeIcon icon={faSpotify} className="spotifyIcon" />
                <span className="connectText">Connect to Spotify</span>
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="app">
          <div className="searchBarContainer">
            <SearchBar
              searchTracks={searchTracks}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <div className="mainContainer">
            <div className="results">
              <div>
                <SearchResults
                  tracks={visibleTracks}
                  addTrack={addTrack}
                  searchTracks={searchTracks}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  hasSearched={hasSearched}
                  isLoading={isLoading}
                />
              </div>
            </div>
            <div className="playlist">
              <div>
                <Playlist
                  playlistName={playlistName}
                  playlistTracks={playlistTracks}
                  removeTrack={removeTrack}
                  playlistNameChange={playlistNameChange}
                  savePlaylist={savePlaylist}
                  formattedDuration={formattedDuration}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
