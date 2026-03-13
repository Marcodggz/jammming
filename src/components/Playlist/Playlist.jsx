import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

function Playlist({playlistName, playlistTracks, showAddButton=false, removeTrack, showRemoveButton=true, playlistNameChange, savePlaylist}) {
  return (
    <div id="playlistCard" className="playlistContainer">
      <input value={playlistName} onChange={playlistNameChange} />
      <TrackList tracks={playlistTracks} showAddButton={showAddButton} removeTrack={removeTrack} showRemoveButton={showRemoveButton} />
      <div className="saveContainer">
        <button className="saveButton" onClick={savePlaylist}>Save To Spotify</button>
      </div>
    </div>
  );
}

export default Playlist;
