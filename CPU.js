const cpu = (() => {
  const piece = "O";
  const pieceIMG = "img/O.png";

  // should take in a non-empty array
  function play(validMoves) {
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }

  return {piece, pieceIMG, play};
})();