import { useRef, useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ searchTracks, searchTerm, setSearchTerm }) {
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const [searchFeedback, setSearchFeedback] = useState("");

  // Direct DOM manipulation so the keyboard-focus attribute is removed
  // synchronously on mousedown — no React render cycle, no brief flash.
  const setWrapperKeyboardFocused = (val) => {
    if (!wrapperRef.current) return;
    if (val) {
      wrapperRef.current.setAttribute("data-keyboard-focused", "");
    } else {
      wrapperRef.current.removeAttribute("data-keyboard-focused");
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setSearchFeedback(`Searching for "${searchTerm.trim()}"...`);
      searchTracks(searchTerm);
      // Blur the input after search to remove active state on mobile/tablet
      if (inputRef.current) {
        inputRef.current.blur();
      }
      // Clear feedback after search starts
      setTimeout(() => setSearchFeedback(""), 2000);
    } else {
      setSearchFeedback("Please enter a search term");
      setTimeout(() => setSearchFeedback(""), 3000);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
    // Clear any existing feedback when user starts typing
    if (searchFeedback) {
      setSearchFeedback("");
    }
  };

  return (
    <form
      role="search"
      className="searchBarContainer"
      onSubmit={handleSubmit}
      aria-label="Search for songs"
    >
      <div className="searchBar">
        <div className="searchInputWrapper" ref={wrapperRef}>
          <label htmlFor="track-search-input" className="srOnly">
            Search for songs, artists, or albums
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
            onKeyDown={handleKeyDown}
            onMouseDown={() => setWrapperKeyboardFocused(false)}
            onFocus={() =>
              setWrapperKeyboardFocused(
                document.documentElement.hasAttribute("data-keyboard"),
              )
            }
            onBlur={() => setWrapperKeyboardFocused(false)}
            autoComplete="off"
            aria-describedby="search-hint search-feedback"
            spellCheck="true"
          />
          <div id="search-hint" className="srOnly">
            Type a song, artist, or album name and press Enter to search.
          </div>
          <div
            id="search-feedback"
            className="srOnly"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {searchFeedback}
          </div>
        </div>

        <button
          type="submit"
          className="searchButton"
          aria-label={
            searchTerm.trim()
              ? `Search for "${searchTerm.trim()}"`
              : "Search for songs"
          }
          disabled={!searchTerm.trim()}
          onClick={() => {
            // Ensure input loses focus when search button is clicked
            if (inputRef.current) {
              inputRef.current.blur();
            }
          }}
        >
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
