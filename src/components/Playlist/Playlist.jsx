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
<<<<<<< HEAD
    <div id="playlistCard" className="playlistContainer">
      <input value={playlistName} onChange={playlistNameChange} />
      <TrackList tracks={playlistTracks} showAddButton={showAddButton} removeTrack={removeTrack} showRemoveButton={showRemoveButton} />
      <div className="saveContainer">
        <button className="saveButton" onClick={savePlaylist}>Save To Spotify</button>
      </div>
=======
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
      <button onClick={savePlaylist}>Save To Spotify</button>
>>>>>>> main
    </div>
  );
}

export default Playlist;
