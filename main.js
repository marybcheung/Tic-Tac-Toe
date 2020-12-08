const name = window.prompt("Please enter your name.");
const spaces = document.querySelectorAll(".grid-item");
const player = human(name);
const dispController = displayController(spaces, player);

spaces.forEach((space) => {
  space.addEventListener("mouseover", dispController.mouseOverSpace(space));
  space.addEventListener("mouseleave", dispController.mouseLeaveSpace(space));
  space.addEventListener("click", dispController.clickSpace(space));
});