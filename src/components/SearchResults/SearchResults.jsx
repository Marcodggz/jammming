import { useEffect, useRef } from "react";
import TrackList from "../TrackList/TrackList";
import "./SearchResults.css";

function SearchResults({
  tracks,
  addTrack,
  showAddButton = true,
  showRemoveButton = false,
  searchTracks,
  searchTerm,
  hasSearched,
  isLoading,
  allTracksAdded = false,
  hasActivePlaylist = true,
}) {
  const resultsHeadingRef = useRef(null);

  // WCAG 2.4.3: move focus to results heading when a search completes,
  // but ONLY for keyboard users. Mouse users rely on the ARIA live region
  // (role="status") which already announces the result count — no visual
  // focus ring should appear for them.
  useEffect(() => {
    if (
      hasSearched &&
      !isLoading &&
      resultsHeadingRef.current &&
      document.documentElement.hasAttribute("data-keyboard")
    ) {
      const el = resultsHeadingRef.current;
      el.classList.add("programmatic-focus");
      el.focus();
      const handleBlur = () => el.classList.remove("programmatic-focus");
      el.addEventListener("blur", handleBlur, { once: true });
    }
  }, [hasSearched, isLoading]);

  const getSearchResultsAnnouncement = () => {
    if (isLoading) return "Searching for tracks, please wait...";
    if (!hasSearched) return "";
    if (allTracksAdded)
      return `Found ${tracks.length} track${tracks.length === 1 ? "" : "s"}, but all are already in your playlist`;
    if (tracks.length === 0)
      return "No tracks found for your search. Try different keywords or check your spelling.";
    return `Found ${tracks.length} track${tracks.length === 1 ? "" : "s"} matching your search`;
  };

  return (
    <div
      className="searchResults"
      role="region"
      aria-labelledby="search-results-heading"
    >
      <header className="searchHeader">
        {/* tabIndex="-1": not in tab order, but receives programmatic focus after search */}
        <h2
          id="search-results-heading"
          className="searchTitle"
          ref={resultsHeadingRef}
          tabIndex="-1"
        >
          Results
        </h2>
        {hasSearched && (
          <div className="srOnly" role="status" aria-atomic="true">
            {getSearchResultsAnnouncement()}
          </div>
        )}
      </header>

      <div className="searchContent">
        {!hasSearched ? (
          <div
            className="welcome"
            role="region"
            aria-labelledby="welcome-heading"
          >
            <span className="emptyStateIcon" aria-hidden="true">
              🔍
            </span>
            <h3 id="welcome-heading">Search for tracks</h3>
            <p>
              Find songs, artists, or albums to build your perfect playlist.
            </p>
          </div>
        ) : isLoading ? (
          <div
            className="loadingState"
            role="status"
            aria-label="Searching for tracks"
          >
            <span className="loadingSpinner" aria-hidden="true"></span>
            <p className="loadingMessage">Searching...</p>
          </div>
        ) : tracks.length > 0 ? (
          <TrackList
            tracks={tracks}
            addTrack={addTrack}
            showAddButton={showAddButton}
            showRemoveButton={showRemoveButton}
            searchTracks={searchTracks}
            searchTerm={searchTerm}
            hasActivePlaylist={hasActivePlaylist}
          />
        ) : allTracksAdded ? (
          <div
            className="allAddedState"
            role="status"
            aria-labelledby="all-added-heading"
          >
            <span className="emptyStateIcon" aria-hidden="true">
              ✅
            </span>
            <h4 id="all-added-heading">All added</h4>
            <p>These tracks are already in your playlist.</p>
          </div>
        ) : (
          <div
            className="noResults"
            role="status"
            aria-labelledby="no-results-heading"
          >
            <span className="emptyStateIcon" aria-hidden="true">
              😕
            </span>
            <h4 id="no-results-heading">No results</h4>
            <p>Try different keywords or check your spelling.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
