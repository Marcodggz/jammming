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
            <Playlist />
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
