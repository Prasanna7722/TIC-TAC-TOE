const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'x'; // x = Player 1, o = Player 2
let gameActive = true;
const cells = [];

function createBoard() {
  board.innerHTML = '';
  cells.length = 0;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('button');
    cell.classList.add('cell');
    cell.addEventListener('click', () => makeMove(i));
    board.appendChild(cell);
    cells.push(cell);
  }

  status.textContent = `Player 1's Turn`;
  currentPlayer = 'x';
  gameActive = true;
}

function makeMove(index) {
  if (!gameActive || cells[index].textContent) return;

  cells[index].textContent = currentPlayer === 'x' ? '✔' : '✖';
  cells[index].classList.add(currentPlayer);

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer === 'x' ? 1 : 2} WON!`;
    gameActive = false;
  } else if (cells.every(cell => cell.textContent)) {
    status.textContent = "It's a DRAW!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    status.textContent = `Player ${currentPlayer === 'x' ? 1 : 2}'s Turn`;
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diags
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    );
  });
}

resetButton.addEventListener('click', createBoard);

// Initialize the game
createBoard();
