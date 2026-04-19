import React from "react";
import "./Track.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

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
  const handleAddTrack = () => {
    addTrack({ name, artists, album, albumImage, id, uri, durationMs });
  }; // Handle adding a track to the playlist

  const handleRemoveTrack = () => {
    removeTrack({ id });
  }; // Handle removing a track from the playlist

  const handleSearchTracks = (query) => {
    searchTracks(query);

    if (setSearchTerm) {
      setSearchTerm("");
    }
  }; // Handle searching for tracks based on artist or album

  // Format duration from ms to mm:ss
  const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <li className="tracksContainer">
      <div className="trackInfo">
        <div className="trackArt">
          {albumImage ? (
            <img src={albumImage} alt="" className="trackArtImage" />
          ) : (
            <FontAwesomeIcon icon={faMusic} className="trackArtIcon" aria-hidden="true" />
          )}
        </div>
        <div className="trackDetails">
          <div className="trackNameRow">
            <h3>{name}</h3>
            {durationMs && (
              <span className="trackDuration">
                {formatDuration(durationMs)}
              </span>
            )}
          </div>
          <p>
            {artists.map((artistName, index) => (
              <React.Fragment key={artistName}>
                {showAddButton ? (
                  <button
                    type="button"
                    onClick={() => handleSearchTracks(`artist:"${artistName}"`)}
                    className="clickable"
                    aria-label={`Search tracks by ${artistName}`}
                  >
                    {artistName}
                  </button>
                ) : (
                  <span>{artistName}</span>
                )}
                {index < artists.length - 1 ? ", " : ""}
              </React.Fragment>
            ))}{" "}
            •{" "}
            {showAddButton ? (
              <button
                type="button"
                onClick={() => handleSearchTracks(`album:"${album}"`)}
                className="clickable"
                aria-label={`Search tracks from the album ${album}`}
              >
                {album}
              </button>
            ) : (
              <span>{album}</span>
            )}
          </p>
        </div>

        <div className="trackActions">
          {showAddButton && (
            <button
              type="button"
              onClick={handleAddTrack}
              aria-label={`Add ${name} to playlist`}
            >
              <span aria-hidden="true">+</span>
            </button>
          )}

          {showRemoveButton && (
            <button
              type="button"
              className="removeButton"
              onClick={handleRemoveTrack}
              aria-label={`Remove ${name} from playlist`}
            >
              <span className="minus" aria-hidden="true">
                -
              </span>
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default Track;
