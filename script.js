// script.js
const board = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

// Winning combinations
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Update the game state and UI
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] || !gameActive) return;

    // Player's turn
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== null)) {
        statusText.textContent = "It's a tie!";
        gameActive = false;
        return;
    }

    // Switch turns and let the computer play
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Computer's turn...`;
    setTimeout(computerTurn, 500);
}

// Simple computer logic for choosing a random move
function computerTurn() {
    if (!gameActive) return;

    let availableCells = [];
    gameState.forEach((cell, index) => {
        if (!cell) availableCells.push(index);
    });

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameState[randomIndex] = currentPlayer;
    const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== null)) {
        statusText.textContent = "It's a tie!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = "Your turn!";
}

// Check if there's a winner
function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] === currentPlayer && gameState[b] === currentPlayer && gameState[c] === currentPlayer;
    });
}

// Restart the game
function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = Array(9).fill(null);
    statusText.textContent = "Your turn!";
    board.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
}

// Add event listeners
board.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
