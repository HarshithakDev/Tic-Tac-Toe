// Constants
const cells = document.querySelectorAll(".cell");
//const board = document.getElementById("board");
const turnDisplay = document.getElementById("turn");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let winningCells = [];


const checkWin = () => {
	const winCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	
	for (const combo of winCombos) {
		const [a, b, c] = combo;
		if (
			boardState[a] &&
			boardState[a] === boardState[b] &&
			boardState[a] === boardState[c]
		) {
			gameActive = false;
			winningCells = [a, b, c];
			return boardState[a]
			
			
		}
	}
	
	if (!boardState.includes("")) {
		gameActive = false;
		return "Draw";
	}
	
	return null;
};


const handleCellClick = (index) => {
	if (!gameActive || boardState[index] !== "") return;
	
	boardState[index] = currentPlayer;
	cells[index].textContent = currentPlayer;
	
	
	const winner = checkWin();
	if (winner) {
		if (winner === "Draw") {
			turnDisplay.textContent = "It's a Draw!";
		} else {
			turnDisplay.textContent = `Player ${winner} wins!`;
			
			// Highlight winning cells by adding a CSS class
			winningCells.forEach((cellIndex) => {
				cells[cellIndex].classList.add("winner-cell");
			});
		}
	} else {
		currentPlayer = currentPlayer === "X" ? "O" : "X";
		turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
	}
};

// Function to restart the game
const restartGame = () => {
	currentPlayer = "X";
	boardState = ["", "", "", "", "", "", "", "", ""];
	gameActive = true;
	winningCells = [];
	
	
	cells.forEach((cell) => {
		cell.textContent = "";
		cell.classList.remove("winner-cell");
	});
	
	turnDisplay.textContent = "Player X's turn";
};

// Add click event listeners to all existing cells
cells.forEach((cell, index) => {
	cell.addEventListener("click", () => handleCellClick(index));
});

restartButton.addEventListener("click", restartGame);

