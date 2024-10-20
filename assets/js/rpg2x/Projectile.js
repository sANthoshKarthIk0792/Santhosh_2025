import GameEnv from './GameEnv.js';
import PlayerOne from './PlayerOne.js';
const SCALE_FACTOR = 25; // 1/nth of the height of the canvas
const STEP_FACTOR = 100; // 1/nth, or N steps up and across the canvas
const ANIMATION_RATE = 1; // 1/nth of the frame rate
const MAX_VELOCITY = 65;
const INIT_POSITION = {
  x: 500,
  y: 240,
};
class Projectile {
    constructor (data = null){
        this.projData = {
            acceleration: 0.2,
        }
        this.scaleFactor = SCALE_FACTOR;
        this.stepFactor = STEP_FACTOR;
        this.animationRate = ANIMATION_RATE;
        this.radians = 0;
        this.image = new Image();
        this.image.src = data.src;
        this.image.width = 536;
        this.width = 30;
        this.height = 30;
        this.image.height = 268;
        this.imageLoaded = false;
        this.image.onload = () => {
          this.imageLoaded = true;
        }
        this.position = INIT_POSITION;
        this.velocity = {
          x: 0,
          y: 0,
        }
        this.frameX = 134;
        this.frameY = 134;
        this.frameWidth = 134;
        this.frameHeight = 134;
        this.scale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };
        
    }
    resize() {
      // Calculate the new scale resulting from the window resize
      const newScale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };

      // Adjust the player's position proportionally
      this.position.x = (this.position.x / this.scale.width) * newScale.width;
      this.position.y = (this.position.y / this.scale.height) * newScale.height;

      // Update the player's scale to the new scale
      this.scale = newScale;

      // Recalculate the player's size based on the new scale
      this.size = this.scale.height / this.scaleFactor; 

      // Recalculate the player's velocity steps based on the new scale
      this.xVelocity = this.scale.width / this.stepFactor;
      this.yVelocity = this.scale.height / this.stepFactor;

      // Set the player's width and height to the new size (object is a square)
      this.width = this.size;
      this.height = this.size;
  }
    draw(){
      this.radians +=0.1 * Math.PI;
                      
      //Change the velocity of the projectile
      if(this.playerX() - this.position.x > 0){
        this.velocity.x +=3;
      }
      else if(this.playerX() - this.position.x === 0){
        this.velocity.x = 0;
      }
      else{
        this.velocity.x -=3;
      }

      //Changes Y and X value of projectile
      if (this.playerY() - this.position.y > 0){
        this.velocity.y +=3;
      }
      else if(this.playerY() - this.position.y === 0){
        this.velocity.y = 0;
      }
      else{
        this.velocity.y -=3;
      }
      if (Math.abs(this.velocity.x) > MAX_VELOCITY) {
        this.velocity.x = Math.sign(this.velocity.x) * MAX_VELOCITY;
      }
      if (Math.abs(this.velocity.y) > MAX_VELOCITY) {
        this.velocity.y = Math.sign(this.velocity.y) * MAX_VELOCITY;
      }
      if (this.distanceWithinRange() === true){
        this.position.x += this.projData.acceleration * Math.cos(this.radians) + this.velocity.x;
        this.position.y += this.projData.acceleration * -Math.cos(this.radians) + this.velocity.y;
      }
      else {
        this.position.x += this.projData.acceleration * this.velocity.x;
        this.position.y += this.projData.acceleration * this.velocity.y;
      }

      //Changes the frame of the image
      if(this.velocity.y>0){
        if(this.velocity.x>0){
          this.frameX = 0;
          this.frameY = this.image.height/2;
        }
        else if(this.velocity.x<0){
          this.frameX = this.image.width/4;
          this.frameY = this.image.height/2;
        }
        else{
          this.frameX = this.image.width/4;
          this.frameY = 0;
        }
      }
      if(this.velocity.y<0){
        if(this.velocity.x>0){
          this.frameX = 3*this.image.width/4;
          this.frameY = this.image.height/2;
        }
        else if(this.velocity.x < 0){
          this.frameX = this.image.width/2;
          this.frameY = this.image.height/2;
        }
        else{
          this.frameX = 3*this.image.width/4;
          this.frameY = 0;
        }
      }
      else{
        if(this.velocity.x>0){
          this.frameX = 0;
          this.frameY = 0;
        }
        else{
          this.frameX = this.image.width/2;
          this.frameY = 0
        }

      }
      if (this.imageLoaded) {
      GameEnv.ctx.drawImage(
        this.image,
        this.frameX, this.frameY,
        this.frameWidth, this.frameHeight,
        this.position.x, this.position.y,
        5*this.width, 5*this.height
      )
      }
    }
    update() {
      this.draw();
      console.log("hi");
    }
      distanceWithinRange(){
          var players = GameEnv.gameObjects.filter(obj => obj instanceof PlayerOne);
          var player = players[0]
          const MAX_DISTANCE = 200;
          var distance = Math.sqrt(
            //maybe change player to playerone
            Math.pow(player.position.x - this.position.x, 2) + Math.pow(player.position.y - this.position.y, 2)
          );
          
          if (distance <= MAX_DISTANCE){
            return true;
          }
          else {
            return false;
          }
          
      }
      playerX(){
        var players = GameEnv.gameObjects.filter(obj => obj instanceof PlayerOne);
        var player = players[0]
        return player.position.x;
      }
      playerY(){
        var players = GameEnv.gameObjects.filter(obj => obj instanceof PlayerOne);
        var player = players[0]
        return player.position.y;
      }   
  
}
export default Projectile;
