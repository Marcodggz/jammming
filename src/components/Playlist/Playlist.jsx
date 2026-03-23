import TrackList from "../TrackList/TrackList";
import "./Playlist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useRef } from "react";

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
  const playlistInputRef = useRef(null);

  return (
    <div id="playlist" className="playlistContainer">
      <div className="playlistHeader">
        <div className="playlistTitleWrapper">
          <input
            ref={playlistInputRef}
            className="playlistTitle"
            value={playlistName}
            onChange={playlistNameChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.target.blur();
              }
            }}
          />
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="editIcon"
            onClick={() => {
              if (playlistInputRef.current) {
                playlistInputRef.current.focus();
                const length = playlistInputRef.current.value.length;
                playlistInputRef.current.setSelectionRange(length, length);
              }
            }}
          />
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
        {playlistTracks.length > 0 && (
          <div className="saveButton" onClick={savePlaylist}>
            <h3>Save To Spotify</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Playlist;
