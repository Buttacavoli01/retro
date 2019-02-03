//array for newly created enemies
let allEnemies = [];
// Position 'y' where the enemies will are created
const enemyPosition = [50, 140, 220];
let enemy;
const path = '../../dist/assets/images/';
var lives = 2,
hearts = document.querySelectorAll('.fa-heart');
const canvas = document.querySelector('#canvas');
const modal = document.querySelector('.modal');

class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = `${path}enemy-bug.png`;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  update(dt) {
    this.x += this.speed * dt;
    if (this.x > 500) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() * 500);
    }
  }
  collisionCheck() {
    //triggers the hit as soon as they collide numbers act like a padding
    if (player.x < this.x + 60 &&
      player.x + 40 > this.x &&
      player.y < this.y + 25 &&
      30 + player.y > this.y) {
      //brings player back to starting pos
      player.x = startX;
      player.y = startY;
      scoreVal.innerText = score -= 75;
      hearts[lives].classList.remove('fas');
      hearts[lives].classList.add('far');
      lives--;
      endGame();
    }
  }
}

// gives enemies a starting point with a random speed
enemyPosition.map((posY) => {
  enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 1000));
  allEnemies.push(enemy);
});
