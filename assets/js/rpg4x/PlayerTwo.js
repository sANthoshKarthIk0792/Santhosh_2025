import Player from "./Player.js";

class PlayerTwo extends Player {
    constructor(imageSrc = null) {
        super(imageSrc);
    }

    handleKeyDown({ keyCode }) {
        switch (keyCode) {
            case 73: // 'I' key
                this.velocity.y = 0;
                this.velocity.y -= 7 * this.yVelocity;
                this.direction = 'up';
                break;
            case 74: // 'J' key
                this.velocity.x = 0;
                this.velocity.x -= 5 * this.xVelocity;
                this.direction = 'left';
                break;
            case 75: // 'K' key
                this.velocity.y = 0;
                this.velocity.y += 5 * this.yVelocity;
                this.direction = 'down';
                break;
            case 76: // 'L' key
                this.velocity.y = 0;
                this.velocity.x += 5 * this.xVelocity;
                this.direction = 'right';
                break;
        }
    }
    
    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case 73: // 'I' key
                this.velocity.y = 0;
                break;
            case 74: // 'J' key
                this.velocity.x = 0;
                break;
            case 75: // 'K' key
                this.velocity.y = 0;
                break;
            case 76: // 'L' key
                this.velocity.x = 0;
                break;
        }
    } 
}

export default PlayerTwo;