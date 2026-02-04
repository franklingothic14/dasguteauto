// script.js

let current = null;
let correctCount = 0;
let wrongCount = 0;

let mistakes = JSON.parse(localStorage.getItem("adjektivMistakes") || "[]"); // safe parse pattern [web:53]

const nounEl = document.getElementById("noun");
const englishEl = document.getElementById("english");
const metaEl = document.getElementById("meta");
const feedbackEl = document.getElementById("feedback");

const correctEl = document.getElementById("correct");
const wrongEl = document.getElementById("wrong");
const mistakesEl = document.getElementById("mistakes");
const clearBtn = document.getElementById("clear-mistakes");

const CASES = ["Nom", "Akk", "Dat"];

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function expectedEndingWeak(casus, gender) {
  // Schwache Deklination nach bestimmtem Artikel:
  // -e тільки в Nom (m/f/n) та Akk (n/f), інакше -en; plural завжди -en у цій таблиці [cite:27]
  if (gender === "pl") return "en";
  if (casus === "Nom") return "e";
  if (casus === "Akk" && (gender === "f" || gender === "n")) return "e";
  return "en";
}

function buildCorrectPhrase(article, adjStem, ending, noun) {
  return `${article} ${adjStem}${ending} ${noun}`;
}

function updateStats() {
  correctEl.textContent = `Richtig: ${correctCount}`;
  wrongEl.textContent = `Falsch: ${wrongCount}`;
  mistakesEl.textContent = `Adjektiv-Fehler: ${mistakes.length}`;
}

function pickRandomWord() {
  const noun = rand(NOUNS);
  const adj = rand(ADJS);
  const casus = rand(CASES);

  const article = ARTICLES[casus][noun.gender];
  const ending = expectedEndingWeak(casus, noun.gender);

  current = {
    noun: noun.noun,
    gender: noun.gender,
    english: noun.en,
    adjStem: adj.stem,
    casus,
    article,
    correct: ending
  };

  englishEl.textContent = current.english;
  nounEl.textContent = `${current.article} ${current.adjStem} ${current.noun}`;
  metaEl.textContent = `Fall: ${current.casus} · Genus: ${current.gender}`;
  feedbackEl.innerHTML = "";

  console.log("Generated:", current);
}

function handleAnswer(chosenWithDash) {
  if (!current) return;

  const chosen = chosenWithDash.replace("-", ""); // "-e" -> "e", "-en" -> "en"
  const expected = current.correct;

  console.log("Clicked:", chosen, "Expected:", expected);

  const correctPhrase = buildCorrectPhrase(current.article, current.adjStem, expected, current.noun);

  if (chosen === expected) {
    correctCount++;
    feedbackEl.innerHTML = `<span class="correct">✅ Richtig! ${correctPhrase}</span>`;
  } else {
    wrongCount++;
    feedbackEl.innerHTML = `<span class="wrong">❌ Falsch. Richtig: ${correctPhrase}</span>`;
    mistakes.push({ ...current, chosen, ts: Date.now() });
    localStorage.setItem("adjektivMistakes", JSON.stringify(mistakes));
  }

  updateStats();
  setTimeout(pickRandomWord, 1200);
}

function clearMistakes() {
  mistakes = [];
  localStorage.setItem("adjektivMistakes", "[]");
  updateStats();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-ending]").forEach((btn) => {
    btn.addEventListener("click", (e) => handleAnswer(e.currentTarget.dataset.ending));
  });

  clearBtn.addEventListener("click", clearMistakes);

  updateStats();
  pickRandomWord();
});
