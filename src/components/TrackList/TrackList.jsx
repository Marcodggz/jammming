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
    <ul
      className="trackList"
      role="list"
      aria-label={
        showAddButton ? "Search results track list" : "Playlist track list"
      }
    >
      {tracks.map((track) => (
        <Track
          key={track.id}
          id={track.id}
          name={track.name}
          artist={track.artist}
          artists={track.artists}
          album={track.album}
          albumImage={track.albumImage}
          uri={track.uri}
          addTrack={addTrack}
          showAddButton={showAddButton}
          removeTrack={removeTrack}
          showRemoveButton={showRemoveButton}
          searchTracks={searchTracks}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          durationMs={track.durationMs}
        />
      ))}
    </ul>
  );
}

export default TrackList;
