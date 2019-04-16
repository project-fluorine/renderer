
/*

  Hello and welcome to the file that takes compiled user code and turns into
  an actual project. This code is not going to look good during its early
  development, but over time it will get cleaned up and will slowly get more
  comments.

  - Lefty

*/

const width = 800
const height = 450
const fontheight = 30 // temporary

class Costume {
  constructor(b64) {
    var image = new Image();
    image.src = b64
    this.image = image
    this.width = image.width
    this.height = image.height
  }
}
var change = false;
class Sprite {
  constructor(x, y, costume, program, costumes) {
    this.position = {
      "x": x,
      "y": y
    }
    this.program = program
    this.hidden = false;
    this.rotation = 0;
    this.costumes = []
    costumes.forEach((base) => {
      this.costumes.push(new Costume(base));
    });
    this.costume = costume
    this.scale = 1
    this.program.change = true;
    this.message = {
      "available": false,
      "contents": null,
      "ending": null
    }
depended on scratch 3’s renderer   }

  setPos(x,y) {
    this.position.x = x;
    this.position.y = y;
    this.program.change = true;
  }
  move(x,y) {
    this.position.x = this.position.x+x;
    this.position.y = this.position.y+y;
    this.program.change = true;
}
  rotate(degrees) {
    this.rotation += degrees;
    this.program.change = true;
  }
  say(message, milliseconds) {
    this.message.contents = message
    this.message.ending = (new Date/1) + milliseconds
    this.message.available = true
  }
}




class Program { // this controls everything
  constructor(ctx, width, height) {
    this.sprites = {}
    this.width = width
    this.height = height
    this.change = true
    this.frametime = 0
    var f = ctx
    this.ctx = f.getContext('2d');
    this.ctx.canvas.width = width
    this.ctx.canvas.height = height
    let me = this;
    this.mmf()() // this is the fun part
  }


  mmf () {
    var self = this


    function drawCostume(x,y,base, rotation, scale) {  // rotation mostly works
     self.ctx.save();
     self.ctx.beginPath();
     self.ctx.translate( x - base.width/2, y - base.height/2);
     self.ctx.rotate(rotation*Math.PI/180);
     self.ctx.drawImage(base, 0,0);
     self.ctx.restore();
    }

    var makeframe = () => {

      if (self.change == true) {
        self.ctx.fillStyle = "black"
        self.ctx.beginPath();
        self.ctx.rect(0,0,self.width, self.height);
        self.ctx.fill();
        for (var key in self.sprites) {
          if (self.sprites[key].hidden == false) {
            var x = self.sprites[key].position.x+(self.width/2)
            var y = self.sprites[key].position.y+(self.height/2)
            drawCostume(x, y, self.sprites[key].costumes[self.sprites[key].costume].image, self.sprites[key].rotation, self.sprites[key].scale);

            if (self.sprites[key].message.available == true) {
              if (new Date/1 < self.sprites[key].message.ending) {
              var msg = self.sprites[key].message.contents
              self.ctx.font = fontheight + 'px Trebuchet MS';
              self.ctx.fillStyle = "lightgray"
              var size = self.ctx.measureText(msg).width;
              self.ctx.beginPath();
              self.ctx.moveTo(x-20, y-20);
              self.ctx.lineTo(x-30, y-10);
              self.ctx.lineTo(x, y);
              self.ctx.fill();

              self.ctx.fillRect(x-size-30, y-fontheight-30, size+10, fontheight+20);
              self.ctx.fillStyle = "black"
              self.ctx.fillText(msg, x-size-25, y-25);

            } else {
              self.sprites[key].message.available = false;
            }
          }
        }
      }

        self.change = false;
      }
      c++;
      self.frametime = new Date()/1
      window.requestAnimationFrame(makeframe)
    }
  return makeframe
}

  framesync() {
    lf = this.frametime
    const poll = resolve => {
      if (lf != this.frametime) {
        resolve();
      } else {
        setTimeout(_ => poll(resolve), 5);
      }
    }
    return new Promise(poll);
  }
}


// the fps counting system is for testing, might not stay in the future
fps = 0;
c = 0;

setInterval(() => {
  fps = c/5;
  c = 0;
  console.log("FPS: " + fps); // this is definitely temporary
}, 5000);



/*

  the code below is for testing only.

  This section will eventually be what takes user code in from the Fluorine to
  JavaScript compiler that is currently being written

*/

var game = new Program(document.getElementById("fluorine"), 800, 450);

// x, y, costume, costume data
game.sprites["a"] = new Sprite(0,0,0,game,["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAADrklEQVR4nO3cW0gUYRjG8dfzulpba+bimksp0cGICIVuCo0wKghJIhDtCJWFEEGZBHXTAYIuIuuibgK9iSjCMiwppCBS6KJapEjClDQ1bd3VtMTi2xDKnRV3HNdn6vndCDPs7Cd/Zr45acScQu9PIRiRTIGFQcAwCBgGAcMgYBgEDIOAYRAwDAKGQcAwCBgGAcMgYBgEDIOAYRAwDAKGQcAwCBgGAcMgYBgEDIOAYRAwDAKGQcAwCBgGAcMgYBgEDIOAYRAwDAIm2oyDdmy/K1FWr9jXnQhYN9hSJAPv1si3D5niaVo+I+ObCtP8SVu0bVBSCm5rRgjmR1+OdNUcl94nOeEerm6mCGLLdkvanv0SaWnV9Xnfm0PSdr1MRjxWw8dmNPg5JHnzY0kv3ag7hpKYVSmLjh3x72XooIOoGI7CnYZsKy611h8FHeyknri0dcIYvQ3nxOdeFTBxqwl/9spaf4Dx1DK1vvPm1ukevm6wc0jGyXKxZlQHLB8dcknrpWrxNbsm/Hx66VWxZZ/V/Pzb8oew8wnkIUtN4loxlMnEUD5eOSjDnzYFLFdz0bz8R4aMczpABrGvrdFc7mmqmFSMMT31ezWXq0MaKsgg1sx7mst9zatD2k7/yyzN5TF2t65xhQPcpK4m82CnuM6SbeIsmfp3qO1b0rplqD156hszGNweEuv4DDCKmQMXJMrqC8v3jHgTwvI9ofov7/aqU1+e9gIZfL8Fdmxwk/r3rpSg617vbgvrWGYC3B4y3DE/6Dp1BvavgwuiTkXVMV6LPRf3gs4okHPI1xcHNJere1Oh7iXOXVWmuO0+BjLIl/r8oOtcZUX+e12TsfDoef8TRuR7V+NFWZZVnMYakshIf4JYnPFicT4NWBcR7RFbdpXMWtElcY4B8bmX/LVe7UH2vAZxHd4ncam/Q8QvcEvfsx0yOhwTtt9BL9jb7+owk3mqWGLmNhqyvc5bN6T7fp4h25pOsNch6sKt/drFoBN8qJLWV4Zz+LpBXxiqW+0tZ+5oPtcIlfdVQbiHr4tpXgNSj16Tci+E/LKDek+rp67YNO9ome5fjdtzGyU2uUMSFj8P+lSx+8Fl/8+eug2mePXnT/zf72D4bi8YBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAyCRER+ATxj2Zi1mjL+AAAAAElFTkSuQmCC"])

game.sprites["d"] = new Sprite(100,100,0,game,["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAADrklEQVR4nO3cW0gUYRjG8dfzulpba+bimksp0cGICIVuCo0wKghJIhDtCJWFEEGZBHXTAYIuIuuibgK9iSjCMiwppCBS6KJapEjClDQ1bd3VtMTi2xDKnRV3HNdn6vndCDPs7Cd/Zr45acScQu9PIRiRTIGFQcAwCBgGAcMgYBgEDIOAYRAwDAKGQcAwCBgGAcMgYBgEDIOAYRAwDAKGQcAwCBgGAcMgYBgEDIOAYRAwDAKGQcAwCBgGAcMgYBgEDIOAYRAwDAIm2oyDdmy/K1FWr9jXnQhYN9hSJAPv1si3D5niaVo+I+ObCtP8SVu0bVBSCm5rRgjmR1+OdNUcl94nOeEerm6mCGLLdkvanv0SaWnV9Xnfm0PSdr1MRjxWw8dmNPg5JHnzY0kv3ag7hpKYVSmLjh3x72XooIOoGI7CnYZsKy611h8FHeyknri0dcIYvQ3nxOdeFTBxqwl/9spaf4Dx1DK1vvPm1ukevm6wc0jGyXKxZlQHLB8dcknrpWrxNbsm/Hx66VWxZZ/V/Pzb8oew8wnkIUtN4loxlMnEUD5eOSjDnzYFLFdz0bz8R4aMczpABrGvrdFc7mmqmFSMMT31ezWXq0MaKsgg1sx7mst9zatD2k7/yyzN5TF2t65xhQPcpK4m82CnuM6SbeIsmfp3qO1b0rplqD156hszGNweEuv4DDCKmQMXJMrqC8v3jHgTwvI9ofov7/aqU1+e9gIZfL8Fdmxwk/r3rpSg617vbgvrWGYC3B4y3DE/6Dp1BvavgwuiTkXVMV6LPRf3gs4okHPI1xcHNJere1Oh7iXOXVWmuO0+BjLIl/r8oOtcZUX+e12TsfDoef8TRuR7V+NFWZZVnMYakshIf4JYnPFicT4NWBcR7RFbdpXMWtElcY4B8bmX/LVe7UH2vAZxHd4ncam/Q8QvcEvfsx0yOhwTtt9BL9jb7+owk3mqWGLmNhqyvc5bN6T7fp4h25pOsNch6sKt/drFoBN8qJLWV4Zz+LpBXxiqW+0tZ+5oPtcIlfdVQbiHr4tpXgNSj16Tci+E/LKDek+rp67YNO9ome5fjdtzGyU2uUMSFj8P+lSx+8Fl/8+eug2mePXnT/zf72D4bi8YBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAwChkHAMAgYBgHDIGAYBAyDgGEQMAyCRER+ATxj2Zi1mjL+AAAAAElFTkSuQmCC"])
var i;
var run = true
function flag() { // start
  if (run == true) {
    game.sprites['a'].say("Hello, World!",5000);
    i = setInterval(function() {
      game.sprites['d'].rotate(1);
    }, 1);
    run = false;
  }
}

function stop() {
  run = true;
  clearInterval(i);
}

/* end test code */


// ready to start
