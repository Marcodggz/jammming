import "./SearchBar.css";

function SearchBar({ searchTracks, searchTerm, setSearchTerm }) {
  return (
    <div className="searchBar">
      <nav className="searchNav"></nav>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchTracks(searchTerm);
          }
        }}
      />
      <button onClick={() => searchTracks(searchTerm)}>Search</button>
    </div>
  );
}
export default SearchBar;
