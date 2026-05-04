import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faLock,
  faTrash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./UserPlaylists.css";

/**
 * UserPlaylists — "browser" view of the right panel.
 *
 * Replaces the Playlist editor entirely when the user opens the browser.
 * The panel shows a header with a back button and the full scrollable
 * playlist list. Selecting a playlist or pressing Escape returns to the
 * editor view (controlled by the parent via onBack / onSelectPlaylist).
 *
 * Props:
 *   playlists          – [{ id, name, trackCount, imageUrl, isOwned }]
 *   isLoading          – boolean
 *   error              – string | null
 *   selectedPlaylistId – string | null  (currently loaded into the editor)
 *   onSelectPlaylist   – (id: string) => void  (parent also switches view)
 *   onDeletePlaylist   – (id: string) => void
 *   onStartNew         – () => void            (parent also switches view)
 *   onBack             – () => void            (switch back to editor)
 *   isEditingExisting  – boolean
 */
function UserPlaylists({
  playlists,
  isLoading,
  error,
  selectedPlaylistId,
  onSelectPlaylist,
  onDeletePlaylist,
  onStartNew,
  onBack,
  isEditingExisting,
}) {
  // Escape key returns to the editor view.
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onBack();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onBack]);

  return (
    <div className="playlistBrowserPanel">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="playlistBrowserHeader">
        <div className="playlistBrowserHeaderLeft">
          {/* Arrow-only back button — only this element is interactive */}
          <button
            type="button"
            className="playlistBrowserBackButton"
            onClick={onBack}
            aria-label="Back to editor"
          >
            <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
          </button>
          {/* Static title — not clickable */}
          <h2 className="playlistBrowserTitle">My playlists</h2>
        </div>

        {/* New playlist — only shown when an existing one is loaded */}
        {isEditingExisting && (
          <button
            type="button"
            className="startNewButton"
            onClick={onStartNew}
            aria-label="Discard current edits and start a new playlist"
          >
            New playlist
          </button>
        )}
      </div>

      {/* ── Scrollable playlist list ─────────────────────────────── */}
      <div
        className="playlistBrowserList"
        role="list"
        aria-label="Saved playlists"
        aria-busy={isLoading}
      >
        {isLoading && (
          <p className="userPlaylistsStatus" aria-live="polite">
            Loading playlists…
          </p>
        )}

        {!isLoading && error && (
          <p className="userPlaylistsStatus userPlaylistsError" role="alert">
            {error}
          </p>
        )}

        {!isLoading && !error && playlists.length === 0 && (
          <p className="userPlaylistsStatus">No saved playlists yet.</p>
        )}

        {!isLoading &&
          !error &&
          playlists.map((playlist) => {
            const isSelected = playlist.id === selectedPlaylistId;

            // Non-owned playlists are read-only — not interactive.
            if (!playlist.isOwned) {
              return (
                <div
                  key={playlist.id}
                  className="userPlaylistItem userPlaylistItemReadOnly"
                  role="listitem"
                  aria-label={`${playlist.name}, read-only, ${playlist.trackCount} track${playlist.trackCount === 1 ? "" : "s"}`}
                >
                  <PlaylistThumbnail imageUrl={playlist.imageUrl} />
                  <span className="userPlaylistItemName">{playlist.name}</span>
                  <span className="userPlaylistItemMeta">
                    {playlist.trackCount}{" "}
                    {playlist.trackCount === 1 ? "track" : "tracks"}
                  </span>
                  <span
                    className="userPlaylistReadOnlyBadge"
                    aria-hidden="true"
                    title="You cannot edit this playlist"
                  >
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                </div>
              );
            }

            // Owned playlists: a select button + a delete button side-by-side.
            return (
              <div
                key={playlist.id}
                className={`userPlaylistItem userPlaylistItemOwned${isSelected ? " isSelected" : ""}`}
                role="listitem"
              >
                {/* Select button — loads the playlist and returns to editor */}
                <button
                  type="button"
                  className="userPlaylistItemSelectButton"
                  onClick={() => onSelectPlaylist(playlist.id)}
                  aria-pressed={isSelected}
                  aria-label={`${playlist.name}, ${playlist.trackCount} track${playlist.trackCount === 1 ? "" : "s"}${isSelected ? ", currently editing" : ""}`}
                >
                  <PlaylistThumbnail imageUrl={playlist.imageUrl} />
                  <span className="userPlaylistItemName">{playlist.name}</span>
                  <span className="userPlaylistItemMeta">
                    {playlist.trackCount}{" "}
                    {playlist.trackCount === 1 ? "track" : "tracks"}
                  </span>
                </button>

                {/* Delete button — trash icon, revealed on row hover */}
                <button
                  type="button"
                  className="userPlaylistDeleteButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePlaylist(playlist.id);
                  }}
                  aria-label={`Delete playlist "${playlist.name}"`}
                  title="Delete playlist"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

/** Small thumbnail with a fallback music icon. */
function PlaylistThumbnail({ imageUrl }) {
  return (
    <div className="userPlaylistThumbnail" aria-hidden="true">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="userPlaylistThumbnailImg"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <FontAwesomeIcon icon={faMusic} className="userPlaylistThumbnailIcon" />
      )}
    </div>
  );
}

export default UserPlaylists;
