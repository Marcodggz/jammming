import React from "react";
import "./Track.css";


function Track({ name, artist, artists, album, addTrack, id, showAddButton=true, removeTrack, showRemoveButton=false, uri, searchTracks}) { 
  const handleAddTrack = () => {
    addTrack({ name, artist, album, id, uri });
  }; // Handle adding a track to the playlist

  const handleRemoveTrack = () => {
    removeTrack({ id });
  }; // Handle removing a track from the playlist

  const handleSearchTracks = (query) => {
    searchTracks(query);
  };

  return (
    <div className="tracksContainer">
      <div className="trackInfo">
        <div className="trackDetails"> 
          <h3>{name}</h3>
          <p>
            {artists.map((artist, index) => (
              <React.Fragment key={artist}>
                <span onClick={() => handleSearchTracks(artist)} className="clickable">
                  {artist}
                </span>
                {index < artists.length - 1 ? ', ' : ''}
              </React.Fragment>
            ))} •
            <span onClick={() => handleSearchTracks(album)} className="clickable">{album}</span>
          </p> 
        </div>
        <div className="trackActions">
          {showAddButton && <button onClick={handleAddTrack}>+</button>}
          {showRemoveButton && <button onClick={handleRemoveTrack}>-</button>} 
        </div>
      </div>
    </div>
  );
}

export default Track;


