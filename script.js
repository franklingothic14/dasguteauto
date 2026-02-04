let current = null;
let correctCount = 0;
let wrongCount = 0;

let mistakes = JSON.parse(localStorage.getItem("adjektivMistakes") || "[]");

// ЛОГ: останні N відповідей
let answerLog = JSON.parse(localStorage.getItem("adjektivAnswerLog") || "[]");
const LOG_LIMIT = 18;

const nounEl = document.getElementById("noun");
const englishEl = document.getElementById("english");
const metaEl = document.getElementById("meta");
const feedbackEl = document.getElementById("feedback");

const correctEl = document.getElementById("correct");
const wrongEl = document.getElementById("wrong");
const mistakesEl = document.getElementById("mistakes");
const clearBtn = document.getElementById("clear-mistakes");

const logEl = document.getElementById("answer-log");
const clearLogBtn = document.getElementById("clear-log");

const CASES = ["Nom", "Akk", "Dat"];

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function expectedEndingWeak(casus, gender) {
  if (gender === "pl") return "en";
  if (casus === "Nom") return "e";
  if (casus === "Akk" && (gender === "f" || gender === "n")) return "e";
  return "en";
}

function updateStats() {
  correctEl.textContent = `Richtig: ${correctCount}`;
  wrongEl.textContent = `Falsch: ${wrongCount}`;
  mistakesEl.textContent = `Adjektiv-Fehler: ${mistakes.length}`;
}

function renderLog() {
  if (!logEl) return;

  // рендеримо без innerHTML: стабільніше + без XSS
  logEl.textContent = "";
  if (!answerLog.length) {
    logEl.textContent = "—";
    return;
  }

  // новіші зверху
  const items = answerLog.slice().reverse();
  for (const row of items) {
    const line = document.createElement("div");
    line.className = "log-line" + (row.ok ? "" : " log-wrong");
    line.textContent = row.text;
    logEl.appendChild(line);
  }
}

function pushLogLine(text, ok) {
  answerLog.push({ text, ok, ts: Date.now() });
  if (answerLog.length > LOG_LIMIT) answerLog = answerLog.slice(-LOG_LIMIT);
  localStorage.setItem("adjektivAnswerLog", JSON.stringify(answerLog));
  renderLog();
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

  nounEl.innerHTML =
    `${current.article} ` +
    `<span class="adj-gap">${current.adjStem}<span class="blank"></span></span> ` +
    `${current.noun}`;

  metaEl.textContent = `Fall: ${current.casus} · Genus: ${current.gender}`;
  feedbackEl.innerHTML = "";
}

function handleAnswer(chosenWithDash) {
  if (!current) return;

  const chosen = chosenWithDash.replace("-", "");
  const expected = current.correct;

  const questionShown = `${current.article} ${current.adjStem}____ ${current.noun} (${current.casus})`;
  const correctPhrase = `${current.article} ${current.adjStem}${expected} ${current.noun}`;

  // “пінг” у лог одразу при кліку (щоб було видно, що клік доходить)
  // якщо далі щось впаде — ти все одно побачиш цей рядок
  pushLogLine(`→ ${questionShown} | du klickst: -${chosen}`, true);

  if (chosen === expected) {
    correctCount++;
    feedbackEl.innerHTML = `<span class="correct">✅ Richtig! ${correctPhrase}</span>`;
    pushLogLine(`✅ OK | ${correctPhrase}`, true);
  } else {
    wrongCount++;
    feedbackEl.innerHTML = `<span class="wrong">❌ Falsch. Richtig: ${correctPhrase}</span>`;
    pushLogLine(`❌ WRONG | du: -${chosen} | richtig: -${expected} | ${correctPhrase}`, false);

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

function clearLog() {
  answerLog = [];
  localStorage.setItem("adjektivAnswerLog", "[]");
  renderLog();
}

document.addEventListener("DOMContentLoaded", () => {
  // safety: якщо елемента немає — ти б одразу побачив помилку раніше
  if (!logEl) console.warn("Log element #answer-log not found");

  document.querySelectorAll("[data-ending]").forEach((btn) => {
    btn.addEventListener("click", (e) => handleAnswer(e.currentTarget.dataset.ending));
  });

  clearBtn?.addEventListener("click", clearMistakes);
  clearLogBtn?.addEventListener("click", clearLog);

  updateStats();
  renderLog();
  pickRandomWord();
});
