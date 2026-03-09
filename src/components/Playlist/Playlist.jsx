import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

function Playlist({playlistName, playlistTracks}) {
  return (
    <div id="playlist" className="playlistContainer">
      <h2>{playlistName}</h2>
      <TrackList tracks={playlistTracks} />
    </div>
  );
}

export default Playlist;
