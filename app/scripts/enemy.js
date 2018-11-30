//array for newly created enemies
let allEnemies = [];
// Position 'y' where the enemies will are created
const enemyPosition = [50, 140, 220];
let enemy;

class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'img/enemy-bug.png';
  }
  render() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  update(dt) {
    this.x += this.speed * dt;
    if (this.x > 500) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() * 1000);
    }
    //triggers the hit as soon as they collide
    if (player.x < this.x + 60 &&
        player.x + 40 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
      //brings player back to starting pos
      player.x = startX;
      player.y = startY;
      //console.log(this.x)
    // console.log(this.y)
    }
  }
}

// gives enemies
enemyPosition.map((posY) => {
  enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 1000));
  allEnemies.push(enemy);
});
