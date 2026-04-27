# Jammming

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple)
![Spotify API](https://img.shields.io/badge/API-Spotify-green)
![Status](https://img.shields.io/badge/status-Completed-success)
![Demo Mode](https://img.shields.io/badge/Demo%20Mode-Portfolio%20Ready-brightgreen)

A responsive React application that integrates with the Spotify Web API, allowing users to search tracks, build custom playlists, and save them directly to their Spotify account. **Features a comprehensive Demo Mode with 80+ tracks for portfolio showcasing!**

---

## Live Demo

https://jammming-navy.vercel.app/

![App Demo](assets/demo.gif)

[Watch full demo (high quality)](https://raw.githubusercontent.com/Marcodggz/jammming/main/assets/demo.mp4)

---

## Demo Mode

Perfect for portfolio presentation — no Spotify authentication required.

**Features:**
- **80+ Curated Tracks** from 10 popular artists
- **Reliable Album Covers** with fallback system
- **Smart Search** with English & Spanish support
- **International & Spanish Artists** for diverse content
- **Professional UI** with consistent visual design

**Try Demo Mode:** Click "Try Demo Mode" on the landing page!

---

## Overview

Jammming is a responsive React application that integrates with the Spotify Web API, allowing users to search tracks, build playlists, and save them directly to their Spotify account.

The project focuses on real-world frontend challenges such as API integration, authentication, state management, and user experience.

---

## Features

- Search tracks using the Spotify API
- Add and remove tracks from a custom playlist
- Rename playlists directly in the UI
- Save playlists to the user's Spotify account
- Click on artists or albums to drill down into related content
- Navigate back through previous search results
- Prevent duplicate tracks in the playlist
- Real-time playlist duration calculation
- Loading, empty, and error states handled in the UI
- Conditional UI based on authentication and search state

---

## Tech Stack

- React
- JavaScript (ES6+)
- Vite
- Spotify Web API (OAuth PKCE)
- CSS 

---

## Technical Decisions

Key implementation decisions were made to improve data handling, authentication flow, and overall user experience.

### 1. Filtering search results to prevent duplicate tracks

Instead of mutating the original search results, duplicate tracks are filtered at render level by deriving a new array based on the current playlist state.

This keeps the data flow predictable, avoids unnecessary state mutations, and ensures that search results always stay in sync with the playlist.

---

### 2. Handling Spotify OAuth and session persistence

Authentication is implemented using Spotify’s PKCE flow. The access token and its expiration time are stored in sessionStorage to restore the session after page reload.

The application initializes authentication on load, handling the OAuth callback automatically and preventing inconsistent states caused by URL-based logic.

---

### 3. Drill-down navigation with back navigation

Tracks include clickable artist and album names that trigger new searches using Spotify query filters such as `artist:"..."` and `album:"..."`. Each drill-down push the current search state onto a stack, allowing the user to navigate back through previous results with a single button in the search bar.

This approach improves exploration within the app without losing context, and keeps the search bar input updated with a human-readable label (e.g. the artist name) rather than the raw query syntax.

---

A technical design document was created to define the logic and structure behind filtering search results and preventing duplicate tracks:

- [View Technical Design Document](docs/jammming-design-document.md)

---

## Testing

Core features were tested manually during development to ensure correct behavior, including:

- Search functionality and API integration
- Playlist creation and modification
- Authentication flow and session persistence

Browser Developer Tools and React Developer Tools were used to debug state, inspect API responses, and validate edge cases.

---

## How It Works

1. The user connects their Spotify account via OAuth (PKCE flow)
2. Searches are performed using the Spotify Search API
3. Tracks can be added to a custom playlist
4. The playlist is created and saved using the Spotify Web API

---

## Installation

```bash
git clone https://github.com/Marcodggz/jammming.git
cd jammming
npm install
npm run dev
```

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

---

## Author

Built by [Marco](https://github.com/Marcodggz) — a front-end developer focused on building clean, accessible, and user-centered web applications.

Feel free to reach out or explore more projects on [GitHub](https://github.com/Marcodggz).