
/*

  Hello and welcome to the file that takes compiled user code and turns into
  an actual project. This code is not going to look good during its early
  development, but over time it will get cleaned up and will slowly get more
  comments.

  - Lefty

*/

var ctx, f
const width = 800
const height = 450


class Sprite {
  constructor(x, y, costume, costumes) {
    this.position = {
      "x": x,
      "y": y
    }
    this.hidden = false;
    this.rotation = 0;
    this.costumes = []
    costumes.forEach((base) => {
      var image = new Image();
      image.src = base
      this.costumes.push(image);
    });
    this.costume = costume
    this.scale = 1
  }

  setPos(x,y) {
    this.position.x = x;
    this.position.y = y;
  }
  move(x,y) {
    if (this.position.x+x+(width/2) <= width && this.position.x+x+(width/2) >= 0 && this.position.y+y+(height/2) <= height && this.position.y+y+(height/2) >= 0) {
    this.position.x = this.position.x+x;
    this.position.y = this.position.y+y;
  }
  }
}

class Program {
  constructor(initer) {
    this.running = false;
    this.initer = initer
    this.sprites = {}
    this.vars = {}
  }

  run() {
    this.initer()
  }
}



var game = new Program(null);



// the fps counting system is for testing, might not stay in the future
fps = 0;
c = 0;

setInterval(() => {
  fps = c/5;
  c = 0;
  console.log("FPS: " + fps); // this is definitely temporary
}, 5000);


function drawCostume(x,y,base, rotation, scale) {
  // rotation and scale will be added soon
    ctx.drawImage(base, x,  y);
}

var re;
var change = true;

function makeFrame() {
  if (game.running && change == true) {   // change will be implemented soon
    ctx.beginPath();
    ctx.rect(0,0,width, height);
    ctx.fill();
    c++;
    for (key in game.sprites) {
      if (game.sprites[key].hidden == false) {
        drawCostume(game.sprites[key].position.x+(width/2),game.sprites[key].position.y+(height/2), game.sprites[key].costumes[game.sprites[key].costume], game.sprites[key].rotation, game.sprites[key].scale);
      }
    }
  }
}

function init() {
  f = document.getElementById("fluorine");
  ctx = f.getContext('2d');
  ctx.canvas.width = width
  ctx.canvas.height = height
  game.running = true;
  makeFrame();
  game.running = false;
  re = setInterval(() => {    // this is probably temporary
    makeFrame()
  });
}

function flag() { // run
  game.running = true;
  game.run()
  init()
}

function stop() {
  game.running = false;
  clearInterval(re);
}

function sync() {
    // planned to be implemented very soon
}










/*

  the code below is for testing only.

  This section will eventually be what takes user code in from the Fluorine to
  JavaScript compiler that is currently being written

*/



game.initer = () =>{  // this is ran when the program starts
  setInterval(()=> {
    game.sprites["a"].move(-1,0);
  },10);


  setInterval(()=> {
    game.sprites["d"].move(0,-1);
  },10);
}

// x, y, costume, costume data

game.sprites["a"] = new Sprite(-100,-100,0,["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAADrklEQVR4nO3cW0gUYRjG8dfzulpba+bimksp0cGICIVuCo0wKghJIhDtCJWFEEGZBHXTAYIuIuuibgK9iSjCMiwppCBS6KJapEjClDQ1bd3VtMTi2xDKnRV3HNdn6vndCDPs7Cd/Zr45acScQu9PIRiRTIGFQcAwCBgGAcMgYBgEDIOAYRAwDAKGQcAwCBgGAcMgYBgEDIOAYRAwDAKGQcAwCBgGAcMgYBgEDIOAYRAwDAKGQcAwCBgGAcMgYBgEDIOAYRAwDAIm2oyDdmy/K1FWr9jXnQhYN9hSJAPv1si3D5niaVo+I+ObCtP8SVu0bVBSCm5rRgjmR1+OdNUcl94nOeEerm6mCGLLdkvanv0SaWnV9Xnfm0PSdr1MRjxWw8dmNPg5JHnzY0kv3ag7hpKYVSmLjh3x72XooIOoGI7CnYZsKy611h8FHeyknri0dcIYvQ3nxOdeFTBxqwl/9spaf4Dx1DK1vvPm1ukevm6wc0jGyXKxZlQHLB8dcknrpWrxNbsm/Hx66VWxZZ/V/Pzb8oew8wnkIUtN4loxlMnEUD5eOSjDnzYFLFdz0bz8R4aMczpABrGvrdFc7mmqmFSMMT31ezWXq0MaKsgg1sx7mst9zatD2k7/yyzN5TF2t65xhQPcpK4m82CnuM6SbeIsmfp3qO1b0rplqD156hszGNweEuv4DDCKmQMXJMrqC8v3jHgTwvI9ofov7/aqU1+e9gIZfL8Fdmxwk/r3rpSg617vbgvrWGYC3B4y3DE/6Dp1BvavgwuiTkXVMV6LPRf3gs4okHPI1xcHNJere1Oh7iXOXVWmuO0+BjLIl/r8oOtcZUX+e12TsfDoef8TRuR7V+NFWZZVnMYakshIf4JYnPFicT4NWBcR7RFbdpXMWtElcY4B8bmX/LVe7UH2vAZxHd4ncam/Q8QvcEvfsx0yOhwTtt9BL9jb7+owk3mqWGLmNhqyvc5bN6T7fp4h25pOsNch6sKt/drFoBN8qJLWV4Zz+LpBXxiqW+0tZ+5oPtcIlfdVQbiHr4tpXgNSj16Tci+E/LKDek+rp67YNO9ome5fjdtzGyU2uUMSFj8P+lSx+8Fl/8+eug2mePXnT/zf72D4bi8YBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAyCRER+ATxj2Zi1mjL+AAAAAElFTkSuQmCC"])

game.sprites["d"] = new Sprite(100,100,0,["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAADrklEQVR4nO3cW0gUYRjG8dfzulpba+bimksp0cGICIVuCo0wKghJIhDtCJWFEEGZBHXTAYIuIuuibgK9iSjCMiwppCBS6KJapEjClDQ1bd3VtMTi2xDKnRV3HNdn6vndCDPs7Cd/Zr45acScQu9PIRiRTIGFQcAwCBgGAcMgYBgEDIOAYRAwDAKGQcAwCBgGAcMgYBgEDIOAYRAwDAKGQcAwCBgGAcMgYBgEDIOAYRAwDAKGQcAwCBgGAcMgYBgEDIOAYRAwDAIm2oyDdmy/K1FWr9jXnQhYN9hSJAPv1si3D5niaVo+I+ObCtP8SVu0bVBSCm5rRgjmR1+OdNUcl94nOeEerm6mCGLLdkvanv0SaWnV9Xnfm0PSdr1MRjxWw8dmNPg5JHnzY0kv3ag7hpKYVSmLjh3x72XooIOoGI7CnYZsKy611h8FHeyknri0dcIYvQ3nxOdeFTBxqwl/9spaf4Dx1DK1vvPm1ukevm6wc0jGyXKxZlQHLB8dcknrpWrxNbsm/Hx66VWxZZ/V/Pzb8oew8wnkIUtN4loxlMnEUD5eOSjDnzYFLFdz0bz8R4aMczpABrGvrdFc7mmqmFSMMT31ezWXq0MaKsgg1sx7mst9zatD2k7/yyzN5TF2t65xhQPcpK4m82CnuM6SbeIsmfp3qO1b0rplqD156hszGNweEuv4DDCKmQMXJMrqC8v3jHgTwvI9ofov7/aqU1+e9gIZfL8Fdmxwk/r3rpSg617vbgvrWGYC3B4y3DE/6Dp1BvavgwuiTkXVMV6LPRf3gs4okHPI1xcHNJere1Oh7iXOXVWmuO0+BjLIl/r8oOtcZUX+e12TsfDoef8TRuR7V+NFWZZVnMYakshIf4JYnPFicT4NWBcR7RFbdpXMWtElcY4B8bmX/LVe7UH2vAZxHd4ncam/Q8QvcEvfsx0yOhwTtt9BL9jb7+owk3mqWGLmNhqyvc5bN6T7fp4h25pOsNch6sKt/drFoBN8qJLWV4Zz+LpBXxiqW+0tZ+5oPtcIlfdVQbiHr4tpXgNSj16Tci+E/LKDek+rp67YNO9ome5fjdtzGyU2uUMSFj8P+lSx+8Fl/8+eug2mePXnT/zf72D4bi8YBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAyCRER+ATxj2Zi1mjL+AAAAAElFTkSuQmCC"])

/* end test code */


// ready to start
init()
