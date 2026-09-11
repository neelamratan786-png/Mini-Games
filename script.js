const menuSection = document.getElementById('game-menu');
const containerSection = document.getElementById('game-container');
const gameContent = document.getElementById('game-content');

function loadGame(gameType) {
    menuSection.classList.add('hidden');
    containerSection.classList.remove('hidden');

    if (gameType === 'guess') {
        renderGuessTheNumber();
    } else if (gameType === 'rps') {
        renderRPS();
    }
}

function goHome() {
    containerSection.classList.add('hidden');
    menuSection.classList.remove('hidden');
    gameContent.innerHTML = '';
}

// --- Game 1: Guess the Number ---
function renderGuessTheNumber() {
    let secretNumber = Math.floor(Math.random() * 100) + 1;

    gameContent.innerHTML = `
        <div class="game-box">
            <h2>🎯 Guess the Number</h2>
            <p style="margin: 1rem 0; color: #c8d6e5;">Guess a secret number between 1 and 100</p>
            <div style="margin-top: 1rem;">
                <input type="number" id="guess-input" min="1" max="100" placeholder="Enter number">
                <button class="action-btn" onclick="checkGuess(${secretNumber})">Submit</button>
            </div>
            <p id="guess-feedback" style="margin-top: 1.5rem; font-size: 1.2rem; font-weight: bold;"></p>
        </div>
    `;
}

function checkGuess(secret) {
    const userGuess = Number(document.getElementById('guess-input').value);
    const feedback = document.getElementById('guess-feedback');

    if (!userGuess) {
        feedback.textContent = "⚠️ Please enter a valid number!";
        feedback.style.color = "#feca57";
        return;
    }

    if (userGuess === secret) {
        feedback.textContent = `🎉 Awesome! You found the secret number (${secret})!`;
        feedback.style.color = "#1dd1a1";
    } else if (userGuess < secret) {
        feedback.textContent = "📈 Too low! Try a higher number.";
        feedback.style.color = "#ff6b6b";
    } else {
        feedback.textContent = "📉 Too high! Try a lower number.";
        feedback.style.color = "#ff6b6b";
    }
}

// --- Game 2: Rock, Paper, Scissors ---
function renderRPS() {
    gameContent.innerHTML = `
        <div class="game-box">
            <h2>✂️ Rock, Paper, Scissors</h2>
            <p style="margin: 1rem 0; color: #c8d6e5;">Pick your move below:</p>
            <div class="rps-btns">
                <button class="rps-btn rock" onclick="playRPS('Rock')">✊ Rock</button>
                <button class="rps-btn paper" onclick="playRPS('Paper')">✋ Paper</button>
                <button class="rps-btn scissors" onclick="playRPS('Scissors')">✌ Scissors</button>
            </div>
            <p id="rps-result" style="margin-top: 2rem; font-size: 1.2rem; font-weight: bold;"></p>
        </div>
    `;
}

function playRPS(playerChoice) {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const resultElement = document.getElementById('rps-result');

    let outcome = "";

    if (playerChoice === computerChoice) {
        outcome = `🤝 It's a tie! Both chose ${playerChoice}.`;
        resultElement.style.color = "#feca57";
    } else if (
        (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
        (playerChoice === 'Paper' && computerChoice === 'Rock') ||
        (playerChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
        outcome = `🎉 You Win! Your ${playerChoice} beats ${computerChoice}.`;
        resultElement.style.color = "#1dd1a1";
    } else {
        outcome = `😢 You Lose! Computer's ${computerChoice} beats ${playerChoice}.`;
        resultElement.style.color = "#ff6b6b";
    }

    resultElement.textContent = outcome;
}
