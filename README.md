# Jammming

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple)
![Spotify API](https://img.shields.io/badge/API-Spotify-green)
![Status](https://img.shields.io/badge/status-Completed-success)

A responsive React application that lets users search Spotify, build custom playlists, and save them directly to their account using the Spotify Web API.

---

## Live Demo

https://the-jammming.netlify.app/

---

## Preview

![App Demo](./assets/demo.gif)

---

## Features

- Search tracks using the Spotify API
- Add and remove tracks from a custom playlist
- Rename playlists directly in the UI
- Save playlists to the user's Spotify account
- Click on artists or albums to trigger new searches
- Prevent duplicate tracks in the playlist
- Real-time playlist duration calculation
- Loading, empty, and error states handled in the UI
- Conditional UI based on authentication and search state

---

## Tech Stack

- React
- JavaScript (ES6+)
- Vite
- Spotify Web API
- CSS

---

## Technical Design

A technical design document was created to define the logic and structure behind filtering search results and preventing duplicate tracks.

- [View Technical Design Document](docs/jammming-design-document.md)

---

## Testing

Core features were tested manually during development to ensure correct behavior, including search functionality, playlist management, and Spotify integration.

Browser developer tools and React Developer Tools were used to inspect state, debug issues, and validate API requests.

---

## How It Works

1. The user connects their Spotify account via OAuth (PKCE flow)
2. Searches are performed using the Spotify Search API
3. Tracks can be added to a custom playlist
4. The playlist is created and saved using the Spotify Web API

---

## Installation

git clone https://github.com/Marcodggz/jammming.git  
cd jammming  
npm install  
npm run dev

---

## Important Note

Spotify authentication is required to use the application.

Due to Spotify API restrictions, only authorized users may be able to fully test the app unless the application is approved for production use.

---

## Future Improvements

- Add debounced search for better performance
- Implement request cancellation to avoid race conditions
- Improve UI animations and transitions
- Add drag-and-drop support for playlist reordering
- Persist authentication state across sessions

---

## Author

Created as part of the Codecademy Front-End Engineer Path and further improved with additional features and UX enhancements.