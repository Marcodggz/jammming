import React from "react";
import "./Track.css";


function Track({ name, artist, artists, album, addTrack, id, showAddButton=true, removeTrack, showRemoveButton=false, uri, searchTracks, setSearchTerm, durationMs }) { 
  const handleAddTrack = () => {
    addTrack({ name, artist, artists, album, id, uri, durationMs });
  }; // Handle adding a track to the playlist

  const handleRemoveTrack = () => {
    removeTrack({ id });
  }; // Handle removing a track from the playlist

  const handleSearchTracks = (query) => {
    searchTracks(query);
    setSearchTerm('');
  }; // Handle searching for tracks based on artist or album

  return (
    <div className="tracksContainer">
      <div className="trackInfo">
        <div className="trackDetails"> 
          <h3>{name}</h3>
          <p>
            {artists.map((artist, index) => (
              <React.Fragment key={artist}>
                <span onClick={() => handleSearchTracks(`artist:"${artist}"`)} className="clickable">
                  {artist}
                </span>
                {index < artists.length - 1 ? ', ' : ''}
              </React.Fragment>
            ))} •
            <span onClick={() => handleSearchTracks(`album:"${album}"`)} className="clickable">{album}</span>
          </p> 
        </div>
        <div className="trackActions">
          {showAddButton && <button onClick={handleAddTrack}> <span>+</span></button>}
          {showRemoveButton && <button onClick={handleRemoveTrack}> <span className="minus">-</span></button>} 
        </div>
      </div>
    </div>
  );
}

export default Track;


