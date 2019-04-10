// copyright DatOneLefty

// this code is not going to look good at the start

var ctx, f
const width = 800
const height = 450

function init() {
  f = document.getElementById("fluorine");
  ctx = f.getContext('2d');
  ctx.canvas.width = width
  ctx.canvas.height = height
  ctx.beginPath();
  ctx.rect(0,0,width, height);
  ctx.fillStyle = "black";
  ctx.fill();
}


// ready to render
init()
