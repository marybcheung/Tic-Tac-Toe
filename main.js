const name = window.prompt("Please enter your name.");
const spaces = document.querySelectorAll(".grid-item");
const player = human(name);

//TODO: Tuck these callback functions into a displayController
spaces.forEach((space) => {
  space.addEventListener("mouseover", () => {
    if (space.childElementCount == 0) {
      const img = document.createElement("img");
      img.src = "img/X-Grey.png";
      space.appendChild(img);
    }
  });

  space.addEventListener("mouseleave", () => {
    let img = space.firstChild;
    if (!space.classList.contains("active")) {
      space.removeChild(img);
    }
  });

  space.addEventListener("click", () => {
    const coord1 = player.getCoord(space.className);
    const isValid = gameBoard.updateState(player, coord1);
    gameBoard.render();
    const playerWon = gameBoard.isWin(coord1);
    if (playerWon) {
      console.log("The player won!");
    }

    if (isValid) {
      // TODO: find a way to delay the cpu move
      const validMoves = gameBoard.getValidMoves();
      if (validMoves.length > 0) {
        const coord2 = cpu.play(validMoves);
        gameBoard.updateState(cpu, coord2);
        gameBoard.render();
        // const cpuWon = gameBoard.isWin(coord2);
        // if (cpuWon) {
        //   console.log("The computer won!");
        // }
      }
    }
  });
});