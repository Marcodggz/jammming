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
    <div
      id="playlist"
      className="playlistContainer"
      role="region"
      aria-labelledby="playlist-heading"
    >
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
            <h2 id="playlist-heading" className="playlistTitleText">
              {playlistName}
            </h2>
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
        className={`playlistContent ${playlistTracks.length > 0 ? "hasTracks" : ""}`}
      >
        {playlistTracks.length === 0 ? (
          <div className="emptyPlaylist">
            <span className="emptyStateIcon" aria-hidden="true">
              🎵
            </span>
            <h4>No tracks yet</h4>
            <p>Tap + to add songs</p>
          </div>
        ) : (
          <TrackList
            tracks={playlistTracks}
            showAddButton={showAddButton}
            removeTrack={removeTrack}
            showRemoveButton={showRemoveButton}
          />
        )}
      </div>

      {playlistTracks.length > 0 && (
        <div className="saveContainer">
          <button
            type="button"
            className="saveButton"
            onClick={savePlaylist}
            aria-label={`Save playlist ${playlistName} to Spotify`}
          >
            <span>Save To Spotify</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Playlist;
