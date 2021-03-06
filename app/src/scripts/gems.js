const gemList = [
  green ={
    name: 'green',
    path: `${path}gem-green.png`
  },
  blue = {
    name: 'blue',
    path: `${path}gem-blue.png`
  },
  orange = {
    name: 'orange',
    path: `${path}gem-orange.png`
  }
];

let xpos = Math.floor((Math.random() * 300) + 1);
/*  so math.random returns a value between -1 and 1 so we multiply by
 *  digit number to get a random number between the grass and water.
 */
console.log(xpos);
let ypos = Math.floor((Math.random() * 400) + 1);
console.log(ypos);

class GemStone {
  constructor(x, y, power) {
    this.x = Math.floor((Math.random() * 300) + 1);
    this.y = Math.floor((Math.random() * 400) + 1);
    //grabbing a random gem everytime
    this.sprite = `${gemList[Math.floor(Math.random() * gemList.length)].path}`;

  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  update() {
    //80 acts as a padding around the gems
    if (player.x < this.x + 80 &&
      player.x + 80 > this.x &&
      player.y < this.y + 80 &&
      80 + player.y > this.y) {
        //moves the gem offscreen after being grabbed
        this.x = -100;
        this.y = -100;
        scoreVal.innerText = score += 50;
        //console.log('grabbed the gemstone');
    }
  }
}
let gem = new GemStone(xpos, ypos);
