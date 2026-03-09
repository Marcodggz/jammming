import Track from "../Track/Track";

function TrackList({ tracks, addTrack, showAddButton, removeTrack, showRemoveButton }) {
  return (
    <div className="trackList">
      {tracks.map((track) => (
        <Track
          id={track.id}
          name={track.name}
          artist={track.artist}
          album={track.album}
          addTrack={addTrack}
          showAddButton={showAddButton}
          removeTrack={removeTrack}
          showRemoveButton={showRemoveButton}
        />
      ))}
    </div>
  );
}

export default TrackList;

