

// Enemies our player must avoid
var Enemy = function(x, y, rate) {
    // Variables applied to each of our instances go here,

    //X coordinate of enemy
    this.x = x;

    //Y coordinate of enemy
    this.y = y;

    // rate at which enemy bug is moving
    this.rate = rate;

    // The image/sprite for the enemies, this uses a helper to easily load images
    this.sprite = 'images/enemy-bug.png';

    //block width
    this.xDistance = 101;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //If enemy is not past the boundary, keep moving forward
    if (this.x < this.xDistance  * 5) {
        
        //Increment x's position by rate * dt (rate x time)
        this.x += this.rate * dt;
    }
    // else, reset X coordinate to initial
    else {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The Player Class
class Player {
    constructor() {
        //block width
        this.xDistance = 101;

        // block height
        this.yDistance = 83;

        // Player's Starting Locations
        this.startLocationX = this.xDistance * 2;
        this.startLocationY = (this.yDistance * 4) + 83;

        //Initial x & y coordinates = Starting Locations
        this.x = this.startLocationX;
        this.y = this.startLocationY;

        //Winning Condition
        this.won = false;

        // Player Character
        this.sprite = 'images/char-pink-girl.png';
    }
 

 //Methods/This class requires an update(), 
 //Update Position
    update() {
        
    //Check if characters collide here
for (let enemy of allEnemies) {

    // If the player's coordinates collide with the enemy
    // enemy.x + enemy.xDistance = enemy's right side
    // this.x = player's left side
    // enemy.x = enemy's left side
    // this.x + this.xDistance = player's right side
    if (this.y === enemy.y && (enemy.x + enemy.xDistance/2 > this.x && enemy.x < this.x + this.xDistance/2) ) {
        alert("Oops!, you have been captured by the bugs.");
        this.reset();
    }
    // console.log(this.y, enemy.y);

    //Did the player get to the final tile with coordinates?
    if(this.y === 0 ) {
        this.won = true;
    }
}
    }

//Reset Coordinates
//Reset player's coordinates to the initial.
reset() {
    this.y = this.startLocationY;
    this.x = this.startLocationX;
}



//render() 
//Draw player sprite image with the x and y cordinates
render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

// a handleInput() method.
//Update player's position according to the keyboard input
    handleInput(input) {
    switch(input) {

    case 'up':
    //check to make sure player stays within block boundary
    if (this.y > 0) {
    this.y -= this.yDistance;
    }
    break;

    case 'down':
    //check to make sure player stays within block boundary
    if (this.y < this.yDistance * 5) {
    this.y += this.yDistance;
    }
    break;

    case 'right':
    //check to make sure player stays within block boundary
    if (this.x < this.xDistance * 4) {
        this.x += this.xDistance;
    }
    break;

    case 'left':
    //check to make sure player stays within block boundary
    if (this.x > 0) {
        this.x -= this.xDistance;
    }
    break;
        }   
    }
}

// Now instantiate your objects.

//New Player Object
const player = new Player();

// New Enemy Object
const ladyBug1 = new Enemy(-101, 0, 230);
const ladyBug2 = new Enemy(-101, 83, 130);
const ladyBug3 = new Enemy((-101 * 2.5), 83, 130);
const ladyBug4 = new Enemy(-101, 166, 100);
const ladyBug5 = new Enemy((-101 * 2.5), 166, 100);
const ladyBug6 = new Enemy(-101, 249, 130);

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
allEnemies.push(ladyBug1, ladyBug2, ladyBug3,ladyBug4,ladyBug5,ladyBug6);

// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
