
var x = document.createElement('script');
x.src = "Pieces.js";
document.getElementsByTagName("head")[0].appendChild(x);

var pawn1 = new Pawn(new Position(B,2),"White");

console.log(pawn1);

