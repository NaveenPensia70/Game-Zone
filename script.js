// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const playerNameInput = document.getElementById('player-name');
const playerNameDisplay = document.getElementById('player-name-display');
const startGameBtn = document.getElementById('start-game');
const easyModeBtn = document.getElementById('easy-mode');
const mediumModeBtn = document.getElementById('medium-mode');
const hardModeBtn = document.getElementById('hard-mode');
const playAgainBtn = document.getElementById('play-again');
const resetGameBtn = document.getElementById('reset-game');
const matchCountDisplay = document.getElementById('match-count');
const playerWinsDisplay = document.getElementById('player-wins');
const computerWinsDisplay = document.getElementById('computer-wins');
const historyContainer = document.getElementById('history-container');
const rockBtn = document.querySelector(".rock-btn");
const paperBtn = document.querySelector(".paper-btn");
const scissorsBtn = document.querySelector(".scissors-btn");
const showResult = document.querySelector(".show-result");
const choiceContainer = document.querySelector(".choice-container");
const pointsContainer = document.querySelector(".points-container");
const displayPlayerPoints = document.querySelector(".show-player-points");
const displayComputerPoints = document.querySelector(".show-computer-points");
const playerChoiceImg = document.querySelector(".player-choice");
const computerChoiceImg = document.querySelector(".computer-choice");

const rockUrl = 'rockgame.jpg';
const paperUrl = 'papergame.jpg';
const scissorsUrl = 'scissorsgame.jpg';
const defaultUrl = 'default.jpg';

let playerSelection = '';
let computerPoint = 0;
let playerPoint = 0;
let playerName = 'Player';
let difficulty = 'easy';
let matchCount = 1;
let playerWins = 0;
let computerWins = 0;
let gameActive = true;

let playerMoves = [];
let transitionMatrix = {
    'rock': { 'rock': 1/3, 'paper': 1/3, 'scissors': 1/3 },
    'paper': { 'rock': 1/3, 'paper': 1/3, 'scissors': 1/3 },
    'scissors': { 'rock': 1/3, 'paper': 1/3, 'scissors': 1/3 }
};

function defaultSetup() {
    function setImageWithFallback(imgElement, src) {
        imgElement.onerror = function() {
            this.src = defaultUrl;
            this.onerror = function() {
                this.style.display = 'none';
                this.parentElement.innerHTML += '<p class="error-message">Image failed to load</p>';
            };
        };
        imgElement.src = src;
    }

    setImageWithFallback(playerChoiceImg, paperUrl);
    setImageWithFallback(computerChoiceImg, rockUrl);

    const choiceButtons = document.querySelectorAll('.choice-btn img');
    choiceButtons.forEach(button => {
        const imgSrc = button.alt.toLowerCase() === 'rock' ? rockUrl :
                      button.alt.toLowerCase() === 'paper' ? paperUrl :
                      scissorsUrl;
        setImageWithFallback(button, imgSrc);
    });

    displayPlayerPoints.textContent = `Points: ${playerPoint}/5`;
    displayComputerPoints.textContent = `Points: ${computerPoint}/5`;
    showResult.textContent = "Make your choice!";
}

startGameBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', playAgain);
resetGameBtn.addEventListener('click', resetGame);
easyModeBtn.addEventListener('click', () => setDifficulty('easy'));
mediumModeBtn.addEventListener('click', () => setDifficulty('medium'));
hardModeBtn.addEventListener('click', () => setDifficulty('hard'));

rockBtn.addEventListener('click', () => makeMove('rock', rockUrl));
paperBtn.addEventListener('click', () => makeMove('paper', paperUrl));
scissorsBtn.addEventListener('click', () => makeMove('scissors', scissorsUrl));