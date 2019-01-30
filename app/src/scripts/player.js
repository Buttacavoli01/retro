
const spriteList = [
  '../../dist/assets/images/char-boy.png',
  '../../dist/assets/images/char-cat-girl.png',
  '../../dist/assets/images/char-horn-girl.png',
  '../../dist/assets/images/char-pink-girl.png',
  '../../dist/assets/images/char-princess-girl.png'
];

let score = 0;

const startX = 200;
const startY = 380;
const middlePos = 50;

class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // different player each time the game starts gonna change this to a function
    this.sprite = spriteList[Math.floor(Math.random() * spriteList.length)];
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  update() {
    if (this.y > startY) this.y = startY;
    //end of the canvas
    if (this.x > 400) this.x = 400;
    //beginning of the canvas
    if (this.x < 0) this.x = 0;
    // Check for player reaching top of canvas and winning the game
    if (this.y < 0) {
      gem = new GemStone(xpos, ypos);
      this.x = startX;
      this.y = startY;
    }
  }
}




  Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
      case 'left':
        this.x -= this.speed + middlePos;
        console.log(this.x);
        break;
      case 'up':
        this.y -= this.speed + 30;
        console.log(this.y);
        break;
      case 'right':
        this.x += this.speed + middlePos;
        console.log(this.x);
        break;
      case 'down':
        this.y += this.speed + 30;
        console.log(this.y);
        break;
    }
  };

  // allows for character movement
  document.addEventListener('keyup', function(e) {
    const allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    };
    player.handleInput(allowedKeys[e.keyCode]);
  });

  let player = new Player(startX, startY, middlePos);
