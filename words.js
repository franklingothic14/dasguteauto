// words.js
const NOUNS = [
  { noun: "Rock", gender: "m", en: "skirt" },
  { noun: "Mantel", gender: "m", en: "coat" },
  { noun: "Pullover", gender: "m", en: "sweater" },
  { noun: "Anzug", gender: "m", en: "suit" },

  { noun: "T-Shirt", gender: "n", en: "t-shirt" },
  { noun: "Hemd", gender: "n", en: "shirt" },

  { noun: "Kleid", gender: "f", en: "dress" },
  { noun: "Bluse", gender: "f", en: "blouse" },
  { noun: "Hose", gender: "f", en: "trousers" },
  { noun: "Jacke", gender: "f", en: "jacket" },

  { noun: "Schuhe", gender: "pl", en: "shoes" },
  { noun: "Stiefel", gender: "pl", en: "boots" },
  { noun: "Socken", gender: "pl", en: "socks" },
  { noun: "Handschuhe", gender: "pl", en: "gloves" }
];

const ADJS = [
  { stem: "schwarz", en: "black" },
  { stem: "weiß", en: "white" },
  { stem: "blau", en: "blue" },
  { stem: "grün", en: "green" },
  { stem: "rot", en: "red" },
  { stem: "neu", en: "new" },
  { stem: "alt", en: "old" },
  { stem: "teuer", en: "expensive" },
  { stem: "billig", en: "cheap" },
  { stem: "schön", en: "beautiful" },
  { stem: "groß", en: "big" },
  { stem: "klein", en: "small" },
  { stem: "warm", en: "warm" },
  { stem: "kalt", en: "cold" },
  { stem: "modern", en: "modern" },
  { stem: "bequem", en: "comfortable" }
];

const ARTICLES = {
  Nom: { m: "der", n: "das", f: "die", pl: "die" },
  Akk: { m: "den", n: "das", f: "die", pl: "die" },
  Dat: { m: "dem", n: "dem", f: "der", pl: "den" }
};
