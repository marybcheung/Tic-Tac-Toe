// TODO: figure out why unused spots have the wrong cursor after resetting

const monitor = props => ({
  setSpaces: (spaces) => {
    props.spaces = spaces;
  }
});

function displayController(spaces, player) {
  let props = {spaces};


  function _displayWinMsg(winner) {
    const msg = document.querySelector("p");
    msg.textContent = `${winner.name} won!`;
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

  function _clickSpace(space) {

    // TODO: check for tie condition
    return function() {
      const coord1 = player.getCoord(space.className);
      const isValid = gameBoard.updateState(player, coord1);
      gameBoard.render();
      if (gameBoard.isWin(coord1)) {
        console.log("The player won!");
        _removeEventListeners();
        _displayWinMsg(player);
        _displayReplayBtn();
        return;
      }
      if (isValid) {
        // TODO: find a way to delay the cpu move
        const validMoves = gameBoard.getValidMoves();
        if (validMoves.length > 0) {
          const coord2 = cpu.play(validMoves);
          gameBoard.updateState(cpu, coord2);
          gameBoard.render();
          if (gameBoard.isWin(coord2)) {
            console.log("The computer won!");
            _removeEventListeners();
            _displayWinMsg(cpu);
            _displayReplayBtn();
          }
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

  return Object.assign(props, {addEventListeners}, monitor(props));
}