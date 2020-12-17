const name = window.prompt("Please enter your name.");
let spaces = document.querySelectorAll(".grid-item");
const player = human(name);
const dispController = displayController(spaces, player);
const replayBtn = document.querySelector("button");

dispController.addEventListeners();

replayBtn.addEventListener("click", () => {
  gameBoard.reset();
  spaces = document.querySelectorAll(".grid-item");
  dispController.setSpaces(spaces);
  dispController.addEventListeners();
  const msg = document.querySelector("p");
  msg.style.display = "none";
  replayBtn.style.display = "none";
});