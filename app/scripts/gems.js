const gemList = [
  'img/gem-green.png',
  'img/gem-blue.png',
  'img/gem-orange.png'
]

let xpos = Math.floor((Math.random() * 380) + 1);
console.log(xpos)
let ypos = Math.floor((Math.random() * 380) + 1);
console.log(ypos)

class GemStone {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = gemList[Math.floor(Math.random() * gemList.length)];
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

var stone = new GemStone(xpos, ypos)
