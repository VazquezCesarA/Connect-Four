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

//TODO: add game sense, add a check "for is the entire board filled"

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
  for (let i = HEIGHT -1; i >= 0; i--) {
    if(board[i][x] === undefined){
      return i;
    } 
  }
  return null;
}
//after, check if someone won
function placeInTable(y, x) {
  const topColumn = document.getElementById("column-top");

  topColumn.addEventListener("click", (e) => {
    console.log(e.target.id);

    let tdPiece = document.getElementById(
      `${findSpotForCol(e.target.id)}-${e.target.id}`
    );

    tdPiece.innerHTML = '<div class = "piece"></div>';

    let divPiece = tdPiece.firstElementChild;

    console.log(divPiece);

    console.log(board);

    board[findSpotForCol(e.target.id)][e.target.id] = currPlayer;

    // console.log(tdPiece.classList.add('piece'));

    // console.log(findSpotForCol(e.target.id));

    if (currPlayer === 1) {
      divPiece.classList.add("p1");
      console.log(currPlayer, e.target);
      //try toggle
      currPlayer = 2;
    } else {
      divPiece.classList.add("p2");
      console.log(currPlayer, e.target);
      currPlayer = 1;
    }
  });
  //1. (done: create a div)
  //2. (done: add the event to the parent element)
  //3. (done: add the div inside the correct td using the addevent (when you click a td element add a div inside))
  //4. (done: add the class "piece" in the div)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
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

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
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

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
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
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        //Error
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
placeInTable("y", "x");
