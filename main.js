document.addEventListener('DOMContentLoaded', () => {

    const cells = document.querySelectorAll('.cell');
    const player1Score = document.getElementById('player1-score');
    const player2Score = document.getElementById('player2-score');
    const gameOverText = document.getElementById('game-over-text');
    const resetButton = document.getElementById('reset-button');
    const newGameButton = document.getElementById('new-game-button');

    let currentPlayer = 'X';
    let player1Points = 0;
    let player2Points = 0;
    let gameOver = false;
    let board = ['', '', '', '', '', '', '', '', ''];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    };

    const updateScoreBoard = () => {
        player1Score.textContent = `Jogador 1: ${player1Points}`;
        player2Score.textContent = `Jogador 2: ${player2Points}`;
    };

    const endGame = (result) => {
        gameOver = true;
        gameOverText.textContent = result;

        if (result !== 'Empate!') {
            if (currentPlayer === 'X') {
                player1Points++;
            } else {
                player2Points++;
            }
        }

        updateScoreBoard();
        resetButton.style.display = 'inline-block';
        newGameButton.style.display = 'inline-block';
    };

    const resetGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        gameOverText.textContent = '';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
        currentPlayer = 'X';
        resetButton.style.display = 'none';
        newGameButton.style.display = 'none';
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (!gameOver && !board[index]) {
                board[index] = currentPlayer;
                cell.textContent = currentPlayer;
                cell.classList.add(currentPlayer);

                if (checkWinner()) {
                    endGame(`Jogador ${currentPlayer} venceu!`);
                } else if (!board.includes('')) {
                    endGame('Empate!');
                } else {
                    switchPlayer();
                }
            }
        });
    });

    resetButton.addEventListener('click', resetGame);

    newGameButton.addEventListener('click', () => {
        resetGame();
        player1Points = 0;
        player2Points = 0;
        updateScoreBoard();
    });
});
