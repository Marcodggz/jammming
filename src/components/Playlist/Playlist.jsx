import TrackList from "../TrackList/TrackList";
import "./Playlist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

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
      <div className="playlistHeader">
        <div className="playlistTitleWrapper">
          <input
            className="playlistTitle"
            value={playlistName}
            onChange={playlistNameChange}
          />
          <FontAwesomeIcon icon={faPenToSquare} className="editIcon" />
        </div>

        {playlistTracks.length > 0 && (
          <span className="playlistDuration">{formattedDuration}</span>
        )}
      </div>

      <div className="playlistContent">
        <TrackList
          tracks={playlistTracks}
          showAddButton={showAddButton}
          removeTrack={removeTrack}
          showRemoveButton={showRemoveButton}
        />
      </div>

      <div className="saveContainer">
        <div className="saveButton" onClick={savePlaylist}>
          Save To Spotify
        </div>
      </div>
    </div>
  );
}

export default Playlist;
