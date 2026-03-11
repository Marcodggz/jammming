import "./Track.css";


function Track({ name, artist, album, addTrack, id, showAddButton=true, removeTrack, showRemoveButton=false, uri }) { 
  const handleAddTrack = () => {
    addTrack({ name, artist, album, id, uri });
  }; // Handle adding a track to the playlist

  const handleRemoveTrack = () => {
    removeTrack({ id });
  }; // Handle removing a track from the playlist

  return (
    <div className="tracksContainer">
      <div className="trackInfo">
        <div className="trackDetails"> 
          <h3>{name}</h3>
          <p>{artist} • {album}</p> 
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


