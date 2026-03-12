import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import Spotify from './util/Spotify';

function App() {

  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist"); 
  const [playlistTracks, setPlaylistTracks] = useState([]);

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

 // Save the playlist to Spotify
async function savePlaylist() {
  const trackURIs = playlistTracks.map((track) => track.uri);

  console.log("playlistTracks:", playlistTracks);
  console.log("trackURIs:", trackURIs);

  try {
    await Spotify.savePlaylist(playlistName, trackURIs);
    setPlaylistTracks([]);
    setPlaylistName("My Playlist");
  } catch (error) {
    console.error(error);
  }
}

async function searchTracks(searchTerm) {
  if(searchTerm.trim()) {
    const tracks = await Spotify.search(searchTerm);
    setTracks(tracks);
  }
}

  return (
    <>
      <div className="app"> 
          <div className="searchBarContainer">
            <SearchBar searchTracks={searchTracks} />
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
            <button onClick={Spotify.getAccessToken}>Get Access Token</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
