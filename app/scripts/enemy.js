hearts = document.getElementsByClassName('fa-heart');
heartsArray = [...hearts];

// Enemies the player must avoid
var Enemy = function(x, y, speed) {
   this.x = x;
   this.y = y;
   this.speed = speed;
   this.sprite = 'img/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
   this.x += this.speed * dt;

   // so enemies move off canvas
   if (this.x > 505) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() * 512);
   }

   // Check for collision between player and enemies across stones
   if (player.x < this.x + 60 && player.x + 37 > this.x &&
      player.y < this.y + 25 && 30 + player.y > this.y) {
      //brings player back to starting pos
      player.x = 200;
      player.y = 380;
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//array for newly created enemies
var allEnemies = [];
// Position 'y' where the enemies will are created
var enemyPosition = [55, 140, 220];
//var player = new Player(200, 380, 50);
var enemy;

// gives enemies
enemyPosition.map( (posY) => {
   enemy = new Enemy(20, posY, 100 + Math.floor(Math.random() * 512));
   allEnemies.push(enemy);
});
