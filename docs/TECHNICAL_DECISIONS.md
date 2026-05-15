# Technical Decisions

## Excluding Playlist Tracks from Search Results

**Date:** March 2026

## Objective

Improve the search experience by hiding tracks that are already in the current playlist. This prevents duplicate actions and keeps the results focused on songs the user can still add.

## Background

Jammming already prevents duplicate tracks at the playlist logic level. However, showing already-added tracks in the search results creates unnecessary friction: the user can still see a track that is no longer actionable.

The UI should reflect the current playlist state. When a track is added, it should disappear from the visible search results. When it is removed from the playlist, it should become visible again if it still matches the current search.

## Decision

Keep the original Spotify search results in `tracks` and derive a filtered `visibleTracks` array during render.

This filtering happens in `App.jsx` because `App` owns both pieces of state:

- `tracks`
- `playlistTracks`

`SearchResults` remains presentational. It receives the already-filtered list and only handles rendering.

## Technical Approach

The app does not mutate the original `tracks` array when a song is added to the playlist. Instead, it derives the visible results by excluding any track whose `id` already exists in `playlistTracks`.

This keeps the data flow predictable:

1. Spotify returns search results.
2. The full results are stored in `tracks`.
3. `App.jsx` derives `visibleTracks`.
4. `SearchResults` renders `visibleTracks`.
5. Adding or removing tracks updates `playlistTracks`, which automatically updates the rendered results.

No changes are needed in `Spotify.js` because the Spotify API request stays the same. This is a client-side rendering decision, not an API-level change.

## Empty State

If every track returned by the current search is already in the playlist, `SearchResults` shows an empty-state message instead of an empty list. This makes it clear that the search worked, but there are no additional matching tracks available to add.

## Trade-offs

An alternative would be to request more Spotify results when too many visible results are filtered out. That could keep the results panel more populated, but it would add extra complexity:

- pagination state
- additional API requests
- more race-condition handling
- different behavior for artist and album drill-down searches

For this project, filtering the existing results is the better trade-off. It keeps the app simple, predictable, and aligned with the current architecture.