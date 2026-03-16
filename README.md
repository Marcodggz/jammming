# Jammming

Jammming is a React web application that allows users to search the Spotify library, create a custom playlist, and save it directly to their Spotify account.

The application integrates with the Spotify Web API and demonstrates core front-end development concepts such as component architecture, state management, API requests, and authentication.

---

## Demo
<!-- https://jammming-app.vercel.app -->

## Screenshot
<!-- ![App Screenshot](./screenshot.png) -->

## Project Overview

The goal of this project was to build a fully functional React application that interacts with the Spotify API.

Users can:

- Search for songs using the Spotify API
- View song information including title, artist, and album
- Add songs to a custom playlist
- Remove songs from the playlist
- Rename the playlist
- Save the playlist directly to their Spotify account

The application uses Spotify authentication and API requests to retrieve and manipulate user data.

---

## Technologies Used

- React
- JavaScript (ES6+)
- Vite
- Spotify Web API
- Fetch API
- CSS

---

## Features

### Spotify Search
Users can search for songs using the Spotify API. The application sends a request to the `/v1/search` endpoint and displays the results dynamically.

### Playlist Creation
Users can build a custom playlist by adding songs from the search results.

### Track Management
Tracks can be added or removed from the playlist, and duplicate tracks are prevented.

### Playlist Renaming
Users can rename their playlist directly in the interface.

### Spotify Integration
Playlists can be saved directly to the user's Spotify account using the Spotify Web API.

---

## Technical Design

The technical design document for the search result filtering feature can be found here:

- [Jammming Technical Design Document](docs/jammming-design-document.md)

---

## Testing and Debugging

### Testing Approach

The application was tested incrementally during development. Each core functionality was verified manually to ensure that the application behaves as expected.

React Developer Tools and browser console logs were used to inspect component state, props, and data flow.

### Test Cases

| Feature | Action | Expected Result | Result |
|-------|------|------|------|
| Search tracks | Enter a search term and click "Search" | Tracks from Spotify API appear in the results list | Passed |
| Add track | Click "Add" next to a track in search results | Track appears in the playlist | Passed |
| Prevent duplicates | Add the same track twice | Track should not be duplicated in the playlist | Passed |
| Remove track | Click "Remove" next to a track in playlist | Track is removed from playlist | Passed |
| Rename playlist | Edit the playlist name input | Playlist name updates in real time | Passed |
| Save playlist | Click "Save to Spotify" | Playlist is created in the user's Spotify account | Passed |
| Reset playlist | After saving | Playlist clears and the name resets | Passed |

### Debugging Tools

The following tools and techniques were used during development:

- Browser console logging to inspect data flow
- Breakpoints in the browser debugger
- React Developer Tools to inspect component state and props
- Network tab inspection for Spotify API requests

All major features were tested and verified before completing the project.

---

## Future Improvements

Potential next steps for Jammming include:

- Excluding tracks that are already present in the playlist from the search results to improve clarity and prevent redundant actions.
- Displaying the total duration of the playlist by calculating the combined duration of all selected tracks.
- Allowing users to sort search results by criteria such as track name, artist, or album.
- Implementing loading indicators while waiting for Spotify API responses.
- Improving empty-state feedback when no search results are available.

---

## Author

Created as part of the **Codecademy Front-End Engineer Path**.