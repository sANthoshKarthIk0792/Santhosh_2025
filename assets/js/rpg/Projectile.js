class Projectile {
    constructor (){
        this.projData = {
            speed: 5,
            size: 134,
            startingX: 0,
            startingY: 0,
        }
        this.xTraveled = this.projData.speed * 5;
        this.radians = 0;
        this.image = new Image();
        this.image.src = '/images/rpg/projectile.png'
        this.image.width = 536;
        this.image.height = 268;
        this.position = {
          x: initialPositionX,
          y: initialPositionY,
        };
        this.velocity = {
          x: 0,
          y: 0,
        }
        this.frameX = 134;
        this.frameY = 134;
        const frameWidth = 134;
        const frameHeight = 134;
        
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
      if (this.distanceWithinRange() === true){
        this.position.x += this.projData.speed * Math.cos(this.radians);
        this.position.y += this.projData.speed * Math.sin(this.radians);
      }
      else {
        this.position.x += this.projData.speed * this.velocity.x;
        this.position.y += this.projData.speed * this.velocity.y;
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
      GameEnv.ctx.drawImage(
        this.image,
        this.frameX, this.frameY,
        frameWidth, frameHeight,
        this.position.x, this.position.y,
        this.projData.size, this.projData.size
      )
    }
    update() {
      this.draw();
    }
      distanceWithinRange(){
          var players = GameEnv.gameObjects.filter(obj => obj instanceof PlayerOne);
          var player = players[0]
          const MAX_DISTANCE = 500;
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
