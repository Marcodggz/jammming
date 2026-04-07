import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ searchTracks, searchTerm, setSearchTerm }) {
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      searchTracks(searchTerm);
    }
  };

  return (
    <div className="searchBarContainer">
      <div className="searchBar">
        <div className="searchInputWrapper">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="searchIcon"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <button type="button" className="searchButton" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;