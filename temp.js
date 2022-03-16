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