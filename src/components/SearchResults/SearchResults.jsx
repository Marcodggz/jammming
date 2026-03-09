import TrackList from "../TrackList/TrackList";
import "./SearchResults.css";

function SearchResults({ tracks }) {
  return (
    <div className="SearchResults">
      <div className="resultsHeader">
        <h2>Results</h2>
      </div>
      <TrackList tracks={tracks} />
    </div>
  );
}

export default SearchResults;
