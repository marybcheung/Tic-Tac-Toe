// const name = window.prompt("Please enter your name.");
let spaces = document.querySelectorAll(".grid-item");
let dispController = displayController(spaces, player);
const replayBtn = document.getElementById("replayBtn");
const msg = document.getElementById("winMsg");
let myModal = new bootstrap.Modal(document.getElementById('modal'));
let playBtn = document.getElementById("playBtn");
let optionsBtn = document.getElementById("optionsBtn");

optionsBtn.addEventListener("click", () => {
  myModal.toggle();
});

dispController.addEventListeners();
cpu.setDifficulty("easy");

playBtn.addEventListener("click", () => {
  const name = document.getElementById("player-name").value;
  const difficulty = document.querySelector("input[name=cpuDifficulty]:checked").value;
  player.setName(name);
  cpu.setDifficulty(difficulty);
  dispController.displayOptions();
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