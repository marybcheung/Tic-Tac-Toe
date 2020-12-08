const gameBoard = (() => {
  const _state = [ [null, null, null],
                   [null, null, null], 
                   [null, null, null] ];

  const _isSpaceTaken = (x, y) => _state[x][y] !== null;
  const _isSpaceRendered = (space) => space.classList.contains("active");
  const _isWin = (piece, arr) => {
    return arr.reduce((acc, curr) => acc && (curr !== null && curr === piece), true);
  }

  const _win00 = () => {
    const piece = _state[0][0];
    const row0 = _state[0];
    const col0 = _state.map(arr => arr[0]);
    const diag0 = [_state[0][0], _state[1][1], _state[2][2]];
    return _isWin(piece, row0) || _isWin(piece, col0) || _isWin(piece, diag0);
  };

  const _win01 = () => {
    const piece = _state[0][1];
    const row0 = _state[0];
    const col1 = _state.map(arr => arr[1]);
    return _isWin(piece, row0) || _isWin(piece, col1);
  };

  const _win02 = () => {
    const piece = _state[0][2];
    const row0 = _state[0];
    const col2 = _state.map(arr => arr[2]);
    const diag1 = [_state[0][2], _state[1][1], _state[2][0]];
    return _isWin(piece, row0) || _isWin(piece, col2) || _isWin(piece, diag1);
  };

  const _win10 = () => {
    const piece = _state[1][0];
    const row1 = _state[1];
    const col0 = _state.map(arr => arr[0]);
    return _isWin(piece, row1) || _isWin(piece, col0);
  }

  const _win11 = () => {
    const piece = _state[1][1];
    const diag0 = [_state[0][0], _state[1][1], _state[2][2]];
    const diag1 = [_state[0][2], _state[1][1], _state[2][0]];
    const col1 = _state.map(arr => arr[1]);
    const row1 = _state[1];
    return _isWin(piece, diag0) || _isWin(piece, diag1) || _isWin(piece, col1) || _isWin(piece, row1);
  }

  const _win12 = () => {
    const piece = _state[1][2];
    const row1 = _state[1];
    const col2 = _state.map(arr => arr[2]);
    return _isWin(piece, row1) || _isWin(piece, col2);
  }

  const _win20 = () => {
    const piece = _state[2][0];
    const row2 = _state[2];
    const col0 = _state.map(arr => arr[0]);
    const diag1 = [_state[0][2], _state[1][1], _state[2][0]];
    return _isWin(piece, row2) || _isWin(piece, col0) || _isWin(piece, diag1);
  }

  const _win21 = () => {
    const piece = _state[2][1];
    const row2 = _state[2];
    const col1 = _state.map(arr => arr[1]);
    return _isWin(piece, row2) || _isWin(piece, col1);
  }

  const _win22 = () => {
    const piece = _state[2][2];
    const row2 = _state[2];
    const col2 = _state.map(arr => arr[2]);
    const diag0 = [_state[0][0], _state[1][1], _state[2][2]];
    return _isWin(piece, row2) || _isWin(piece, col2) || _isWin(piece, diag0);
  }

  const _winConditions = [ [_win00, _win01, _win02],
                           [_win10, _win11, _win12],
                           [_win20, _win21, _win22] ];
                  
  // returns true if valid move
  function updateState(player, coord) {
    const x = coord.x;
    const y = coord.y;
    if (!_isSpaceTaken(x, y)) {
      _state[x][y] = player.piece;
      return true;
    }
    return false;
  }
  
  function render() {
    for (let i = 0; i<=2; i++) {
      for (let j = 0; j<=2; j++) {
        const space = document.querySelector(`.grid-${i}-${j}`);
        // the case where something new needs to be rendered
        if (_isSpaceTaken(i, j) && !_isSpaceRendered(space)) {
          if (space.firstChild) {
            space.removeChild(space.firstChild);
          }
          const img = document.createElement("img");
          img.src = `img/${_state[i][j]}.png`;
          space.classList.add("active");
          space.appendChild(img);
        // the case where something needs to be removed
        } else if (!_isSpaceTaken(i,j)) {
          if (space.firstChild) {
            space.removeChild(space.firstChild);
            space.classList.remove("active");
            space.style.cursor = 'pointer';
          }
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

    return _winConditions[x][y]();
  }

  function reset() {
    for (let i=0; i<=2; i++) {
      for (let j=0; j<=2; j++) {
        _state[i][j] = null;
        render();
      }
    }
  }

  return {updateState, render, getValidMoves, isWin, reset};
})();