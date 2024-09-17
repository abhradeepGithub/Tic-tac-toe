const gameBoard = document.getElementById("gameBoard");
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("resetButton");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellPlayed = (cell, index) => {
  board[index] = currentPlayer;
  cell.innerHTML = currentPlayer;
};

const handlePlayerChange = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

const checkWinner = () => {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = board[winCondition[0]];
    let b = board[winCondition[1]];
    let c = board[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusDisplay.innerHTML = `It's a tie!`;
    gameActive = false;
    return;
  }

  handlePlayerChange();
};

const handleCellClick = (e) => {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (board[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  checkWinner();
};

const handleRestartGame = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusDisplay.innerHTML = "";
  cells.forEach(cell => cell.innerHTML = "");
};

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", handleRestartGame);
