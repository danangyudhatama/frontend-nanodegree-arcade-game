

const   TILE_WIDTH = 101,
        TILE_HEIGHT = 83, 
        ENTITY_WIDTH = 101,
        ENTITY_HEIGHT = 83 ;


// Enemies our player must avoid
class Enemy {
    constructor(coorY, level) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = 0 ;
        this.y = coorY - 20 ; // adjust position to tile's center
        this.speed = this.randomSpeed(level);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x = this.x + this.speed * dt ;
        if (this.x > ctx.canvas.width) {
            this.x = 0 ;
        }
    }


    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    randomSpeed(level){
         switch (level) {
            case 1:
                return Math.floor(Math.random() * 100) + 50;
                break;
            case 2:
                return Math.floor(Math.random() * 200) + 100;
                break;
            case 3:
                return Math.floor(Math.random() * 300) + 150;
                break;
            default:
                return Math.floor(Math.random() * 400) + 200; 
         }
         
    }

}
// player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(coorX,coorY) {
        this.sprite = 'images/char-boy.png';
        this.x = coorX ;
        this.y = coorY - 10 ; // adjust the position to the tile's center 
    }

    update(dt) {
        if (this.y < TILE_HEIGHT - 20) { // player win the game, if player reach the water tile 
             if (confirm('You win the game, wanna play again ?')) {
                this.goBack();
            }
        }
        this.playerCollider();

    }

    playerCollider() {
        for (var i = 0; i < allEnemies.length; i++) {
            if (this.x + 20 < allEnemies[i].x + ENTITY_WIDTH && 
                this.x + ENTITY_WIDTH - 20 > allEnemies[i].x &&
                this.y + 10 < allEnemies[i].y + 20 + ENTITY_HEIGHT &&
                ENTITY_HEIGHT + this.y + 10 > allEnemies[i].y + 20) {
                this.goBack();  // collision detected!
            }
        }
    }

    goBack() { // send the player back to the initial setup
        this.x = (TILE_WIDTH)*2;
        this.y = (TILE_HEIGHT)*5 - 10;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keys) {
        switch (keys) {
            case "left":
                if (this.x > 0) {
                    this.x = this.x - TILE_WIDTH ;
                } else { this.x = this.x;}
                break ;
            case "right":
                if (this.x < (4 * TILE_WIDTH)) {
                    this.x = this.x + TILE_WIDTH ;
                } else { this.x = this.x;}
                break ;
            case "up":
                if (this.y > 0) {
                    this.y = this.y - TILE_HEIGHT ;
                } else { this.y = this.y;}
                break ;
            default:
                if (this.y < (5 * TILE_HEIGHT - 20)) {
                    this.y = this.y + TILE_HEIGHT ;
                } else { this.y = this.y;}
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy(TILE_HEIGHT * 2,4);
var bug2 = new Enemy(TILE_HEIGHT * 3,3);
var allEnemies = [bug1,bug2];

var player = new Player((TILE_WIDTH)*2,(TILE_HEIGHT)*5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});  