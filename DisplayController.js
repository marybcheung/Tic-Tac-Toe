const monitor = props => ({
  setSpaces: (spaces) => {
    props.spaces = spaces;
  }
});

function displayController(spaces, player) {
  let props = {spaces};


  function _displayWinMsg(winner) {
    const msg = document.querySelector("p");
    winner ? msg.textContent = `${winner.name} won!` : msg.textContent = "It's a tie!" 
    msg.style.display = 'inherit';
  }
  
  function _displayReplayBtn() {
    const btn = document.querySelector("button");
    btn.style.display = 'initial';
  }
  
  function _removeEventListeners() {
    props.spaces.forEach((space) => {
      let clone = space.cloneNode(true);
      clone.style.cursor = 'auto';
      space.parentNode.replaceChild(clone, space);
    });
  }

  function _mouseOverSpace(space) {
    return function() {
      if (space.childElementCount == 0) {
        const img = document.createElement("img");
        img.src = "img/X-Grey.png";
        space.appendChild(img);
      }
    }
  }

  function _mouseLeaveSpace(space) {
    return function () {
      let img = space.firstChild;
      if (!space.classList.contains("active")) {
        space.removeChild(img);
      }
    }
  }

  function _displayWin(winner) {
    _removeEventListeners();
    _displayWinMsg(winner);
    _displayReplayBtn();
  }

  function _clickSpace(space) {

    //TODO: refactor this function
    return function() {
      const coord1 = player.getCoord(space.className);
      const isValid = gameBoard.updateState(player, coord1);
      gameBoard.render();
      if (gameBoard.isWin(coord1)) {
        _displayWin(player);
        return;
      }
      if (isValid) {
        // TODO: find a way to delay the cpu move
        let validMoves = gameBoard.getValidMoves();
        if (validMoves.length > 0) {
          const coord2 = cpu.play(validMoves);
          gameBoard.updateState(cpu, coord2);
          validMoves = gameBoard.getValidMoves();
          gameBoard.render();
          if (gameBoard.isWin(coord2)) {
            _displayWin(cpu);
            return;
          }
        }
        if (validMoves.length === 0) {
          _displayWin(null);
        }
      }
    }
  }

  function addEventListeners() {
    props.spaces.forEach((space) => {
      space.addEventListener("mouseover", _mouseOverSpace(space));
      space.addEventListener("mouseleave", _mouseLeaveSpace(space));
      space.addEventListener("click", _clickSpace(space));
    });
  }

  function firstPlay() {
    if (Math.floor(Math.random()*2)) {
      const validMoves = gameBoard.getValidMoves();
      const coord2 = cpu.play(validMoves);
      gameBoard.updateState(cpu, coord2);
      gameBoard.render();
    }
  }

  return Object.assign(props, {addEventListeners, firstPlay}, monitor(props));
}