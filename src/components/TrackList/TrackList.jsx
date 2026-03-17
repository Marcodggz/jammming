import Track from "../Track/Track";

function TrackList({
  tracks,
  addTrack,
  showAddButton,
  removeTrack,
  showRemoveButton,
  searchTracks,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="trackList">
      {tracks.map((track) => (
        <Track
          key={track.id}
          id={track.id}
          name={track.name}
          artist={track.artist}
          artists={track.artists}
          album={track.album}
          uri={track.uri}
          addTrack={addTrack}
          showAddButton={showAddButton}
          removeTrack={removeTrack}
          showRemoveButton={showRemoveButton}
          searchTracks={searchTracks}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      ))}
    </div>
  );
}

export default TrackList;
