import GameEnv from './GameEnv.js';
import PlayerOne from './PlayerOne.js';
import PlayerTwo from './PlayerTwo.js';
const SCALE_FACTOR = 25; // 1/nth of the height of the canvas
const STEP_FACTOR = 100; // 1/nth, or N steps up and across the canvas
const ANIMATION_RATE = 1; // 1/nth of the frame rate
const MAX_VELOCITY = 30;
const MAX_DISTANCE = 100;
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
        this.timerCalled = false;
        this.targetP = "player1";
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
      this.velocity.x = this.scale.width / this.stepFactor;
      this.velocity.y = this.scale.height / this.stepFactor;

      // Set the player's width and height to the new size (object is a square)
      this.width = this.size;
      this.height = this.size;
  }
    draw(){
      this.radians += Math.PI;
                      
      //Change the velocity of the projectile
      if(this.targetX() - this.position.x > 0){
        if(this.velocity.x < -10){
          this.velocity.x += 5;
        }
        this.velocity.x += 1;
      }
      else if(this.targetX() - this.position.x === 0){
        this.velocity.x = 0;
      }
      else{
        if(this.velocity.x > 10){
          this.velocity.x -= 5;
        }
        this.velocity.x -= 1;
      }

      //Changes Y and X value of projectile
      if (this.targetY() - this.position.y > 0){
        if(this.velocity.y < -10){
          this.velocity.y += 5;
        }
        this.velocity.y += 1;
      }
      else if(this.targetY() - this.position.y === 0){
        this.velocity.y = 0;
      }
      else{
        if(this.velocity.y > 10){
          this.velocity.y -= 5;
        }
        this.velocity.y -=1;
      }
      if (Math.abs(this.velocity.x) > MAX_VELOCITY) {
        this.velocity.x = Math.sign(this.velocity.x) * MAX_VELOCITY;
      }
      if (Math.abs(this.velocity.y) > MAX_VELOCITY) {
        this.velocity.y = Math.sign(this.velocity.y) * MAX_VELOCITY;
      }
      if (this.distanceWithinRange() === true){
        this.position.x += this.velocity.x * Math.abs(Math.cos(this.radians));
        this.position.y += this.velocity.y * Math.abs(Math.cos(this.radians));
      }
      else {
        this.position.x += this.projData.acceleration * this.velocity.x;
        this.position.y += this.projData.acceleration * this.velocity.y;
      }

      //Changes the frame of the image
      switch (true) {
        case this.velocity.y > 0:
          if(this.velocity.x > 0){
            this.frameX = 0;
            this.frameY = this.image.height/2;
            break;
          }
          else if(this.velocity.x < 0){
            this.frameX = this.image.width/4;
            this.frameY = this.image.height/2;
            break;
          }
          else{
            this.frameX = this.image.width/4;
            this.frameY = 0;
            break;
          }
        case this.velocity.y < 0:
          if(this.velocity.x>0){
            this.frameX = 3*this.image.width/4;
            this.frameY = this.image.height/2;
            break;
          }
          else if(this.velocity.x < 0){
            this.frameX = this.image.width/2;
            this.frameY = this.image.height/2;
            break;
          }
          else {
            this.frameX = 3*this.image.width/4;
            this.frameY = 0;
            break;
          }
          default:
            if(this.velocity.x>0){
              this.frameX = 0;
              this.frameY = 0;
              break;
            }
            else{
              this.frameX = this.image.width/2;
              this.frameY = 0;
              break;
            }
      }
     /* if(this.velocity.y>0){
        if(this.velocity.x>0){
          this.frameX = this.image.width/2;
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

      }*/
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
    }
      player1X(){
        var players = GameEnv.gameObjects.filter(obj => obj instanceof PlayerOne);
        var player = players[0]
        return player.position.x;
      }
      player2X(){
        var players = GameEnv.gameObjects.filter(obj => obj instanceof PlayerTwo);
        var player = players[0]
        return player.position.x;
      }
      player1Y(){
        let players = GameEnv.gameObjects.filter(obj => obj instanceof PlayerOne);
        let player = players[0]
        return player.position.y;
      }
      player2Y(){
        let players = GameEnv.gameObjects.filter(obj => obj instanceof PlayerTwo);
        let player = players[0]
        return player.position.y;
      }   
      target(){
        if(this.timer() === true){
          let distanceP1 = Math.sqrt(
            Math.pow(this.player1X() - this.position.x, 2) + Math.pow(this.player1Y() - this.position.y, 2)
          );
          let distanceP2 = Math.sqrt(
            Math.pow(this.player2X() - this.position.x, 2) + Math.pow(this.player2Y() - this.position.y, 2)
          );
          if (distanceP1 > distanceP2){
            this.targetP = "player2";
            return true;
          }
          else {
            this.targetP = "player1";
            return false;
          }
        }
        if (this.targetP === "player1"){
          return true;
        }
        else if (this.targetP === "player2"){
          return false;
        }
      }
      targetX(){
        if (this.target() === true) {
          return this.player1X();
        }
        else {
          return this.player2X()
        };
      }
      targetY(){
        if (this.target() === true) {
          return this.player1Y();
        }
        else {
          return this.player2Y()
        };
      }
      distanceWithinRange(){
        if (this.target() === true) {
          let distance = Math.sqrt(
            Math.pow(this.player1X() - this.position.x, 2) + Math.pow(this.player1Y() - this.position.y, 2)
          );
          if (distance <= MAX_DISTANCE){
            return true;
          }
          else {
            return false;
          }
        }
        else {
          let distance = Math.sqrt(
            Math.pow(this.player2X() - this.position.x, 2) + Math.pow(this.player2Y() - this.position.y, 2)
          );
          if (distance <= MAX_DISTANCE){
            return true;
          }
          else {
            return false;
          }
        }   
    }
    timer(){
      if (this.timerCalled === true){
        return false;
      }
      else {
        this.timerCalled = true;
        setTimeout(() => {
          this.timerCalled = false; 
          console.log("Hey! I am working!")
      }, 10000);
        return true;
      }
    }
}
export default Projectile;