import TrackList from "../TrackList/TrackList";
import "./Playlist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useRef, useState } from "react";

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
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  return (
    <div id="playlist" className="playlistContainer">
      <div className="playlistHeader">
        <div className="playlistTitleWrapper">
          {isEditingTitle ? (
            <input
              ref={playlistInputRef}
              className="playlistTitle"
              value={playlistName}
              onChange={(e) => {
                const value = e.target.value.slice(0, 25);
                playlistNameChange({ target: { value } });
              }}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                }
              }}
              autoFocus
            />
          ) : (
            <span className="playlistTitleText">{playlistName}</span>
          )}

          <FontAwesomeIcon
            icon={faPenToSquare}
            className="editIcon"
            onClick={() => {
              setIsEditingTitle(true);
              requestAnimationFrame(() => {
                if (playlistInputRef.current) {
                  playlistInputRef.current.focus();
                  const length = playlistInputRef.current.value.length;
                  playlistInputRef.current.setSelectionRange(length, length);
                }
              });
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