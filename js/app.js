'use strict';

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  };

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 550) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() * 512);
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 60 && player.x + 37 > this.x &&
        player.y < this.y + 25 && 30 + player.y > this.y) {
      player.x = 200;
      player.y = 380;
      }
  };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

var Player = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
  };

Player.prototype.update = function () {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 380) {this.y = 380;}
    if (this.x > 400) {this.x = 400;}
    if (this.x < 0)   {this.x = 0;}

    // Check for player reaching top of canvas and winning the game
    if (this.y < 0) {this.x = 200; this.y = 380;}
  };

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

Player.prototype.handleInput = function (keyPress) {
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
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

//maybe create Generator for adding more enemies??
enemyPosition.forEach(function (posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
  });

// allows for character movement
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
      };

    player.handleInput(allowedKeys[e.keyCode]);
  });
