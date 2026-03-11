import "./SearchBar.css"; 
import { useState } from "react";


function SearchBar({ searchTracks }) {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="searchBar">
      <nav className='searchNav'></nav>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchTracks(searchTerm);
          }
        }}
      />
      <button onClick={() => searchTracks(searchTerm)}>Search</button>
    </div>
  );
}
export default SearchBar;