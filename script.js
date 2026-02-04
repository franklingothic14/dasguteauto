// ... (весь код той самий, тільки зміни в handleAnswer)

function handleAnswer(chosenEnding) {
    console.log('Geklickt:', chosenEnding, 'Erwartet:', current.correct);
    
    if (!current) return;
    
    if (chosenEnding === current.correct) {
        correctCount++;
        const solution = `${articles[current.case][current.gender]} ${current.adj_stem}${current.correct} ${current.noun}`;
        feedbackEl.textContent = `✅ Richtig! ${solution}`;
        feedbackEl.style.color = 'green';
        feedbackEl.style.fontWeight = 'bold';
    } else {
        wrongCount++;
        const solution = `${articles[current.case][current.gender]} ${current.adj_stem}${current.correct} ${current.noun}`;
        feedbackEl.textContent = `❌ Falsch. Richtig: ${solution}`;
        feedbackEl.style.color = 'red';
        feedbackEl.style.fontWeight = 'bold';
        
        mistakes.push({
            english: current.english,
            solution: solution
        });
        localStorage.setItem('adjektivMistakes', JSON.stringify(mistakes));
        updateMistakes();
    }
    
    correctEl.textContent = `Richtig: ${correctCount}`;
    wrongEl.textContent = `Falsch: ${wrongCount}`;
    
    setTimeout(pickRandomWord, 2500);
}

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
