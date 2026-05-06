import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import "./PlaylistArtwork.css";

/**
 * PlaylistArtwork
 *
 * Renders playlist artwork in three modes:
 *   1. Real image  — when imageUrl is provided (Spotify mode or any explicit URL).
 *   2. Collage     — when artworkImages contains at least one URL.
 *                    1 image → full tile; 2-4 images → 2×2 grid.
 *   3. Fallback    — music icon when no image data is available.
 *
 * Props:
 *   imageUrl      {string|null}   — direct image URL (Spotify playlist art)
 *   artworkImages {string[]}      — ordered list of album-cover URLs (demo mode)
 *   name          {string}        — playlist name used as alt text for real images
 *   className     {string}        — forwarded to the outer wrapper div
 */
function PlaylistArtwork({ imageUrl, artworkImages, name, className = "" }) {
  const wrapperClass = `playlistArtwork ${className}`.trim();

  // Real playlist image takes precedence.
  if (imageUrl) {
    return (
      <div className={wrapperClass}>
        <img
          src={imageUrl}
          alt={name}
          className="playlistArtworkSingle"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  const covers = (artworkImages || []).slice(0, 4);

  // Single album cover — fill the entire tile.
  if (covers.length === 1) {
    return (
      <div className={wrapperClass} aria-hidden="true">
        <img
          src={covers[0]}
          alt=""
          className="playlistArtworkSingle"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  // Two to four covers — 2×2 grid (remaining cells stay empty).
  if (covers.length >= 2) {
    return (
      <div className={`${wrapperClass} playlistArtworkGrid`} aria-hidden="true">
        {covers.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="playlistArtworkGridImg"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    );
  }

  // No image data — music icon placeholder.
  return (
    <div className={wrapperClass} aria-hidden="true">
      <FontAwesomeIcon icon={faMusic} className="playlistArtworkIcon" />
    </div>
  );
}

export default PlaylistArtwork;
