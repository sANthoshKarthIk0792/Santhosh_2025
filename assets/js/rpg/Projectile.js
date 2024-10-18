class Projectile {
    constructor (initialPositionX,initialPositionY){
        this.projData = {
            speed: 5,
            size: 134,
            startingX: initialPositionX,
            startingY: initialPositionY,
        }
        this.xTraveled = this.projData.speed * 5;
        this.radians = 0;
        this.image = new Image();
        this.image.src = '/images/rpg/projectile.png'
        this.position = {
          x: initialPositionX,
          y: initialPositionY,
        };
        this.velocity = {
          x: 0,
          y: 0,
        }
    }
    
    draw(){
      this.radians +=0.1 * Math.PI;
      if(this.playerX() - this.position.x > 0){
        this.velocity.x +=3;
      }
      else if(this.playerX() - this.position.x === 0){
        this.velocity.x = 0;
      }
      else{
        this.velocity.x -=3;
      }

      //Changes Y-value of projectile
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

      GameEnv.ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.projData.size,
        this.projData.size
      )
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