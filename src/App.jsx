import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';

function App() {

  const [tracks, setTracks] = useState([
  { id: 9, name: "Poker Face", artist: "Lady Gaga", album: "The Fame", uri: "spotify:track:9" },
  { id: 10, name: "Bad Romance", artist: "Lady Gaga", album: "The Fame Monster", uri: "spotify:track:10" },
  { id: 11, name: "Just Dance", artist: "Lady Gaga", album: "The Fame", uri: "spotify:track:11" }

  ]);
  const [playlistName, setPlaylistName] = useState("My Playlist"); 
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 1, name: "Soy Peor", artist: "Bad Bunny", album: "X 100PRE", uri: "spotify:track:1" },
    { id: 2, name: "DÁKITI", artist: "Bad Bunny", album: "El Último Tour Del Mundo", uri: "spotify:track:2" },
    { id: 3, name: "La Canción", artist: "Bad Bunny", album: "YHLQMDLG", uri: "spotify:track:3" },
    { id: 4, name: "Monaco", artist: "Bad Bunny", album: "El Último Tour Del Mundo", uri: "spotify:track:4" },
    { id: 5, name: "Ella y Yo", artist: "Bad Bunny", album: "X 100PRE", uri: "spotify:track:5" },
    { id: 6, name: "La Romana", artist: "Bad Bunny", album: "YHLQMDLG", uri: "spotify:track:6" },
    { id: 7, name: "Vete", artist: "Bad Bunny", album: "YHLQMDLG", uri: "spotify:track:7" },
    { id: 8, name: "Baticano", artist: "Bad Bunny", album: "El Último Tour Del Mundo", uri: "spotify:track:8" }
  ]);

 function addTrack(track) { 
   if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
     setPlaylistTracks(prevTracks => [...prevTracks, track]);
     // Add the playlist tracks
   }
 }

 function removeTrack(track) {
   setPlaylistTracks(prevTracks => prevTracks.filter(savedTrack => savedTrack.id !== track.id));
   // Remove the playlist tracks
 }

 function playlistNameChange(event) {
   setPlaylistName(event.target.value);
   // Update the playlist name
 }

 function savePlaylist() {
  const trackURIs = playlistTracks.map(track => track.uri); // Call Spotify API to save the playlist with the selected name and track URI
  setPlaylistTracks([]);    // Clear the playlist after saving
  setPlaylistName("My Playlist"); // Reset the playlist name to default
 }

  return (
    <>
      <div className="app"> 
          <div className="searchBarContainer">
            <SearchBar />
          </div>
        <div className='mainContainer'>
          <div className="results">
            <div>
              <SearchResults tracks={tracks} addTrack={addTrack} />
            </div>
          </div> 
          <div className="playlist">
            <div>
              <Playlist playlistName={playlistName} playlistTracks={playlistTracks} removeTrack={removeTrack} playlistNameChange={playlistNameChange} savePlaylist={savePlaylist} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
