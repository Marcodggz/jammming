import TrackList from "../TrackList/TrackList";

function Playlist({playlistName, playlistTracks}) {
  return (
    <div id="playlist" className="playlistContainer">
      <h2>{playlistName}</h2>
      <TrackList tracks={playlistTracks} />
    </div>
  );
}

export default Playlist;
