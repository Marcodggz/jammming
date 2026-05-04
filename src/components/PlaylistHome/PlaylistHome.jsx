import "./PlaylistHome.css";

function PlaylistHome({ onNewPlaylist, onMyPlaylists }) {
  return (
    <div className="playlistHome" role="region" aria-label="Playlist options">
      <div className="playlistHomeHeader">
        <h2 className="playlistHomeTitle">Start building your playlist</h2>
        <p className="playlistHomeSubtitle">
          Create or select a playlist to start adding tracks.
        </p>
      </div>
      <div className="playlistHomeActions">
        <button
          type="button"
          className="homeOptionCard"
          onClick={onNewPlaylist}
        >
          <span className="cardContent">
            <span className="cardTitle">New playlist</span>
            <span className="cardDesc">Create a new playlist from scratch</span>
          </span>
        </button>
        <button
          type="button"
          className="homeOptionCard"
          onClick={onMyPlaylists}
        >
          <span className="cardContent">
            <span className="cardTitle">My playlists</span>
            <span className="cardDesc">
              Choose from your existing playlists
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default PlaylistHome;
