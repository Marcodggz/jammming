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

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

/**
 * Album cover configurations for the mock dataset.
 * One entry per album present in the mock catalog.
 */
export const ALBUM_COVER_CONFIGS = {
  // The Weeknd — dark, cinematic, neon-accented aesthetic
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
  starboy: {
    artistName: "The Weeknd",
    albumName: "Starboy",
    primaryColor: "#0d0d1a",
    accentColor: "#9b59b6",
    pattern: "geometric",
  },
  beauty_behind_the_madness: {
    artistName: "The Weeknd",
    albumName: "Beauty Behind the Madness",
    primaryColor: "#1c0a00",
    accentColor: "#e74c3c",
    pattern: "waves",
  },

  // Lady Gaga — bold, theatrical, avant-garde aesthetic
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
  mayhem: {
    artistName: "Lady Gaga",
    albumName: "MAYHEM",
    primaryColor: "#d4d4d4",
    accentColor: "#0a0a0a",
    textColor: "#0a0a0a",
    pattern: "geometric",
  },
  the_fame_monster: {
    artistName: "Lady Gaga",
    albumName: "The Fame Monster",
    primaryColor: "#0a0a0a",
    accentColor: "#cc0000",
    textColor: "#ffffff",
    pattern: "geometric",
  },

  // Dua Lipa — vibrant, dance-pop, neon retro aesthetic
  future_nostalgia: {
    artistName: "Dua Lipa",
    albumName: "Future Nostalgia",
    primaryColor: "#ff1493",
    accentColor: "#ffd700",
    pattern: "geometric",
  },
  radical_optimism: {
    artistName: "Dua Lipa",
    albumName: "Radical Optimism",
    primaryColor: "#6200ea",
    accentColor: "#00e5ff",
    pattern: "geometric",
  },

  // Feid — dark reggaeton atmosphere
  mor_no_le_temas: {
    artistName: "Feid",
    albumName: "MOR, NO LE TEMAS",
    primaryColor: "#0d1a0d",
    accentColor: "#00ff41",
    textColor: "#ffffff",
    pattern: "waves",
  },

  // Bad Bunny — reggaeton trap, vibrant summer aesthetic
  un_verano_sin_ti: {
    artistName: "Bad Bunny",
    albumName: "Un Verano Sin Ti",
    primaryColor: "#ff6b35",
    accentColor: "#ffd166",
    textColor: "#1a0a00",
    pattern: "waves",
  },

  // Billie Eilish — muted, alternative, introspective aesthetic
  happier_than_ever: {
    artistName: "Billie Eilish",
    albumName: "Happier Than Ever",
    primaryColor: "#f5f5dc",
    accentColor: "#4682b4",
    textColor: "#2c3e50",
    pattern: "minimal",
  },

  // Tyler, The Creator — vivid, maximalist, experimental aesthetic
  flower_boy: {
    artistName: "Tyler, The Creator",
    albumName: "Flower Boy",
    primaryColor: "#ff6b9d",
    accentColor: "#a8e6cf",
    textColor: "#2c3e50",
    pattern: "waves",
  },

  // Travis Scott — psychedelic, dark carnival, atmospheric aesthetic
  astroworld: {
    artistName: "Travis Scott",
    albumName: "Astroworld",
    primaryColor: "#1a0a00",
    accentColor: "#ff8c00",
    pattern: "geometric",
  },

  // Karol G — turquoise and pink, Colombian reggaeton aesthetic
  kg0516: {
    artistName: "Karol G",
    albumName: "KG0516",
    primaryColor: "#c9184a",
    accentColor: "#7209b7",
    pattern: "geometric",
  },
  karolg_manana: {
    artistName: "Karol G",
    albumName: "mañana será bonito",
    primaryColor: "#f72585",
    accentColor: "#ffe66d",
    textColor: "#1a0a00",
    pattern: "waves",
  },
  karolg_ocean: {
    artistName: "Karol G",
    albumName: "OCEAN",
    primaryColor: "#0096c7",
    accentColor: "#48cae4",
    textColor: "#ffffff",
    pattern: "waves",
  },
  karolg_tropicoqueta: {
    artistName: "Karol G",
    albumName: "TROPICOQUETA",
    primaryColor: "#e63946",
    accentColor: "#f4a261",
    textColor: "#ffffff",
    pattern: "geometric",
  },

  // Feid expanded
  feid_ferxxocalipsis: {
    artistName: "Feid",
    albumName: "FERXXOCALIPSIS",
    primaryColor: "#0a0a0a",
    accentColor: "#39ff14",
    textColor: "#ffffff",
    pattern: "geometric",
  },
  feid_19: {
    artistName: "Feid",
    albumName: "19",
    primaryColor: "#1a1a2e",
    accentColor: "#e94560",
    textColor: "#ffffff",
    pattern: "minimal",
  },
  feid_inter_shibuya: {
    artistName: "Feid",
    albumName: "INTER SHIBUYA",
    primaryColor: "#0f0c29",
    accentColor: "#302b63",
    textColor: "#ffffff",
    pattern: "geometric",
  },

  // Bad Bunny expanded
  bb_yhlqmdlg: {
    artistName: "Bad Bunny",
    albumName: "YHLQMDLG",
    primaryColor: "#000000",
    accentColor: "#ffdd00",
    textColor: "#ffffff",
    pattern: "geometric",
  },
  bb_ultimo_tour: {
    artistName: "Bad Bunny",
    albumName: "El Último Tour",
    primaryColor: "#1a1a1a",
    accentColor: "#ffffff",
    textColor: "#ffffff",
    pattern: "minimal",
  },
  bb_nadie_sabe: {
    artistName: "Bad Bunny",
    albumName: "Nadie Sabe",
    primaryColor: "#2d1b69",
    accentColor: "#c77dff",
    textColor: "#ffffff",
    pattern: "waves",
  },

  // Billie Eilish expanded
  billie_wwafawdwg: {
    artistName: "Billie Eilish",
    albumName: "WWAFAWDWG?",
    primaryColor: "#0d0d0d",
    accentColor: "#b5ff4a",
    textColor: "#b5ff4a",
    pattern: "minimal",
  },
  billie_hmhas: {
    artistName: "Billie Eilish",
    albumName: "HIT ME HARD AND SOFT",
    primaryColor: "#1a1a3e",
    accentColor: "#7b8cde",
    textColor: "#ffffff",
    pattern: "waves",
  },

  // Tyler, The Creator expanded
  tyler_igor: {
    artistName: "Tyler, The Creator",
    albumName: "IGOR",
    primaryColor: "#ffff00",
    accentColor: "#1c1c1c",
    textColor: "#1c1c1c",
    pattern: "minimal",
  },
  tyler_cmiygl: {
    artistName: "Tyler, The Creator",
    albumName: "CALL ME IF YOU GET LOST",
    primaryColor: "#006400",
    accentColor: "#ffd700",
    textColor: "#ffffff",
    pattern: "geometric",
  },
  tyler_chromakopia: {
    artistName: "Tyler, The Creator",
    albumName: "CHROMAKOPIA",
    primaryColor: "#8b4513",
    accentColor: "#ffd700",
    textColor: "#ffffff",
    pattern: "geometric",
  },

  // Travis Scott expanded
  travis_utopia: {
    artistName: "Travis Scott",
    albumName: "UTOPIA",
    primaryColor: "#0a0a0a",
    accentColor: "#4a9eff",
    textColor: "#ffffff",
    pattern: "geometric",
  },
  travis_rodeo: {
    artistName: "Travis Scott",
    albumName: "Rodeo",
    primaryColor: "#1a0028",
    accentColor: "#ff00ff",
    textColor: "#ffffff",
    pattern: "waves",
  },
  travis_bitm: {
    artistName: "Travis Scott",
    albumName: "Birds in the Trap",
    primaryColor: "#1a1a1a",
    accentColor: "#c0392b",
    textColor: "#ffffff",
    pattern: "geometric",
  },

  // Nathy Peluso — bold, theatrical, Latin soul
  nathy_calambre: {
    artistName: "Nathy Peluso",
    albumName: "calambre",
    primaryColor: "#c62828",
    accentColor: "#ff8f00",
    textColor: "#ffffff",
    pattern: "geometric",
  },
  nathy_grasa: {
    artistName: "Nathy Peluso",
    albumName: "grasa",
    primaryColor: "#212121",
    accentColor: "#e0e0e0",
    textColor: "#ffffff",
    pattern: "minimal",
  },
  nathy_esmeralda: {
    artistName: "Nathy Peluso",
    albumName: "esmeralda",
    primaryColor: "#1b5e20",
    accentColor: "#a5d6a7",
    textColor: "#ffffff",
    pattern: "waves",
  },

  // Frank Ocean — soft, introspective, R&B aesthetic
  frank_blonde: {
    artistName: "Frank Ocean",
    albumName: "Blonde",
    primaryColor: "#ffd54f",
    accentColor: "#ff8a65",
    textColor: "#1a1a1a",
    pattern: "minimal",
  },

  // A$AP Rocky — streetwear, high fashion, dark trap
  asap_dont_be_dumb: {
    artistName: "A$AP Rocky",
    albumName: "Don't Be Dumb",
    primaryColor: "#0d0d0d",
    accentColor: "#bdbdbd",
    textColor: "#ffffff",
    pattern: "geometric",
  },

  // Ariana Grande — dreamy pop, soft pinks and whites
  ariana_positions: {
    artistName: "Ariana Grande",
    albumName: "Positions",
    primaryColor: "#fce4ec",
    accentColor: "#f48fb1",
    textColor: "#4a148c",
    pattern: "waves",
  },

  // Mora — urban Latino
  mora_microdosis: {
    artistName: "Mora",
    albumName: "Microdosis",
    primaryColor: "#263238",
    accentColor: "#80cbc4",
    textColor: "#ffffff",
    pattern: "minimal",
  },

  // Chencho Corleone — trap romántico
  chencho_solo: {
    artistName: "Chencho Corleone",
    albumName: "Solo",
    primaryColor: "#1a1a2e",
    accentColor: "#e94560",
    textColor: "#ffffff",
    pattern: "geometric",
  },

  // Lana Del Rey — cinematic, vintage, melancholic
  lana_born_to_die: {
    artistName: "Lana Del Rey",
    albumName: "Born To Die",
    primaryColor: "#2c1654",
    accentColor: "#c9a0dc",
    textColor: "#ffffff",
    pattern: "waves",
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
