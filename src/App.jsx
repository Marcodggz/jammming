import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'

function App() {
  const tracks = [
  { id: 1, name: "Poker Face", artist: "Lady Gaga", album: "The Fame" },
  { id: 2, name: "Bad Romance", artist: "Lady Gaga", album: "The Fame Monster" },
  { id: 3, name: "Just Dance", artist: "Lady Gaga", album: "The Fame" }
  ]

  const playlistName = "My Playlist";
  const playlistTracks = [
    { id: 1, name: "Soy Peor", artist: "Bad Bunny", album: "X 100PRE" },
    { id: 2, name: "DÁKITI", artist: "Bad Bunny", album: "El Último Tour Del Mundo" },
    { id: 3, name: "La Canción", artist: "Bad Bunny", album: "YHLQMDLG" },
    { id: 4, name: "Monaco", artist: "Bad Bunny", album: "El Último Tour Del Mundo" },
    { id: 5, name: "Ella y Yo", artist: "Bad Bunny", album: "X 100PRE" }
  ];

  return (
    <>
      <div className="app"> 
        <div className='searchContainer'>
          <div className="searchBar">
            <SearchBar />
            <button>Search</button>
          </div>
        </div>
        <div className="results">
          <div className="searchResults">
            <SearchResults tracks={tracks} /> 
          </div> 
        </div> 
        <div className="playlist">
          <div>
            <Playlist playlistName={playlistName} playlistTracks={playlistTracks} />
          </div>
        </div>
        <div>
          <button>Save To Spotify</button>
        </div>
      </div>
    </>
  )
}

export default App
