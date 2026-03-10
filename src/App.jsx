import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import Spotify from './util/Spotify';

function App() {

  const [tracks, setTracks] = useState([
  { id: 9, name: "Poker Face", artist: "Lady Gaga", album: "The Fame", uri: "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },
  { id: 10, name: "Bad Romance", artist: "Lady Gaga", album: "The Fame Monster", uri: "spotify:track:1301WleyT98MSxVHPZCA6M" },
  { id: 11, name: "Just Dance", artist: "Lady Gaga", album: "The Fame", uri: "spotify:track:7ouMYWpwJ422jRcDASZB7P" }

  ]);
  const [playlistName, setPlaylistName] = useState("My Playlist"); 
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 1, name: "Soy Peor", artist: "Bad Bunny", album: "X 100PRE", uri: "spotify:track:3AJwUDP919kvQ9QcozQPxg" },
    { id: 2, name: "DÁKITI", artist: "Bad Bunny", album: "El Último Tour Del Mundo", uri: "spotify:track:6habFhsOp2NvshLv26DqMb" },
    { id: 3, name: "La Canción", artist: "Bad Bunny", album: "YHLQMDLG", uri: "spotify:track:7qiZfU4dY1lWllzX7mPBI3" },
    { id: 4, name: "Monaco", artist: "Bad Bunny", album: "El Último Tour Del Mundo", uri: "spotify:track:0VjIjW4GlUZAMYd2vXMi3b" },
    { id: 5, name: "Ella y Yo", artist: "Bad Bunny", album: "X 100PRE", uri: "spotify:track:1mea3bSkSGXuIRvnydlB5b" },
    { id: 6, name: "La Romana", artist: "Bad Bunny", album: "YHLQMDLG", uri: "spotify:track:3ZCTVFBt2Brf31RLEnCkWJ" },
    { id: 7, name: "Vete", artist: "Bad Bunny", album: "YHLQMDLG", uri: "spotify:track:7GhIk7Il098yCjg4BQjzvb" },
    { id: 8, name: "Baticano", artist: "Bad Bunny", album: "El Último Tour Del Mundo", uri: "spotify:track:2Fxmhks0bxGSBdJ92vM42m" }
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
            <button onClick={Spotify.getAccessToken}>Get Access Token</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
