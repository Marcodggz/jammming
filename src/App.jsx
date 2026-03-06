import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'

function App() {

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
            <SearchResults/>
            
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
