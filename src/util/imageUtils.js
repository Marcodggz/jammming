/**
 * Album Cover Management for Demo Mode
 * Provides clean, portfolio-safe album artwork using generated SVG covers.
 *
 * ALBUM_COVERS is derived directly from ALBUM_COVER_CONFIGS in
 * albumCoverGenerator.js — no manual key listing needed here.
 * Adding a new album only requires a config entry there.
 */

import { generateAllAlbumCovers } from "./albumCoverGenerator.js";

/**
 * Map of all album keys to their generated SVG data URL covers.
 * Automatically includes every entry defined in ALBUM_COVER_CONFIGS.
 */
export const ALBUM_COVERS = generateAllAlbumCovers();
