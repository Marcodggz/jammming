import TrackList from "../TrackList/TrackList";
import "./SearchResults.css";

function SearchResults({ tracks, addTrack, showAddButton=true, showRemoveButton=false, searchTracks, searchTerm, setSearchTerm }) {
  return (
    <div className="SearchResults">
      <div className="resultsHeader">
        <h2>Results</h2>
      </div>
      <TrackList tracks={tracks} addTrack={addTrack} showAddButton={showAddButton} showRemoveButton={showRemoveButton} searchTracks={searchTracks} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
}

export default SearchResults;
