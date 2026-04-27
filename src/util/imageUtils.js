/**
 * Album Cover Management for Demo Mode
 * Provides clean, portfolio-safe album artwork using generated SVG covers
 */

import { generateAllAlbumCovers } from "./albumCoverGenerator.js";

/**
 * Generated album covers as data URLs.
 * Created programmatically — no external dependencies, no copyright concerns.
 */
const GENERATED_ALBUM_COVERS = generateAllAlbumCovers();

/**
 * Gets the album cover for a given album key.
 * @param {string} albumKey - The album identifier
 * @returns {string} SVG data URL for the album cover
 */
export const getAlbumCover = (albumKey) => {
  return GENERATED_ALBUM_COVERS[albumKey] || GENERATED_ALBUM_COVERS.default;
};

/**
 * Album cover mapping for the mock music catalog
 * Each key corresponds to an album in the mock dataset
 */
export const ALBUM_COVERS = {
  // The Weeknd
  after_hours: getAlbumCover("after_hours"),
  dawn_fm: getAlbumCover("dawn_fm"),

  // Lady Gaga
  chromatica: getAlbumCover("chromatica"),
  born_this_way: getAlbumCover("born_this_way"),

  // Harry Styles
  harrys_house: getAlbumCover("harrys_house"),
  fine_line: getAlbumCover("fine_line"),

  // Dua Lipa
  future_nostalgia: getAlbumCover("future_nostalgia"),
  dua_lipa: getAlbumCover("dua_lipa"),

  // Ed Sheeran
  divide: getAlbumCover("divide"),
  equals: getAlbumCover("equals"),

  // Billie Eilish
  happier_than_ever: getAlbumCover("happier_than_ever"),
  wwafawdwg: getAlbumCover("wwafawdwg"),

  // Feid
  ferxxocalipsis: getAlbumCover("ferxxocalipsis"),
  mor: getAlbumCover("mor"),

  // Bad Bunny
  un_verano_sin_ti: getAlbumCover("un_verano_sin_ti"),
  yhlqmdlg: getAlbumCover("yhlqmdlg"),

  // Nathy Peluso
  calambre: getAlbumCover("calambre"),
  la_sandunguera: getAlbumCover("la_sandunguera"),

  // Tyler, The Creator
  flower_boy: getAlbumCover("flower_boy"),
  igor: getAlbumCover("igor"),

  // Olivia Rodrigo
  sour: getAlbumCover("sour"),
  guts: getAlbumCover("guts"),

  // Ariana Grande
  positions: getAlbumCover("positions"),
  thank_u_next: getAlbumCover("thank_u_next"),
};
