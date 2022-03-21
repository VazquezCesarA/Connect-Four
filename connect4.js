/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
const board = makeBoard();
let currPlayer = 1; // active player: 1 or 2

// array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  let x = new Array(HEIGHT);

  for (let i = 0; i < x.length; i++) {
    x[i] = new Array(WIDTH);
  }
  return x;
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  const htmlBoard = document.querySelector("#board");
  //append

  //This code creates the top column where the fall to the last column
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  //This code creates the all the columns to where the pieces fall
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  x = parseInt(x);
  for (let i = HEIGHT - 1; i >= 0; i--) {
    if (board[i][x] === undefined) {
      return i;
    }
  }
  return null;
}

//after, check if someone won
function placeInTable(y, x) {
  let tdPiece = document.getElementById(`${x}-${y}`);

  tdPiece.innerHTML = '<div class = "piece"></div>';

  let divPiece = tdPiece.firstElementChild;

  divPiece.classList.add(`p${currPlayer}`);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  placeInTable(x, y);
  // place piece in board and add to HTML table

  board[y][x] = currPlayer;

  // check for win
  if (checkForWin(y, x)) {
    return endGame(`Player ${currPlayer} won!`);
  }

  if (checkForTie()) {
    return endGame("Filled up. Its a tie!");
  }

  // check for tie

  const playerSwitch = () => {
    currPlayer = currPlayer === 1 ? 2 : 1;
  };
  playerSwitch();
}

function checkForTie() {
  for (let i = 0; i < HEIGHT; i++)
    for (let j = 0; j < WIDTH; j++) if (board[i][j] === undefined) return false;
  return true;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin(y, x) {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  //Coords for horiz, vert, diagDR, and diagDL in the board
  let horiz = [
    [y, x],
    [y, x + 1],
    [y, x + 2],
    [y, x + 3],
  ];
  let Invhoriz = [
    [y, x],
    [y, x - 1],
    [y, x - 2],
    [y, x - 3],
  ];
  let vert = [
    [y, x],
    [y + 1, x],
    [y + 2, x],
    [y + 3, x],
  ];
  let diagDR = [
    [y, x],
    [y + 1, x + 1],
    [y + 2, x + 2],
    [y + 3, x + 3],
  ];
  let InvdiagDR = [
    [y, x],
    [y - 1, x - 1],
    [y - 2, x - 2],
    [y - 3, x - 3],
  ];
  let diagDL = [
    [y, x],
    [y + 1, x - 1],
    [y + 2, x - 2],
    [y + 3, x - 3],
  ];
  let InvdiagDL = [
    [y, x],
    [y - 1, x + 1],
    [y - 2, x + 2],
    [y - 3, x + 3],
  ];

  if (_win(horiz) || _win(Invhoriz) || _win(vert) || _win(diagDR) || _win(InvdiagDR) || _win(diagDL) || _win(InvdiagDL)) {
    return true;
  }
}

makeBoard();
makeHtmlBoard();