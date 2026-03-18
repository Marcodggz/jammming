# Technical Design Document

Feature: Excluding Playlist Tracks from Search Results
March 2026

## OBJECTIVE

To improve the Jammming search experience by excluding tracks that are already present in the current playlist from the displayed search results. This prevents users from attempting to add duplicate tracks and keeps the results focused on songs that are still available to add.

## BACKGROUND

Currently, Jammming allows users to search for tracks using the Spotify API and add them to a playlist before saving that playlist to their Spotify account. Search results are displayed independently from the current playlist contents, meaning that tracks already added to the playlist may still appear in the search results.

This behavior can create unnecessary friction in the user experience. Users may attempt to add a track that has already been added to the playlist, only to find that the application prevents duplicates. While duplicate protection already exists in the application logic, the search results interface does not reflect this state, which can lead to confusion and redundant actions.

To improve this workflow, search results should exclude tracks that are already present in the current playlist. When a user adds a track to the playlist, that track should immediately be removed from the visible search results. Similarly, if a user removes a track from the playlist, it should once again become eligible to appear in the search results if it matches the current query.

This feature ensures that the search results remain focused on tracks that can still be added to the playlist, creating a cleaner and more intuitive user experience.

## TECHNICAL DESIGN

Search result filtering should be handled in App, since App already owns both the tracks and playlistTracks state values. This keeps the filtering logic centralized and allows SearchResults to remain a presentational component responsible only for rendering the tracks it receives.

The existing tracks state should continue storing the full set of search results returned by Spotify.search(). Rather than removing tracks from this state when they are added to the playlist, App should compute a derived array of visible search results by excluding any track whose id matches the id of a track currently stored in playlistTracks.

This derived array can be calculated during render, before passing data to SearchResults. As a result, the displayed search results will automatically stay in sync with the playlist state. When a user adds a track to the playlist, that track will no longer appear in SearchResults on the next render. If the user removes a track from the playlist, it will once again be eligible to appear in the search results, provided it is part of the current tracks state.

No updates are required in Spotify.js, since this feature does not change how search results are retrieved from the Spotify API. The feature only changes how the existing search results are displayed in the client.

SearchResults, TrackList, and Track do not require major structural changes. SearchResults will continue receiving a list of tracks as props, but this list will now already be filtered before it is passed down. This preserves the current component hierarchy and minimizes the scope of implementation.

An empty-state message should be displayed when all tracks in the current search results are already present in the playlist. In this case, SearchResults should render a short message indicating that there are no additional tracks available for the current search because all matching tracks have already been added.

## CAVEATS

An alternative implementation could automatically request additional results from the Spotify API when most or all of the current search results have already been added to the playlist. This could be achieved by using the Spotify search endpoint with pagination parameters such as offset to retrieve additional tracks beyond the initial set of results.

While this approach would ensure that the search results panel remains populated with available tracks, it would also significantly increase the complexity of the search logic. The application would need to manage pagination state, track the number of filtered results, and potentially perform multiple asynchronous API requests for a single user search.

Additionally, Jammming currently supports specialized search queries such as artist:"..." and album:"...". Automatically requesting additional results for these query types could introduce inconsistent behavior depending on the number of tracks available for a given artist or album.

Because of this added complexity, the current implementation focuses on filtering only the results already retrieved from the Spotify API. If all returned tracks are already present in the playlist, the search results panel will display an empty-state message indicating that no additional tracks are available for the current search.

This approach keeps the implementation simple, predictable, and aligned with the existing architecture of the application.