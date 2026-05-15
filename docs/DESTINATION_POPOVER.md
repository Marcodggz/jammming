# Destination Selector Popover

**Date:** May 2026  
**Scope:** Contextual popover UI for choosing where to add a track when no playlist is active

---

## Overview

When the user clicks the "+" button without an active playlist, Jammming shows a lightweight popover next to the clicked button.

The user can choose between:

- **New playlist** — create and add to a new playlist
- **My playlists** — browse existing playlists before choosing where to add the track

This keeps the flow contextual and avoids interrupting the user with a full modal.

---

## Key Design Decisions

### 1. Popover instead of modal

A modal would work, but it would feel too heavy for a small destination choice. The popover keeps the user in context and makes the action feel directly connected to the track they clicked.

The trade-off is that the component needs positioning logic to stay aligned with the trigger button.

### 2. Smart positioning

The popover is anchored to the clicked "+" button.

The positioning logic:

1. Reads the trigger button position with `getBoundingClientRect()`.
2. Tries to place the popover to the right of the button.
3. Falls back to the left if there is not enough space.
4. Adjusts vertical position to avoid overflowing the viewport.
5. Uses a CSS custom property to align the caret with the button.

**Code location:** `DestinationSelector.jsx` — `calculatePosition()`

### 3. Directional caret

The popover uses CSS pseudo-elements for the caret instead of adding extra DOM nodes.

This keeps the markup simpler while still making the popover feel visually attached to the trigger button.

### 4. Close behavior

The popover can close through:

- `Escape`
- outside click
- scroll

Closing on scroll prevents the popover from becoming visually disconnected from the button if the user moves the page or scrollable results panel.

Exit animation runs before the parent `onCancel` callback is called, so the UI feels smoother without moving animation logic into `App.jsx`.

---

## Component Responsibilities

    App.jsx
      owns pending track and selector state

    Track.jsx
      passes the clicked button element when the user tries to add a track

    DestinationSelector.jsx
      renders the popover, calculates position, and handles close behavior

`App.jsx` decides whether the selector is open and what should happen after the user chooses an option. `DestinationSelector.jsx` owns only the popover UI behavior.

---

## State Managed by App

    const [pendingTrackToAdd, setPendingTrackToAdd] = useState(null);
    const [isDestinationSelectorOpen, setIsDestinationSelectorOpen] = useState(false);
    const [selectorAnchorElement, setSelectorAnchorElement] = useState(null);

- `pendingTrackToAdd` stores the track waiting for a destination.
- `isDestinationSelectorOpen` controls visibility.
- `selectorAnchorElement` stores the button used for positioning.

Keeping this state in `App.jsx` makes sense because the selected destination affects the global playlist flow.

---

## Files Involved

- `src/components/DestinationSelector/DestinationSelector.jsx` — popover rendering, positioning, and close behavior
- `src/components/DestinationSelector/DestinationSelector.css` — styling, animations, and caret
- `src/components/Track/Track.jsx` — passes the clicked button element through the add action
- `src/App.jsx` — owns destination selector state and handles the selected action

---

## Trade-offs

| Area | Decision | Trade-off |
|---|---|---|
| UI pattern | Popover instead of modal | More positioning logic, but a lighter and more contextual flow |
| Positioning | `position: fixed` | Requires viewport calculations, but avoids parent overflow issues |
| Caret | CSS pseudo-elements | Less flexible than SVG, but simpler markup |
| Scroll behavior | Close on scroll | Prevents visual mismatch between the button and popover |
| Animation | Local entry/exit animation | Slightly more state inside the component, but smoother UX |

---

## Why this component is separate

`DestinationSelector` is separate because it has its own UI behavior: positioning, closing, animation, keyboard handling, and viewport edge cases.

Keeping this inside `App.jsx` would add too much interaction-specific code to a file that already owns global app state. Extracting it keeps `App.jsx` focused on orchestration while the popover component owns its own presentation and interaction details.