function Track({ name, artist, album }) {
  return (
    <div id="tracks" className="tracksContainer">
      <h2>{name}</h2>
      <h3>{artist}</h3>
      <p>{album}</p>
    </div>
  );
}

export default Track;
