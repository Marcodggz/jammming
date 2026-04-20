import TrackList from "../TrackList/TrackList";
import "./SearchResults.css";

function SearchResults({
  tracks,
  addTrack,
  showAddButton = true,
  showRemoveButton = false,
  searchTracks,
  searchTerm,
  setSearchTerm,
  hasSearched,
  isLoading,
  searchErrorMessage,
  allTracksAdded = false,
}) {
  return (
    <div
      className="searchResults"
      role="region"
      aria-labelledby="search-results-heading"
    >
      <header className="searchHeader">
        <h2 id="search-results-heading" className="searchTitle">
          Results
        </h2>
      </header>

      <div className="searchContent">
        {searchErrorMessage && (
          <p className="errorMessage" role="alert" aria-live="assertive">
            {searchErrorMessage}
          </p>
        )}

        {!hasSearched ? (
          <div className="welcome">
            <h3>Search for tracks</h3>
            <p>
              Find songs, artists, or albums to build your perfect playlist.
            </p>
          </div>
        ) : isLoading ? (
          <div className="loadingState" role="status" aria-live="polite">
            <span className="loadingSpinner" aria-hidden="true"></span>
            <p className="loadingMessage">Searching...</p>
          </div>
        ) : tracks.length > 0 ? (
          <TrackList
            tracks={tracks}
            addTrack={addTrack}
            showAddButton={showAddButton}
            showRemoveButton={showRemoveButton}
            searchTracks={searchTracks}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        ) : allTracksAdded ? (
          <div className="allAddedState" aria-live="polite">
            <h4>All added</h4>
            <p>These tracks are already in your playlist.</p>
          </div>
        ) : (
          <div className="noResults" aria-live="polite">
            <h4>No results</h4>
            <p>Try different keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
