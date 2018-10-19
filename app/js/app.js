hearts = document.getElementsByClassName('fa-heart');
heartsArray = [...hearts];

// Enemies the player must avoid
var Enemy = function(x, y, speed) {
   this.x = x;
   this.y = y;
   this.speed = speed;
   this.sprite = 'images/enemy-bug.png';
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

spriteList = [
   'images/char-boy.png',
   'images/char-cat-girl.png',
   'images/char-horn-girl.png',
   'images/char-pink-girl.png',
   'images/char-princess-girl.png'
];

var Player = function(x, y, speed) {
   this.x = x;
   this.y = y;
   this.speed = speed;
   // different player each time the game starts
   this.sprite = spriteList[Math.floor(Math.random() * spriteList.length)];
};

Player.prototype.update = function() {
   // Prevent player from moving beyond canvas wall boundaries
   if (this.y > 380) {
      this.y = 380;
   }
   if (this.x > 400) {
      this.x = 400;
   }
   if (this.x < 0) {
      this.x = 0;
   }

   // Check for player reaching top of canvas and winning the game
   if (this.y < 0) {
      this.x = 200;
      this.y = 380;
   }
};

Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
   switch (keyPress) {
      case 'left':
         this.x -= this.speed + 50;
         break;
      case 'up':
         this.y -= this.speed + 30;
         break;
      case 'right':
         this.x += this.speed + 50;
         break;
      case 'down':
         this.y += this.speed + 30;
         break;
   }
};

//array for newly created enemies
var allEnemies = [];
// Position 'y' where the enemies will are created
var enemyPosition = [55, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

// gives enemies
enemyPosition.map( (posY) => {
   enemy = new Enemy(20, posY, 100 + Math.floor(Math.random() * 512));
   allEnemies.push(enemy);
});

var gemScore = 0



// allows for character movement
document.addEventListener('keyup', (e) => {
   var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
   };

   player.handleInput(allowedKeys[e.keyCode]);
});
