# Album Cover Strategy — Demo Mode

## Overview

Demo Mode uses a **custom SVG generation system** for album artwork to ensure:

- **Legal safety** — no commercial artwork, no copyright concerns
- **Visual consistency** — cohesive design across all albums
- **Performance** — data URLs load instantly with no external requests
- **Portfolio readiness** — professional appearance for recruiter showcasing

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

Each artist has a color palette that reflects their musical identity:

| Artist | Colors | Style |
|---|---|---|
| The Weeknd | Dark red & deep blue | Moody R&B |
| Lady Gaga | Hot pink & black | Bold pop |
| Harry Styles | Soft blue & light pink | Contemporary pop |
| Dua Lipa | Vibrant magenta & purple | Dance-pop |
| Ed Sheeran | Warm orange & green | Acoustic |
| Billie Eilish | Light yellow & green | Indie / alternative |
| Feid | Dark green & neon yellow | Reggaeton urbano |
| Bad Bunny | Vibrant orange & gold | Latin trap |
| Nathy Peluso | Black & yellow | Neo-urban |
| Tyler, The Creator | Pink & green | Alternative hip-hop |
| Olivia Rodrigo | Purple & deep red | Alt-pop |
| Ariana Grande | Warm beige & light pink | Glamorous pop |

---

## Adding a New Album

1. **Add a configuration entry** in `albumCoverGenerator.js`:

```javascript
new_album: {
  artistName: 'Artist Name',
  albumName: 'Album Name',
  primaryColor: '#hex',
  accentColor: '#hex',
  pattern: 'geometric', // 'gradient' | 'geometric' | 'waves' | 'minimal'
},
```

2. **Export it** in `imageUtils.js`:

```javascript
new_album: getAlbumCover('new_album'),
```

3. **Reference it** in `mockMusicData.js`:

```javascript
image: ALBUM_COVERS.new_album,
```

---

## Design Philosophy

Album covers intentionally **do not imitate official artwork**. Abstract geometric designs:

- Suggest artistic mood through color and pattern only
- Maintain visual professionalism across the full catalog
- Avoid any trademark or copyright concerns
- Create a cohesive visual identity for the demo experience
