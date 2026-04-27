# Demo Mode — Mock Dataset

Documents the music catalog used by Demo Mode. The data lives in `src/util/mockMusicData.js` and is served by `src/util/mockSpotify.js`.

---

## Catalog Overview

**12 artists · 24 albums · 190+ tracks**

### International Artists

| Artist | Albums | Approx. tracks |
|---|---|---|
| The Weeknd | After Hours, Dawn FM | 14 |
| Lady Gaga | Chromatica, Born This Way | 20 |
| Harry Styles | Harry's House, Fine Line | 14 |
| Dua Lipa | Future Nostalgia, Dua Lipa | 14 |
| Ed Sheeran | ÷ (Divide), = (Equals) | 14 |
| Billie Eilish | Happier Than Ever, WHEN WE ALL FALL ASLEEP… | 14 |
| Tyler, The Creator | Flower Boy, IGOR | 14 |
| Olivia Rodrigo | SOUR, GUTS | 14 |
| Ariana Grande | Positions, thank u, next | 14 |

### Spanish / Latin Artists

| Artist | Albums | Approx. tracks |
|---|---|---|
| Feid | FERXXOCALIPSIS, MOR | 18 |
| Bad Bunny | Un Verano Sin Ti, YHLQMDLG | 14 |
| Nathy Peluso | Calambre, La Sandunguera | 18 |

---

## Search Behavior

`mockSpotify.js` mirrors the real Spotify search interface:

| Query type | Example | Matches |
|---|---|---|
| General | `"rain"` | Track name, artist name, or album name |
| Artist filter | `artist:"Feid"` | All tracks by Feid |
| Album filter | `album:"Chromatica"` | All tracks on Chromatica |

Results are capped at 20, matching the real API's default limit.

### Example searches

- `"bad"` → Bad Bunny tracks, *Bad Romance*, *Bad Habits*, *bad guy*
- `"love"` → Multiple tracks across artists
- `"Nathy"` → All 18 Nathy Peluso tracks

---

## Data Structure

```javascript
// mockMusicCatalog shape
artistKey: {
  artist: 'Artist Name',
  albums: {
    albumKey: {
      name: 'Album Name',
      image: ALBUM_COVERS.album_key,  // SVG data URL
      tracks: [
        {
          id: 'track_artist_n',       // unique across the full catalog
          name: 'Track Name',
          durationMs: 210000,
          uri: 'spotify:track:...',   // real Spotify URI
        }
      ]
    }
  }
}
```

`getFlattenedTracks()` flattens this into the array format used by the search service, adding `artists`, `album`, and `albumImage` to each track object.
