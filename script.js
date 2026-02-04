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

const articles = {
    Nom: {m: 'der', n: 'das', f: 'die', pl: 'die'},
    Akk: {m: 'den', n: 'das', f: 'die', pl: 'die'},
    Dat: {m: 'dem', n: 'dem', f: 'der', pl: 'den'}
};

const endings = {
    Nom: {m: 'e', n: 'e', f: 'e', pl: 'en'},
    Akk: {m: 'en', n: 'e', f: 'e', pl: 'en'},
    Dat: {m: 'en', n: 'en', f: 'en', pl: 'en'}
};

function updateMistakes() {
    if (mistakesEl) {
        if (mistakes.length > 0) {
            mistakesEl.innerHTML = `
                <h3>Adjektiv mistakes</h3>
                <ul>${mistakes.map(m => `<li>${m.english} → ${m.solution}</li>`).join('')}</ul>
            `;
        } else {
            mistakesEl.innerHTML = '<p>No mistakes yet!</p>';
        }
    }
}

function clearMistakes() {
    mistakes = [];
    localStorage.removeItem('adjektivMistakes');
    updateMistakes();
}

function pickRandomWord() {
    if (!WORDS || WORDS.length === 0) {
        feedbackEl.textContent = 'Error: WORDS not loaded!';
        feedbackEl.style.color = 'red';
        return;
    }
    const index = Math.floor(Math.random() * WORDS.length);
    current = WORDS[index];
    
    const art = articles[current.case][current.gender];
    const nounDisplay = `${art} ${current.adj_stem}__ ${current.noun}`;
    
    englishEl.textContent = current.english;
    nounEl.textContent = nounDisplay;
    feedbackEl.textContent = '';
}

function handleAnswer(chosenEnding) {
    if (!current) return;
    
    if (chosenEnding === current.correct) {
        correctCount++;
        feedbackEl.textContent = `Correct! ${current.adj_stem}${current.correct} ${current.noun}`;
        feedbackEl.style.color = 'green';
    } else {
        wrongCount++;
        const solution = `${articles[current.case][current.gender]} ${current.adj_stem}${current.correct} ${current.noun}`;
        feedbackEl.textContent = `Wrong. Correct: ${solution}`;
        feedbackEl.style.color = 'red';
        mistakes.push({
            english: current.english,
            solution: solution
        });
        localStorage.setItem('adjektivMistakes', JSON.stringify(mistakes));
        updateMistakes();
    }
    
    correctEl.textContent = `Correct: ${correctCount}`;
    wrongEl.textContent = `Wrong: ${wrongCount}`;
    
    setTimeout(pickRandomWord, 2000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.buttons button').forEach(btn => {
        btn.addEventListener('click', () => {
            const chosen = btn.getAttribute('data-ending');
            handleAnswer(chosen);
        });
    });
    clearBtn.addEventListener('click', clearMistakes);
    
    // Start
    setTimeout(() => {
        pickRandomWord();
        updateMistakes();
    }, 100);
});
