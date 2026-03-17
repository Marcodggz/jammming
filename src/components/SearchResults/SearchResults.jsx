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
}) {
  return (
    <div className="SearchResults">
      <div className="resultsHeader">
        <h2>Results</h2>
      </div>
      {isLoading ? (
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
      ) : hasSearched ? (
        <p>
          No additional tracks available for this search. <br></br> All matching
          tracks are already in the playlist.
        </p>
      ) : null}
    </div>
  );
}

export default SearchResults;
