import { useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowLeft,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function SearchBar({
  searchTracks,
  searchTerm,
  setSearchTerm,
  hasPrevSearch,
  onGoBack,
  getSuggestions,
}) {
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const [searchFeedback, setSearchFeedback] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

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

  // Debounce suggestion fetches while the user types.
  // showDropdown already gates on searchTerm.trim().length >= 2, so stale
  // suggestions are never rendered when the term is too short.
  useEffect(() => {
    const timer = setTimeout(async () => {
      const trimmed = searchTerm.trim();
      if (trimmed.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const results = await getSuggestions(trimmed);
        setSuggestions(results);
      } catch {
        setSuggestions([]);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [searchTerm, getSuggestions]);

  // Close dropdown when the user clicks outside the input wrapper.
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const showDropdown =
    isFocused && suggestions.length > 0 && searchTerm.trim().length >= 2;

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setSearchFeedback(`Searching for "${searchTerm.trim()}"...`);
      searchTracks(searchTerm);
      setSuggestions([]);
      setIsFocused(false);
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
    if (event.key === "Escape") {
      setSuggestions([]);
      setIsFocused(false);
    }
    // Clear any existing feedback when user starts typing
    if (searchFeedback) {
      setSearchFeedback("");
    }
  };

  // Clicking a suggestion sets the input value, triggers the appropriate search
  // (artist: queries, track: name queries), and closes the dropdown.
  // onMouseDown with preventDefault keeps the input focused during the click
  // so onBlur is not fired before we handle the action.
  const handleSuggestionClick = (suggestion) => {
    // Pass suggestion.name as displayTerm so searchTracks() shows the clean
    // human-readable name in the input, never the internal query syntax
    // (e.g. artist:"Taylor Swift").
    searchTracks(suggestion.query, false, suggestion.name);
    setSuggestions([]);
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
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
          {hasPrevSearch ? (
            <button
              type="button"
              className="searchIconButton backArrow"
              onClick={onGoBack}
              aria-label="Go back to previous search results"
            >
              <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
            </button>
          ) : (
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="searchIcon"
              aria-hidden="true"
            />
          )}
          <input
            ref={inputRef}
            id="track-search-input"
            type="search"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyDown={handleKeyDown}
            onMouseDown={() => setWrapperKeyboardFocused(false)}
            onFocus={() => {
              setIsFocused(true);
              setWrapperKeyboardFocused(
                document.documentElement.hasAttribute("data-keyboard"),
              );
            }}
            onBlur={() => {
              setIsFocused(false);
              setWrapperKeyboardFocused(false);
            }}
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

          {showDropdown && (
            <div className="suggestionDropdown" aria-label="Search suggestions">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  type="button"
                  className="suggestionItem"
                  aria-label={
                    suggestion.type === "artist"
                      ? `Artist: ${suggestion.name}`
                      : `${suggestion.name} — ${suggestion.subtitle}`
                  }
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSuggestionClick(suggestion);
                  }}
                >
                  {suggestion.type === "artist" ? (
                    suggestion.image ? (
                      <img
                        src={suggestion.image}
                        alt=""
                        aria-hidden="true"
                        className="suggestionImage suggestionArtistImage"
                      />
                    ) : (
                      <div
                        className="suggestionImage suggestionArtistPlaceholder"
                        aria-hidden="true"
                      >
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                    )
                  ) : suggestion.image ? (
                    <img
                      src={suggestion.image}
                      alt=""
                      aria-hidden="true"
                      className="suggestionImage"
                    />
                  ) : (
                    <div className="suggestionImage" aria-hidden="true" />
                  )}
                  <div className="suggestionText">
                    <span className="suggestionName">{suggestion.name}</span>
                    <span className="suggestionSubtitle">
                      {suggestion.subtitle}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
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
