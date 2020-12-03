const gameBoard = (() => {
  const state = [ [null, null, null],
                  [null, null, null], 
                  [null, null, null] ];

  const _isSpaceTaken = (x, y) => state[x][y] !== null;
  const _isSpaceRendered = (space) => space.classList.contains("active");
  const _winReducer = (piece) => {
    return function (acc, curr) {
      return acc && (curr !== null && curr === piece);
    }
  }

  const _isWinRow0 = (piece) => {
    const row0 = state[0];
    return row0.reduce(_winReducer(piece), true);
  }

  const _isWinRow1 = (piece) => {
    const row1 = state[1];
    return row1.reduce(_winReducer(piece), true);
  }

  const _isWinRow2 = (piece) => {
    const row2 = state[2];
    return row2.reduce(_winReducer(piece), true);
  }

  const _isWinCol0 = (piece) => {
    const col0 = state.map(arr => arr[0]);
    return col0.reduce(_winReducer(piece), true);
  }

  const _isWinCol1 = (piece) => {
    const col1 = state.map(arr => arr[1]);
    return col1.reduce(_winReducer(piece), true);
  }

  const _isWinCol2 = (piece) => {
    const col1 = state.map(arr => arr[2]);
    return col1.reduce(_winReducer(piece), true);
  }

  const _isWinDiag0 = (piece) => {
    const diag0 = [state[0][0], state[1][1], state[2][2]];
    return diag0.reduce(_winReducer(piece), true);
  }

  const _isWinDiag1 = (piece) => {
    const diag1 = [state[0][2], state[1][1], state[2][0]];
    return diag1.reduce(_winReducer(piece), true);
  }

  const _win00 = () => {
    const piece = state[0][0];
    return _isWinRow0(piece) || _isWinCol0(piece) || _isWinDiag0(piece);
  };

  const _win01 = () => {
    const piece = state[0][1];
    return _isWinRow0(piece) || _isWinCol1(piece);
  };

  const _win02 = () => {
    const piece = state[0][2];
    return _isWinRow0(piece) || _isWinCol2(piece) || _isWinDiag1(piece);
  };

  const _win10 = () => {
    const piece = state[1][0];
    return _isWinRow1(piece) || _isWinCol0(piece);
  }

  const _win11 = () => {
    const piece = state[1][1];
    return _isWinDiag0(piece) || _isWinDiag1(piece) || _isWinCol1(piece) || _isWinRow1(piece);
  }

  const _win12 = () => {
    const piece = state[1][2];
    return _isWinRow1(piece) || _isWinCol2(piece);
  }

  const _win20 = () => {
    const piece = state[2][0];
    return _isWinRow2(piece) || _isWinCol0(piece) || _isWinDiag1(piece);
  }

  const _win21 = () => {
    const piece = state[2][1];
    return _isWinRow2(piece) || _isWinCol1(piece);
  }

  const _win22 = () => {
    const piece = state[2][2];
    return _isWinRow2(piece) || _isWinCol2(piece) || _isWinDiag1(piece);
  }

  const winConditions = [ [_win00, _win01, _win02],
                          [_win10, _win11, _win12],
                          [_win20, _win21, _win22] ];

 
                  
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

  // returns true if someone has won
  function isWin(coord) {
    const x = coord.x;
    const y = coord.y;

    return winConditions[x][y]();
  }

  return {updateState, render, getValidMoves, isWin};
})();