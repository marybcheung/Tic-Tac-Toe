function displayController(spaces, player) {

  function _removeEventListeners() {
    spaces.forEach((space) => {
      let clone = space.cloneNode(true);
      clone.style.cursor = 'auto';
      space.parentNode.replaceChild(clone, space);
    });
  }

  function clickSpace(space) {
    return function() {
      const coord1 = player.getCoord(space.className);
      const isValid = gameBoard.updateState(player, coord1);
      gameBoard.render();
      if (gameBoard.isWin(coord1)) {
        console.log("The player won!");
        _removeEventListeners();
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
          }
        }
      }
    }
  }

  function mouseOverSpace(space) {
    return function() {
      if (space.childElementCount == 0) {
        const img = document.createElement("img");
        img.src = "img/X-Grey.png";
        space.appendChild(img);
      }
    }
  }

  function mouseLeaveSpace(space) {
    return function () {
      let img = space.firstChild;
      if (!space.classList.contains("active")) {
        space.removeChild(img);
      }
    }
  }
    

  return {clickSpace, mouseOverSpace, mouseLeaveSpace};
}