import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ searchTracks, searchTerm, setSearchTerm }) {
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      searchTracks(searchTerm);
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
            Search songs, artists, or albums
          </label>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="searchIcon"
            aria-hidden="true"
          />
          <input
            id="track-search-input"
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            autoComplete="off"
          />
        </div>

        <button type="submit" className="searchButton">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;