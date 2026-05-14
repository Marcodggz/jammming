import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsis,
  faTrash,
  faMusic,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

function PlaylistComponent({
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
  isLoadingExistingPlaylist = false,
  hasChanges = false,
  isSavingPlaylist = false,
  onStartNew,
  onShowBrowser,
  onDeleteCurrentPlaylist,
  onBack,
  // Unsaved-changes banner
  unsavedBannerVisible = false,
  onBannerDiscard,
  onBannerSave,
  isSaving = false,
  canSave = true,
}) {
  const playlistInputRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Derived state: is the playlist name empty or whitespace-only?
  const isPlaylistNameInvalid =
    playlistName.trim().length === 0 && !isLoadingExistingPlaylist;
  const displayName = isPlaylistNameInvalid
    ? "Untitled playlist"
    : playlistName;

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

  // Close the navigation menu when the user clicks or taps outside it,
  // or when Escape is pressed. Return focus to the menu button.
  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    function handleEscapeKey(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        // Return focus to the menu button for keyboard navigation continuity
        if (menuButtonRef.current) {
          menuButtonRef.current.focus();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [menuOpen]);

  // Clean up UI state (menu, title editing) on unmount to prevent stale UI.
  useEffect(() => {
    return () => {
      setMenuOpen(false);
      setIsEditingTitle(false);
    };
  }, []);

  // Expose edit trigger for the validation modal
  // (This is now done via forwardRef imperative handle above)

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

  // If loading existing playlist, show only the centered loading state
  if (isLoadingExistingPlaylist) {
    return (
      <section
        id="playlist"
        className="playlistContainer"
        aria-labelledby="playlist-heading"
      >
        <div className="playlistContent">
          <div
            className="loadingState"
            role="status"
            aria-label="Loading playlist"
          >
            <span className="loadingSpinner" aria-hidden="true"></span>
            <p className="loadingMessage">Loading playlist...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="playlist"
      className="playlistContainer"
      aria-labelledby="playlist-heading"
    >
      <header className="playlistHeader">
        {/* Three-column header layout:
            [nav] [content] [actions]
            - nav: back button
            - content: title + metadata (aligned together)
            - actions: edit + menu buttons
        */}

        {/* Navigation column — back button */}
        <div className="playlistHeaderNav">
          {isEditingExisting && onBack && (
            <button
              type="button"
              className="playlistBackButton"
              onClick={onBack}
              aria-label="Back to playlists"
              title="Back to My playlists"
            >
              <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Content column — title + metadata */}
        <div className="playlistHeaderContent">
          {/* Title section */}
          <div className="playlistHeaderTitleRow">
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
                    Press Enter to save, Escape to cancel. Maximum 25
                    characters.
                  </div>
                </div>
              ) : (
                <h2
                  id="playlist-heading"
                  className={`playlistTitleText ${isPlaylistNameInvalid ? "playlistTitlePlaceholder" : ""}`}
                >
                  {displayName}
                </h2>
              )}

              {!isLoadingExistingPlaylist && (
                <button
                  type="button"
                  className="editButton"
                  onClick={handleEditTitle}
                  aria-label={`Edit playlist title "${displayName}"`}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="editIcon"
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
          </div>

          {/* Metadata section — only when tracks exist */}
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
        </div>

        {/* Actions column — edit + menu buttons */}
        {!isLoadingExistingPlaylist && (
          <div className="playlistHeaderActions">
            <div className="menuContainer" ref={menuRef}>
              <button
                ref={menuButtonRef}
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
                  {onShowBrowser && !isEditingExisting && (
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
            <div className="emptyStateIcon" aria-hidden="true">
              <FontAwesomeIcon icon={faMusic} />
            </div>
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
                disabled={isSavingPlaylist || isPlaylistNameInvalid}
                aria-busy={isSavingPlaylist}
                aria-label={`${saveButtonText} — "${displayName}" with ${playlistTracks.length} track${playlistTracks.length === 1 ? "" : "s"}`}
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
              disabled={isSavingPlaylist || isPlaylistNameInvalid}
              aria-busy={isSavingPlaylist}
              aria-label={`${saveButtonText} — "${displayName}" with ${playlistTracks.length} track${playlistTracks.length === 1 ? "" : "s"}`}
            >
              <span>{saveButtonText}</span>
            </button>
          )}
        </div>
      )}

      {unsavedBannerVisible && (
        <div className="unsavedBannerOverlay">
          <div
            className="unsavedBannerDialog"
            role="region"
            aria-labelledby="unsaved-banner-msg"
          >
            <p className="unsavedBannerText" id="unsaved-banner-msg">
              You have unsaved changes.
            </p>
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

export default PlaylistComponent;
