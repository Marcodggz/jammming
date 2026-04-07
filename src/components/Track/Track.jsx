import React from "react";
import "./Track.css";

function Track({
  name,
  artists,
  album,
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
    addTrack({ name, artists, album, id, uri, durationMs });
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

  return (
    <li className="tracksContainer">
      <div className="trackInfo">
        <div className="trackDetails">
          <h3>{name}</h3>
          <p>
            {artists.map((artistName, index) => (
              <React.Fragment key={artistName}>
                {showAddButton ? (
                  <button
                    type="button"
                    onClick={() =>
                      handleSearchTracks(`artist:"${artistName}"`)
                    }
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