// Mock music catalog for demo mode
// Curated dataset with international and Spanish artists
// Each artist has at least 2 albums with multiple songs each
// Supports realistic searching and artist/album click interactions

import { ALBUM_COVERS } from "./imageUtils.js";

/**
 * Mock music catalog containing curated artists, albums, and tracks
 * Organized by international and Spanish artists for comprehensive demo experience
 * @type {Object.<string, {artist: string, albums: Object}>}
 */
export const mockMusicCatalog = {
  // INTERNATIONAL ARTISTS

  // The Weeknd - 2 albums
  theWeeknd: {
    artist: "The Weeknd",
    albums: {
      afterHours: {
        name: "After Hours",
        image: ALBUM_COVERS.after_hours,
        tracks: [
          {
            id: "track_weeknd_1",
            name: "Blinding Lights",
            durationMs: 200053,
            uri: "spotify:track:0VjIjW4GlUZAMYd2vXMi3b",
          },
          {
            id: "track_weeknd_2",
            name: "Heartless",
            durationMs: 198040,
            uri: "spotify:track:2Ch7LmS7r2Gy2kc64wv3Bz",
          },
          {
            id: "track_weeknd_3",
            name: "In Your Eyes",
            durationMs: 237000,
            uri: "spotify:track:7szaJEu4rkDkWJTr4wupXb",
          },
          {
            id: "track_weeknd_4",
            name: "Save Your Tears",
            durationMs: 215627,
            uri: "spotify:track:5QO79kh1waicV47BqGRL3g",
          },
          {
            id: "track_weeknd_5",
            name: "After Hours",
            durationMs: 361173,
            uri: "spotify:track:2p8IUWQDrpjuFltbdgLOag",
          },
          {
            id: "track_weeknd_6",
            name: "Too Late",
            durationMs: 239893,
            uri: "spotify:track:5QO79kh1waicV47BqGRL3g",
          },
          {
            id: "track_weeknd_7",
            name: "Hardest to Love",
            durationMs: 231600,
            uri: "spotify:track:0VjIjW4GlUZAMYd2vXMi3b",
          },
          {
            id: "track_weeknd_8",
            name: "Scared to Live",
            durationMs: 191387,
            uri: "spotify:track:2Ch7LmS7r2Gy2kc64wv3Bz",
          },
          {
            id: "track_weeknd_9",
            name: "Snowchild",
            durationMs: 253320,
            uri: "spotify:track:7szaJEu4rkDkWJTr4wupXb",
          },
          {
            id: "track_weeknd_10",
            name: "Escape from LA",
            durationMs: 356107,
            uri: "spotify:track:5QO79kh1waicV47BqGRL3g",
          },
        ],
      },
      dawnFm: {
        name: "Dawn FM",
        image: ALBUM_COVERS.dawn_fm,
        tracks: [
          {
            id: "track_weeknd_11",
            name: "Take My Breath",
            durationMs: 219893,
            uri: "spotify:track:1FmP1W5N0YzgKqZi3AJk8V",
          },
          {
            id: "track_weeknd_12",
            name: "Sacrifice",
            durationMs: 188307,
            uri: "spotify:track:2LBqCSwhJGcFQeTHMVGwy3",
          },
          {
            id: "track_weeknd_13",
            name: "Out of Time",
            durationMs: 214240,
            uri: "spotify:track:0VE7FK5CTcGDMVcNOaXBkO",
          },
          {
            id: "track_weeknd_14",
            name: "Dawn FM",
            durationMs: 93333,
            uri: "spotify:track:1FmP1W5N0YzgKqZi3AJk8V",
          },
          {
            id: "track_weeknd_15",
            name: "Gasoline",
            durationMs: 193067,
            uri: "spotify:track:2LBqCSwhJGcFQeTHMVGwy3",
          },
          {
            id: "track_weeknd_16",
            name: "How Do I Make You Love Me?",
            durationMs: 230400,
            uri: "spotify:track:0VE7FK5CTcGDMVcNOaXBkO",
          },
          {
            id: "track_weeknd_17",
            name: "I Heard You're Married",
            durationMs: 264533,
            uri: "spotify:track:1FmP1W5N0YzgKqZi3AJk8V",
          },
          {
            id: "track_weeknd_18",
            name: "Less Than Zero",
            durationMs: 211987,
            uri: "spotify:track:2LBqCSwhJGcFQeTHMVGwy3",
          },
        ],
      },
    },
  },

  // Lady Gaga - 2 albums
  ladyGaga: {
    artist: "Lady Gaga",
    albums: {
      chromatica: {
        name: "Chromatica",
        image: ALBUM_COVERS.chromatica,
        tracks: [
          {
            id: "track_gaga_1",
            name: "Rain on Me",
            durationMs: 182427,
            uri: "spotify:track:7ju97lgwC2rKQ6wwsf9no9",
          },
          {
            id: "track_gaga_2",
            name: "Stupid Love",
            durationMs: 193093,
            uri: "spotify:track:6lzc0Al0zfZOIFsFvBS1ki",
          },
          {
            id: "track_gaga_3",
            name: "Free Woman",
            durationMs: 191187,
            uri: "spotify:track:4LGQLAslNx5w5nINlkD7vf",
          },
          {
            id: "track_gaga_4",
            name: "911",
            durationMs: 174653,
            uri: "spotify:track:5jBqaKHANNQQa11HlJ2xz2",
          },
          {
            id: "track_gaga_5",
            name: "Replay",
            durationMs: 195840,
            uri: "spotify:track:2tGvhPsGRQsxuz0HKrXSIb",
          },
          {
            id: "track_gaga_6",
            name: "Sour Candy",
            durationMs: 136800,
            uri: "spotify:track:3WXHkOPFPWMDKbhqExN5Eb",
          },
          {
            id: "track_gaga_7",
            name: "Enigma",
            durationMs: 208506,
            uri: "spotify:track:2YjVXe0nUCYfJJCYgVwzVF",
          },
          {
            id: "track_gaga_8",
            name: "Plastic Doll",
            durationMs: 194427,
            uri: "spotify:track:1Td3baxfr7OPSjdRHfbBQP",
          },
          {
            id: "track_gaga_9",
            name: "Sine from Above",
            durationMs: 253493,
            uri: "spotify:track:6lC8MHKbpyOYFh0VkuvVhT",
          },
          {
            id: "track_gaga_10",
            name: "1000 Doves",
            durationMs: 206293,
            uri: "spotify:track:6FIbJIm6xNsFfVNLKvWnFG",
          },
        ],
      },
      bornThisWay: {
        name: "Born This Way",
        image: ALBUM_COVERS.born_this_way,
        tracks: [
          {
            id: "track_gaga_11",
            name: "Born This Way",
            durationMs: 260680,
            uri: "spotify:track:4pAl7lTO4ebOvEKbE8ZKAz",
          },
          {
            id: "track_gaga_12",
            name: "Judas",
            durationMs: 249040,
            uri: "spotify:track:7f7w4FKG9VoEnBOAx3vdJQ",
          },
          {
            id: "track_gaga_13",
            name: "The Edge of Glory",
            durationMs: 320040,
            uri: "spotify:track:1HPjhTmPX1uxuOUf6Xso6I",
          },
          {
            id: "track_gaga_14",
            name: "You and I",
            durationMs: 306000,
            uri: "spotify:track:7cf8hOGPLFAiOsHJJQN7PF",
          },
          {
            id: "track_gaga_15",
            name: "Marry the Night",
            durationMs: 258467,
            uri: "spotify:track:2xOVHaHMK7o7Kk8gTt6Yfu",
          },
          {
            id: "track_gaga_16",
            name: "Alejandro",
            durationMs: 277400,
            uri: "spotify:track:7vDwmbASyFbSuKtKMxfYX3",
          },
          {
            id: "track_gaga_17",
            name: "Bad Romance",
            durationMs: 294880,
            uri: "spotify:track:2iuZJX9X9P7LRgaAHPONet",
          },
          {
            id: "track_gaga_18",
            name: "Hair",
            durationMs: 362067,
            uri: "spotify:track:5LmkTSZtbgDxknW6NNwrVB",
          },
          {
            id: "track_gaga_19",
            name: "Scheiße",
            durationMs: 219707,
            uri: "spotify:track:7BKAVe1kLNAmG0eRXxhKIM",
          },
          {
            id: "track_gaga_20",
            name: "Government Hooker",
            durationMs: 263173,
            uri: "spotify:track:5xQdSFhKxnlbJHEW7EMGgW",
          },
        ],
      },
    },
  },

  // Harry Styles - 2 albums
  harryStyles: {
    artist: "Harry Styles",
    albums: {
      harrysHouse: {
        name: "Harry's House",
        image: ALBUM_COVERS.harrys_house,
        tracks: [
          {
            id: "track_harry_1",
            name: "As It Was",
            durationMs: 167303,
            uri: "spotify:track:4Dvkj6JhhA12EX05fT7y2e",
          },
          {
            id: "track_harry_2",
            name: "Music for a Sushi Restaurant",
            durationMs: 193067,
            uri: "spotify:track:5Z9KJZvQzH6PFmb8SNkxuk",
          },
          {
            id: "track_harry_3",
            name: "Late Night Talking",
            durationMs: 177707,
            uri: "spotify:track:1qEmFfgcLObUffeKlVEKQg",
          },
          {
            id: "track_harry_4",
            name: "Love of My Life",
            durationMs: 191387,
            uri: "spotify:track:1qEmFfgcLObUffeKlVEKQg",
          },
        ],
      },
      fineLine: {
        name: "Fine Line",
        image: ALBUM_COVERS.fine_line,
        tracks: [
          {
            id: "track_harry_5",
            name: "Watermelon Sugar",
            durationMs: 174000,
            uri: "spotify:track:6UelLqGlWMcVH1E5c4H7lY",
          },
          {
            id: "track_harry_6",
            name: "Adore You",
            durationMs: 207853,
            uri: "spotify:track:3jjujdWJ72nww5eGnfs2E7",
          },
          {
            id: "track_harry_7",
            name: "Golden",
            durationMs: 208107,
            uri: "spotify:track:6Qs4SXO9dwPj5GKvVOv8Ki",
          },
        ],
      },
    },
  },

  // Dua Lipa - 2 albums
  duaLipa: {
    artist: "Dua Lipa",
    albums: {
      futureNostalgia: {
        name: "Future Nostalgia",
        image: ALBUM_COVERS.future_nostalgia,
        tracks: [
          {
            id: "track_dua_1",
            name: "Don't Start Now",
            durationMs: 183290,
            uri: "spotify:track:6WrI0LAC5M1Rw2MnX2ZvEg",
          },
          {
            id: "track_dua_2",
            name: "Levitating",
            durationMs: 203064,
            uri: "spotify:track:463CkQjx2Zk1yXoBuierM9",
          },
          {
            id: "track_dua_3",
            name: "Physical",
            durationMs: 194107,
            uri: "spotify:track:0DMhN8G6VeL8jP7RGBcIDv",
          },
          {
            id: "track_dua_4",
            name: "Love Again",
            durationMs: 264107,
            uri: "spotify:track:017PF4Q3l2DBJh1OpmJt1R",
          },
          {
            id: "track_dua_5",
            name: "Good in Bed",
            durationMs: 221947,
            uri: "spotify:track:017PF4Q3l2DBJh1OpmJt1R",
          },
        ],
      },
      duaLipa: {
        name: "Dua Lipa",
        image: ALBUM_COVERS.dua_lipa,
        tracks: [
          {
            id: "track_dua_6",
            name: "New Rules",
            durationMs: 209320,
            uri: "spotify:track:2ekn2ttSfGqwhhate0LSR0",
          },
          {
            id: "track_dua_7",
            name: "Be the One",
            durationMs: 201773,
            uri: "spotify:track:7CFXNbSl6QfUCJ5vNvN8Lr",
          },
          {
            id: "track_dua_8",
            name: "One Kiss",
            durationMs: 214293,
            uri: "spotify:track:7ef4DlsgrMEH11cDZd32M6",
          },
        ],
      },
    },
  },

  // Ed Sheeran - 2 albums
  edSheeran: {
    artist: "Ed Sheeran",
    albums: {
      divide: {
        name: "÷ (Divide)",
        image: ALBUM_COVERS.divide,
        tracks: [
          {
            id: "track_ed_1",
            name: "Shape of You",
            durationMs: 233713,
            uri: "spotify:track:7qiZfU4dY1lWllzX7mPBI3",
          },
          {
            id: "track_ed_2",
            name: "Perfect",
            durationMs: 263400,
            uri: "spotify:track:0tgVpDi06FyKpA1z0VMD4v",
          },
          {
            id: "track_ed_3",
            name: "Castle on the Hill",
            durationMs: 261293,
            uri: "spotify:track:6Y1CLPwYe6T1rkSCOlCK4R",
          },
          {
            id: "track_ed_4",
            name: "Thinking Out Loud",
            durationMs: 280853,
            uri: "spotify:track:3aCqxSTSHJLWUCLYMGf4rD",
          },
        ],
      },
      equals: {
        name: "= (Equals)",
        image: ALBUM_COVERS.equals,
        tracks: [
          {
            id: "track_ed_5",
            name: "Bad Habits",
            durationMs: 231026,
            uri: "spotify:track:6hQlvGPJZjjJsj3VNUz6vC",
          },
          {
            id: "track_ed_6",
            name: "Shivers",
            durationMs: 207893,
            uri: "spotify:track:50nfwKoDiSYg8zOCREWAm5",
          },
          {
            id: "track_ed_7",
            name: "First Time",
            durationMs: 189187,
            uri: "spotify:track:0lYBvDz87v6w5GP3awwTfV",
          },
        ],
      },
    },
  },

  // Billie Eilish - 2 albums
  billieEilish: {
    artist: "Billie Eilish",
    albums: {
      happierthanever: {
        name: "Happier Than Ever",
        image: ALBUM_COVERS.happier_than_ever,
        tracks: [
          {
            id: "track_billie_1",
            name: "Happier Than Ever",
            durationMs: 298213,
            uri: "spotify:track:2Fxmhks0bxGSBdJ92vM42m",
          },
          {
            id: "track_billie_2",
            name: "Therefore I Am",
            durationMs: 174320,
            uri: "spotify:track:3Rf3xiCnaXjM0d6j6K1iK0",
          },
          {
            id: "track_billie_3",
            name: "Your Power",
            durationMs: 240053,
            uri: "spotify:track:2Ow9BHCNQ7UwDbB8aQBHtJ",
          },
          {
            id: "track_billie_4",
            name: "Ocean Eyes",
            durationMs: 199826,
            uri: "spotify:track:2JokupLhO5JUiN4b5dq9Ar",
          },
        ],
      },
      wwafawdwg: {
        name: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
        image: ALBUM_COVERS.wwafawdwg,
        tracks: [
          {
            id: "track_billie_5",
            name: "bad guy",
            durationMs: 194088,
            uri: "spotify:track:2WfaOiMkCvy7F5fcp2zZ8L",
          },
          {
            id: "track_billie_6",
            name: "when the party's over",
            durationMs: 195925,
            uri: "spotify:track:43zdsphuZLzwA9k4DWkD0k",
          },
          {
            id: "track_billie_7",
            name: "bury a friend",
            durationMs: 193187,
            uri: "spotify:track:4SSnFejRGlZikf02HLewEF",
          },
          {
            id: "track_billie_8",
            name: "Everything I Wanted",
            durationMs: 245373,
            uri: "spotify:track:1Ji4PwuaTOOJFf5nYzRU8y",
          },
        ],
      },
    },
  },

  // SPANISH ARTISTS

  // Feid - 2 albums
  feid: {
    artist: "Feid",
    albums: {
      ferxxocalipsis: {
        name: "FERXXOCALIPSIS",
        image: ALBUM_COVERS.ferxxocalipsis,
        tracks: [
          {
            id: "track_feid_1",
            name: "LUNA",
            durationMs: 187826,
            uri: "spotify:track:1nqYsOef1yKKuGOVchbsk6",
          },
          {
            id: "track_feid_2",
            name: "NORMAL",
            durationMs: 178053,
            uri: "spotify:track:0e7ipj03S05BNilyu5bRzt",
          },
          {
            id: "track_feid_3",
            name: "CHORRITO PA LAS ANIMAS",
            durationMs: 163026,
            uri: "spotify:track:2d8JP84HNLKhmd6IYOoupQ",
          },
          {
            id: "track_feid_4",
            name: "CULO Y CABEZA",
            durationMs: 178826,
            uri: "spotify:track:3Nz7SqSHRyHVbAFJJ2thMZ",
          },
          {
            id: "track_feid_5",
            name: "FELIZ CUMPLEANOS FERXXO",
            durationMs: 189226,
            uri: "spotify:track:7ju97lgwC2rKQ6wwsf9no9",
          },
          {
            id: "track_feid_6",
            name: "SI TE LA ENCUENTRAS POR AHI",
            durationMs: 193026,
            uri: "spotify:track:6lzc0Al0zfZOIFsFvBS1ki",
          },
          {
            id: "track_feid_7",
            name: "LA INOCENTE",
            durationMs: 168026,
            uri: "spotify:track:4LGQLAslNx5w5nINlkD7vf",
          },
          {
            id: "track_feid_8",
            name: "PROHIBIDOX",
            durationMs: 183026,
            uri: "spotify:track:5jBqaKHANNQQa11HlJ2xz2",
          },
          {
            id: "track_feid_9",
            name: "BELIXE",
            durationMs: 175026,
            uri: "spotify:track:4pAl7lTO4ebOvEKbE8ZKAz",
          },
          {
            id: "track_feid_10",
            name: "NIEVE DE COCO",
            durationMs: 195026,
            uri: "spotify:track:7f7w4FKG9VoEnBOAx3vdJQ",
          },
        ],
      },
      mor: {
        name: "MOR",
        image: ALBUM_COVERS.mor,
        tracks: [
          {
            id: "track_feid_11",
            name: "CASTIGO",
            durationMs: 163573,
            uri: "spotify:track:5QO79kh1waicV47BqGRL3g",
          },
          {
            id: "track_feid_12",
            name: "PORFA",
            durationMs: 197866,
            uri: "spotify:track:1HPjhTmPX1uxuOUf6Xso6I",
          },
          {
            id: "track_feid_13",
            name: "NIÑO COCHINO",
            durationMs: 171213,
            uri: "spotify:track:7cf8hOGPLFAiOsHJJQN7PF",
          },
          {
            id: "track_feid_14",
            name: "NADIE COMO TU",
            durationMs: 184026,
            uri: "spotify:track:2p8IUWQDrpjuFltbdgLOag",
          },
          {
            id: "track_feid_15",
            name: "AGUARDIENTE",
            durationMs: 174266,
            uri: "spotify:track:1FmP1W5N0YzgKqZi3AJk8V",
          },
          {
            id: "track_feid_16",
            name: "FUMETEO",
            durationMs: 188693,
            uri: "spotify:track:2LBqCSwhJGcFQeTHMVGwy3",
          },
          {
            id: "track_feid_17",
            name: "GANGSTERS",
            durationMs: 177466,
            uri: "spotify:track:0VE7FK5CTcGDMVcNOaXBkO",
          },
          {
            id: "track_feid_18",
            name: "BOTELLA TRAS BOTELLA",
            durationMs: 165026,
            uri: "spotify:track:6Y1CLPwYe6T1rkSCOlCK4R",
          },
        ],
      },
    },
  },

  // Bad Bunny - 2 albums
  badBunny: {
    artist: "Bad Bunny",
    albums: {
      verano: {
        name: "Un Verano Sin Ti",
        image: ALBUM_COVERS.un_verano_sin_ti,
        tracks: [
          {
            id: "track_badbunny_1",
            name: "Moscow Mule",
            durationMs: 242400,
            uri: "spotify:track:6Dv5ZGvQSe1jOdYkm7Gr7S",
          },
          {
            id: "track_badbunny_2",
            name: "Me Porto Bonito",
            durationMs: 175173,
            uri: "spotify:track:6ku0uyJUq7ZoZMpkaMcRyO",
          },
          {
            id: "track_badbunny_3",
            name: "Tití Me Preguntó",
            durationMs: 252027,
            uri: "spotify:track:5Z9KJZvQzH6PFmb8SNkxuk",
          },
          {
            id: "track_badbunny_4",
            name: "Ojitos Lindos",
            durationMs: 256667,
            uri: "spotify:track:1qEmFfgcLObUffeKlVEKQg",
          },
          {
            id: "track_badbunny_5",
            name: "Party",
            durationMs: 189400,
            uri: "spotify:track:1qEmFfgcLObUffeKlVEKQg",
          },
        ],
      },
      yhlqmdlg: {
        name: "YHLQMDLG",
        image: ALBUM_COVERS.yhlqmdlg,
        tracks: [
          {
            id: "track_badbunny_6",
            name: "Yo Perreo Sola",
            durationMs: 167707,
            uri: "spotify:track:3jjujdWJ72nww5eGnfs2E7",
          },
          {
            id: "track_badbunny_7",
            name: "Safaera",
            durationMs: 295853,
            uri: "spotify:track:6Qs4SXO9dwPj5GKvVOv8Ki",
          },
          {
            id: "track_badbunny_8",
            name: "La Difícil",
            durationMs: 223787,
            uri: "spotify:track:2Ch7LmS7r2Gy2kc64wv3Bz",
          },
          {
            id: "track_badbunny_9",
            name: "Vete",
            durationMs: 172000,
            uri: "spotify:track:2Ch7LmS7r2Gy2kc64wv3Bz",
          },
        ],
      },
    },
  },

  // Nathy Peluso - 2 albums
  nathyPeluso: {
    artist: "Nathy Peluso",
    albums: {
      calambre: {
        name: "Calambre",
        image: ALBUM_COVERS.calambre,
        tracks: [
          {
            id: "track_nathy_1",
            name: "BUSINESS WOMAN",
            durationMs: 207706,
            uri: "spotify:track:3Rf3xiCnaXjM0d6j6K1iK0",
          },
          {
            id: "track_nathy_2",
            name: "BZRP Music Sessions #36",
            durationMs: 261120,
            uri: "spotify:track:7KXjTSCq5nL1LoYtL7XhS8",
          },
          {
            id: "track_nathy_3",
            name: "CALAMBRE",
            durationMs: 194493,
            uri: "spotify:track:6Qs4SXO9dwPj5GKvVOv8Ki",
          },
          {
            id: "track_nathy_4",
            name: "CHUMBA",
            durationMs: 183680,
            uri: "spotify:track:2Ch7LmS7r2Gy2kc64wv3Bz",
          },
          {
            id: "track_nathy_5",
            name: "ESMERALDA",
            durationMs: 218026,
            uri: "spotify:track:5Z9KJZvQzH6PFmb8SNkxuk",
          },
          {
            id: "track_nathy_6",
            name: "CORASHE",
            durationMs: 238373,
            uri: "spotify:track:1qEmFfgcLObUffeKlVEKQg",
          },
          {
            id: "track_nathy_7",
            name: "LA SANDUNGUERA",
            durationMs: 198613,
            uri: "spotify:track:3jjujdWJ72nww5eGnfs2E7",
          },
          {
            id: "track_nathy_8",
            name: "QUE LE DEN",
            durationMs: 168480,
            uri: "spotify:track:6Qs4SXO9dwPj5GKvVOv8Ki",
          },
          {
            id: "track_nathy_9",
            name: "POR EL BULEVAR",
            durationMs: 225493,
            uri: "spotify:track:2Ch7LmS7r2Gy2kc64wv3Bz",
          },
          {
            id: "track_nathy_10",
            name: "ATEO",
            durationMs: 192960,
            uri: "spotify:track:5Z9KJZvQzH6PFmb8SNkxuk",
          },
        ],
      },
      laSandunguera: {
        name: "La Sandunguera",
        image: ALBUM_COVERS.la_sandunguera,
        tracks: [
          {
            id: "track_nathy_11",
            name: "PICA",
            durationMs: 185226,
            uri: "spotify:track:2WfaOiMkCvy7F5fcp2zZ8L",
          },
          {
            id: "track_nathy_12",
            name: "PISTOLA",
            durationMs: 201493,
            uri: "spotify:track:43zdsphuZLzwA9k4DWkD0k",
          },
          {
            id: "track_nathy_13",
            name: "AMOR AMOR",
            durationMs: 177813,
            uri: "spotify:track:4SSnFejRGlZikf02HLewEF",
          },
          {
            id: "track_nathy_14",
            name: "MAFIOSA",
            durationMs: 211680,
            uri: "spotify:track:1Ji4PwuaTOOJFf5nYzRU8y",
          },
          {
            id: "track_nathy_15",
            name: "AFRODITA",
            durationMs: 194026,
            uri: "spotify:track:2Fxmhks0bxGSBdJ92vM42m",
          },
          {
            id: "track_nathy_16",
            name: "LA NOCHE DE ANOCHE",
            durationMs: 208226,
            uri: "spotify:track:3Rf3xiCnaXjM0d6j6K1iK0",
          },
          {
            id: "track_nathy_17",
            name: "MALA",
            durationMs: 176293,
            uri: "spotify:track:7KXjTSCq5nL1LoYtL7XhS8",
          },
          {
            id: "track_nathy_18",
            name: "TRANKILINA",
            durationMs: 168960,
            uri: "spotify:track:6Qs4SXO9dwPj5GKvVOv8Ki",
          },
        ],
      },
    },
  },

  // Tyler, The Creator - 2 albums
  tylerTheCreator: {
    artist: "Tyler, The Creator",
    albums: {
      flowerBoy: {
        name: "Flower Boy",
        image: ALBUM_COVERS.flower_boy,
        tracks: [
          {
            id: "track_tyler_1",
            name: "See You Again",
            durationMs: 180053,
            uri: "spotify:track:1qEmFfgcLObUffeKlVEKQg",
          },
          {
            id: "track_tyler_2",
            name: "Boredom",
            durationMs: 331173,
            uri: "spotify:track:3jjujdWJ72nww5eGnfs2E7",
          },
          {
            id: "track_tyler_3",
            name: "911 / Mr. Lonely",
            durationMs: 270667,
            uri: "spotify:track:6Qs4SXO9dwPj5GKvVOv8Ki",
          },
          {
            id: "track_tyler_4",
            name: "Glitter",
            durationMs: 202400,
            uri: "spotify:track:2Ch7LmS7r2Gy2kc64wv3Bz",
          },
          {
            id: "track_tyler_5",
            name: "Who Dat Boy",
            durationMs: 201893,
            uri: "spotify:track:5Z9KJZvQzH6PFmb8SNkxuk",
          },
          {
            id: "track_tyler_6",
            name: "Pothole",
            durationMs: 225720,
            uri: "spotify:track:1qEmFfgcLObUffeKlVEKQg",
          },
          {
            id: "track_tyler_7",
            name: "Garden Shed",
            durationMs: 245320,
            uri: "spotify:track:3jjujdWJ72nww5eGnfs2E7",
          },
          {
            id: "track_tyler_8",
            name: "I Ain't Got Time!",
            durationMs: 189520,
            uri: "spotify:track:6Qs4SXO9dwPj5GKvVOv8Ki",
          },
          {
            id: "track_tyler_9",
            name: "Foreword",
            durationMs: 118960,
            uri: "spotify:track:2Ch7LmS7r2Gy2kc64wv3Bz",
          },
          {
            id: "track_tyler_10",
            name: "Droppin' Seeds",
            durationMs: 207680,
            uri: "spotify:track:5Z9KJZvQzH6PFmb8SNkxuk",
          },
        ],
      },
      igor: {
        name: "IGOR",
        image: ALBUM_COVERS.igor,
        tracks: [
          {
            id: "track_tyler_11",
            name: "IGOR'S THEME",
            durationMs: 210893,
            uri: "spotify:track:2Ch7LmS7r2Gy2kc64wv3Bz",
          },
          {
            id: "track_tyler_12",
            name: "EARFQUAKE",
            durationMs: 190720,
            uri: "spotify:track:5Z9KJZvQzH6PFmb8SNkxuk",
          },
          {
            id: "track_tyler_13",
            name: "I THINK",
            durationMs: 213667,
            uri: "spotify:track:1qEmFfgcLObUffeKlVEKQg",
          },
          {
            id: "track_tyler_14",
            name: "EXACTLY WHAT YOU RUN FROM YOU END UP CHASING",
            durationMs: 96320,
            uri: "spotify:track:3jjujdWJ72nww5eGnfs2E7",
          },
          {
            id: "track_tyler_15",
            name: "RUNNING OUT OF TIME",
            durationMs: 178800,
            uri: "spotify:track:6Qs4SXO9dwPj5GKvVOv8Ki",
          },
          {
            id: "track_tyler_16",
            name: "NEW MAGIC WAND",
            durationMs: 195040,
            uri: "spotify:track:2Ch7LmS7r2Gy2kc64wv3Bz",
          },
          {
            id: "track_tyler_17",
            name: "A BOY IS A GUN",
            durationMs: 210960,
            uri: "spotify:track:5Z9KJZvQzH6PFmb8SNkxuk",
          },
          {
            id: "track_tyler_18",
            name: "PUPPET",
            durationMs: 173440,
            uri: "spotify:track:1qEmFfgcLObUffeKlVEKQg",
          },
          {
            id: "track_tyler_19",
            name: "WHAT'S GOOD",
            durationMs: 217360,
            uri: "spotify:track:3jjujdWJ72nww5eGnfs2E7",
          },
          {
            id: "track_tyler_20",
            name: "GONE, GONE / THANK YOU",
            durationMs: 387680,
            uri: "spotify:track:6Qs4SXO9dwPj5GKvVOv8Ki",
          },
        ],
      },
    },
  },

  // Additional popular international artists for variety

  // Olivia Rodrigo - 2 albums
  oliviaRodrigo: {
    artist: "Olivia Rodrigo",
    albums: {
      sour: {
        name: "SOUR",
        image: ALBUM_COVERS.sour,
        tracks: [
          {
            id: "track_olivia_1",
            name: "good 4 u",
            durationMs: 178147,
            uri: "spotify:track:4ZtFanR9U6ndgddUvNcjcG",
          },
          {
            id: "track_olivia_2",
            name: "drivers license",
            durationMs: 242573,
            uri: "spotify:track:7lPN2DXiMsVn7XUKtOW1CS",
          },
          {
            id: "track_olivia_3",
            name: "deja vu",
            durationMs: 215860,
            uri: "spotify:track:6HU7h9RYOaPRFeh0R3UeAr",
          },
          {
            id: "track_olivia_4",
            name: "traitor",
            durationMs: 228826,
            uri: "spotify:track:5CZ40GBx1sQ9agT82CLQCT",
          },
        ],
      },
      guts: {
        name: "GUTS",
        image: ALBUM_COVERS.guts,
        tracks: [
          {
            id: "track_olivia_5",
            name: "vampire",
            durationMs: 219347,
            uri: "spotify:track:1kuGVB7EU95pJObxwvfwKS",
          },
          {
            id: "track_olivia_6",
            name: "bad idea right?",
            durationMs: 184293,
            uri: "spotify:track:3IX0yuEVvDbnqUwMBB3ouC",
          },
          {
            id: "track_olivia_7",
            name: "get him back!",
            durationMs: 211200,
            uri: "spotify:track:0O6P0sNWIWsm0ysJ8CLHQE",
          },
          {
            id: "track_olivia_8",
            name: "love is embarrassing",
            durationMs: 146773,
            uri: "spotify:track:5wANPM4fQCJwkGd4rN57mH",
          },
        ],
      },
    },
  },

  // Ariana Grande - 2 albums
  arianaGrande: {
    artist: "Ariana Grande",
    albums: {
      positions: {
        name: "Positions",
        image: ALBUM_COVERS.positions,
        tracks: [
          {
            id: "track_ariana_1",
            name: "positions",
            durationMs: 172827,
            uri: "spotify:track:35mvY5S1H3J2QZyna3TFe0",
          },
          {
            id: "track_ariana_2",
            name: "34+35",
            durationMs: 173893,
            uri: "spotify:track:6Im9k8u9iIVKUQQHccFeIL",
          },
          {
            id: "track_ariana_3",
            name: "pov",
            durationMs: 201600,
            uri: "spotify:track:2dIp0r0mwFYqaT4iqN8Jvr",
          },
          {
            id: "track_ariana_4",
            name: "my hair",
            durationMs: 172533,
            uri: "spotify:track:5wANPM4fQCJwkGd4rN57mH",
          },
        ],
      },
      thankUNext: {
        name: "thank u, next",
        image: ALBUM_COVERS.thank_u_next,
        tracks: [
          {
            id: "track_ariana_5",
            name: "7 rings",
            durationMs: 178827,
            uri: "spotify:track:6ocbgoVGwYJhOv1GgI9NsF",
          },
          {
            id: "track_ariana_6",
            name: "thank u, next",
            durationMs: 207333,
            uri: "spotify:track:3e9HZxeyfWwjeyPAMmWSSQ",
          },
          {
            id: "track_ariana_7",
            name: "break up with your girlfriend, i'm bored",
            durationMs: 190120,
            uri: "spotify:track:4kV4N9D1iKVxx1KLvtTpjS",
          },
          {
            id: "track_ariana_8",
            name: "NASA",
            durationMs: 182200,
            uri: "spotify:track:1Ji4PwuaTOOJFf5nYzRU8y",
          },
        ],
      },
    },
  },
};

/**
 * Flattens the music catalog into a searchable array of tracks
 * Transforms nested artist/album/track structure into flat list
 * Each track includes artist, album, and image information for easy searching
 * @returns {Array<Object>} Array of track objects with complete metadata
 */
export function getFlattenedTracks() {
  const tracks = [];

  Object.values(mockMusicCatalog).forEach((artistData) => {
    Object.values(artistData.albums).forEach((album) => {
      album.tracks.forEach((track) => {
        tracks.push({
          id: track.id,
          name: track.name,
          artists: [artistData.artist],
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

export default mockMusicCatalog;
