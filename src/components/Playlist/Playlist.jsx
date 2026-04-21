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

    // Use setTimeout to ensure the input is rendered before focusing
    setTimeout(() => {
      if (playlistInputRef.current) {
        playlistInputRef.current.focus();
        // Select all text - use setSelectionRange for better mobile compatibility
        const length = playlistInputRef.current.value.length;
        playlistInputRef.current.setSelectionRange(0, length);
        // Fallback to select() for additional compatibility
        playlistInputRef.current.select();
      }
    }, 50);
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
    <section
      id="playlist"
      className="playlistContainer"
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
            aria-label={`Edit playlist title "${playlistName}"`}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="editIcon"
              aria-hidden="true"
            />
          </button>
        </div>

        {playlistTracks.length > 0 && (
          <div
            className="playlistDuration"
            role="status"
            tabIndex="0"
            aria-label={`Total playlist duration: ${formattedDuration}`}
          >
            {formattedDuration}
          </div>
        )}
      </header>

      <div
        className={`playlistContent ${playlistTracks.length > 0 ? "hasTracks" : ""}`}
      >
        {playlistTracks.length === 0 ? (
          <div
            className="emptyPlaylist"
            role="status"
            aria-labelledby="empty-playlist-heading"
          >
            <span className="emptyStateIcon" aria-hidden="true">
              🎵
            </span>
            <h4 id="empty-playlist-heading">No tracks yet</h4>
            <p>Search for songs and add them with the + button</p>
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
            aria-label={`Save "${playlistName}" playlist with ${playlistTracks.length} track${playlistTracks.length === 1 ? "" : "s"} to Spotify`}
          >
            <span>Save To Spotify</span>
          </button>
        </div>
      )}
    </section>
  );
}

export default Playlist;
