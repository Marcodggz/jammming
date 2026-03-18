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

### Spotify Authentication
The application integrates with Spotify’s OAuth flow, allowing users to securely connect their account and interact with their personal library.

### Smart Search System
Users can search for tracks using the Spotify API. Results are dynamically fetched and updated based on the search term.

### Interactive Navigation
Clicking on an artist or album triggers a new search, enabling quick exploration of related music directly from the results list.

### Playlist Creation
Users can build a custom playlist by adding songs from the search results.

### Duplicate Prevention
Tracks already added to the playlist are automatically filtered out from the search results, ensuring a clean and intuitive experience.

### Playlist Management
Tracks can be added or removed from the playlist, and duplicate entries are prevented.

### Playlist Renaming
Users can rename their playlist directly in the interface.

### Playlist Duration
The total duration of the playlist is calculated in real time and displayed in a user-friendly format.

### Loading and Empty States
The UI handles loading states and empty results gracefully, improving the overall user experience.

### Conditional UI Flow
The interface adapts based on the application state:
- Not authenticated → connection screen
- Authenticated without search → onboarding message
- Searching → loading state
- Results → track list
- No results → empty state message

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

- Improve visual design and polish the overall UI/UX
- Add drag-and-drop functionality to reorder playlist tracks
- Implement debounced search to reduce unnecessary API calls
- Persist authentication state across sessions
- Add user feedback for actions such as playlist saves or errors
- Introduce more refined transitions and interaction states

---

## Author

Created as part of the **Codecademy Front-End Engineer Path**.