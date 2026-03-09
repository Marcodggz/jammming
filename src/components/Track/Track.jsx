import "./Track.css";

function Track({ name, artist, album }) {
  return (
    <div id="tracks" className="tracksContainer">
      <div className="trackInfo">
        <h3>{name}</h3>
        <p>{artist} • {album}</p>
      </div>
    </div>
  );
}

export default Track;
