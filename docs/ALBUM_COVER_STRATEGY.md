# Album Cover Strategy — Demo Mode

## Overview

Demo Mode uses a **custom SVG generation system** for album artwork to ensure:

- **Legal safety** — no commercial artwork, no copyright concerns
- **Visual consistency** — cohesive design across all albums
- **Performance** — data URLs load instantly with no external requests
- **Portfolio presentation** — polished visuals without relying on copyrighted assets

---

## Architecture

| File | Role |
|---|---|
| `src/util/albumCoverGenerator.js` | Generates SVG covers as data URLs |
| `src/util/imageUtils.js` | Exports the `ALBUM_COVERS` map used across the app |
| `src/util/mockMusicData.js` | Consumes `ALBUM_COVERS` to attach artwork to tracks |

---

## Technical Implementation

### SVG Generation

`albumCoverGenerator.js` creates unique covers using four pattern types:

| Pattern | Description |
|---|---|
| `gradient` | Smooth color transitions with subtle geometric elements |
| `geometric` | Angular shapes and overlapping polygons |
| `waves` | Flowing curved lines for softer aesthetics |
| `minimal` | Clean rectangles and simple layouts |

Each cover is returned as a self-contained `data:image/svg+xml` string — no file I/O, no network requests.

### Color Strategy

Each album configuration in `ALBUM_COVER_CONFIGS` includes a `primaryColor`, `accentColor`, and `pattern` chosen to suggest a general mood for each album without imitating official artwork.

---

## Adding a New Album

1. **Add a configuration entry** to `ALBUM_COVER_CONFIGS` in `albumCoverGenerator.js`:

```javascript
new_album: {
  artistName: 'Artist Name',
  albumName: 'Album Name',
  primaryColor: '#hex',
  accentColor: '#hex',
  pattern: 'geometric', // 'gradient' | 'geometric' | 'waves' | 'minimal'
},
```

2. **Reference it** in `mockMusicData.js`:

```javascript
image: ALBUM_COVERS.new_album,
```

`imageUtils.js` does not need to be touched — `generateAllAlbumCovers()` automatically includes every entry in `ALBUM_COVER_CONFIGS`.

---

## Design Philosophy

Album covers intentionally **do not imitate official artwork**. Abstract geometric designs:

- Suggest artistic mood through color and pattern only
- Maintain visual professionalism across the full catalog
- Avoid any trademark or copyright concerns
- Create a cohesive visual identity for the demo experience
