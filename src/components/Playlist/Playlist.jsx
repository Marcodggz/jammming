import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
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
  const playlistInputRef = useRef(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  return (
    <div id="playlist" className="playlistContainer">
      <header className="playlistHeader">
        <div className="playlistTitleWrapper">
          {isEditingTitle ? (
            <input
              ref={playlistInputRef}
              className="playlistTitle"
              value={playlistName}
              onChange={(event) => {
                const value = event.target.value.slice(0, 25);
                playlistNameChange({ target: { value } });
              }}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.target.blur();
                }
              }}
              aria-label="Playlist title"
              autoFocus
            />
          ) : (
            <span id="playlist-heading" className="playlistTitleText">
              {playlistName}
            </span>
          )}

          <button
            type="button"
            className="editButton"
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
            aria-label="Edit playlist title"
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="editIcon"
              aria-hidden="true"
            />
          </button>
        </div>

        {playlistTracks.length > 0 && (
          <span
            className="playlistDuration"
            aria-label={`Playlist duration ${formattedDuration}`}
          >
            {formattedDuration}
          </span>
        )}
      </header>

      <div
        className="playlistContent"
        aria-label="Playlist tracks"
      >
        <TrackList
          tracks={playlistTracks}
          showAddButton={showAddButton}
          removeTrack={removeTrack}
          showRemoveButton={showRemoveButton}
        />
      </div>

      <div className="saveContainer">
        {playlistTracks.length > 0 && (
          <button
            type="button"
            className="saveButton"
            onClick={savePlaylist}
            aria-label={`Save playlist ${playlistName} to Spotify`}
          >
            <span>Save To Spotify</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Playlist;