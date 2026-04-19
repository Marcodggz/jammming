import { useRef } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ searchTracks, searchTerm, setSearchTerm }) {
  const inputRef = useRef(null);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      searchTracks(searchTerm);
      // Blur the input after search to remove focus state
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <form className="searchBarContainer" onSubmit={handleSubmit} role="search">
      <div className="searchBar">
        <div className="searchInputWrapper">
          <label htmlFor="track-search-input" className="srOnly">
            Search songs
          </label>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="searchIcon"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            id="track-search-input"
            type="search"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            autoComplete="off"
            aria-describedby="search-hint"
          />
          <span id="search-hint" className="srOnly">
            Type a song, artist, or album name and press Enter to search
          </span>
        </div>

        <button type="submit" className="searchButton">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
