import TrackList from "../TrackList/TrackList";

function SearchResults({ tracks }) {
  return (
    <div className="results">
      <h2>Search Results</h2>
      <TrackList tracks={tracks} />
    </div>
  );
}

export default SearchResults;
