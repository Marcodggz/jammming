// Mock music catalog for demo mode

import { ALBUM_COVERS } from "./imageUtils.js";

/**
 * Mock music catalog with curated artists, albums, and tracks.
 *
 * Track objects that include featured artists carry an `artists` array
 * directly in the catalog entry. The flatten helpers merge this with the
 * main artist so every flat track always has a complete `artists` array.
 *
 * @type {Object.<string, {artist: string, albums: Object}>}
 */
export const mockMusicCatalog = {
  // ---------------------------------------------------------------------------
  // The Weeknd — 4 albums × 10 tracks
  // ---------------------------------------------------------------------------
  theWeeknd: {
    artist: "The Weeknd",
    albums: {
      afterHours: {
        name: "After Hours",
        image: ALBUM_COVERS.after_hours,
        tracks: [
          {
            id: "weeknd-ah-01",
            name: "Alone Again",
            durationMs: 199000,
            uri: "spotify:track:mock-weeknd-ah-01",
          },
          {
            id: "weeknd-ah-02",
            name: "Too Late",
            durationMs: 239893,
            uri: "spotify:track:mock-weeknd-ah-02",
          },
          {
            id: "weeknd-ah-03",
            name: "Hardest To Love",
            durationMs: 231600,
            uri: "spotify:track:mock-weeknd-ah-03",
          },
          {
            id: "weeknd-ah-04",
            name: "Scared To Live",
            durationMs: 191387,
            uri: "spotify:track:mock-weeknd-ah-04",
          },
          {
            id: "weeknd-ah-05",
            name: "Snowchild",
            durationMs: 253320,
            uri: "spotify:track:mock-weeknd-ah-05",
          },
          {
            id: "weeknd-ah-06",
            name: "Escape From LA",
            durationMs: 356107,
            uri: "spotify:track:mock-weeknd-ah-06",
          },
          {
            id: "weeknd-ah-07",
            name: "Heartless",
            durationMs: 198040,
            uri: "spotify:track:mock-weeknd-ah-07",
          },
          {
            id: "weeknd-ah-08",
            name: "Faith",
            durationMs: 283333,
            uri: "spotify:track:mock-weeknd-ah-08",
          },
          {
            id: "weeknd-ah-09",
            name: "Blinding Lights",
            durationMs: 200053,
            uri: "spotify:track:mock-weeknd-ah-09",
          },
          {
            id: "weeknd-ah-10",
            name: "In Your Eyes",
            durationMs: 234767,
            uri: "spotify:track:mock-weeknd-ah-10",
          },
        ],
      },
      dawnFm: {
        name: "Dawn FM",
        image: ALBUM_COVERS.dawn_fm,
        tracks: [
          {
            id: "weeknd-df-01",
            name: "Gasoline",
            durationMs: 193067,
            uri: "spotify:track:mock-weeknd-df-01",
          },
          {
            id: "weeknd-df-02",
            name: "How Do I Make You Love Me?",
            durationMs: 230400,
            uri: "spotify:track:mock-weeknd-df-02",
          },
          {
            id: "weeknd-df-03",
            name: "Take My Breath",
            durationMs: 219893,
            uri: "spotify:track:mock-weeknd-df-03",
          },
          {
            id: "weeknd-df-04",
            name: "Sacrifice",
            durationMs: 188307,
            uri: "spotify:track:mock-weeknd-df-04",
          },
          {
            id: "weeknd-df-05",
            name: "A Tale By Quincy",
            durationMs: 109000,
            uri: "spotify:track:mock-weeknd-df-05",
          },
          {
            id: "weeknd-df-06",
            name: "Out of Time",
            durationMs: 214240,
            uri: "spotify:track:mock-weeknd-df-06",
          },
          {
            id: "weeknd-df-07",
            name: "Here We Go... Again",
            artists: ["The Weeknd", "Tyler, The Creator"],
            durationMs: 264533,
            uri: "spotify:track:mock-weeknd-df-07",
          },
          {
            id: "weeknd-df-08",
            name: "Best Friends",
            durationMs: 165000,
            uri: "spotify:track:mock-weeknd-df-08",
          },
          {
            id: "weeknd-df-09",
            name: "Is There Someone Else?",
            durationMs: 193000,
            uri: "spotify:track:mock-weeknd-df-09",
          },
          {
            id: "weeknd-df-10",
            name: "Less Than Zero",
            durationMs: 211987,
            uri: "spotify:track:mock-weeknd-df-10",
          },
        ],
      },
      starboy: {
        name: "Starboy",
        image: ALBUM_COVERS.starboy,
        tracks: [
          {
            id: "weeknd-sb-01",
            name: "Starboy",
            durationMs: 230000,
            uri: "spotify:track:mock-weeknd-sb-01",
          },
          {
            id: "weeknd-sb-02",
            name: "Party Monster",
            durationMs: 249013,
            uri: "spotify:track:mock-weeknd-sb-02",
          },
          {
            id: "weeknd-sb-03",
            name: "False Alarm",
            durationMs: 220360,
            uri: "spotify:track:mock-weeknd-sb-03",
          },
          {
            id: "weeknd-sb-04",
            name: "Reminder",
            durationMs: 217440,
            uri: "spotify:track:mock-weeknd-sb-04",
          },
          {
            id: "weeknd-sb-05",
            name: "Rockin'",
            durationMs: 219280,
            uri: "spotify:track:mock-weeknd-sb-05",
          },
          {
            id: "weeknd-sb-06",
            name: "Secrets",
            durationMs: 249013,
            uri: "spotify:track:mock-weeknd-sb-06",
          },
          {
            id: "weeknd-sb-07",
            name: "True Colors",
            durationMs: 266440,
            uri: "spotify:track:mock-weeknd-sb-07",
          },
          {
            id: "weeknd-sb-08",
            name: "Stargirl Interlude",
            artists: ["The Weeknd", "Lana Del Rey"],
            durationMs: 226000,
            uri: "spotify:track:mock-weeknd-sb-08",
          },
          {
            id: "weeknd-sb-09",
            name: "Sidewalks",
            durationMs: 246000,
            uri: "spotify:track:mock-weeknd-sb-09",
          },
          {
            id: "weeknd-sb-10",
            name: "Six Feet Under",
            durationMs: 237000,
            uri: "spotify:track:mock-weeknd-sb-10",
          },
        ],
      },
      beautyBehindTheMadness: {
        name: "Beauty Behind the Madness",
        image: ALBUM_COVERS.beauty_behind_the_madness,
        tracks: [
          {
            id: "weeknd-btm-01",
            name: "Real Life",
            durationMs: 280000,
            uri: "spotify:track:mock-weeknd-btm-01",
          },
          {
            id: "weeknd-btm-02",
            name: "Losers",
            durationMs: 266440,
            uri: "spotify:track:mock-weeknd-btm-02",
          },
          {
            id: "weeknd-btm-03",
            name: "Tell Your Friends",
            durationMs: 268360,
            uri: "spotify:track:mock-weeknd-btm-03",
          },
          {
            id: "weeknd-btm-04",
            name: "Often",
            durationMs: 343120,
            uri: "spotify:track:mock-weeknd-btm-04",
          },
          {
            id: "weeknd-btm-05",
            name: "The Hills",
            durationMs: 242080,
            uri: "spotify:track:mock-weeknd-btm-05",
          },
          {
            id: "weeknd-btm-06",
            name: "Acquainted",
            durationMs: 337560,
            uri: "spotify:track:mock-weeknd-btm-06",
          },
          {
            id: "weeknd-btm-07",
            name: "Can't Feel My Face",
            durationMs: 214240,
            uri: "spotify:track:mock-weeknd-btm-07",
          },
          {
            id: "weeknd-btm-08",
            name: "Shameless",
            durationMs: 235480,
            uri: "spotify:track:mock-weeknd-btm-08",
          },
          {
            id: "weeknd-btm-09",
            name: "Earned It",
            durationMs: 271160,
            uri: "spotify:track:mock-weeknd-btm-09",
          },
          {
            id: "weeknd-btm-10",
            name: "In the Night",
            durationMs: 249000,
            uri: "spotify:track:mock-weeknd-btm-10",
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Lady Gaga — 4 albums × 10 tracks (The Fame Monster has 8)
  // ---------------------------------------------------------------------------
  ladyGaga: {
    artist: "Lady Gaga",
    albums: {
      chromatica: {
        name: "Chromatica",
        image: ALBUM_COVERS.chromatica,
        tracks: [
          {
            id: "gaga-chr-01",
            name: "Alice",
            durationMs: 185000,
            uri: "spotify:track:mock-gaga-chr-01",
          },
          {
            id: "gaga-chr-02",
            name: "Stupid Love",
            durationMs: 193093,
            uri: "spotify:track:mock-gaga-chr-02",
          },
          {
            id: "gaga-chr-03",
            name: "Rain On Me",
            artists: ["Lady Gaga", "Ariana Grande"],
            durationMs: 182427,
            uri: "spotify:track:mock-gaga-chr-03",
          },
          {
            id: "gaga-chr-04",
            name: "Free Woman",
            durationMs: 191187,
            uri: "spotify:track:mock-gaga-chr-04",
          },
          {
            id: "gaga-chr-05",
            name: "Fun Tonight",
            durationMs: 194000,
            uri: "spotify:track:mock-gaga-chr-05",
          },
          {
            id: "gaga-chr-06",
            name: "911",
            durationMs: 174653,
            uri: "spotify:track:mock-gaga-chr-06",
          },
          {
            id: "gaga-chr-07",
            name: "Plastic Doll",
            durationMs: 194427,
            uri: "spotify:track:mock-gaga-chr-07",
          },
          {
            id: "gaga-chr-08",
            name: "Sour Candy",
            durationMs: 136800,
            uri: "spotify:track:mock-gaga-chr-08",
          },
          {
            id: "gaga-chr-09",
            name: "Enigma",
            durationMs: 208506,
            uri: "spotify:track:mock-gaga-chr-09",
          },
          {
            id: "gaga-chr-10",
            name: "Replay",
            durationMs: 195840,
            uri: "spotify:track:mock-gaga-chr-10",
          },
        ],
      },
      bornThisWay: {
        name: "Born This Way",
        image: ALBUM_COVERS.born_this_way,
        tracks: [
          {
            id: "gaga-btw-01",
            name: "Marry The Night",
            durationMs: 258467,
            uri: "spotify:track:mock-gaga-btw-01",
          },
          {
            id: "gaga-btw-02",
            name: "Born This Way",
            durationMs: 260680,
            uri: "spotify:track:mock-gaga-btw-02",
          },
          {
            id: "gaga-btw-03",
            name: "Government Hooker",
            durationMs: 263173,
            uri: "spotify:track:mock-gaga-btw-03",
          },
          {
            id: "gaga-btw-04",
            name: "Judas",
            durationMs: 249040,
            uri: "spotify:track:mock-gaga-btw-04",
          },
          {
            id: "gaga-btw-05",
            name: "Americano",
            durationMs: 266000,
            uri: "spotify:track:mock-gaga-btw-05",
          },
          {
            id: "gaga-btw-06",
            name: "Hair",
            durationMs: 362067,
            uri: "spotify:track:mock-gaga-btw-06",
          },
          {
            id: "gaga-btw-07",
            name: "Scheiße",
            durationMs: 219707,
            uri: "spotify:track:mock-gaga-btw-07",
          },
          {
            id: "gaga-btw-08",
            name: "Bloody Mary",
            durationMs: 277000,
            uri: "spotify:track:mock-gaga-btw-08",
          },
          {
            id: "gaga-btw-09",
            name: "Bad Kids",
            durationMs: 248000,
            uri: "spotify:track:mock-gaga-btw-09",
          },
          {
            id: "gaga-btw-10",
            name: "The Edge of Glory",
            durationMs: 320040,
            uri: "spotify:track:mock-gaga-btw-10",
          },
        ],
      },
      mayhem: {
        name: "MAYHEM",
        image: ALBUM_COVERS.mayhem,
        tracks: [
          {
            id: "gaga-mhm-01",
            name: "Disease",
            durationMs: 210000,
            uri: "spotify:track:mock-gaga-mhm-01",
          },
          {
            id: "gaga-mhm-02",
            name: "Abracadabra",
            durationMs: 197000,
            uri: "spotify:track:mock-gaga-mhm-02",
          },
          {
            id: "gaga-mhm-03",
            name: "Garden of Eden",
            durationMs: 232000,
            uri: "spotify:track:mock-gaga-mhm-03",
          },
          {
            id: "gaga-mhm-04",
            name: "Perfect Celebrity",
            durationMs: 208000,
            uri: "spotify:track:mock-gaga-mhm-04",
          },
          {
            id: "gaga-mhm-05",
            name: "Vanish Into You",
            durationMs: 225000,
            uri: "spotify:track:mock-gaga-mhm-05",
          },
          {
            id: "gaga-mhm-06",
            name: "Killah",
            durationMs: 202000,
            uri: "spotify:track:mock-gaga-mhm-06",
          },
          {
            id: "gaga-mhm-07",
            name: "Zombieboy",
            durationMs: 221000,
            uri: "spotify:track:mock-gaga-mhm-07",
          },
          {
            id: "gaga-mhm-08",
            name: "LoveDrug",
            durationMs: 215000,
            uri: "spotify:track:mock-gaga-mhm-08",
          },
          {
            id: "gaga-mhm-09",
            name: "How Bad Do U Want Me",
            durationMs: 235000,
            uri: "spotify:track:mock-gaga-mhm-09",
          },
          {
            id: "gaga-mhm-10",
            name: "Don't Call Tonight",
            durationMs: 219000,
            uri: "spotify:track:mock-gaga-mhm-10",
          },
        ],
      },
      // The Fame Monster has 8 tracks in the dataset
      fameMonstser: {
        name: "The Fame Monster",
        image: ALBUM_COVERS.the_fame_monster,
        tracks: [
          {
            id: "gaga-tfm-01",
            name: "Bad Romance",
            durationMs: 294880,
            uri: "spotify:track:mock-gaga-tfm-01",
          },
          {
            id: "gaga-tfm-02",
            name: "Alejandro",
            durationMs: 277400,
            uri: "spotify:track:mock-gaga-tfm-02",
          },
          {
            id: "gaga-tfm-03",
            name: "Monster",
            durationMs: 235000,
            uri: "spotify:track:mock-gaga-tfm-03",
          },
          {
            id: "gaga-tfm-04",
            name: "Speechless",
            durationMs: 298000,
            uri: "spotify:track:mock-gaga-tfm-04",
          },
          {
            id: "gaga-tfm-05",
            name: "Dance In The Dark",
            durationMs: 350000,
            uri: "spotify:track:mock-gaga-tfm-05",
          },
          {
            id: "gaga-tfm-06",
            name: "Telephone",
            durationMs: 221000,
            uri: "spotify:track:mock-gaga-tfm-06",
          },
          {
            id: "gaga-tfm-07",
            name: "So Happy I Could Die",
            durationMs: 237000,
            uri: "spotify:track:mock-gaga-tfm-07",
          },
          {
            id: "gaga-tfm-08",
            name: "Teeth",
            durationMs: 246000,
            uri: "spotify:track:mock-gaga-tfm-08",
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Dua Lipa — 2 albums × 10 tracks
  // ---------------------------------------------------------------------------
  duaLipa: {
    artist: "Dua Lipa",
    albums: {
      futureNostalgia: {
        name: "Future Nostalgia",
        image: ALBUM_COVERS.future_nostalgia,
        tracks: [
          {
            id: "dua-fn-01",
            name: "Future Nostalgia",
            durationMs: 184000,
            uri: "spotify:track:mock-dua-fn-01",
          },
          {
            id: "dua-fn-02",
            name: "Don't Start Now",
            durationMs: 183290,
            uri: "spotify:track:mock-dua-fn-02",
          },
          {
            id: "dua-fn-03",
            name: "Cool",
            durationMs: 209000,
            uri: "spotify:track:mock-dua-fn-03",
          },
          {
            id: "dua-fn-04",
            name: "Physical",
            durationMs: 194107,
            uri: "spotify:track:mock-dua-fn-04",
          },
          {
            id: "dua-fn-05",
            name: "Levitating",
            durationMs: 203064,
            uri: "spotify:track:mock-dua-fn-05",
          },
          {
            id: "dua-fn-06",
            name: "Pretty Please",
            durationMs: 191000,
            uri: "spotify:track:mock-dua-fn-06",
          },
          {
            id: "dua-fn-07",
            name: "Hallucinate",
            durationMs: 208000,
            uri: "spotify:track:mock-dua-fn-07",
          },
          {
            id: "dua-fn-08",
            name: "Love Again",
            durationMs: 264107,
            uri: "spotify:track:mock-dua-fn-08",
          },
          {
            id: "dua-fn-09",
            name: "Break My Heart",
            durationMs: 221000,
            uri: "spotify:track:mock-dua-fn-09",
          },
          {
            id: "dua-fn-10",
            name: "Boys Will Be Boys",
            durationMs: 218000,
            uri: "spotify:track:mock-dua-fn-10",
          },
        ],
      },
      radicalOptimism: {
        name: "Radical Optimism",
        image: ALBUM_COVERS.radical_optimism,
        tracks: [
          {
            id: "dua-ro-01",
            name: "End of an Era",
            durationMs: 217000,
            uri: "spotify:track:mock-dua-ro-01",
          },
          {
            id: "dua-ro-02",
            name: "Houdini",
            durationMs: 180000,
            uri: "spotify:track:mock-dua-ro-02",
          },
          {
            id: "dua-ro-03",
            name: "Training Season",
            durationMs: 197000,
            uri: "spotify:track:mock-dua-ro-03",
          },
          {
            id: "dua-ro-04",
            name: "These Walls",
            durationMs: 222000,
            uri: "spotify:track:mock-dua-ro-04",
          },
          {
            id: "dua-ro-05",
            name: "Whatcha Doing",
            durationMs: 196000,
            uri: "spotify:track:mock-dua-ro-05",
          },
          {
            id: "dua-ro-06",
            name: "French Exit",
            durationMs: 203000,
            uri: "spotify:track:mock-dua-ro-06",
          },
          {
            id: "dua-ro-07",
            name: "Illusion",
            durationMs: 187000,
            uri: "spotify:track:mock-dua-ro-07",
          },
          {
            id: "dua-ro-08",
            name: "Falling Forever",
            durationMs: 211000,
            uri: "spotify:track:mock-dua-ro-08",
          },
          {
            id: "dua-ro-09",
            name: "Anything for Love",
            durationMs: 209000,
            uri: "spotify:track:mock-dua-ro-09",
          },
          {
            id: "dua-ro-10",
            name: "Maria",
            durationMs: 201000,
            uri: "spotify:track:mock-dua-ro-10",
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Feid — 1 album × 10 tracks
  // ---------------------------------------------------------------------------
  feid: {
    artist: "Feid",
    albums: {
      morNoLeTemas: {
        name: "MOR, NO LE TEMAS A LA OSCURIDAD",
        image: ALBUM_COVERS.mor_no_le_temas,
        tracks: [
          {
            id: "feid-mor-01",
            name: "Niña bonita",
            durationMs: 185000,
            uri: "spotify:track:mock-feid-mor-01",
          },
          {
            id: "feid-mor-02",
            name: "Gángsters y pistolas",
            durationMs: 193000,
            uri: "spotify:track:mock-feid-mor-02",
          },
          {
            id: "feid-mor-03",
            name: "Ferxxo 151",
            durationMs: 178000,
            uri: "spotify:track:mock-feid-mor-03",
          },
          {
            id: "feid-mor-04",
            name: "Bubalu",
            durationMs: 183000,
            uri: "spotify:track:mock-feid-mor-04",
          },
          {
            id: "feid-mor-05",
            name: "Ritmo de medallo",
            durationMs: 196000,
            uri: "spotify:track:mock-feid-mor-05",
          },
          {
            id: "feid-mor-06",
            name: "Ferxxo Edition",
            durationMs: 188000,
            uri: "spotify:track:mock-feid-mor-06",
          },
          {
            id: "feid-mor-07",
            name: "Nx tx sientas solx",
            durationMs: 201000,
            uri: "spotify:track:mock-feid-mor-07",
          },
          {
            id: "feid-mor-08",
            name: "Luces de tecno",
            durationMs: 175000,
            uri: "spotify:track:mock-feid-mor-08",
          },
          {
            id: "feid-mor-09",
            name: "Ey, chory",
            durationMs: 191000,
            uri: "spotify:track:mock-feid-mor-09",
          },
          {
            id: "feid-mor-10",
            name: "Velocidad crucero",
            durationMs: 207000,
            uri: "spotify:track:mock-feid-mor-10",
          },
        ],
      },
      ferxxocalipsis: {
        name: "FERXXOCALIPSIS",
        image: ALBUM_COVERS.feid_ferxxocalipsis,
        tracks: [
          {
            id: "feid-fx-01",
            name: "Alakran",
            durationMs: 189000,
            uri: "spotify:track:mock-feid-fx-01",
          },
          {
            id: "feid-fx-02",
            name: "50 palos",
            durationMs: 193000,
            uri: "spotify:track:mock-feid-fx-02",
          },
          {
            id: "feid-fx-03",
            name: "Cuál es esa",
            durationMs: 178000,
            uri: "spotify:track:mock-feid-fx-03",
          },
          {
            id: "feid-fx-04",
            name: "Interlude",
            durationMs: 72000,
            uri: "spotify:track:mock-feid-fx-04",
          },
          {
            id: "feid-fx-05",
            name: "Luna",
            durationMs: 196000,
            uri: "spotify:track:mock-feid-fx-05",
          },
          {
            id: "feid-fx-06",
            name: "Esquirla",
            durationMs: 183000,
            uri: "spotify:track:mock-feid-fx-06",
          },
          {
            id: "feid-fx-07",
            name: "Desquite",
            durationMs: 201000,
            uri: "spotify:track:mock-feid-fx-07",
          },
          {
            id: "feid-fx-08",
            name: "Yo AK",
            durationMs: 188000,
            uri: "spotify:track:mock-feid-fx-08",
          },
          {
            id: "feid-fx-09",
            name: "Classy 101",
            durationMs: 169000,
            uri: "spotify:track:mock-feid-fx-09",
          },
        ],
      },
      feid19: {
        name: "19",
        image: ALBUM_COVERS.feid_19,
        tracks: [
          {
            id: "feid-19-01",
            name: "BUENA MALA",
            durationMs: 185000,
            uri: "spotify:track:mock-feid-19-01",
          },
          {
            id: "feid-19-02",
            name: "BADWINE",
            durationMs: 178000,
            uri: "spotify:track:mock-feid-19-02",
          },
          {
            id: "feid-19-03",
            name: "QUIERO",
            durationMs: 193000,
            uri: "spotify:track:mock-feid-19-03",
          },
          {
            id: "feid-19-04",
            name: "SIGUEME",
            durationMs: 187000,
            uri: "spotify:track:mock-feid-19-04",
          },
          {
            id: "feid-19-05",
            name: "SUBIENDO",
            durationMs: 196000,
            uri: "spotify:track:mock-feid-19-05",
          },
          {
            id: "feid-19-06",
            name: "VEN PA CASA",
            durationMs: 202000,
            uri: "spotify:track:mock-feid-19-06",
          },
          {
            id: "feid-19-07",
            name: "FKU",
            durationMs: 180000,
            uri: "spotify:track:mock-feid-19-07",
          },
          {
            id: "feid-19-08",
            name: "RON",
            durationMs: 171000,
            uri: "spotify:track:mock-feid-19-08",
          },
          {
            id: "feid-19-09",
            name: "VEN PA CASA_RGT",
            durationMs: 198000,
            uri: "spotify:track:mock-feid-19-09",
          },
          {
            id: "feid-19-10",
            name: "TRAMPA",
            durationMs: 190000,
            uri: "spotify:track:mock-feid-19-10",
          },
        ],
      },
      interShibuya: {
        name: "INTER SHIBUYA - LA MAFIA",
        image: ALBUM_COVERS.feid_inter_shibuya,
        tracks: [
          {
            id: "feid-is-01",
            name: "Coron",
            durationMs: 195000,
            uri: "spotify:track:mock-feid-is-01",
          },
          {
            id: "feid-is-02",
            name: "Chimbita",
            durationMs: 187000,
            uri: "spotify:track:mock-feid-is-02",
          },
          {
            id: "feid-is-03",
            name: "Tengo fe",
            durationMs: 203000,
            uri: "spotify:track:mock-feid-is-03",
          },
          {
            id: "feid-is-04",
            name: "Como cuando",
            durationMs: 191000,
            uri: "spotify:track:mock-feid-is-04",
          },
          {
            id: "feid-is-05",
            name: "Jordan IV",
            durationMs: 198000,
            uri: "spotify:track:mock-feid-is-05",
          },
          {
            id: "feid-is-06",
            name: "Fumeteo",
            durationMs: 185000,
            uri: "spotify:track:mock-feid-is-06",
          },
          {
            id: "feid-is-07",
            name: "Purrito apa",
            durationMs: 178000,
            uri: "spotify:track:mock-feid-is-07",
          },
          {
            id: "feid-is-08",
            name: "XXXX",
            durationMs: 194000,
            uri: "spotify:track:mock-feid-is-08",
          },
          {
            id: "feid-is-09",
            name: "Ferxxo VI",
            durationMs: 207000,
            uri: "spotify:track:mock-feid-is-09",
          },
          {
            id: "feid-is-10",
            name: "Hulu",
            durationMs: 188000,
            uri: "spotify:track:mock-feid-is-10",
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Bad Bunny — 1 album × 10 tracks
  // ---------------------------------------------------------------------------
  badBunny: {
    artist: "Bad Bunny",
    albums: {
      unVeranoSinTi: {
        name: "Un Verano Sin Ti",
        image: ALBUM_COVERS.un_verano_sin_ti,
        tracks: [
          {
            id: "bb-uvst-01",
            name: "Moscow Mule",
            durationMs: 181000,
            uri: "spotify:track:mock-bb-uvst-01",
          },
          {
            id: "bb-uvst-02",
            name: "Después de la Playa",
            durationMs: 185000,
            uri: "spotify:track:mock-bb-uvst-02",
          },
          {
            id: "bb-uvst-03",
            name: "Me Porto Bonito",
            artists: ["Bad Bunny", "Chencho Corleone"],
            durationMs: 178000,
            uri: "spotify:track:mock-bb-uvst-03",
          },
          {
            id: "bb-uvst-04",
            name: "Tití Me Preguntó",
            durationMs: 235000,
            uri: "spotify:track:mock-bb-uvst-04",
          },
          {
            id: "bb-uvst-05",
            name: "Un Ratito",
            durationMs: 174000,
            uri: "spotify:track:mock-bb-uvst-05",
          },
          {
            id: "bb-uvst-06",
            name: "Yo No Soy Celoso",
            durationMs: 169000,
            uri: "spotify:track:mock-bb-uvst-06",
          },
          {
            id: "bb-uvst-07",
            name: "Tarot",
            durationMs: 225000,
            uri: "spotify:track:mock-bb-uvst-07",
          },
          {
            id: "bb-uvst-08",
            name: "Neverita",
            durationMs: 164000,
            uri: "spotify:track:mock-bb-uvst-08",
          },
          {
            id: "bb-uvst-09",
            name: "La Corriente",
            durationMs: 196000,
            uri: "spotify:track:mock-bb-uvst-09",
          },
          {
            id: "bb-uvst-10",
            name: "Efecto",
            durationMs: 172000,
            uri: "spotify:track:mock-bb-uvst-10",
          },
        ],
      },
      yhlqmdlg: {
        name: "YHLQMDLG",
        image: ALBUM_COVERS.bb_yhlqmdlg,
        tracks: [
          {
            id: "bb-yhl-01",
            name: "Si Veo a Tu Mamá",
            durationMs: 195000,
            uri: "spotify:track:mock-bb-yhl-01",
          },
          {
            id: "bb-yhl-02",
            name: "La Difícil",
            durationMs: 208000,
            uri: "spotify:track:mock-bb-yhl-02",
          },
          {
            id: "bb-yhl-03",
            name: "Pero Ya No",
            durationMs: 187000,
            uri: "spotify:track:mock-bb-yhl-03",
          },
          {
            id: "bb-yhl-04",
            name: "La Santa",
            durationMs: 213000,
            uri: "spotify:track:mock-bb-yhl-04",
          },
          {
            id: "bb-yhl-05",
            name: "Yo Perreo Sola",
            durationMs: 187000,
            uri: "spotify:track:mock-bb-yhl-05",
          },
          {
            id: "bb-yhl-06",
            name: "Bichiyal",
            durationMs: 180000,
            uri: "spotify:track:mock-bb-yhl-06",
          },
          {
            id: "bb-yhl-07",
            name: "Soliá",
            durationMs: 195000,
            uri: "spotify:track:mock-bb-yhl-07",
          },
          {
            id: "bb-yhl-08",
            name: "La Zona",
            durationMs: 172000,
            uri: "spotify:track:mock-bb-yhl-08",
          },
          {
            id: "bb-yhl-09",
            name: "Vete",
            durationMs: 203000,
            uri: "spotify:track:mock-bb-yhl-09",
          },
          {
            id: "bb-yhl-10",
            name: "Ignorantes",
            durationMs: 213000,
            uri: "spotify:track:mock-bb-yhl-10",
          },
        ],
      },
      ultimoTour: {
        name: "El Último Tour Del Mundo",
        image: ALBUM_COVERS.bb_ultimo_tour,
        tracks: [
          {
            id: "bb-ult-01",
            name: "El Mundo Es Mío",
            durationMs: 187000,
            uri: "spotify:track:mock-bb-ult-01",
          },
          {
            id: "bb-ult-02",
            name: "Te Mudaste",
            durationMs: 194000,
            uri: "spotify:track:mock-bb-ult-02",
          },
          {
            id: "bb-ult-03",
            name: "Hoy Cobré",
            durationMs: 205000,
            uri: "spotify:track:mock-bb-ult-03",
          },
          {
            id: "bb-ult-04",
            name: "Maldita Pobreza",
            durationMs: 204000,
            uri: "spotify:track:mock-bb-ult-04",
          },
          {
            id: "bb-ult-05",
            name: "La Noche de Anoche",
            durationMs: 214000,
            uri: "spotify:track:mock-bb-ult-05",
          },
          {
            id: "bb-ult-06",
            name: "Te Deseo Lo Mejor",
            durationMs: 195000,
            uri: "spotify:track:mock-bb-ult-06",
          },
          {
            id: "bb-ult-07",
            name: "Yo Visto Así",
            durationMs: 185000,
            uri: "spotify:track:mock-bb-ult-07",
          },
          {
            id: "bb-ult-08",
            name: "Haciendo Que Me Amas",
            durationMs: 191000,
            uri: "spotify:track:mock-bb-ult-08",
          },
          {
            id: "bb-ult-09",
            name: "Booker T",
            durationMs: 175000,
            uri: "spotify:track:mock-bb-ult-09",
          },
          {
            id: "bb-ult-10",
            name: "Dakiti",
            durationMs: 208000,
            uri: "spotify:track:mock-bb-ult-10",
          },
        ],
      },
      nadieSabe: {
        name: "Nadie Sabe Lo Que Va a Pasar Mañana",
        image: ALBUM_COVERS.bb_nadie_sabe,
        tracks: [
          {
            id: "bb-ns-01",
            name: "Nadie Sabe",
            durationMs: 185000,
            uri: "spotify:track:mock-bb-ns-01",
          },
          {
            id: "bb-ns-02",
            name: "Monaco",
            durationMs: 193000,
            uri: "spotify:track:mock-bb-ns-02",
          },
          {
            id: "bb-ns-03",
            name: "Fina",
            durationMs: 215000,
            uri: "spotify:track:mock-bb-ns-03",
          },
          {
            id: "bb-ns-04",
            name: "Hibiki",
            durationMs: 168000,
            uri: "spotify:track:mock-bb-ns-04",
          },
          {
            id: "bb-ns-05",
            name: "Mr. October",
            durationMs: 187000,
            uri: "spotify:track:mock-bb-ns-05",
          },
          {
            id: "bb-ns-06",
            name: "Thunder y Lightning",
            durationMs: 197000,
            uri: "spotify:track:mock-bb-ns-06",
          },
          {
            id: "bb-ns-07",
            name: "Gracias Por Nada",
            durationMs: 202000,
            uri: "spotify:track:mock-bb-ns-07",
          },
          {
            id: "bb-ns-08",
            name: "Teléfono Nuevo",
            durationMs: 183000,
            uri: "spotify:track:mock-bb-ns-08",
          },
          {
            id: "bb-ns-09",
            name: "Baby Nueva",
            durationMs: 200000,
            uri: "spotify:track:mock-bb-ns-09",
          },
          {
            id: "bb-ns-10",
            name: "Un Preview",
            durationMs: 169000,
            uri: "spotify:track:mock-bb-ns-10",
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Billie Eilish — 1 album × 10 tracks
  // ---------------------------------------------------------------------------
  billieEilish: {
    artist: "Billie Eilish",
    albums: {
      happierThanEver: {
        name: "Happier Than Ever",
        image: ALBUM_COVERS.happier_than_ever,
        tracks: [
          {
            id: "billie-hte-01",
            name: "Getting Older",
            durationMs: 269000,
            uri: "spotify:track:mock-billie-hte-01",
          },
          {
            id: "billie-hte-02",
            name: "I Didn't Change My Number",
            durationMs: 154000,
            uri: "spotify:track:mock-billie-hte-02",
          },
          {
            id: "billie-hte-03",
            name: "Billie Bossa Nova",
            durationMs: 178000,
            uri: "spotify:track:mock-billie-hte-03",
          },
          {
            id: "billie-hte-04",
            name: "My Future",
            durationMs: 211000,
            uri: "spotify:track:mock-billie-hte-04",
          },
          {
            id: "billie-hte-05",
            name: "Oxytocin",
            durationMs: 222000,
            uri: "spotify:track:mock-billie-hte-05",
          },
          {
            id: "billie-hte-06",
            name: "Goldwing",
            durationMs: 148000,
            uri: "spotify:track:mock-billie-hte-06",
          },
          {
            id: "billie-hte-07",
            name: "Lost Cause",
            durationMs: 185000,
            uri: "spotify:track:mock-billie-hte-07",
          },
          {
            id: "billie-hte-08",
            name: "Halley's Comet",
            durationMs: 263000,
            uri: "spotify:track:mock-billie-hte-08",
          },
          {
            id: "billie-hte-09",
            name: "Therefore I Am",
            durationMs: 200000,
            uri: "spotify:track:mock-billie-hte-09",
          },
          {
            id: "billie-hte-10",
            name: "Happier Than Ever",
            durationMs: 298213,
            uri: "spotify:track:mock-billie-hte-10",
          },
        ],
      },
      wwafawdwg: {
        name: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
        image: ALBUM_COVERS.billie_wwafawdwg,
        tracks: [
          {
            id: "billie-ww-01",
            name: "Bad Guy",
            durationMs: 194088,
            uri: "spotify:track:mock-billie-ww-01",
          },
          {
            id: "billie-ww-02",
            name: "Xanny",
            durationMs: 240000,
            uri: "spotify:track:mock-billie-ww-02",
          },
          {
            id: "billie-ww-03",
            name: "You Should See Me in a Crown",
            durationMs: 202000,
            uri: "spotify:track:mock-billie-ww-03",
          },
          {
            id: "billie-ww-04",
            name: "All the Good Girls Go to Hell",
            durationMs: 165000,
            uri: "spotify:track:mock-billie-ww-04",
          },
          {
            id: "billie-ww-05",
            name: "Wish You Were Gay",
            durationMs: 223000,
            uri: "spotify:track:mock-billie-ww-05",
          },
          {
            id: "billie-ww-06",
            name: "When the Party's Over",
            durationMs: 195925,
            uri: "spotify:track:mock-billie-ww-06",
          },
          {
            id: "billie-ww-07",
            name: "8",
            durationMs: 240000,
            uri: "spotify:track:mock-billie-ww-07",
          },
          {
            id: "billie-ww-08",
            name: "My Strange Addiction",
            durationMs: 162000,
            uri: "spotify:track:mock-billie-ww-08",
          },
          {
            id: "billie-ww-09",
            name: "Bury a Friend",
            durationMs: 193187,
            uri: "spotify:track:mock-billie-ww-09",
          },
          {
            id: "billie-ww-10",
            name: "Ilomilo",
            durationMs: 158000,
            uri: "spotify:track:mock-billie-ww-10",
          },
        ],
      },
      hitMeHardAndSoft: {
        name: "HIT ME HARD AND SOFT",
        image: ALBUM_COVERS.billie_hmhas,
        tracks: [
          {
            id: "billie-hm-01",
            name: "Skinny",
            durationMs: 268000,
            uri: "spotify:track:mock-billie-hm-01",
          },
          {
            id: "billie-hm-02",
            name: "Lunch",
            durationMs: 168000,
            uri: "spotify:track:mock-billie-hm-02",
          },
          {
            id: "billie-hm-03",
            name: "Chihiro",
            durationMs: 340000,
            uri: "spotify:track:mock-billie-hm-03",
          },
          {
            id: "billie-hm-04",
            name: "Birds of a Feather",
            durationMs: 211000,
            uri: "spotify:track:mock-billie-hm-04",
          },
          {
            id: "billie-hm-05",
            name: "Wildflower",
            durationMs: 244000,
            uri: "spotify:track:mock-billie-hm-05",
          },
          {
            id: "billie-hm-06",
            name: "The Greatest",
            durationMs: 292000,
            uri: "spotify:track:mock-billie-hm-06",
          },
          {
            id: "billie-hm-07",
            name: "L'Amour de Ma Vie",
            durationMs: 291000,
            uri: "spotify:track:mock-billie-hm-07",
          },
          {
            id: "billie-hm-08",
            name: "The Diner",
            durationMs: 130000,
            uri: "spotify:track:mock-billie-hm-08",
          },
          {
            id: "billie-hm-09",
            name: "Bittersuite",
            durationMs: 257000,
            uri: "spotify:track:mock-billie-hm-09",
          },
          {
            id: "billie-hm-10",
            name: "Blue",
            durationMs: 300000,
            uri: "spotify:track:mock-billie-hm-10",
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Tyler, The Creator — 1 album × 10 tracks
  // ---------------------------------------------------------------------------
  tylerTheCreator: {
    artist: "Tyler, The Creator",
    albums: {
      flowerBoy: {
        name: "Flower Boy",
        image: ALBUM_COVERS.flower_boy,
        tracks: [
          {
            id: "tyler-fb-01",
            name: "Foreword",
            artists: ["Tyler, The Creator", "Frank Ocean"],
            durationMs: 118960,
            uri: "spotify:track:mock-tyler-fb-01",
          },
          {
            id: "tyler-fb-02",
            name: "Where This Flower Blooms",
            durationMs: 181000,
            uri: "spotify:track:mock-tyler-fb-02",
          },
          {
            id: "tyler-fb-03",
            name: "Sometimes...",
            durationMs: 272000,
            uri: "spotify:track:mock-tyler-fb-03",
          },
          {
            id: "tyler-fb-04",
            name: "See You Again",
            durationMs: 180053,
            uri: "spotify:track:mock-tyler-fb-04",
          },
          {
            id: "tyler-fb-05",
            name: "Who Dat Boy",
            artists: ["Tyler, The Creator", "A$AP Rocky"],
            durationMs: 201893,
            uri: "spotify:track:mock-tyler-fb-05",
          },
          {
            id: "tyler-fb-06",
            name: "Pothole",
            durationMs: 225720,
            uri: "spotify:track:mock-tyler-fb-06",
          },
          {
            id: "tyler-fb-07",
            name: "Garden Shed",
            durationMs: 245320,
            uri: "spotify:track:mock-tyler-fb-07",
          },
          {
            id: "tyler-fb-08",
            name: "Boredom",
            durationMs: 331173,
            uri: "spotify:track:mock-tyler-fb-08",
          },
          {
            id: "tyler-fb-09",
            name: "911 / Mr. Lonely",
            artists: ["Tyler, The Creator", "Frank Ocean"],
            durationMs: 270667,
            uri: "spotify:track:mock-tyler-fb-09",
          },
          {
            id: "tyler-fb-10",
            name: "November",
            durationMs: 258000,
            uri: "spotify:track:mock-tyler-fb-10",
          },
        ],
      },
      igor: {
        name: "IGOR",
        image: ALBUM_COVERS.tyler_igor,
        tracks: [
          {
            id: "tyler-ig-01",
            name: "Igor's Theme",
            durationMs: 210893,
            uri: "spotify:track:mock-tyler-ig-01",
          },
          {
            id: "tyler-ig-02",
            name: "Earfquake",
            durationMs: 190720,
            uri: "spotify:track:mock-tyler-ig-02",
          },
          {
            id: "tyler-ig-03",
            name: "I Think",
            durationMs: 213667,
            uri: "spotify:track:mock-tyler-ig-03",
          },
          {
            id: "tyler-ig-04",
            name: "Exactly What You Run From You End Up Chasing",
            durationMs: 96320,
            uri: "spotify:track:mock-tyler-ig-04",
          },
          {
            id: "tyler-ig-05",
            name: "Running Out of Time",
            durationMs: 178800,
            uri: "spotify:track:mock-tyler-ig-05",
          },
          {
            id: "tyler-ig-06",
            name: "New Magic Wand",
            durationMs: 195040,
            uri: "spotify:track:mock-tyler-ig-06",
          },
          {
            id: "tyler-ig-07",
            name: "A Boy Is a Gun",
            durationMs: 210960,
            uri: "spotify:track:mock-tyler-ig-07",
          },
          {
            id: "tyler-ig-08",
            name: "Puppet",
            durationMs: 173440,
            uri: "spotify:track:mock-tyler-ig-08",
          },
          {
            id: "tyler-ig-09",
            name: "What's Good",
            durationMs: 217360,
            uri: "spotify:track:mock-tyler-ig-09",
          },
          {
            id: "tyler-ig-10",
            name: "Gone, Gone / Thank You",
            durationMs: 387680,
            uri: "spotify:track:mock-tyler-ig-10",
          },
        ],
      },
      callMeIfYouGetLost: {
        name: "CALL ME IF YOU GET LOST",
        image: ALBUM_COVERS.tyler_cmiygl,
        tracks: [
          {
            id: "tyler-cm-01",
            name: "Sir Baudelaire",
            durationMs: 148000,
            uri: "spotify:track:mock-tyler-cm-01",
          },
          {
            id: "tyler-cm-02",
            name: "Corso",
            durationMs: 180000,
            uri: "spotify:track:mock-tyler-cm-02",
          },
          {
            id: "tyler-cm-03",
            name: "Lemonhead",
            durationMs: 165000,
            uri: "spotify:track:mock-tyler-cm-03",
          },
          {
            id: "tyler-cm-04",
            name: "WusYaName",
            durationMs: 167000,
            uri: "spotify:track:mock-tyler-cm-04",
          },
          {
            id: "tyler-cm-05",
            name: "Lumberjack",
            durationMs: 147000,
            uri: "spotify:track:mock-tyler-cm-05",
          },
          {
            id: "tyler-cm-06",
            name: "Hot Wind Blows",
            durationMs: 251000,
            uri: "spotify:track:mock-tyler-cm-06",
          },
          {
            id: "tyler-cm-07",
            name: "Massa",
            durationMs: 197000,
            uri: "spotify:track:mock-tyler-cm-07",
          },
          {
            id: "tyler-cm-08",
            name: "RunItUp",
            durationMs: 170000,
            uri: "spotify:track:mock-tyler-cm-08",
          },
          {
            id: "tyler-cm-09",
            name: "Manifesto",
            durationMs: 202000,
            uri: "spotify:track:mock-tyler-cm-09",
          },
          {
            id: "tyler-cm-10",
            name: "Sweet / I Thought You Wanted to Dance",
            durationMs: 343000,
            uri: "spotify:track:mock-tyler-cm-10",
          },
        ],
      },
      chromakopia: {
        name: "CHROMAKOPIA",
        image: ALBUM_COVERS.tyler_chromakopia,
        tracks: [
          {
            id: "tyler-ck-01",
            name: "St. Chroma",
            durationMs: 180000,
            uri: "spotify:track:mock-tyler-ck-01",
          },
          {
            id: "tyler-ck-02",
            name: "Rah Tah Tah",
            durationMs: 165000,
            uri: "spotify:track:mock-tyler-ck-02",
          },
          {
            id: "tyler-ck-03",
            name: "Noid",
            durationMs: 186000,
            uri: "spotify:track:mock-tyler-ck-03",
          },
          {
            id: "tyler-ck-04",
            name: "Darling, I",
            durationMs: 204000,
            uri: "spotify:track:mock-tyler-ck-04",
          },
          {
            id: "tyler-ck-05",
            name: "Hey Jane",
            durationMs: 150000,
            uri: "spotify:track:mock-tyler-ck-05",
          },
          {
            id: "tyler-ck-06",
            name: "I Killed You",
            durationMs: 182000,
            uri: "spotify:track:mock-tyler-ck-06",
          },
          {
            id: "tyler-ck-07",
            name: "Judge Judy",
            durationMs: 163000,
            uri: "spotify:track:mock-tyler-ck-07",
          },
          {
            id: "tyler-ck-08",
            name: "Sticky",
            durationMs: 186000,
            uri: "spotify:track:mock-tyler-ck-08",
          },
          {
            id: "tyler-ck-09",
            name: "Take Your Mask Off",
            durationMs: 217000,
            uri: "spotify:track:mock-tyler-ck-09",
          },
          {
            id: "tyler-ck-10",
            name: "Tomorrow",
            durationMs: 262000,
            uri: "spotify:track:mock-tyler-ck-10",
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Travis Scott — 1 album × 10 tracks
  // ---------------------------------------------------------------------------
  travisScott: {
    artist: "Travis Scott",
    albums: {
      astroworld: {
        name: "ASTROWORLD",
        image: ALBUM_COVERS.astroworld,
        tracks: [
          {
            id: "travis-aw-01",
            name: "Stargazing",
            durationMs: 229000,
            uri: "spotify:track:mock-travis-aw-01",
          },
          {
            id: "travis-aw-02",
            name: "Carousel",
            durationMs: 273000,
            uri: "spotify:track:mock-travis-aw-02",
          },
          {
            id: "travis-aw-03",
            name: "Sicko Mode",
            durationMs: 312000,
            uri: "spotify:track:mock-travis-aw-03",
          },
          {
            id: "travis-aw-04",
            name: "R.I.P. Screw",
            durationMs: 149000,
            uri: "spotify:track:mock-travis-aw-04",
          },
          {
            id: "travis-aw-05",
            name: "Stop Trying to Be God",
            durationMs: 319000,
            uri: "spotify:track:mock-travis-aw-05",
          },
          {
            id: "travis-aw-06",
            name: "No Bystanders",
            durationMs: 210000,
            uri: "spotify:track:mock-travis-aw-06",
          },
          {
            id: "travis-aw-07",
            name: "Skeletons",
            artists: ["Travis Scott", "Frank Ocean"],
            durationMs: 219000,
            uri: "spotify:track:mock-travis-aw-07",
          },
          {
            id: "travis-aw-08",
            name: "Wake Up",
            durationMs: 247000,
            uri: "spotify:track:mock-travis-aw-08",
          },
          {
            id: "travis-aw-09",
            name: "5% Tint",
            durationMs: 278000,
            uri: "spotify:track:mock-travis-aw-09",
          },
          {
            id: "travis-aw-10",
            name: "Astrothunder",
            durationMs: 218000,
            uri: "spotify:track:mock-travis-aw-10",
          },
        ],
      },
      utopia: {
        name: "UTOPIA",
        image: ALBUM_COVERS.travis_utopia,
        tracks: [
          {
            id: "travis-ut-01",
            name: "Hyaena",
            durationMs: 258000,
            uri: "spotify:track:mock-travis-ut-01",
          },
          {
            id: "travis-ut-02",
            name: "Thank God",
            durationMs: 217000,
            uri: "spotify:track:mock-travis-ut-02",
          },
          {
            id: "travis-ut-03",
            name: "Modern Jam",
            durationMs: 233000,
            uri: "spotify:track:mock-travis-ut-03",
          },
          {
            id: "travis-ut-04",
            name: "My Eyes",
            durationMs: 228000,
            uri: "spotify:track:mock-travis-ut-04",
          },
          {
            id: "travis-ut-05",
            name: "God's Country",
            durationMs: 189000,
            uri: "spotify:track:mock-travis-ut-05",
          },
          {
            id: "travis-ut-06",
            name: "Sirens",
            durationMs: 203000,
            uri: "spotify:track:mock-travis-ut-06",
          },
          {
            id: "travis-ut-07",
            name: "Meltdown",
            durationMs: 241000,
            uri: "spotify:track:mock-travis-ut-07",
          },
          {
            id: "travis-ut-08",
            name: "Fe!n",
            durationMs: 187000,
            uri: "spotify:track:mock-travis-ut-08",
          },
          {
            id: "travis-ut-09",
            name: "Delresto",
            durationMs: 246000,
            uri: "spotify:track:mock-travis-ut-09",
          },
          {
            id: "travis-ut-10",
            name: "Telekinesis",
            durationMs: 215000,
            uri: "spotify:track:mock-travis-ut-10",
          },
        ],
      },
      rodeo: {
        name: "Rodeo",
        image: ALBUM_COVERS.travis_rodeo,
        tracks: [
          {
            id: "travis-ro-01",
            name: "Pornography",
            durationMs: 280000,
            uri: "spotify:track:mock-travis-ro-01",
          },
          {
            id: "travis-ro-02",
            name: "Oh My Dis Side",
            durationMs: 319000,
            uri: "spotify:track:mock-travis-ro-02",
          },
          {
            id: "travis-ro-03",
            name: "3500",
            durationMs: 426000,
            uri: "spotify:track:mock-travis-ro-03",
          },
          {
            id: "travis-ro-04",
            name: "Wasted",
            durationMs: 231000,
            uri: "spotify:track:mock-travis-ro-04",
          },
          {
            id: "travis-ro-05",
            name: "90210",
            durationMs: 352000,
            uri: "spotify:track:mock-travis-ro-05",
          },
          {
            id: "travis-ro-06",
            name: "Pray 4 Love",
            artists: ["Travis Scott", "The Weeknd"],
            durationMs: 230000,
            uri: "spotify:track:mock-travis-ro-06",
          },
          {
            id: "travis-ro-07",
            name: "Nightcrawler",
            durationMs: 277000,
            uri: "spotify:track:mock-travis-ro-07",
          },
          {
            id: "travis-ro-08",
            name: "Piss On Your Grave",
            durationMs: 227000,
            uri: "spotify:track:mock-travis-ro-08",
          },
          {
            id: "travis-ro-09",
            name: "Antidote",
            durationMs: 246000,
            uri: "spotify:track:mock-travis-ro-09",
          },
          {
            id: "travis-ro-10",
            name: "Impossible",
            durationMs: 272000,
            uri: "spotify:track:mock-travis-ro-10",
          },
        ],
      },
      birdsInTheTrap: {
        name: "Birds in the Trap Sing McKnight",
        image: ALBUM_COVERS.travis_bitm,
        tracks: [
          {
            id: "travis-bt-01",
            name: "The Ends",
            durationMs: 340000,
            uri: "spotify:track:mock-travis-bt-01",
          },
          {
            id: "travis-bt-02",
            name: "Way Back",
            durationMs: 260000,
            uri: "spotify:track:mock-travis-bt-02",
          },
          {
            id: "travis-bt-03",
            name: "Coordinate",
            durationMs: 219000,
            uri: "spotify:track:mock-travis-bt-03",
          },
          {
            id: "travis-bt-04",
            name: "Through the Late Night",
            durationMs: 262000,
            uri: "spotify:track:mock-travis-bt-04",
          },
          {
            id: "travis-bt-05",
            name: "Beibs in the Trap",
            durationMs: 174000,
            uri: "spotify:track:mock-travis-bt-05",
          },
          {
            id: "travis-bt-06",
            name: "Sweet Sweet",
            durationMs: 219000,
            uri: "spotify:track:mock-travis-bt-06",
          },
          {
            id: "travis-bt-07",
            name: "Outside",
            durationMs: 258000,
            uri: "spotify:track:mock-travis-bt-07",
          },
          {
            id: "travis-bt-08",
            name: "Goosebumps",
            durationMs: 243000,
            uri: "spotify:track:mock-travis-bt-08",
          },
          {
            id: "travis-bt-09",
            name: "First Take",
            durationMs: 182000,
            uri: "spotify:track:mock-travis-bt-09",
          },
          {
            id: "travis-bt-10",
            name: "Pick Up the Phone",
            durationMs: 187000,
            uri: "spotify:track:mock-travis-bt-10",
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Karol G — 1 album × 10 tracks
  // ---------------------------------------------------------------------------
  karolG: {
    artist: "Karol G",
    albums: {
      kg0516: {
        name: "KG0516",
        image: ALBUM_COVERS.kg0516,
        tracks: [
          {
            id: "karolg-kg-01",
            name: "DEJALOS QUE MIREN",
            durationMs: 187000,
            uri: "spotify:track:mock-karolg-kg-01",
          },
          {
            id: "karolg-kg-02",
            name: "EL MAKINON",
            durationMs: 195000,
            uri: "spotify:track:mock-karolg-kg-02",
          },
          {
            id: "karolg-kg-03",
            name: "200 COPAS",
            durationMs: 187000,
            uri: "spotify:track:mock-karolg-kg-03",
          },
          {
            id: "karolg-kg-04",
            name: "DVD",
            durationMs: 176000,
            uri: "spotify:track:mock-karolg-kg-04",
          },
          {
            id: "karolg-kg-05",
            name: "EL BARCO",
            durationMs: 198000,
            uri: "spotify:track:mock-karolg-kg-05",
          },
          {
            id: "karolg-kg-06",
            name: "LOCATION",
            durationMs: 188000,
            uri: "spotify:track:mock-karolg-kg-06",
          },
          {
            id: "karolg-kg-07",
            name: "GATO MALO",
            artists: ["Karol G", "Nathy Peluso"],
            durationMs: 193000,
            uri: "spotify:track:mock-karolg-kg-07",
          },
          {
            id: "karolg-kg-08",
            name: "ODISEA",
            durationMs: 182000,
            uri: "spotify:track:mock-karolg-kg-08",
          },
          {
            id: "karolg-kg-09",
            name: "BICHOTA",
            durationMs: 175000,
            uri: "spotify:track:mock-karolg-kg-09",
          },
          {
            id: "karolg-kg-10",
            name: "SOLA MEJOR",
            durationMs: 204000,
            uri: "spotify:track:mock-karolg-kg-10",
          },
        ],
      },
      mananaSera: {
        name: "mañana será bonito",
        image: ALBUM_COVERS.karolg_manana,
        tracks: [
          {
            id: "karolg-mn-01",
            name: "Mientras Me Curo del Cora",
            durationMs: 213000,
            uri: "spotify:track:mock-karolg-mn-01",
          },
          {
            id: "karolg-mn-02",
            name: "X Si Volvemos",
            durationMs: 195000,
            uri: "spotify:track:mock-karolg-mn-02",
          },
          {
            id: "karolg-mn-03",
            name: "Pero Tú",
            durationMs: 187000,
            uri: "spotify:track:mock-karolg-mn-03",
          },
          {
            id: "karolg-mn-04",
            name: "Besties",
            durationMs: 193000,
            uri: "spotify:track:mock-karolg-mn-04",
          },
          {
            id: "karolg-mn-05",
            name: "Gucci los Paños",
            durationMs: 201000,
            uri: "spotify:track:mock-karolg-mn-05",
          },
          {
            id: "karolg-mn-06",
            name: "Tus Gafitas",
            durationMs: 188000,
            uri: "spotify:track:mock-karolg-mn-06",
          },
          {
            id: "karolg-mn-07",
            name: "Ojos Ferrari",
            durationMs: 197000,
            uri: "spotify:track:mock-karolg-mn-07",
          },
          {
            id: "karolg-mn-08",
            name: "Cairo",
            durationMs: 198000,
            uri: "spotify:track:mock-karolg-mn-08",
          },
          {
            id: "karolg-mn-09",
            name: "Mi Ex Tenía Razón",
            durationMs: 205000,
            uri: "spotify:track:mock-karolg-mn-09",
          },
          {
            id: "karolg-mn-10",
            name: "Amargura",
            durationMs: 204000,
            uri: "spotify:track:mock-karolg-mn-10",
          },
        ],
      },
      ocean: {
        name: "OCEAN",
        image: ALBUM_COVERS.karolg_ocean,
        tracks: [
          {
            id: "karolg-oc-01",
            name: "Ocean",
            durationMs: 185000,
            uri: "spotify:track:mock-karolg-oc-01",
          },
          {
            id: "karolg-oc-02",
            name: "Punto G",
            durationMs: 193000,
            uri: "spotify:track:mock-karolg-oc-02",
          },
          {
            id: "karolg-oc-03",
            name: "Créeme",
            durationMs: 187000,
            uri: "spotify:track:mock-karolg-oc-03",
          },
          {
            id: "karolg-oc-04",
            name: "Mi Cama",
            durationMs: 185000,
            uri: "spotify:track:mock-karolg-oc-04",
          },
          {
            id: "karolg-oc-05",
            name: "Culpables",
            durationMs: 196000,
            uri: "spotify:track:mock-karolg-oc-05",
          },
          {
            id: "karolg-oc-06",
            name: "Pineapple",
            durationMs: 182000,
            uri: "spotify:track:mock-karolg-oc-06",
          },
          {
            id: "karolg-oc-07",
            name: "A Ella",
            durationMs: 203000,
            uri: "spotify:track:mock-karolg-oc-07",
          },
          {
            id: "karolg-oc-08",
            name: "Love With a Quality",
            durationMs: 193000,
            uri: "spotify:track:mock-karolg-oc-08",
          },
          {
            id: "karolg-oc-09",
            name: "Dices Que Te Vas",
            durationMs: 191000,
            uri: "spotify:track:mock-karolg-oc-09",
          },
          {
            id: "karolg-oc-10",
            name: "Punto G Remix",
            durationMs: 196000,
            uri: "spotify:track:mock-karolg-oc-10",
          },
        ],
      },
      tropicoqueta: {
        name: "TROPICOQUETA",
        image: ALBUM_COVERS.karolg_tropicoqueta,
        tracks: [
          {
            id: "karolg-tq-01",
            name: "LA REINA PRESENTA",
            durationMs: 192000,
            uri: "spotify:track:mock-karolg-tq-01",
          },
          {
            id: "karolg-tq-02",
            name: "IVONNY BONITA",
            durationMs: 185000,
            uri: "spotify:track:mock-karolg-tq-02",
          },
          {
            id: "karolg-tq-03",
            name: "PAPASITO",
            durationMs: 197000,
            uri: "spotify:track:mock-karolg-tq-03",
          },
          {
            id: "karolg-tq-04",
            name: "LATINA FOREVA",
            durationMs: 203000,
            uri: "spotify:track:mock-karolg-tq-04",
          },
          {
            id: "karolg-tq-05",
            name: "DILE LUNA",
            durationMs: 188000,
            uri: "spotify:track:mock-karolg-tq-05",
          },
          {
            id: "karolg-tq-06",
            name: "UN GATITO ME LLAMO",
            durationMs: 195000,
            uri: "spotify:track:mock-karolg-tq-06",
          },
          {
            id: "karolg-tq-07",
            name: "AMIGA MIA",
            durationMs: 201000,
            uri: "spotify:track:mock-karolg-tq-07",
          },
          {
            id: "karolg-tq-08",
            name: "BANDIDA ENTRENADA",
            durationMs: 187000,
            uri: "spotify:track:mock-karolg-tq-08",
          },
          {
            id: "karolg-tq-09",
            name: "ESE HOMBRE ES MALO",
            durationMs: 196000,
            uri: "spotify:track:mock-karolg-tq-09",
          },
          {
            id: "karolg-tq-10",
            name: "VERANO ROSA",
            artists: ["Karol G", "Feid"],
            durationMs: 194000,
            uri: "spotify:track:mock-karolg-tq-10",
          },
        ],
      },
    },
  },
  // ---------------------------------------------------------------------------
  // Nathy Peluso — 3 albums
  // ---------------------------------------------------------------------------
  nathyPeluso: {
    artist: "Nathy Peluso",
    albums: {
      calambre: {
        name: "calambre",
        image: ALBUM_COVERS.nathy_calambre,
        tracks: [
          {
            id: "nathy-cal-01",
            name: "Buenos Aires",
            durationMs: 191000,
            uri: "spotify:track:mock-nathy-cal-01",
          },
          {
            id: "nathy-cal-02",
            name: "Business Woman",
            durationMs: 177000,
            uri: "spotify:track:mock-nathy-cal-02",
          },
          {
            id: "nathy-cal-03",
            name: "Delito",
            durationMs: 183000,
            uri: "spotify:track:mock-nathy-cal-03",
          },
          {
            id: "nathy-cal-04",
            name: "Buenos Aires Interlude",
            durationMs: 68000,
            uri: "spotify:track:mock-nathy-cal-04",
          },
          {
            id: "nathy-cal-05",
            name: "Sana Sana",
            durationMs: 209000,
            uri: "spotify:track:mock-nathy-cal-05",
          },
          {
            id: "nathy-cal-06",
            name: "Arrorró",
            durationMs: 186000,
            uri: "spotify:track:mock-nathy-cal-06",
          },
          {
            id: "nathy-cal-07",
            name: "Natikillah",
            durationMs: 201000,
            uri: "spotify:track:mock-nathy-cal-07",
          },
          {
            id: "nathy-cal-08",
            name: "Puro Veneno",
            durationMs: 195000,
            uri: "spotify:track:mock-nathy-cal-08",
          },
          {
            id: "nathy-cal-09",
            name: "Agárrate",
            durationMs: 199000,
            uri: "spotify:track:mock-nathy-cal-09",
          },
          {
            id: "nathy-cal-10",
            name: "Celebré",
            durationMs: 217000,
            uri: "spotify:track:mock-nathy-cal-10",
          },
        ],
      },
      grasa: {
        name: "grasa",
        image: ALBUM_COVERS.nathy_grasa,
        tracks: [
          {
            id: "nathy-gr-01",
            name: "CORLEONE",
            durationMs: 215000,
            uri: "spotify:track:mock-nathy-gr-01",
          },
          {
            id: "nathy-gr-02",
            name: "APRENDER A AMAR",
            durationMs: 204000,
            uri: "spotify:track:mock-nathy-gr-02",
          },
          {
            id: "nathy-gr-03",
            name: "REAL",
            durationMs: 188000,
            uri: "spotify:track:mock-nathy-gr-03",
          },
          {
            id: "nathy-gr-04",
            name: "LEGENDARIO",
            durationMs: 197000,
            uri: "spotify:track:mock-nathy-gr-04",
          },
          {
            id: "nathy-gr-05",
            name: "ESCALERAS DE METAL",
            durationMs: 222000,
            uri: "spotify:track:mock-nathy-gr-05",
          },
          {
            id: "nathy-gr-06",
            name: "TODO ROTO",
            durationMs: 193000,
            uri: "spotify:track:mock-nathy-gr-06",
          },
          {
            id: "nathy-gr-07",
            name: "NO LES CREO NADA",
            durationMs: 209000,
            uri: "spotify:track:mock-nathy-gr-07",
          },
          {
            id: "nathy-gr-08",
            name: "ENVIDIA",
            durationMs: 185000,
            uri: "spotify:track:mock-nathy-gr-08",
          },
          {
            id: "nathy-gr-09",
            name: "MENINA",
            durationMs: 196000,
            uri: "spotify:track:mock-nathy-gr-09",
          },
          {
            id: "nathy-gr-10",
            name: "IDEAS RADICALES",
            durationMs: 231000,
            uri: "spotify:track:mock-nathy-gr-10",
          },
        ],
      },
      esmeralda: {
        name: "esmeralda",
        image: ALBUM_COVERS.nathy_esmeralda,
        tracks: [
          {
            id: "nathy-es-01",
            name: "ALABAME",
            durationMs: 195000,
            uri: "spotify:track:mock-nathy-es-01",
          },
          {
            id: "nathy-es-02",
            name: "DAFNE",
            durationMs: 203000,
            uri: "spotify:track:mock-nathy-es-02",
          },
          {
            id: "nathy-es-03",
            name: "DAGA",
            durationMs: 186000,
            uri: "spotify:track:mock-nathy-es-03",
          },
          {
            id: "nathy-es-04",
            name: "ESMERALDA",
            durationMs: 211000,
            uri: "spotify:track:mock-nathy-es-04",
          },
          {
            id: "nathy-es-05",
            name: "OREEN ISHI",
            durationMs: 192000,
            uri: "spotify:track:mock-nathy-es-05",
          },
          {
            id: "nathy-es-06",
            name: "SANDIA",
            durationMs: 183000,
            uri: "spotify:track:mock-nathy-es-06",
          },
          {
            id: "nathy-es-07",
            name: "KUN FU",
            durationMs: 198000,
            uri: "spotify:track:mock-nathy-es-07",
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Frank Ocean — 1 album
  // ---------------------------------------------------------------------------
  frankOcean: {
    artist: "Frank Ocean",
    albums: {
      blonde: {
        name: "Blonde",
        image: ALBUM_COVERS.frank_blonde,
        tracks: [
          {
            id: "frank-bl-01",
            name: "Nikes",
            durationMs: 269000,
            uri: "spotify:track:mock-frank-bl-01",
          },
          {
            id: "frank-bl-02",
            name: "Ivy",
            durationMs: 250000,
            uri: "spotify:track:mock-frank-bl-02",
          },
          {
            id: "frank-bl-03",
            name: "Pink + White",
            durationMs: 184000,
            uri: "spotify:track:mock-frank-bl-03",
          },
          {
            id: "frank-bl-04",
            name: "Be Yourself",
            durationMs: 90000,
            uri: "spotify:track:mock-frank-bl-04",
          },
          {
            id: "frank-bl-05",
            name: "Solo",
            durationMs: 259000,
            uri: "spotify:track:mock-frank-bl-05",
          },
          {
            id: "frank-bl-06",
            name: "Skyline To",
            durationMs: 199000,
            uri: "spotify:track:mock-frank-bl-06",
          },
          {
            id: "frank-bl-07",
            name: "Self Control",
            durationMs: 252000,
            uri: "spotify:track:mock-frank-bl-07",
          },
          {
            id: "frank-bl-08",
            name: "Good Guy",
            durationMs: 73000,
            uri: "spotify:track:mock-frank-bl-08",
          },
          {
            id: "frank-bl-09",
            name: "Nights",
            durationMs: 307000,
            uri: "spotify:track:mock-frank-bl-09",
          },
          {
            id: "frank-bl-10",
            name: "White Ferrari",
            durationMs: 248000,
            uri: "spotify:track:mock-frank-bl-10",
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // A$AP Rocky — 1 album
  // ---------------------------------------------------------------------------
  asapRocky: {
    artist: "A$AP Rocky",
    albums: {
      dontBeDumb: {
        name: "Don't Be Dumb",
        image: ALBUM_COVERS.asap_dont_be_dumb,
        tracks: [
          {
            id: "asap-dbd-01",
            name: "HELICOPTER",
            durationMs: 201000,
            uri: "spotify:track:mock-asap-dbd-01",
          },
          {
            id: "asap-dbd-02",
            name: "INTERROGATION",
            durationMs: 185000,
            uri: "spotify:track:mock-asap-dbd-02",
          },
          {
            id: "asap-dbd-03",
            name: "STOLE YA FLOW",
            durationMs: 193000,
            uri: "spotify:track:mock-asap-dbd-03",
          },
          {
            id: "asap-dbd-04",
            name: "STAY HERE 4 LIFE",
            durationMs: 197000,
            uri: "spotify:track:mock-asap-dbd-04",
          },
          {
            id: "asap-dbd-05",
            name: "PLAYA",
            durationMs: 215000,
            uri: "spotify:track:mock-asap-dbd-05",
          },
          {
            id: "asap-dbd-06",
            name: "NO TRESPASSING",
            durationMs: 188000,
            uri: "spotify:track:mock-asap-dbd-06",
          },
          {
            id: "asap-dbd-07",
            name: "STOP SNITCHING",
            durationMs: 195000,
            uri: "spotify:track:mock-asap-dbd-07",
          },
          {
            id: "asap-dbd-08",
            name: "STFU",
            durationMs: 182000,
            uri: "spotify:track:mock-asap-dbd-08",
          },
          {
            id: "asap-dbd-09",
            name: "PUNK ROCKY",
            durationMs: 207000,
            uri: "spotify:track:mock-asap-dbd-09",
          },
          {
            id: "asap-dbd-10",
            name: "ROBBERY",
            durationMs: 211000,
            uri: "spotify:track:mock-asap-dbd-10",
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Ariana Grande — 1 album
  // ---------------------------------------------------------------------------
  arianaGrande: {
    artist: "Ariana Grande",
    albums: {
      positions: {
        name: "Positions",
        image: ALBUM_COVERS.ariana_positions,
        tracks: [
          {
            id: "ariana-pos-01",
            name: "Shut Up",
            durationMs: 90000,
            uri: "spotify:track:mock-ariana-pos-01",
          },
          {
            id: "ariana-pos-02",
            name: "34+35",
            durationMs: 173000,
            uri: "spotify:track:mock-ariana-pos-02",
          },
          {
            id: "ariana-pos-03",
            name: "Motive",
            durationMs: 175000,
            uri: "spotify:track:mock-ariana-pos-03",
          },
          {
            id: "ariana-pos-04",
            name: "Just Like Magic",
            durationMs: 164000,
            uri: "spotify:track:mock-ariana-pos-04",
          },
          {
            id: "ariana-pos-05",
            name: "Off The Table",
            durationMs: 230000,
            uri: "spotify:track:mock-ariana-pos-05",
          },
          {
            id: "ariana-pos-06",
            name: "Six Thirty",
            durationMs: 182000,
            uri: "spotify:track:mock-ariana-pos-06",
          },
          {
            id: "ariana-pos-07",
            name: "Safety Net",
            durationMs: 200000,
            uri: "spotify:track:mock-ariana-pos-07",
          },
          {
            id: "ariana-pos-08",
            name: "My Hair",
            durationMs: 224000,
            uri: "spotify:track:mock-ariana-pos-08",
          },
          {
            id: "ariana-pos-09",
            name: "Nasty",
            durationMs: 165000,
            uri: "spotify:track:mock-ariana-pos-09",
          },
          {
            id: "ariana-pos-10",
            name: "Positions",
            durationMs: 172000,
            uri: "spotify:track:mock-ariana-pos-10",
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Mora — 1 album
  // ---------------------------------------------------------------------------
  mora: {
    artist: "Mora",
    albums: {
      microdosis: {
        name: "Microdosis",
        image: ALBUM_COVERS.mora_microdosis,
        tracks: [
          {
            id: "mora-mic-01",
            name: "BADTRIP :(",
            durationMs: 188000,
            uri: "spotify:track:mock-mora-mic-01",
          },
          {
            id: "mora-mic-02",
            name: "2010",
            durationMs: 195000,
            uri: "spotify:track:mock-mora-mic-02",
          },
          {
            id: "mora-mic-03",
            name: "MEMORIAS",
            durationMs: 203000,
            uri: "spotify:track:mock-mora-mic-03",
          },
          {
            id: "mora-mic-04",
            name: "ROBERT THE NIRO",
            durationMs: 191000,
            uri: "spotify:track:mock-mora-mic-04",
          },
          {
            id: "mora-mic-05",
            name: "PECADO",
            durationMs: 197000,
            uri: "spotify:track:mock-mora-mic-05",
          },
          {
            id: "mora-mic-06",
            name: "LINDOR",
            durationMs: 185000,
            uri: "spotify:track:mock-mora-mic-06",
          },
          {
            id: "mora-mic-07",
            name: "TUS LAGRIMAS",
            durationMs: 201000,
            uri: "spotify:track:mock-mora-mic-07",
          },
          {
            id: "mora-mic-08",
            name: "ESCALOFRIOS",
            durationMs: 193000,
            uri: "spotify:track:mock-mora-mic-08",
          },
          {
            id: "mora-mic-09",
            name: "LA INOCENTE",
            artists: ["Mora", "Feid"],
            durationMs: 187000,
            uri: "spotify:track:mock-mora-mic-09",
          },
          {
            id: "mora-mic-10",
            name: "LEJOS DE TI",
            durationMs: 215000,
            uri: "spotify:track:mock-mora-mic-10",
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Chencho Corleone — 1 album
  // ---------------------------------------------------------------------------
  chenchoCorleone: {
    artist: "Chencho Corleone",
    albums: {
      solo: {
        name: "Solo",
        image: ALBUM_COVERS.chencho_solo,
        tracks: [
          {
            id: "chencho-sl-01",
            name: "Un Cigarrillo",
            durationMs: 193000,
            uri: "spotify:track:mock-chencho-sl-01",
          },
          {
            id: "chencho-sl-02",
            name: "La Llevo al Cielo",
            durationMs: 205000,
            uri: "spotify:track:mock-chencho-sl-02",
          },
          {
            id: "chencho-sl-03",
            name: "Suéltate",
            durationMs: 187000,
            uri: "spotify:track:mock-chencho-sl-03",
          },
          {
            id: "chencho-sl-04",
            name: "Me Pone Mal",
            durationMs: 196000,
            uri: "spotify:track:mock-chencho-sl-04",
          },
          {
            id: "chencho-sl-05",
            name: "Bandolera",
            durationMs: 201000,
            uri: "spotify:track:mock-chencho-sl-05",
          },
          {
            id: "chencho-sl-06",
            name: "Dime Tú",
            durationMs: 183000,
            uri: "spotify:track:mock-chencho-sl-06",
          },
          {
            id: "chencho-sl-07",
            name: "Te Vas Conmigo",
            durationMs: 197000,
            uri: "spotify:track:mock-chencho-sl-07",
          },
          {
            id: "chencho-sl-08",
            name: "Perreo Fino",
            durationMs: 178000,
            uri: "spotify:track:mock-chencho-sl-08",
          },
          {
            id: "chencho-sl-09",
            name: "Una Noche Más",
            durationMs: 209000,
            uri: "spotify:track:mock-chencho-sl-09",
          },
          {
            id: "chencho-sl-10",
            name: "Culpable",
            durationMs: 191000,
            uri: "spotify:track:mock-chencho-sl-10",
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Lana Del Rey — 1 album
  // ---------------------------------------------------------------------------
  lanaDelRey: {
    artist: "Lana Del Rey",
    albums: {
      bornToDie: {
        name: "Born To Die",
        image: ALBUM_COVERS.lana_born_to_die,
        tracks: [
          {
            id: "lana-btd-01",
            name: "Born To Die",
            durationMs: 285000,
            uri: "spotify:track:mock-lana-btd-01",
          },
          {
            id: "lana-btd-02",
            name: "Off to the Races",
            durationMs: 303000,
            uri: "spotify:track:mock-lana-btd-02",
          },
          {
            id: "lana-btd-03",
            name: "Blue Jeans",
            durationMs: 215000,
            uri: "spotify:track:mock-lana-btd-03",
          },
          {
            id: "lana-btd-04",
            name: "Video Games",
            durationMs: 271000,
            uri: "spotify:track:mock-lana-btd-04",
          },
          {
            id: "lana-btd-05",
            name: "Diet Mountain Dew",
            durationMs: 224000,
            uri: "spotify:track:mock-lana-btd-05",
          },
          {
            id: "lana-btd-06",
            name: "National Anthem",
            durationMs: 341000,
            uri: "spotify:track:mock-lana-btd-06",
          },
          {
            id: "lana-btd-07",
            name: "Dark Paradise",
            durationMs: 234000,
            uri: "spotify:track:mock-lana-btd-07",
          },
          {
            id: "lana-btd-08",
            name: "Radio",
            durationMs: 219000,
            uri: "spotify:track:mock-lana-btd-08",
          },
          {
            id: "lana-btd-09",
            name: "Carmen",
            durationMs: 252000,
            uri: "spotify:track:mock-lana-btd-09",
          },
          {
            id: "lana-btd-10",
            name: "Million Dollar Man",
            durationMs: 260000,
            uri: "spotify:track:mock-lana-btd-10",
          },
        ],
      },
    },
  },
};

/**
 * Resolves the full artists array for a catalog track.
 * If the track has its own `artists` array (featured artists case), use it.
 * Otherwise default to the main artist of the album's artist entry.
 * @param {Object} track - Catalog track object
 * @param {string} mainArtist - Artist name from the parent artist entry
 * @returns {string[]}
 */
function resolveArtists(track, mainArtist) {
  return track.artists || [mainArtist];
}

/**
 * Flattens the music catalog into a searchable array of tracks.
 * Each track includes artist, album, and image metadata.
 * @returns {Array<Object>} Array of track objects with complete metadata.
 */
export function getFlattenedTracks() {
  const tracks = [];

  Object.values(mockMusicCatalog).forEach((artistData) => {
    Object.values(artistData.albums).forEach((album) => {
      album.tracks.forEach((track) => {
        const artists = resolveArtists(track, artistData.artist);
        tracks.push({
          id: track.id,
          name: track.name,
          artists,
          artist: artists.join(", "),
          album: album.name,
          albumImage: album.image,
          uri: track.uri,
          durationMs: track.durationMs,
        });
      });
    });
  });

  return tracks;
}

/**
 * Returns all tracks for a given artist, grouped by album.
 * Only matches the main artist of an album entry (not featured artists).
 * Used by selectArtistTracks for even cross-album distribution.
 * @param {string} artistName
 * @returns {Array<{albumName: string, tracks: Array<Object>}>}
 */
export function getAlbumsByArtist(artistName) {
  const normalizedTarget = artistName.toLowerCase();

  for (const artistData of Object.values(mockMusicCatalog)) {
    if (artistData.artist.toLowerCase() === normalizedTarget) {
      return Object.values(artistData.albums).map((album) => ({
        albumName: album.name,
        tracks: album.tracks.map((track) => {
          const artists = resolveArtists(track, artistData.artist);
          return {
            id: track.id,
            name: track.name,
            artists,
            artist: artists.join(", "),
            album: album.name,
            albumImage: album.image,
            uri: track.uri,
            durationMs: track.durationMs,
          };
        }),
      }));
    }
  }

  return [];
}

/**
 * Returns all tracks for a given album name with full metadata.
 * Results are in the original album track order (no shuffle).
 * @param {string} albumName
 * @returns {Array<Object>}
 */
export function getTracksByAlbum(albumName) {
  const normalizedTarget = albumName.toLowerCase();

  for (const artistData of Object.values(mockMusicCatalog)) {
    for (const album of Object.values(artistData.albums)) {
      if (album.name.toLowerCase() === normalizedTarget) {
        return album.tracks.map((track) => {
          const artists = resolveArtists(track, artistData.artist);
          return {
            id: track.id,
            name: track.name,
            artists,
            artist: artists.join(", "),
            album: album.name,
            albumImage: album.image,
            uri: track.uri,
            durationMs: track.durationMs,
          };
        });
      }
    }
  }

  return [];
}

export default mockMusicCatalog;
