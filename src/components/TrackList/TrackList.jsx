import Track from "../Track/Track";

function TrackList({
  tracks,
  addTrack,
  showAddButton,
  removeTrack,
  showRemoveButton,
  searchTracks,
  hasActivePlaylist = true,
}) {
  const listLabel = showAddButton
    ? `Search results: ${tracks.length} track${tracks.length === 1 ? "" : "s"} found`
    : `Your playlist: ${tracks.length} track${tracks.length === 1 ? "" : "s"}`;

  return (
    <ul className="trackList" aria-label={listLabel}>
      {tracks.map((track) => (
        <Track
          key={track.id}
          id={track.id}
          name={track.name}
          artists={track.artists}
          album={track.album}
          albumImage={track.albumImage}
          uri={track.uri}
          addTrack={addTrack}
          showAddButton={showAddButton}
          removeTrack={removeTrack}
          showRemoveButton={showRemoveButton}
          searchTracks={searchTracks}
          durationMs={track.durationMs}
          hasActivePlaylist={hasActivePlaylist}
        />
      ))}
    </ul>
  );
}

export default TrackList;
