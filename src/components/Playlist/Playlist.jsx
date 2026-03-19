import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

function Playlist({
  playlistName,
  playlistTracks,
  showAddButton = false,
  removeTrack,
  showRemoveButton = true,
  playlistNameChange,
  savePlaylist,
  formattedDuration,
}) {
  return (
    <div id="playlist" className="playlistContainer">
      <div className="playlistInfo">
        <input value={playlistName} onChange={playlistNameChange} />
        {playlistTracks.length > 0 && <span>{formattedDuration}</span>}
      </div>
      <TrackList
        tracks={playlistTracks}
        showAddButton={showAddButton}
        removeTrack={removeTrack}
        showRemoveButton={showRemoveButton}
      />
      <div className="saveButton" onClick={savePlaylist}>Save To Spotify</div>
    </div>
  );
}

export default Playlist;
