// БАЗИ ДАНИХ
const NOUNS = [
    {noun: "Rock", gender: "m", en: "skirt"},
    {noun: "Mantel", gender: "m", en: "coat"},
    {noun: "Pullover", gender: "m", en: "sweater"},
    {noun: "Anzug", gender: "m", en: "suit"},
    {noun: "T-Shirt", gender: "n", en: "t-shirt"},
    {noun: "Hemd", gender: "n", en: "shirt"},
    {noun: "Kleid", gender: "f", en: "dress"},
    {noun: "Bluse", gender: "f", en: "blouse"},
    {noun: "Hose", gender: "f", en: "trousers"},
    {noun: "Jacke", gender: "f", en: "jacket"},
    {noun: "Schuhe", gender: "pl", en: "shoes"},
    {noun: "Stiefel", gender: "pl", en: "boots"},
    {noun: "Socken", gender: "pl", en: "socks"},
    {noun: "Handschuhe", gender: "pl", en: "gloves"}
];

const ADJS = [
    {stem: "schwarz", en: "black"},
    {stem: "weiß", en: "white"},
    {stem: "blau", en: "blue"},
    {stem: "rot", en: "red"},
    {stem: "grün", en: "green"},
    {stem: "gelb", en: "yellow"},
    {stem: "neu", en: "new"},
    {stem: "alt", en: "old"},
    {stem: "teuer", en: "expensive"},
    {stem: "billig", en: "cheap"},
    {stem: "warm", en: "warm"},
    {stem: "kalt", en: "cold"},
    {stem: "lang", en: "long"},
    {stem: "kurz", en: "short"},
    {stem: "groß", en: "big"},
    {stem: "klein", en: "small"},
    {stem: "schön", en: "beautiful"},
    {stem: "hässlich", en: "ugly"},
    {stem: "bequem", en: "comfortable"},
    {stem: "eng", en: "tight"}
];

// ФУНКЦІЯ МИКСУВАННЯ (генерує нескінченно)
function generateWord() {
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const adj = ADJS[Math.floor(Math.random() * ADJS.length)];
    const cases = ["Nom", "Akk", "Dat"];
    const case_ = cases[Math.floor(Math.random() * cases.length)];
    
    const g = noun.gender;
    const art = {
        Nom: {m: 'der', n: 'das', f: 'die', pl: 'die'},
        Akk: {m: 'den', n: 'das', f: 'die', pl: 'die'},
        Dat: {m: 'dem', n: 'dem', f: 'der', pl: 'den'}
    }[case_][g];
    
    const end = {
        Nom: {m: 'e', n: 'e', f: 'e', pl: 'en'},
        Akk: {m: 'en', n: 'e', f: 'e', pl: 'en'},
        Dat: {m: 'en', n: 'en', f: 'en', pl: 'en'}
    }[case_][g];
    
    return {
        noun: noun.noun,
        adj_stem: adj.stem,
        case: case_,
        gender: g,
        english: `the ${adj.en} ${noun.en}`,
        correct: end
    };
}

// ГОТОВІ ПРИКЛАДИ (50 рандомних для старту)
const WORDS = [
    {"noun": "Schuhe", "adj_stem": "rot", "case": "Nom", "gender": "pl", "english": "the red shoes", "correct": "en"},
    {"noun": "Stiefel", "adj_stem": "teuer", "case": "Nom", "gender": "pl", "english": "the expensive boots", "correct": "en"},
    {"noun": "Anzug", "adj_stem": "grün", "case": "Dat", "gender": "m", "english": "the green suit", "correct": "en"},
    {"noun": "Mantel", "adj_stem": "hässlich", "case": "Nom", "gender": "m", "english": "the ugly coat", "correct": "e"},
    {"noun": "Jacke", "adj_stem": "kurz", "case": "Nom", "gender": "f", "english": "the short jacket", "correct": "e"},
    {"noun": "Rock", "adj_stem": "blau", "case": "Nom", "gender": "m", "english": "the blue skirt", "correct": "e"},
    {"noun": "Anzug", "adj_stem": "schön", "case": "Dat", "gender": "m", "english": "the beautiful suit", "correct": "en"},
    {"noun": "Rock", "adj_stem": "hässlich", "case": "Nom", "gender": "m", "english": "the ugly skirt", "correct": "e"},
    {"noun": "Stiefel", "adj_stem": "hässlich", "case": "Akk", "gender": "pl", "english": "the ugly boots", "correct": "en"},
    {"noun": "Anzug", "adj_stem": "groß", "case": "Dat", "gender": "m", "english": "the big suit", "correct": "en"},
    {"noun": "T-Shirt", "adj_stem": "schwarz", "case": "Nom", "gender": "n", "english": "the black t-shirt", "correct": "e"},
    {"noun": "Stiefel", "adj_stem": "kurz", "case": "Akk", "gender": "pl", "english": "the short boots", "correct": "en"},
    {"noun": "T-Shirt", "adj_stem": "grün", "case": "Nom", "gender": "n", "english": "the green t-shirt", "correct": "e"},
    {"noun": "Socken", "adj_stem": "warm", "case": "Nom", "gender": "pl", "english": "the warm socks", "correct": "en"},
    {"noun": "Mantel", "adj_stem": "lang", "case": "Nom", "gender": "m", "english": "the long coat", "correct": "e"},
    {"noun": "Hemd", "adj_stem": "kalt", "case": "Dat", "gender": "n", "english": "the cold shirt", "correct": "en"},
    {"noun": "T-Shirt", "adj_stem": "weiß", "case": "Dat", "gender": "n", "english": "the white t-shirt", "correct": "en"},
    {"noun": "Bluse", "adj_stem": "hässlich", "case": "Nom", "gender": "f", "english": "the ugly blouse", "correct": "e"},
    {"noun": "Kleid", "adj_stem": "blau", "case": "Dat", "gender": "f", "english": "the blue dress", "correct": "en"},
    {"noun": "T-Shirt", "adj_stem": "eng", "case": "Akk", "gender": "n", "english": "the tight t-shirt", "correct": "e"}
    // ... (ще 30, скоротив для повідомлення)
];
