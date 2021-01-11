// const name = window.prompt("Please enter your name.");
let spaces = document.querySelectorAll(".grid-item");
let player = null;
let dispController = null;
const replayBtn = document.getElementById("replayBtn");
const msg = document.querySelector("p");
let myModal = new bootstrap.Modal(document.getElementById('modal'));
let playBtn = document.getElementById("playBtn");

myModal.toggle();

playBtn.addEventListener("click", () => {
  const name = document.getElementById("player-name").value;
  const isEasy = document.querySelector("input[name=cpuDifficulty]:checked").value;
  cpu.setDifficulty(isEasy);
  player = human(name);
  dispController = displayController(spaces, player);
  dispController.addEventListeners();
  myModal.toggle();
});

replayBtn.addEventListener("click", () => {
  gameBoard.reset();
  spaces = document.querySelectorAll(".grid-item");
  dispController.setSpaces(spaces);
  dispController.addEventListeners();
  msg.style.display = "none";
  replayBtn.style.display = "none";
});