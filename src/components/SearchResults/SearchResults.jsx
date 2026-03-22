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
  isAuthenticated,
}) {
  return (
    <div className="SearchResults">
  {isAuthenticated && hasSearched && (
    <div className="resultsHeader">
      <h2>Results</h2>
    </div>
  )}
  {!hasSearched ? (
    <div className="welcome">
      <h2>Search for tracks</h2>
      <p>
        Start building your playlist by searching for songs, artists, or
        albums.
      </p>
    </div>
  ) : isLoading ? (
    <p>Loading...</p>
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
  ) : (
    <p>
      No additional tracks available for this search. <br />
      All matching tracks are already in the playlist.
    </p>
  )}
</div>
  );
}

export default SearchResults;
