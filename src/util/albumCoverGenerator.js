/**
 * SVG Album Cover Generator
 * Creates clean, modern, portfolio-safe album artwork for demo mode
 * Each cover uses geometric patterns and appropriate color schemes
 */

/**
 * Generates an SVG album cover with geometric design
 * @param {Object} config - Cover configuration
 * @param {string} config.artistName - Artist name
 * @param {string} config.albumName - Album name
 * @param {string} config.primaryColor - Main color
 * @param {string} config.accentColor - Accent color
 * @param {string} config.textColor - Text color
 * @param {string} config.pattern - Pattern type: 'gradient', 'geometric', 'minimal', 'waves'
 * @returns {string} - SVG markup as data URL
 */

export const generateAlbumCover = ({
  artistName,
  albumName,
  primaryColor,
  accentColor,
  textColor = "#ffffff",
  pattern = "gradient",
}) => {
  const size = 400;
  const centerX = size / 2;
  const centerY = size / 2;

  let patternSVG = "";

  switch (pattern) {
    case "geometric":
      patternSVG = `
        <polygon points="0,0 ${size},0 ${centerX},${centerY}" fill="${accentColor}" opacity="0.3"/>
        <polygon points="${size},0 ${size},${size} ${centerX},${centerY}" fill="${accentColor}" opacity="0.2"/>
        <polygon points="${size},${size} 0,${size} ${centerX},${centerY}" fill="${accentColor}" opacity="0.3"/>
        <polygon points="0,${size} 0,0 ${centerX},${centerY}" fill="${accentColor}" opacity="0.2"/>
        <circle cx="${centerX}" cy="${centerY}" r="80" fill="none" stroke="${accentColor}" stroke-width="2" opacity="0.6"/>
      `;
      break;

    case "waves":
      patternSVG = `
        <path d="M0,${centerY} Q${size / 4},${centerY - 50} ${size / 2},${centerY} T${size},${centerY}" 
              fill="none" stroke="${accentColor}" stroke-width="3" opacity="0.4"/>
        <path d="M0,${centerY + 30} Q${size / 4},${centerY - 20} ${size / 2},${centerY + 30} T${size},${centerY + 30}" 
              fill="none" stroke="${accentColor}" stroke-width="2" opacity="0.3"/>
        <path d="M0,${centerY - 30} Q${size / 4},${centerY - 80} ${size / 2},${centerY - 30} T${size},${centerY - 30}" 
              fill="none" stroke="${accentColor}" stroke-width="2" opacity="0.3"/>
      `;
      break;

    case "minimal":
      patternSVG = `
        <rect x="50" y="50" width="${size - 100}" height="${size - 100}" 
              fill="none" stroke="${accentColor}" stroke-width="2" opacity="0.5"/>
        <rect x="80" y="80" width="${size - 160}" height="${size - 160}" 
              fill="${accentColor}" opacity="0.1"/>
      `;
      break;

    default: // gradient
      patternSVG = `
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${accentColor};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${size}" height="${size}" fill="url(#grad)"/>
        <circle cx="${centerX}" cy="${centerY}" r="120" fill="none" stroke="${textColor}" stroke-width="1" opacity="0.3"/>
      `;
  }

  // Truncate text if too long
  const truncatedArtist =
    artistName.length > 15 ? artistName.substring(0, 12) + "..." : artistName;
  const truncatedAlbum =
    albumName.length > 20 ? albumName.substring(0, 17) + "..." : albumName;

  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${primaryColor}"/>
      ${patternSVG}
      
      <!-- Artist Name -->
      <text x="${centerX}" y="${centerY - 20}" 
            font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
            text-anchor="middle" fill="${textColor}">
        ${truncatedArtist}
      </text>
      
      <!-- Album Name -->
      <text x="${centerX}" y="${centerY + 15}" 
            font-family="Arial, sans-serif" font-size="18" font-weight="normal" 
            text-anchor="middle" fill="${textColor}" opacity="0.9">
        ${truncatedAlbum}
      </text>
      
      <!-- Decorative border -->
      <rect x="10" y="10" width="${size - 20}" height="${size - 20}" 
            fill="none" stroke="${textColor}" stroke-width="1" opacity="0.2"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Album cover configurations for the mock dataset
 * Each entry defines the visual style for a specific album
 */
export const ALBUM_COVER_CONFIGS = {
  // The Weeknd - Dark, moody aesthetic
  after_hours: {
    artistName: "The Weeknd",
    albumName: "After Hours",
    primaryColor: "#1a1a1a",
    accentColor: "#8b0000",
    pattern: "waves",
  },
  dawn_fm: {
    artistName: "The Weeknd",
    albumName: "Dawn FM",
    primaryColor: "#2c3e50",
    accentColor: "#3498db",
    pattern: "geometric",
  },

  // Lady Gaga - Bold, pop aesthetic
  chromatica: {
    artistName: "Lady Gaga",
    albumName: "Chromatica",
    primaryColor: "#e91e63",
    accentColor: "#00e676",
    pattern: "geometric",
  },
  born_this_way: {
    artistName: "Lady Gaga",
    albumName: "Born This Way",
    primaryColor: "#000000",
    accentColor: "#ffffff",
    textColor: "#ffffff",
    pattern: "minimal",
  },

  // Harry Styles - Soft, contemporary aesthetic
  harrys_house: {
    artistName: "Harry Styles",
    albumName: "Harry's House",
    primaryColor: "#87ceeb",
    accentColor: "#ff6b6b",
    textColor: "#2c3e50",
    pattern: "waves",
  },
  fine_line: {
    artistName: "Harry Styles",
    albumName: "Fine Line",
    primaryColor: "#ffb6c1",
    accentColor: "#6c5ce7",
    textColor: "#2c3e50",
    pattern: "minimal",
  },

  // Dua Lipa - Vibrant, dance aesthetic
  future_nostalgia: {
    artistName: "Dua Lipa",
    albumName: "Future Nostalgia",
    primaryColor: "#ff1493",
    accentColor: "#ffd700",
    pattern: "geometric",
  },
  dua_lipa: {
    artistName: "Dua Lipa",
    albumName: "Dua Lipa",
    primaryColor: "#9370db",
    accentColor: "#00ced1",
    pattern: "waves",
  },

  // Ed Sheeran - Warm, acoustic aesthetic
  divide: {
    artistName: "Ed Sheeran",
    albumName: "Divide",
    primaryColor: "#ff8c00",
    accentColor: "#ffd700",
    textColor: "#2c3e50",
    pattern: "minimal",
  },
  equals: {
    artistName: "Ed Sheeran",
    albumName: "Equals",
    primaryColor: "#32cd32",
    accentColor: "#228b22",
    textColor: "#ffffff",
    pattern: "waves",
  },

  // Billie Eilish - Alternative, indie aesthetic
  happier_than_ever: {
    artistName: "Billie Eilish",
    albumName: "Happier Than Ever",
    primaryColor: "#f5f5dc",
    accentColor: "#4682b4",
    textColor: "#2c3e50",
    pattern: "minimal",
  },
  wwafawdwg: {
    artistName: "Billie Eilish",
    albumName: "WWAFAWDWG",
    primaryColor: "#90ee90",
    accentColor: "#006400",
    textColor: "#2c3e50",
    pattern: "geometric",
  },

  // Feid - Latin trap/urbano
  ferxxocalipsis: {
    artistName: "Feid",
    albumName: "FERXXOCALIPSIS",
    primaryColor: "#228B22",
    accentColor: "#FFD700",
    pattern: "geometric",
  },
  mor: {
    artistName: "Feid",
    albumName: "MOR",
    primaryColor: "#1a472a",
    accentColor: "#39ff14",
    pattern: "waves",
  },

  // Bad Bunny - Reggaeton aesthetic
  un_verano_sin_ti: {
    artistName: "Bad Bunny",
    albumName: "Un Verano Sin Ti",
    primaryColor: "#ff4500",
    accentColor: "#ffd700",
    textColor: "#2c3e50",
    pattern: "waves",
  },
  yhlqmdlg: {
    artistName: "Bad Bunny",
    albumName: "YHLQMDLG",
    primaryColor: "#ffd700",
    accentColor: "#ff6347",
    textColor: "#2c3e50",
    pattern: "geometric",
  },

  // Nathy Peluso - Argentine urban/soul
  calambre: {
    artistName: "Nathy Peluso",
    albumName: "Calambre",
    primaryColor: "#0d0d0d",
    accentColor: "#FFD700",
    textColor: "#ffffff",
    pattern: "geometric",
  },
  la_sandunguera: {
    artistName: "Nathy Peluso",
    albumName: "La Sandunguera",
    primaryColor: "#7b1fa2",
    accentColor: "#f06292",
    textColor: "#ffffff",
    pattern: "waves",
  },

  // Tyler, The Creator - Hip-hop/Alternative rap
  flower_boy: {
    artistName: "Tyler, The Creator",
    albumName: "Flower Boy",
    primaryColor: "#ff6b9d",
    accentColor: "#a8e6cf",
    textColor: "#2c3e50",
    pattern: "waves",
  },
  igor: {
    artistName: "Tyler, The Creator",
    albumName: "IGOR",
    primaryColor: "#ff6347",
    accentColor: "#ffd700",
    textColor: "#2c3e50",
    pattern: "minimal",
  },

  // Olivia Rodrigo - Gen Z pop
  sour: {
    artistName: "Olivia Rodrigo",
    albumName: "SOUR",
    primaryColor: "#dda0dd",
    accentColor: "#ff1493",
    textColor: "#2c3e50",
    pattern: "minimal",
  },
  guts: {
    artistName: "Olivia Rodrigo",
    albumName: "GUTS",
    primaryColor: "#8b0000",
    accentColor: "#ff69b4",
    pattern: "geometric",
  },

  // Ariana Grande - Glamorous pop
  positions: {
    artistName: "Ariana Grande",
    albumName: "Positions",
    primaryColor: "#f5deb3",
    accentColor: "#da70d6",
    textColor: "#2c3e50",
    pattern: "waves",
  },
  thank_u_next: {
    artistName: "Ariana Grande",
    albumName: "Thank U Next",
    primaryColor: "#ffb6c1",
    accentColor: "#ff1493",
    textColor: "#2c3e50",
    pattern: "minimal",
  },
};

/**
 * Generates all album covers and returns a map of album keys to data URLs
 * @returns {Object} Map of album keys to SVG data URLs
 */
export const generateAllAlbumCovers = () => {
  const covers = {};

  Object.entries(ALBUM_COVER_CONFIGS).forEach(([key, config]) => {
    covers[key] = generateAlbumCover(config);
  });

  return covers;
};
