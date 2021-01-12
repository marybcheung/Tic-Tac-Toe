const player = (() => {
  const piece = "X";
  const pieceIMG = "img/X.png";
  const name = "anon";

  function getCoord(className) {
    const regex = /\d\-\d/;
    const gridPos = regex.exec(className)[0];
    const indices = gridPos.split("-");
    const x = indices[0];
    const y = indices[1];
    
    return {x, y};
  }

  function setName(name) {
    this.name = name;
  }
  
  return {name, pieceIMG, piece, getCoord, setName};
})();