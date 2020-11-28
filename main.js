const name = window.prompt("Please enter your name.");
const spaces = document.querySelectorAll(".grid-item");

const gameBoard = (() => {
  const state = [ [null, null, null],
                  [null, null, null], 
                  [null, null, null] ];               

  const _isSpaceTaken = (x, y) => state[x][y] !== null;
  const _isSpaceRendered = (space) => space.classList.contains("active");
                  
  // should take in x, y coordinates instead of className
  // returns true if valid
  function updateState(player, coord) {
    const x = coord.x;
    const y = coord.y;
    if (!_isSpaceTaken(x, y)) {
      state[x][y] = player.piece;
      return true;
    }
    return false;
  }
  
  function render() {
    for (let i = 0; i<=2; i++) {
      for (let j = 0; j<=2; j++) {
        const space = document.querySelector(`.grid-${i}-${j}`);
        if (_isSpaceTaken(i, j) && !_isSpaceRendered(space)) {
          while (space.firstChild) {
            space.removeChild(space.firstChild);
          }
          const img = document.createElement("img");
          img.src = `img/${state[i][j]}.png`;
          space.classList.add("active");
          space.appendChild(img);
        }
      }
    }
  }

  // returns an array of valid moves where each move is {x, y}
  function getValidMoves() {
    let validMoves = [];
    for (let i = 0; i<=2; i++) {
      for (let j = 0; j<=2; j++) {
        if (!_isSpaceTaken(i, j)) {
          validMoves.push({x:i, y:j});
        }
      }
    }
    return validMoves;
  }

  return {updateState, render, getValidMoves};
})();

const cpu = (() => {
  const piece = "O";
  const pieceIMG = "img/O.png";

  // should take in a non-empty array
  function play(validMoves) {
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }

  return {piece, pieceIMG, play};
})();

function human(name) {
  const piece = "X";
  const pieceIMG = "img/X.png";

  function getCoord(className) {
    const regex = /\d\-\d/;
    const gridPos = regex.exec(className)[0];
    const indices = gridPos.split("-");
    const x = indices[0];
    const y = indices[1];
    
    return {x, y};
  } 

  return {name, pieceIMG, piece, getCoord};
}

const player = human(name);

spaces.forEach((space) => {
  space.addEventListener("mouseover", () => {
    if (space.childElementCount == 0) {
      const img = document.createElement("img");
      img.src = "img/X-Grey.png";
      space.appendChild(img);
    }
  });

  space.addEventListener("mouseleave", () => {
    let img = space.childNodes[0];
    if (!space.classList.contains("active")) {
      space.removeChild(img);
    }
  });



  space.addEventListener("click", () => {
    const coord1 = player.getCoord(space.className);
    const isValid = gameBoard.updateState(player, coord1);
    gameBoard.render();

    if (isValid) {
      // TODO: find a way to delay the cpu move
      const validMoves = gameBoard.getValidMoves();
      if (validMoves.length > 0) {
        const coord2 = cpu.play(validMoves);
        gameBoard.updateState(cpu, coord2);
        gameBoard.render();
      }
    }
  });
});