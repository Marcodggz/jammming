import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
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
  saveButtonText = "Save to Spotify",
  isEditingExisting = false,
  hasChanges = false,
  onStartNew,
  onShowBrowser,
  onDeleteCurrentPlaylist,
  // Unsaved-changes banner
  unsavedBannerVisible = false,
  onBannerDiscard,
  onBannerSave,
  isSaving = false,
  canSave = true,
}) {
  const playlistInputRef = useRef(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the navigation menu when the user clicks or taps outside it.
  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

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
        {/* Row 1: title + edit (left) | menu (right) */}
        <div className="playlistHeaderRow1">
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

          <div className="menuContainer" ref={menuRef}>
            <button
              type="button"
              className="menuButton"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Navigation menu"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              title="Menu"
            >
              <FontAwesomeIcon icon={faEllipsis} aria-hidden="true" />
            </button>
            {menuOpen && (
              <div className="menuDropdown" role="menu">
                {onShowBrowser && (
                  <button
                    type="button"
                    role="menuitem"
                    className="menuItem"
                    onClick={() => {
                      onShowBrowser();
                      setMenuOpen(false);
                    }}
                  >
                    My playlists
                  </button>
                )}
                {isEditingExisting && onStartNew && (
                  <button
                    type="button"
                    role="menuitem"
                    className="menuItem"
                    onClick={() => {
                      onStartNew();
                      setMenuOpen(false);
                    }}
                  >
                    New playlist
                  </button>
                )}
                {isEditingExisting && onDeleteCurrentPlaylist && (
                  <>
                    <div
                      className="menuDivider"
                      role="separator"
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      role="menuitem"
                      className="menuItem menuItemDanger"
                      onClick={() => {
                        onDeleteCurrentPlaylist();
                        setMenuOpen(false);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                      Delete playlist
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Row 2: metadata — only when tracks exist */}
        {playlistTracks.length > 0 && (
          <div className="playlistHeaderMeta">
            <span
              className="playlistDuration"
              aria-label={`${playlistTracks.length} song${playlistTracks.length !== 1 ? "s" : ""}, total duration: ${formattedDuration}`}
            >
              {playlistTracks.length} song
              {playlistTracks.length !== 1 ? "s" : ""}, {formattedDuration}
            </span>
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
          {isEditingExisting ? (
            hasChanges ? (
              <button
                type="button"
                className="saveButton"
                onClick={savePlaylist}
                aria-label={`${saveButtonText} — "${playlistName}" with ${playlistTracks.length} track${playlistTracks.length === 1 ? "" : "s"}`}
              >
                <span>{saveButtonText}</span>
              </button>
            ) : (
              <p className="noChangesText" aria-live="polite">
                No changes yet
              </p>
            )
          ) : (
            <button
              type="button"
              className="saveButton"
              onClick={savePlaylist}
              aria-label={`${saveButtonText} — "${playlistName}" with ${playlistTracks.length} track${playlistTracks.length === 1 ? "" : "s"}`}
            >
              <span>{saveButtonText}</span>
            </button>
          )}
        </div>
      )}

      {unsavedBannerVisible && (
        <div className="unsavedBannerOverlay">
          <div className="unsavedBannerDialog" role="status" aria-live="polite">
            <p className="unsavedBannerText">You have unsaved changes.</p>
            <div className="unsavedBannerActions">
              <button
                type="button"
                className="unsavedBannerDiscardButton"
                onClick={onBannerDiscard}
              >
                Discard
              </button>
              {canSave && (
                <button
                  type="button"
                  className="unsavedBannerSaveButton"
                  onClick={onBannerSave}
                  disabled={isSaving}
                  aria-busy={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Playlist;
