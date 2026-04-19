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
}) {
  return (
    <div
      className="searchResults"
      role="region"
      aria-labelledby="search-results-heading"
    >
      <h2 id="search-results-heading" className="srOnly">
        Search results
      </h2>

      {searchErrorMessage && (
        <p className="errorMessage" role="alert" aria-live="assertive">
          {searchErrorMessage}
        </p>
      )}

      {!hasSearched ? (
        <div className="welcome">
          <h3>Search for tracks</h3>
          <p>
            Start building your playlist by searching for songs, artists, or
            albums.
          </p>
        </div>
      ) : isLoading ? (
        <div className="loadingState" role="status" aria-live="polite">
          <span className="loadingSpinner" aria-hidden="true"></span>
          <p className="loadingMessage">Searching tracks...</p>
        </div>
      ) : tracks.length > 0 ? (
        <>
          <p className="srOnly" aria-live="polite" role="status">
            {tracks.length} {tracks.length === 1 ? "track" : "tracks"} found.
          </p>
          <TrackList
            tracks={tracks}
            addTrack={addTrack}
            showAddButton={showAddButton}
            showRemoveButton={showRemoveButton}
            searchTracks={searchTracks}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </>
      ) : (
        <p className="noResults" aria-live="polite">
          No additional tracks available for this search. <br />
          All matching tracks are already in the playlist.
        </p>
      )}
    </div>
  );
}

export default SearchResults;
