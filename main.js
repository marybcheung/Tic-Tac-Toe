const spaces = document.querySelectorAll(".grid-item");

const gameBoard = (() => {
  const state = [ [null, null, null],
                  [null, null, null], 
                  [null, null, null] ];


  // these two functions should be called every time a player makes a move
  
  // takes in a "player" (with private variables like X, O, respective images)
  // also takes in the indices i.e. x, y
  function updateState(player, x, y) {
    console.log("TODO: implement updateState")
  }
  
  function render() {
    console.log("TODO: implement render");
  }

  return {updateState, render};
})();

// this should be a private helper function for render (use underscore to denote privateness :D)
function createImg(filename) {
  const img = document.createElement("img");
  img.src = filename;
  return img;
}

spaces.forEach((space) => {
  space.addEventListener("mouseover", () => {
    if (space.childElementCount == 0) {
      let img = createImg("img/X-Grey.png");
      space.appendChild(img);
    }
  });

  space.addEventListener("mouseleave", () => {
    let img = space.childNodes[0];
    if (!img.classList.contains("active")) {
      space.removeChild(img);
    }
  });

  space.addEventListener("click", () => {
    // TODO: use regex here to parse the array indices in space.className lol
    gameBoard.updateState();
    gameBoard.render();

    let greyX = space.childNodes[0];
    space.removeChild(greyX);

    let blueX = createImg("img/X.png");
    blueX.classList.add("active");
    space.appendChild(blueX);
    
  });
});