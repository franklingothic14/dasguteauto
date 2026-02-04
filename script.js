let current = null;
let correctCount = 0;
let wrongCount = 0;
let mistakes = JSON.parse(localStorage.getItem('adjektivMistakes') || '[]');

const nounEl = document.getElementById('noun');
const englishEl = document.getElementById('english');
const feedbackEl = document.getElementById('feedback');
const correctEl = document.getElementById('correct');
const wrongEl = document.getElementById('wrong');
const mistakesEl = document.getElementById('mistakes');
const clearBtn = document.getElementById('clear-mistakes');

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-ending]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const chosen = e.target.dataset.ending;
            console.log('Button:', chosen, 'Correct:', current?.correct); // Діагностика!
            handleAnswer(chosen);
        });
    });
    clearBtn?.addEventListener('click', clearMistakes);
    
    setTimeout(() => {
        pickRandomWord();
        updateMistakes();
    }, 100);
});

function pickRandomWord() {
    const adj = ADJS[Math.floor(Math.random() * ADJS.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const cases = ['Nom', 'Akk']; // Для простоти Nom/Akk
    const article = articles[cases[Math.floor(Math.random() * cases.length)]][noun.gender];
    const correct = getCorrectEnding(noun.gender, cases[0]); // Спростимо до фіксованої логіки
    current = { article, adj: adj.stem, noun: noun.noun, en: noun.en, correct };
    englishEl.innerHTML = current.en;
    nounEl.innerHTML = `${current.article} ${current.adj} ${current.noun}`;
    feedbackEl.innerHTML = '';
    console.log('New word:', current);
}

function getCorrectEnding(gender, casus) {
    // Правило слабкої деклінації [web:11][web:12]
    if (gender === 'pl') return 'en';
    if (casus === 'Nom' && (gender === 'm' || gender === 'f' || gender === 'n')) return 'e';
    return 'en'; // Всі інші: -en
}

function handleAnswer(chosen) {
    const expected = current.correct;
    if (chosen === expected) {
        correctCount++;
        feedbackEl.innerHTML = `<span class="correct">✅ Richtig! ${current.article} ${current.adj}${expected} ${current.noun}</span>`;
        correctEl.textContent = `Richtig: ${correctCount}`;
    } else {
        wrongCount++;
        mistakes.push({ ...current, chosen });
        localStorage.setItem('adjektivMistakes', JSON.stringify(mistakes));
        feedbackEl.innerHTML = `<span class="wrong">❌ Falsch! Richtig: ${current.article} ${current.adj}${expected} ${current.noun}</span>`;
        wrongEl.textContent = `Falsch: ${wrongCount}`;
    }
    setTimeout(pickRandomWord, 2500);
}

function updateMistakes() {
    mistakesEl.innerHTML = `Fehler: ${mistakes.length}`;
}

function clearMistakes() {
    mistakes = [];
    localStorage.setItem('adjektivMistakes', '[]');
    updateMistakes();
    correctCount = 0;
    wrongCount = 0;
    correctEl.textContent = 'Richtig: 0';
    wrongEl.textContent = 'Falsch: 0';
}
