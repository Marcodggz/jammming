import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

function Playlist({playlistName, playlistTracks, showAddButton=false, removeTrack, showRemoveButton=true}) {
  return (
    <div id="playlist" className="playlistContainer">
      <h2>{playlistName}</h2>
      <TrackList tracks={playlistTracks} showAddButton={showAddButton} removeTrack={removeTrack} showRemoveButton={showRemoveButton} />
    </div>
  );
}

export default Playlist;
