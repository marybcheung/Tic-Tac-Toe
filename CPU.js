const cpu = (() => {
  const piece = "O";
  const pieceIMG = "img/O.png";
  const name = "The computer";
  let diff = "easy";
  let play;

  function _isWin(state) {
    for (let i=0; i<=2; i++) {
      if (gameBoard.isWin({x:i, y:i}, state)) return true;
    }
    return false;
  }
  
  // should only be called if someone has won, OR there are no moves left
  // returns +10 if win condition for maximizing player,
  //         -10 if win condition for minimizing player,
  //         0 if tie
  function _eval(state) {
    let validMoves = gameBoard.getValidMoves(state);
    let depth = 9 - validMoves.length;
    for (let i=0; i<=2; i++) {
      if (gameBoard.isWin({x: i, y: i}, state)) {
        if (state[i][i] === "X") return -10 + depth;
        else return 10 - depth; 
      }
    }
    return 0;
  }
  
  function _isMovesLeft(state) {
    for (let i=0; i<=2; i++) {
      for (let j=0; j<=2; j++) {
        if (state[i][j] === null) {
          return true;
        }
      }
    }
    return false;
  }
  
  function _minimax(state, maximizing) {
    if (!_isMovesLeft(state) || _isWin(state)) { // need to check if someone has won here
      return _eval(state);
    }

    let validMoves = gameBoard.getValidMoves(state);

    if (maximizing) {
      let best = -Infinity;
      for (let move of validMoves) {
        state[move.x][move.y] = "O";
        best = Math.max(best, _minimax(state, false));
        state[move.x][move.y] = null;
      }
      return best;
    }

    else {
      let best = Infinity;
      for (let move of validMoves) {
        state[move.x][move.y] = "X";
        best = Math.min(best, _minimax(state, true));
        state[move.x][move.y] = null;
      }
      return best;
    }
  
  }
  
  // should take in a non-empty array, returns the best play
  function _bestPlay(state) {
    let bestScore = -Infinity;
    let play = null;
    let validMoves = gameBoard.getValidMoves(state);
    for (let move of validMoves) {
      let arr = state.slice(0);
      arr[move.x][move.y] = "O";
      let score = _minimax(arr, false);
      if (score > bestScore) {
        bestScore = score;
        play = move;
      }
      arr[move.x][move.y] = null;
    }
    // the gameBoard.data is updated with the chosen move outside of this function, should it be updated here? And also in play?
    return play;
  }
  
  // returns a random play
  function _dumbPlay(state) {
    let validMoves = gameBoard.getValidMoves(state);
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }

  function setDifficulty(difficulty) {
    if (difficulty === "easy") {
      this.play = _dumbPlay;
      this.diff = "easy";
    } else {
      this.play = _bestPlay;
      this.diff = "hard";
    }
  }

  return {name, piece, pieceIMG, play, diff, setDifficulty};
})();