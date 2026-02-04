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

function updateMistakes() {
    if (mistakesEl) {
        if (mistakes.length > 0) {
            mistakesEl.innerHTML = `
                <h3>Adjektiv-Fehler</h3>
                <ul>${mistakes.map(m => `<li>${m.english}<br>${m.solution}</li>`).join('')}</ul>
            `;
        } else {
            mistakesEl.innerHTML = '<p>Noch keine Fehler! 👍</p>';
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
        feedbackEl.textContent = 'Fehler: WORDS nicht geladen!';
        feedbackEl.style.color = 'red';
        return;
    }
    const index = Math.floor(Math.random() * WORDS.length);
    current = WORDS[index];
    
    const art = articles[current.case][current.gender];
    const display = `${art} ${current.adj_stem}__ ${current.noun}`;
    
    englishEl.textContent = current.english;
    nounEl.innerHTML = display;  // innerHTML для __
    feedbackEl.textContent = '?';
    feedbackEl.style.color = '';
    
    console.log('Current:', current); // F12 Console
}

function handleAnswer(chosenEnding) {
    console.log('Button:', chosenEnding, 'Correct:', current.correct);
    
    if (!current) return;
    
    const art = articles[current.case][current.gender];
    const solution = `${art} ${current.adj_stem}${current.correct} ${current.noun}`;
    
    if (chosenEnding === current.correct) {
        correctCount++;
        feedbackEl.innerHTML = `✅ Richtig! <strong>${solution}</strong>`;
        feedbackEl.style.color = 'green';
    } else {
        wrongCount++;
        feedbackEl.innerHTML = `❌ Falsch. Richtig: <strong>${solution}</strong>`;
        feedbackEl.style.color = 'red';
        
        mistakes.push({english: current.english, solution: solution});
        localStorage.setItem('adjektivMistakes', JSON.stringify(mistakes));
        updateMistakes();
    }
    
    correctEl.textContent = `Richtig: ${correctCount}`;
    wrongEl.textContent = `Falsch: ${wrongCount}`;
    
    setTimeout(pickRandomWord, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.buttons button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const chosen = btn.getAttribute('data-ending');
            handleAnswer(chosen);
        });
    });
    clearBtn?.addEventListener('click', clearMistakes);
    
    setTimeout(() => {
        pickRandomWord();
        updateMistakes();
    }, 500);
});
