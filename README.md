# Jammming

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple)
![Spotify API](https://img.shields.io/badge/API-Spotify-green)
![Tests](https://img.shields.io/badge/Tests-29%20passing-brightgreen)

A React application for searching tracks, building playlists, and saving them to Spotify — built with the Spotify Web API and OAuth PKCE. Includes a demo mode with mock data so anyone can try the main flows without Spotify access.

---

## Live Demo

**[jammming-navy.vercel.app](https://jammming-navy.vercel.app/)**

![App Demo](assets/demo.gif)

[Watch full demo (MP4)](https://raw.githubusercontent.com/Marcodggz/jammming/main/assets/demo.mp4)

---

## Demo Mode

Spotify apps in development mode are restricted to approved test users, so most visitors can't log in. Demo mode exists to let anyone try the main app flows — search, playlist creation, and editing — using a curated mock catalog without a Spotify account.

Click **"Create a playlist"** on the landing page to get started.

---

## Features

- Search tracks, artists, and albums via the Spotify API
- Autocomplete suggestions as you type
- Drill down into artist or album searches; navigate back through previous results
- Add and remove tracks from a playlist; duplicate tracks are automatically excluded from search results
- Create new playlists or load and edit your existing Spotify playlists
- Inline editable playlist title with keyboard support
- Real-time playlist duration display
- Save new playlists or update existing ones to your Spotify account
- Keyboard navigation and screen reader-friendly semantics
- Error states with retry flows for API failures
- Responsive layout across screen sizes
- Demo mode with mock catalog — no account required

---

## Tech Stack

- React 18
- JavaScript (ES6+)
- Vite
- Spotify Web API (OAuth PKCE)
- CSS (no framework)
- Vitest + React Testing Library

---

## Technical Decisions

### 1. Filtering search results at render time

Duplicate tracks are filtered at render level by deriving a new array from the current playlist state, rather than mutating the original search results. This keeps the data flow predictable and ensures search results stay in sync with the playlist automatically.

→ [Full technical decisions](docs/TECHNICAL_DECISIONS.md)

---

### 2. OAuth with PKCE and session persistence

Authentication uses Spotify's PKCE flow. The access token and its expiration time are stored in `sessionStorage` to restore the session after a page reload, so users are not sent through the auth flow again unnecessarily.

---

### 3. Drill-down navigation

Artist and album names in track cards trigger new searches using Spotify query filters (`artist:"..."`, `album:"..."`). Each drill-down pushes the current search state onto a stack, so the user can navigate back through previous results without losing context.

---

## Accessibility

The app follows WCAG 2.1 Level AA accessibility principles. Key implementation details:

- Skip-to-main link as the first focusable element
- Focus rings visible only during keyboard navigation (suppressed for pointer users)
- Programmatic focus management after search completes
- Descriptive `aria-label` on every interactive element including per-track action buttons
- Live regions for search, loading, and error feedback
- `prefers-reduced-motion` support throughout

→ [Full accessibility statement](docs/ACCESSIBILITY.md)

---

## Testing

Automated tests written with **Vitest** and **React Testing Library**:

- **Playlist utility unit tests** — name validation, dirty-state detection, artwork helpers, duration formatting, save-button label logic
- **SearchResults component tests** — initial state, loading, error state with retry, empty results

29 tests across 2 test files (`npm test`).

---

## Installation

```bash
git clone https://github.com/Marcodggz/jammming.git
cd jammming
npm install
```

**To use Spotify mode**, create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Set `VITE_CLIENT_ID` to your app's client ID from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard), and add `http://localhost:5173/` as a Redirect URI in your app settings. Then:

```bash
npm run dev
```

**Demo mode requires no setup** — it works out of the box.

---

## Spotify Access Note

While the app is in Spotify's development mode, only whitelisted Spotify accounts can log in. To test Spotify mode, add your account email under your app's user management in the Spotify Developer Dashboard.

---

## Future Improvements

- Drag-and-drop playlist reordering
- Additional component tests for playlist CRUD flows
- TypeScript — build the next project with it from the start rather than retrofitting this one

---

## Author

Built by [Marco](https://github.com/Marcodggz) — a front-end developer focused on clean, accessible, and user-centered web applications.