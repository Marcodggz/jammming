# Destination Selector Popover

**Date:** May 4, 2026  
**Scope:** Contextual popover UI for selecting track destination when no active playlist

---

## Overview

When users click the "+" button to add a track but have no active playlist, a lightweight popover appears next to the button with two options:
- **New playlist** — Create and add to a new playlist
- **My playlists** — Browse existing playlists

The popover is anchored to the trigger button with a directional caret, smart viewport positioning, scroll-to-close behavior, and smooth animations.

---

## Key Design Decisions

### 1. **Popover vs Modal**
- **Why popover:** Contextual, lightweight, maintains page context, faster perceived performance
- **Implementation:** `position: fixed` with smart positioning algorithm
- **Alternative considered:** Centered modal with backdrop (rejected — felt heavy and disconnected)

### 2. **Smart Positioning Algorithm**
- Prefers positioning to the right of the button
- Falls back to left if right overflows
- Handles bottom overflow by shifting up
- Clamps to viewport edges with 8px padding

**Code location:** `DestinationSelector.jsx` — `calculatePosition()` useEffect

### 3. **Dynamic Caret (Arrow)**
- CSS pseudo-element (::before for fill, ::after for border)
- Uses CSS border trick for pure CSS triangle
- Dynamically positioned to point at button center using `--caret-top` custom property
- Data attribute `data-side` switches caret side based on popover position

**Why CSS pseudo-elements:** No extra DOM nodes, inherits animations automatically, highly efficient

### 4. **Close on Scroll**
- Scroll listener with capture phase catches nested scroll containers
- Automatically closes popover when user scrolls
- Prevents visual disconnect (button moves but popover would stay fixed)
- Gracefully restores user intent

**Code location:** `DestinationSelector.jsx` — scroll useEffect with `isClosing` guard

### 5. **Close Mechanisms** (Multiple, Robust)
- **Escape key:** Standard keyboard pattern
- **Click outside:** Click on popover or page closes it
- **Scroll:** Closing on scroll keeps UI consistent
- **Animation first:** All closes trigger exit animation before onCancel callback

---

## Implementation Details

### Component Structure

```
App.jsx (state orchestration)
  ↓
Track.jsx (click handler passes button element)
  ↓
DestinationSelector.jsx (popover rendering + positioning)
  ├─ calculatePosition() — smart viewport positioning
  ├─ Escape handler
  ├─ Click outside handler
  └─ Scroll handler
```

### State Management (App.jsx)

```javascript
const [pendingTrackToAdd, setPendingTrackToAdd] = useState(null);
const [isDestinationSelectorOpen, setIsDestinationSelectorOpen] = useState(false);
const [selectorAnchorElement, setSelectorAnchorElement] = useState(null);
```

- `pendingTrackToAdd` — track awaiting destination choice
- `isDestinationSelectorOpen` — visibility control (independent of pending track)
- `selectorAnchorElement` — button element reference for positioning

### Positioning Algorithm (Simplified View)

1. Get anchor button rect: `anchorElement.getBoundingClientRect()`
2. Calculate popover dimensions
3. Try right: `left = anchorRect.right + 8px`
4. Check overflow → if overflows, try left
5. Check viewport bounds → clamp to safe zone
6. Position vertically: align with button, adjust if bottom overflows
7. Calculate caret Y: `caretTop = buttonCenterY - popoverTop`, clamp to [8px, height-8px]

**Result:** `{ top, left, side, caretTop }` → applied via inline styles + CSS custom property

### Animation System

**Entry:** 160ms, scale(0.92→1) + fade(0→1), ease-out  
**Exit:** 120ms, reverse, ease-in  
**Mobile:** Respects `prefers-reduced-motion`

---

## Testing Checklist

- [ ] Click "+" without active playlist → popover appears at button location
- [ ] Popover positioned correctly on right side (most common case)
- [ ] Scroll page → popover closes smoothly
- [ ] Scroll results list → popover closes (nested scroll captured)
- [ ] Scroll near right edge → popover flips to left side correctly
- [ ] Caret points to button center in all positions
- [ ] Click "New playlist" → popover closes, new playlist editor opens
- [ ] Click "My playlists" → popover closes, playlist browser shows
- [ ] Escape key → popover closes
- [ ] Click outside popover → closes
- [ ] Rapid scrolling → no multiple close calls
- [ ] Mobile viewport → popover stays in bounds, touch works
- [ ] Keyboard navigation → focus management works
- [ ] Reduced motion → no animations, instant close

---

## Files Involved

- `src/components/DestinationSelector/DestinationSelector.jsx` — Main component
- `src/components/DestinationSelector/DestinationSelector.css` — Styling, animations, caret
- `src/components/Track/Track.jsx` — Passes button element via `addTrack()` callback
- `src/App.jsx` — State management, selector rendering

---

## Trade-offs

| Aspect | Choice | Trade-off |
|--------|--------|-----------|
| **Positioning** | Smart algorithm | Slightly more complex logic, but handles all edge cases |
| **Caret** | CSS pseudo-element | Limited styling vs. flexibility of SVG/separate element |
| **Close on scroll** | Always close | Prevents user from scrolling while choosing, but maintains UI integrity |
| **Fixed positioning** | `position: fixed` | Requires managing viewport offset calculations, but allows smooth animations |

---

## Portfolio Notes

This implementation demonstrates:
- ✅ Smart positioning algorithms for UI components
- ✅ Event listener management and cleanup (scroll, keyboard, click)
- ✅ CSS animations and pseudo-element techniques
- ✅ React state management for async UI patterns
- ✅ Accessibility (keyboard, focus, aria attributes)
- ✅ Mobile-first responsive design
- ✅ Microinteraction polish (smooth transitions, feedback)
