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

  const handleEditTitle = () => {
    setIsEditingTitle(true);

    // For mobile/tablet: focus immediately after state update
    // Use flushSync to ensure React renders before we focus
    // requestAnimationFrame ensures the DOM is painted before focusing
    requestAnimationFrame(() => {
      if (playlistInputRef.current) {
        // Use a small delay to ensure iOS renders the input
        requestAnimationFrame(() => {
          if (playlistInputRef.current) {
            playlistInputRef.current.focus();
            // Select all text
            const length = playlistInputRef.current.value.length;
            playlistInputRef.current.setSelectionRange(0, length);
            playlistInputRef.current.select();
          }
        });
      }
    });
  };

  const handleTitleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setIsEditingTitle(false);
    }
  };
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
            <div>
              <label htmlFor="playlist-title-input" className="srOnly">
                Edit playlist title
              </label>
              <input
                id="playlist-title-input"
                ref={playlistInputRef}
                className="playlistTitle"
                value={playlistName}
                onChange={(event) => {
                  const value = event.target.value.slice(0, 25);
                  playlistNameChange({ target: { value } });
                }}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={handleTitleKeyDown}
                onFocus={(e) => {
                  // Ensure text is selected when focused
                  const length = e.target.value.length;
                  e.target.setSelectionRange(0, length);
                }}
                aria-label="Playlist title"
                aria-describedby="playlist-title-help"
                maxLength="25"
                autoComplete="off"
                type="text"
                inputMode="text"
                autoFocus
              />
              <div id="playlist-title-help" className="srOnly">
                Press Enter to save, Escape to cancel. Maximum 25 characters.
              </div>
            </div>
          ) : (
            <h2 id="playlist-heading" className="playlistTitleText">
              {playlistName}
            </h2>
          )}

          <button
            type="button"
            className="editButton"
            onClick={handleEditTitle}
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
