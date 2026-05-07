import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faTrash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import PlaylistArtwork from "../PlaylistArtwork/PlaylistArtwork";
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
            const trackLabel = `${playlist.trackCount} track${playlist.trackCount === 1 ? "" : "s"}`;

            // Non-owned playlists: visible but not interactive.
            // Spotify returns 403 when loading tracks for playlists the user
            // doesn't own or collaborate on, so opening them is not supported.
            if (!playlist.isOwned) {
              return (
                <div
                  key={playlist.id}
                  className="userPlaylistItem userPlaylistItemReadOnly"
                  role="listitem"
                  aria-label={`${playlist.name}, ${trackLabel} — Spotify only allows loading playlists you own or collaborate on`}
                >
                  <PlaylistArtwork
                    imageUrl={playlist.imageUrl}
                    artworkImages={playlist.artworkImages}
                    name={playlist.name}
                    className="userPlaylistThumbnail"
                  />
                  <span className="userPlaylistItemName">{playlist.name}</span>

                  {/* Right-side metadata — 3-column grid: count | lock | action slot */}
                  {/* The empty third cell reserves the same space as the delete     */}
                  {/* button on owned rows so both row types share identical layout. */}
                  <div className="userPlaylistItemRight" aria-hidden="true">
                    <span className="userPlaylistItemMeta">{trackLabel}</span>
                    <span
                      className="userPlaylistReadOnlyBadge"
                      title="Spotify only allows loading playlists you own or collaborate on"
                    >
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    {/* empty action-slot cell — keeps grid identical to owned rows */}
                    <span />
                  </div>
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
                  aria-label={`${playlist.name}, ${trackLabel}${isSelected ? ", currently editing" : ""}`}
                >
                  <PlaylistArtwork
                    imageUrl={playlist.imageUrl}
                    artworkImages={playlist.artworkImages}
                    name={playlist.name}
                    className="userPlaylistThumbnail"
                  />
                  <span className="userPlaylistItemName">{playlist.name}</span>
                </button>

                {/* Right-side metadata grid — delete button is the third cell */}
                <div className="userPlaylistItemRight">
                  <span className="userPlaylistItemMeta" aria-hidden="true">
                    {trackLabel}
                  </span>
                  <span
                    className="userPlaylistReadOnlyBadge"
                    aria-hidden="true"
                  />
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
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default UserPlaylists;
