# Accessibility Statement — Jammming

**Conformance target:** WCAG 2.1 Level AA  
**Last reviewed:** May 2026  
**Technology stack:** React 18, Vite, CSS

---

## Table of Contents

1. [Page Structure & Landmarks](#1-page-structure--landmarks)
2. [Skip Navigation](#2-skip-navigation)
3. [Keyboard Navigation](#3-keyboard-navigation)
4. [Focus Indicators](#4-focus-indicators)
5. [Focus Management](#5-focus-management)
6. [Screen Reader Support](#6-screen-reader-support)
7. [Motion & Contrast](#7-motion--contrast)
8. [Images & Icons](#8-images--icons)
9. [Testing](#9-testing)
10. [Known Limitations](#10-known-limitations)
11. [References](#11-references)

---

## 1. Page Structure & Landmarks

The page uses semantic HTML5 landmarks so assistive technology users can navigate directly to regions of interest.

| Landmark | Element / Role | Purpose |
|---|---|---|
| Banner | `<header>` | App title |
| Search | `<form role="search">` | Search bar |
| Main | `<main id="main-content">` | Primary content area |
| Region | `<section aria-labelledby>` | Search results panel |
| Region | `<section aria-labelledby>` | Playlist panel |

**Heading hierarchy** follows a strict, unbroken outline:

```
h1  — App title ("Jammming")
  h2  — "Results" (search results heading)
    h3  — Individual track titles (search results)
  h2  — Playlist name (editable)
    h3  — Individual track titles (playlist)
```

Individual track cards use `<article>` elements, reflecting their self-contained, reusable nature.

---

## 2. Skip Navigation

A visually hidden "Skip to main content" link is the **first focusable element** on the page. It becomes visible on keyboard focus and moves focus to `<main>` when activated, bypassing the header and search bar (satisfies [WCAG 2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks)).

```css
/* Off-screen by default */
.skipLink {
  position: absolute;
  top: -100%;
  left: 16px;
}

/* Visible on focus */
.skipLink:focus {
  top: 16px;
}
```

`<main tabIndex="-1">` enables programmatic focus from the skip link without inserting `<main>` into the natural tab order.

---

## 3. Keyboard Navigation

All functionality available with a mouse is equally available via keyboard. No keyboard traps exist (satisfies [WCAG 2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap)).

| Element | Key(s) | Notes |
|---|---|---|
| Skip link | `Enter` | First focusable element on the page |
| Search input | — | Type to filter tracks; supports autocomplete suggestions (see §3.1) |
| Back arrow button | `Enter`, `Space` | Appears when a previous search exists; returns to previous results |
| Search button | `Enter`, `Space` | Disabled while the input is empty |
| Artist search buttons | `Enter`, `Space` | Trigger a new search by artist name |
| Album search buttons | `Enter`, `Space` | Trigger a new search by album name |
| Add button | `Enter`, `Space` | Adds track to the playlist |
| Remove button | `Enter`, `Space` | Removes track from the playlist |
| Edit playlist title | `Enter`, `Space` | Opens the inline title editor |
| Playlist title input | `Enter`, `Escape` | `Enter` saves; `Escape` cancels and restores the previous title |
| Save to Spotify button | `Enter`, `Space` | Saves the playlist to the user's Spotify account |

Track titles and durations are read-only text; their full information is exposed to screen readers via `aria-label` on the `<h3>` and the track `<article>`, not via keyboard focus.

### 3.1 Search Autocomplete (ARIA Combobox)

The search input implements the ARIA combobox pattern:

- `role="combobox"` on the `<input>` with `aria-expanded`, `aria-controls="search-suggestions"`, `aria-autocomplete="list"`, and `aria-haspopup="listbox"`
- `aria-activedescendant` points to the currently highlighted suggestion (`id="suggestion-{index}"`)
- The suggestion list uses `role="listbox"`; each option uses `role="option"` with `aria-selected`
- `↓` / `↑` moves highlight; `Enter` selects; `Escape` closes the dropdown and resets focus to the input

---

## 4. Focus Indicators

Focus rings are visible **only during keyboard navigation**, never on mouse interaction, preventing visual noise for pointer users while keeping keyboard focus clearly visible.

### Color token

All focus outlines share a single design token — **Spotify green at 50% opacity**:

```css
outline: 2px solid rgba(29, 185, 84, 0.5);
outline-offset: 3px;
```

### Keyboard detection

A `data-keyboard` attribute is set on `<html>` when the user presses `Tab`, and removed on any pointer event (`pointerdown`, capture phase). This allows CSS to target keyboard-only states without JavaScript needing to manage per-element state:

```css
/* Keyboard users */
.element:focus-visible,
html[data-keyboard] .element:focus {
  outline: 2px solid rgba(29, 185, 84, 0.5);
  outline-offset: 3px;
}

/* Mouse users — suppress the browser default */
.element:focus:not(:focus-visible) {
  outline: none;
}
```

### Search bar wrapper

The search wrapper must show a glow when its child input is focused. A React ref applies `data-keyboard-focused` to the wrapper DOM node synchronously on `focus` / `blur` events — avoiding a state-driven re-render that could drop the attribute before the CSS transition fires:

```css
/* Mouse: subtle border */
.searchInputWrapper:focus-within {
  border-color: rgba(255, 255, 255, 0.25);
}

/* Keyboard: full Spotify-green glow */
[data-keyboard-focused].searchInputWrapper:focus-within {
  border-color: rgba(29, 185, 84, 0.5);
  box-shadow: 0 0 0 3px rgba(29, 185, 84, 0.15);
}
```

### Main content region

`#main-content:focus-visible` uses `outline-offset: -3px` to draw the ring *inside* the full-viewport container, keeping it visible on all screen sizes.

---

## 5. Focus Management

Satisfies [WCAG 2.4.3 Focus Order](https://www.w3.org/WAI/WCAG21/Understanding/focus-order).

### After search

When a search completes, focus is moved programmatically to the "Results" `<h2>` heading:

```jsx
// SearchResults.jsx
resultsRef.current?.focus();
```

This:

- Orients keyboard users to the newly populated content region.
- Causes screen readers to announce the heading immediately.
- Uses `tabIndex="-1"` on the heading so it can receive programmatic focus without entering the natural tab order.

A CSS class (`.programmatic-focus`) is applied during this focus event so the focus ring appears only when focus arrived programmatically, not on mouse click.

---

## 6. Screen Reader Support

### 6.1 Track titles

Each track `<h3>` carries an `aria-label` that announces complete track information in a natural sentence, regardless of what is visually displayed:

```
"[Song name] by [Artist], from the album [Album name], duration [M:SS]"
```

The visual heading shows only the song name. Duplicate information visible elsewhere in the card is suppressed from the `<h3>` announcement to avoid redundant reading.

### 6.2 Action buttons

Every interactive button has a descriptive `aria-label` including the track name, ensuring no button is announced as a generic "Add" or "Remove":

| Button | `aria-label` |
|---|---|
| Add | `"Add [Song name] by [Artist] to playlist"` |
| Remove | `"Remove [Song name] by [Artist] from playlist"` |
| Artist search | `"Search tracks by [Artist name]"` |
| Album search | `"Search tracks from album [Album name]"` |

### 6.3 Live regions

Live regions are always present in the DOM — never inserted dynamically — so assistive technologies register them before content is injected.

| Region | Role / `aria-live` | Content announced |
|---|---|---|
| Search status | `role="status"` (`polite`) | Search progress and result count |
| Toast notifications | Live region / alert pattern | Success / error feedback from Spotify API |
| Playlist duration | `role="status"` (`polite`) | Total duration as tracks are added or removed |

### 6.4 Track lists

The `<ul>` containing tracks carries a dynamically computed `aria-label`:

```
"Search results: N track(s) found"   — for the search results list
"Your playlist: N track(s)"          — for the playlist list
```

---

## 7. Motion & Contrast

### Reduced motion

Motion-heavy transitions and animations are reduced when the user has requested reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

No information is conveyed exclusively through animation.

### High contrast

```css
@media (prefers-contrast: high) {
  /* Increases background opacity and border contrast on key UI surfaces */
}
```

### Colour contrast

The UI uses a dark background with light text designed to maintain readable contrast for normal text and large headings. The Spotify-green focus ring (`rgba(29, 185, 84, 0.5)`) is visible against the dark surfaces used throughout the app. Exact ratios have not been formally audited with a contrast tool.

---

## 8. Images & Icons

- **Track album art** — `alt=""` (decorative). The containing element carries `aria-hidden="true"` so screen readers skip it entirely; full track information is provided through the `<h3>` `aria-label`.
- **Playlist artwork** — when a real Spotify playlist image is available, `alt={playlistName}` is used so the image is announced meaningfully. In demo mode, the collage tile is wrapped in `aria-hidden="true"` because the playlist name heading already describes the content.
- **FontAwesome icons** — all rendered with `aria-hidden="true"`. Meaning is conveyed through the parent button's `aria-label`, not the icon glyph.

---

## 9. Testing

### Manual checks performed

| Method | Environment |
|---|---|
| Keyboard-only navigation | Chrome, Firefox, Safari — macOS |
| VoiceOver | Safari — macOS |

### Recommended checks for full coverage

The following tools are recommended for anyone doing a broader audit of this project:

- **[axe DevTools](https://www.deque.com/axe/)** browser extension — automated rule checking
- **[WAVE](https://wave.webaim.org/)** — structural and contrast analysis
- NVDA + Firefox (Windows) — for Windows screen reader coverage
- VoiceOver + Safari (iOS) — for mobile screen reader coverage

---

## 10. Known Limitations

| Area | Detail | Planned fix |
|---|---|---|
| Spotify OAuth redirect | After the Spotify login redirect, focus returns to the browser's default position rather than a named landmark. This is a browser / OAuth flow constraint. | Investigate post-redirect focus restoration via URL hash fragment. |

---

## 11. References

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM — Web Accessibility In Mind](https://webaim.org/)
- [MDN — `:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
- [MDN — ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
- [Deque — axe rules](https://dequeuniversity.com/rules/axe/)
