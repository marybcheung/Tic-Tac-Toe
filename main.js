const name = window.prompt("Please enter your name.");
let spaces = document.querySelectorAll(".grid-item");
const player = human(name);
const dispController = displayController(spaces, player);
const replayBtn = document.querySelector("button");
const msg = document.querySelector("p");

dispController.addEventListeners();

// dispController.firstPlay();

replayBtn.addEventListener("click", () => {
  gameBoard.reset();
  spaces = document.querySelectorAll(".grid-item");
  dispController.setSpaces(spaces);
  dispController.addEventListeners();
  msg.style.display = "none";
  replayBtn.style.display = "none";
  // dispController.firstPlay();
});