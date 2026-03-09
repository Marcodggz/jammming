import "./SearchBar.css"; 

function SearchBar() {
  return (
    <div className="searchBar">
        <nav className='searchNav'></nav>
      <input type="text" placeholder="Search..." />
      <button>Search</button>
    </div>
  );
}
export default SearchBar;