import "./PlaylistHome.css";

function PlaylistHome({ onNewPlaylist, onMyPlaylists }) {
  return (
    <div className="playlistHome" role="region" aria-label="Playlist options">
      <button
        type="button"
        className="homeOptionButton"
        onClick={onNewPlaylist}
      >
        New playlist
      </button>
      <button
        type="button"
        className="homeOptionButton"
        onClick={onMyPlaylists}
      >
        My playlists
      </button>
    </div>
  );
}

export default PlaylistHome;
