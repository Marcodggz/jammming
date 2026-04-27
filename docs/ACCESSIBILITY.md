# Accessibility Statement — Jammming

**Conformance target:** WCAG 2.1 Level AA  
**Last reviewed:** April 2026  
**Technology stack:** React 18, Vite, CSS custom properties

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

| Element | In tab order | Key(s) | Notes |
|---|---|---|---|
| Skip link | Yes | `Enter` | First focusable element on the page |
| Search input | Yes | — | Type to filter tracks |
| Back arrow button | Yes | `Enter`, `Space` | Appears inside the search bar when a previous search exists; returns to previous results |
| Search button | Yes | `Enter`, `Space` | Disabled while the input is empty |
| Artist search buttons | Yes | `Enter`, `Space` | Trigger a new search by artist name |
| Album search buttons | Yes | `Enter`, `Space` | Trigger a new search by album name |
| Track title `<h3>` | Yes (`tabIndex="0"`) | — | Read-only; `aria-label` announces full track info |
| Track duration | Yes (`tabIndex="0"`) | — | Read-only |
| Add button | Yes | `Enter`, `Space` | Adds track to the playlist |
| Remove button | Yes | `Enter`, `Space` | Removes track from the playlist |
| Edit playlist title | Yes | `Enter`, `Space` | Opens the inline title editor |
| Playlist title input | Yes | `Enter`, `Escape` | `Enter` saves; `Escape` cancels and restores the previous title |
| Playlist duration | Yes (`tabIndex="0"`) | — | Read-only; updates as tracks are added or removed |
| Save to Spotify button | Yes | `Enter`, `Space` | Saves the playlist to the user's Spotify account |

---

## 4. Focus Indicators

Focus rings are visible **only during keyboard navigation**, never on mouse interaction, preventing visual noise for pointer users while meeting [WCAG 2.4.11 Focus Appearance](https://www.w3.org/WAI/WCAG21/Understanding/focus-appearance-minimum).

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
| Toast notifications | `role="alert"` (`assertive`) | Success / error feedback from Spotify API |
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

All CSS transitions and animations are disabled when the user has requested reduced motion:

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

| Context | Ratio | WCAG requirement |
|---|---|---|
| Body text on dark background | ≥ 4.5 : 1 | AA — normal text (1.4.3) |
| Large headings | ≥ 3 : 1 | AA — large text (1.4.3) |
| Focus ring (green on dark) | ≥ 3 : 1 | AA — UI component (1.4.11) |

---

## 8. Images & Icons

- **Album art** — `alt=""` (decorative). The containing element carries `aria-hidden="true"` so screen readers skip it entirely; full track information is provided through the `<h3>` `aria-label`.
- **FontAwesome icons** — all rendered with `aria-hidden="true"`. Meaning is conveyed through the parent button's `aria-label`, not the icon glyph.

---

## 9. Testing

Manual testing was performed with the following assistive technology / browser combinations:

| Assistive technology | Browser | Platform |
|---|---|---|
| VoiceOver | Safari | macOS |
| VoiceOver | Safari | iOS |
| NVDA | Firefox | Windows |
| Keyboard only | Chrome, Firefox, Safari | macOS / Windows |

### Automated checks

- **[axe DevTools](https://www.deque.com/axe/)** browser extension — zero critical violations
- **[WAVE](https://wave.webaim.org/)** — zero errors

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
