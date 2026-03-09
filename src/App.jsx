import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';

function App() {

  const [tracks, setTracks] = useState([
  { id: 9, name: "Poker Face", artist: "Lady Gaga", album: "The Fame" },
  { id: 10, name: "Bad Romance", artist: "Lady Gaga", album: "The Fame Monster" },
  { id: 11, name: "Just Dance", artist: "Lady Gaga", album: "The Fame" }

  ]);
  const [playlistName, setPlaylistName] = useState("My Playlist"); 
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 1, name: "Soy Peor", artist: "Bad Bunny", album: "X 100PRE" },
    { id: 2, name: "DÁKITI", artist: "Bad Bunny", album: "El Último Tour Del Mundo" },
    { id: 3, name: "La Canción", artist: "Bad Bunny", album: "YHLQMDLG" },
    { id: 4, name: "Monaco", artist: "Bad Bunny", album: "El Último Tour Del Mundo" },
    { id: 5, name: "Ella y Yo", artist: "Bad Bunny", album: "X 100PRE" },
    { id: 6, name: "La Romana", artist: "Bad Bunny", album: "YHLQMDLG" },
    { id: 7, name: "Vete", artist: "Bad Bunny", album: "YHLQMDLG" },
    { id: 8, name: "Baticano", artist: "Bad Bunny", album: "El Último Tour Del Mundo" }
  ]);

 function addTrack(track) { 
   if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
     setPlaylistTracks(prevTracks => [...prevTracks, track]);
   }
 }

 function removeTrack(track) {
   setPlaylistTracks(prevTracks => prevTracks.filter(savedTrack => savedTrack.id !== track.id));
 }

 function playlistNameChange(event) {
   setPlaylistName(event.target.value);
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
              <Playlist playlistName={playlistName} playlistTracks={playlistTracks} removeTrack={removeTrack} playlistNameChange={playlistNameChange} />
            </div>
            <div className='saveContainer'>
              <button>Save To Spotify</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
