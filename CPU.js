const cpu = (() => {
  const piece = "O";
  const pieceIMG = "img/O.png";
  const name = "The computer";

  // TODO: learn about mini-max algorithm to make the CPU smart
  // should take in a non-empty array
  function play(validMoves) {
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }

  return {name, piece, pieceIMG, play};
})();