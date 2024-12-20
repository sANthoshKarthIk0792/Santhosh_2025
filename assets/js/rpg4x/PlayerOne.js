import Player from './Player.js';
class PlayerOne extends Player {
    constructor(data = null) {
        super(data);
    }

    handleKeyDown({ keyCode }) {
        switch (keyCode) {
            case 87: // 'W' key
                this.velocity.y = 0;
                this.velocity.y -= 7*this.yVelocity;
                this.direction = 'up';
                break;
            case 65: // 'A' key
                this.velocity.x = 0;
                this.velocity.x -= 7*this.xVelocity;
                this.direction = 'left';
                break;
            case 83: // 'S' key
                this.velocity.y = 0;
                this.velocity.y += 7*this.yVelocity;
                this.direction = 'down';
                break;
            case 68: // 'D' key
                this.velocity.x = 0;
                this.velocity.x += 7*this.xVelocity;
                this.direction = 'right';
                break;
        }
    }

    /**
     * Handles key up events to stop the player's velocity.
     * 
     * This method stops the player's velocity based on the key released.
     * 
     * @param {Object} event - The keyup event object.
     */
    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case 87: // 'W' key
                this.velocity.y = 0;
                break;
            case 65: // 'A' key
                this.velocity.x = 0;
                break;
            case 83: // 'S' key
                this.velocity.y = 0;
                break;
            case 68: // 'D' key
                this.velocity.x = 0;
                break;
        }
    }

}

export default PlayerOne;