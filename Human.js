function human(name) {
  const piece = "X";
  const pieceIMG = "img/X.png";

  function getCoord(className) {
    const regex = /\d\-\d/;
    const gridPos = regex.exec(className)[0];
    const indices = gridPos.split("-");
    const x = indices[0];
    const y = indices[1];
    
    return {x, y};
  } 

  return {name, pieceIMG, piece, getCoord};
}