import React from "react";
import "./Track.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

function Track({
  name,
  artists,
  album,
  albumImage,
  addTrack,
  id,
  showAddButton = true,
  removeTrack,
  showRemoveButton = false,
  uri,
  searchTracks,
  setSearchTerm,
  durationMs,
}) {
  // Handle add/remove with robust blur strategy to prevent focus transfer
  const handleAddTrack = (e) => {
    // Blur BEFORE state change to prevent focus transfer during re-render
    e.currentTarget.blur();
    addTrack({ name, artists, album, albumImage, id, uri, durationMs });

    // Additional safety: blur after React processes the state change
    setTimeout(() => {
      if (document.activeElement?.closest?.(".trackActions")) {
        document.activeElement.blur();
      }
    }, 0);
  };

  const handleRemoveTrack = (e) => {
    // Blur BEFORE state change to prevent focus transfer during re-render
    e.currentTarget.blur();
    removeTrack({ id });

    // Additional safety: blur after React processes the state change
    setTimeout(() => {
      if (document.activeElement?.closest?.(".trackActions")) {
        document.activeElement.blur();
      }
    }, 0);
  };
  const handleSearchTracks = (query) => {
    searchTracks(query);
    // Extract clean name from query and normalize to lowercase for display
    const cleanName = query.match(/"([^"]+)"/)?.[1] || query;
    if (setSearchTerm) setSearchTerm(cleanName.toLowerCase());
  };

  const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const artistNames = artists.join(", ");
  const formattedDuration = durationMs ? formatDuration(durationMs) : null;

  return (
    <li className="tracksContainer">
      <article className="trackInfo" aria-label={`${name} by ${artistNames}`}>
        <div className="trackArt" aria-hidden="true">
          {albumImage ? (
            <img
              src={albumImage}
              alt=""
              className="trackArtImage"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <FontAwesomeIcon icon={faMusic} className="trackArtIcon" />
          )}
        </div>

        <div className="trackDetails">
          {/* tabIndex="0" makes the song name reachable via Tab.
              aria-label provides the full description to screen readers. */}
          <h3
            id={`track-name-${id}`}
            className="track-title"
            tabIndex="0"
            aria-label={`${name} by ${artistNames}, from the album ${album}${formattedDuration ? `, duration ${formattedDuration}` : ""}`}
          >
            {name}
          </h3>

          {/* Visual metadata with accessible artist/album search buttons */}
          <p>
            <span className="artist-info">
              {artists.map((artistName, index) => (
                <React.Fragment key={artistName}>
                  {showAddButton ? (
                    <button
                      type="button"
                      className="clickable"
                      onClick={() =>
                        handleSearchTracks(`artist:"${artistName}"`)
                      }
                      aria-label={`Search tracks by ${artistName}`}
                    >
                      {artistName}
                    </button>
                  ) : (
                    <span>{artistName}</span>
                  )}
                  {index < artists.length - 1 ? ", " : ""}
                </React.Fragment>
              ))}
            </span>
            {" • "}
            <span className="album-info">
              {showAddButton ? (
                <button
                  type="button"
                  className="clickable"
                  onClick={() => handleSearchTracks(`album:"${album}"`)}
                  aria-label={`Search tracks from album ${album}`}
                >
                  {album}
                </button>
              ) : (
                <span>{album}</span>
              )}
            </span>
          </p>
        </div>

        {/* tabIndex="0" makes the duration reachable via Tab */}
        {formattedDuration && (
          <span
            className="trackDuration"
            tabIndex="0"
            aria-label={`Duration: ${formattedDuration}`}
          >
            {formattedDuration}
          </span>
        )}

        <div className="trackActions">
          {showAddButton && (
            <button
              type="button"
              onClick={handleAddTrack}
              aria-label={`Add ${name} by ${artistNames} to playlist`}
            >
              <FontAwesomeIcon icon={faPlus} aria-hidden="true" />
            </button>
          )}

          {showRemoveButton && (
            <button
              type="button"
              className="removeButton"
              onClick={handleRemoveTrack}
              aria-label={`Remove ${name} by ${artistNames} from playlist`}
            >
              <FontAwesomeIcon icon={faMinus} aria-hidden="true" />
            </button>
          )}
        </div>
      </article>
    </li>
  );
}

export default Track;
