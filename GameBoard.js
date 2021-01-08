const gameBoard = (() => {
  const _state = [ [null, null, null],
                  [null, null, null], 
                  [null, null, null] ];

  const _isSpaceRendered = (space) => space.classList.contains("active");
  const _isWin = (piece, arr) => {
    return arr.reduce((acc, curr) => acc && (curr !== null && curr === piece), true);
  }

  function _win00() {
    const piece = this.state[0][0];
    const row0 = this.state[0];
    const col0 = this.state.map(arr => arr[0]);
    const diag0 = [this.state[0][0], this.state[1][1], this.state[2][2]];
    return _isWin(piece, row0) || _isWin(piece, col0) || _isWin(piece, diag0);
  };

  function _win01() {
    const piece = this.state[0][1];
    const row0 = this.state[0];
    const col1 = this.state.map(arr => arr[1]);
    return _isWin(piece, row0) || _isWin(piece, col1);
  };

  function _win02() {
    const piece = this.state[0][2];
    const row0 = this.state[0];
    const col2 = this.state.map(arr => arr[2]);
    const diag1 = [this.state[0][2], this.state[1][1], this.state[2][0]];
    return _isWin(piece, row0) || _isWin(piece, col2) || _isWin(piece, diag1);
  };

  function _win10() {
    const piece = this.state[1][0];
    const row1 = this.state[1];
    const col0 = this.state.map(arr => arr[0]);
    return _isWin(piece, row1) || _isWin(piece, col0);
  }

  function _win11() {
    const piece = this.state[1][1];
    const diag0 = [this.state[0][0], this.state[1][1], this.state[2][2]];
    const diag1 = [this.state[0][2], this.state[1][1], this.state[2][0]];
    const col1 = this.state.map(arr => arr[1]);
    const row1 = this.state[1];
    return _isWin(piece, diag0) || _isWin(piece, diag1) || _isWin(piece, col1) || _isWin(piece, row1);
  }

  function _win12() {
    const piece = this.state[1][2];
    const row1 = this.state[1];
    const col2 = this.state.map(arr => arr[2]);
    return _isWin(piece, row1) || _isWin(piece, col2);
  }

  function _win20() {
    const piece = this.state[2][0];
    const row2 = this.state[2];
    const col0 = this.state.map(arr => arr[0]);
    const diag1 = [this.state[0][2], this.state[1][1], this.state[2][0]];
    return _isWin(piece, row2) || _isWin(piece, col0) || _isWin(piece, diag1);
  }

  function _win21() {
    const piece = this.state[2][1];
    const row2 = this.state[2];
    const col1 = this.state.map(arr => arr[1]);
    return _isWin(piece, row2) || _isWin(piece, col1);
  }

  function _win22() {
    const piece = this.state[2][2];
    const row2 = this.state[2];
    const col2 = this.state.map(arr => arr[2]);
    const diag0 = [this.state[0][0], this.state[1][1], this.state[2][2]];
    return _isWin(piece, row2) || _isWin(piece, col2) || _isWin(piece, diag0);
  }

  const _winConditions = [ [_win00, _win01, _win02],
                           [_win10, _win11, _win12],
                           [_win20, _win21, _win22] ];
                  
  // returns true if valid move
  function updateState(piece, coord) {
    const x = coord.x;
    const y = coord.y;
    if (_state[x][y] === null) {
      _state[x][y] = piece;
      return true;
    }
    return false;
  }
  
  function render() {
    for (let i = 0; i<=2; i++) {
      for (let j = 0; j<=2; j++) {
        const space = document.querySelector(`.grid-${i}-${j}`);
        // the case where something new needs to be rendered
        if (_state[i][j] !== null && !_isSpaceRendered(space)) {
          if (space.firstChild) {
            space.removeChild(space.firstChild);
          }
          const img = document.createElement("img");
          img.src = `img/${_state[i][j]}.png`;
          space.classList.add("active");
          space.appendChild(img);
        // the case where something needs to be removed or the space was empty to begin with
        } else if (_state[i][j] === null) {
          if (space.firstChild) {
            space.removeChild(space.firstChild);
            space.classList.remove("active");
          }
          space.style.cursor = 'pointer';
        }
      }
    }
  }

  // returns an array of valid moves where each move is {x, y}
  function getValidMoves(state) {
    let validMoves = [];
    for (let i = 0; i<=2; i++) {
      for (let j = 0; j<=2; j++) {
        if (state[i][j] === null) {
          validMoves.push({x:i, y:j});
        }
      }
    }
    return validMoves;
  }

  // returns true if someone has won
  function isWin(coord, state) {
    const x = coord.x;
    const y = coord.y;

    const module = {state};
    const func = _winConditions[x][y]; 

    return func.bind(module)();
  }

  function reset() {
    for (let i=0; i<=2; i++) {
      for (let j=0; j<=2; j++) {
        _state[i][j] = null;
        render();
      }
    }
  }

  function isMovesLeft() {
    return getValidMoves(_state).length !== 0;
  }

  function getState() {
    return _state;
  }

  return {updateState, render, getValidMoves, isWin, reset, isMovesLeft, getState};
})();

exports = gameBoard;