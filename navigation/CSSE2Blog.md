---
layout: pages
title: CSSE2 Blog
permalink: /CSSE2blog/
---
# 🎮 Final Project Reflection: What I Learned in JavaScript and Computer Science

Through building a **Minecraft-style Nether dimension game**, I explored key **Computer Science**, **JavaScript**, and **Object-Oriented Programming** concepts. Below is a summary of the terms I learned and how I applied them in my project.

---

## 📋 Software Engineering Practices

- **Planning Changes**: Outlining intended code changes before implementation to stay organized and avoid bugs.
- **Checklists**: Tracking progress using a list of tasks or features.
- **Burndowns**: A graph that shows remaining work over time.
- **Coding with Comments**: Writing notes in the code to explain its purpose.
```js
// Enhanced method to handle victory
handleVictory() {
  console.log('handleVictory called with hitCount:', this.fireballHitCount);
  
  // Prevent multiple victory screens
  if (this.victoryTriggered) {
    console.log('Victory already triggered, ignoring');
    return;
  }
}
```
- **Help Documentation**: Guides that explain how the code works and how to use it.

---

## 🔁 Software Development Lifecycle Practices

- **Source Control**: Using tools like Git to keep a history of code changes.
- **Forking**: Copying someone else's project to work on it independently.
- **Branching**: Creating separate lines of development for features.
- **Building**: Turning code into a working game or app.
- **Testing and Verification**: Checking if everything works as expected.
```js
// Game testing through console logging
console.log('Ghast health:', this.health);
console.log('Victory condition met!');
```
- **Pull Requests**: Asking to merge your code with the main project.
- **Merging/Integrating**: Combining changes from multiple branches.
- **Deployment**: Publishing the final version for users.

---

## 🔁 Retrospective Engineering Practices

- **Presentation**: Sharing and explaining the project to an audience.
- **Live Reviews**: Getting real-time feedback while showing your work.
- **Demos**: Showing off working features like the victory screen and enemy AI.
- **Code Reviews**: Letting others examine your code for suggestions.
- **Revising Plans**: Adjusting your project based on feedback or progress.

---

## 🧠 Key Coding Concepts

### 📊 Data Types

I used various data types throughout my game:

- **Number**: Player health, enemy damage, coordinates
- **String**: Player names, game states, CSS styling
- **Boolean**: Game flags, collision detection
- **Array**: Game objects, particle effects
- **JSON Object**: Sprite configurations, position data

```js
// Game object with mixed data types
const sprite_data_ghast = {
  id: 'Ghast',                          // String
  health: 150,                          // Number
  isEnemy: true,                        // Boolean
  INIT_POSITION: { x: width - 300, y: 100 }, // Object
  orientation: { rows: 2, columns: 4 }, // Object with Numbers
  hitbox: { widthPercentage: 0.8, heightPercentage: 0.8 } // Object
};
```

---

### ➕ Operators

- **String Operations**: Building dynamic CSS and HTML content
```js
victoryDiv.innerHTML = `
  <div>🎉 VICTORY! 🎉</div>
  <div style="font-size: 32px;">You defeated the Ghast!</div>
  <div>Fireballs Hit Back: ${this.fireballHitCount}/2</div>
`;
```
- **Mathematical Operations**: Position calculations and physics
```js
// Distance calculation for collision detection
const dx = fireball.position.x - playerPos.x;
const dy = fireball.position.y - playerPos.y;
const distance = Math.sqrt(dx * dx + dy * dy);
```
- **Boolean Expressions**: Game logic conditions
```js
if (this.spriteData.fireballCooldown <= 0 && distance < 600) {
  this.shootFireball(player);
}
```

---

### 🔁 Control Structures

- **Iteration**: Processing game objects and particles
```js
// Clean up all game objects
objectsToRemove.forEach(obj => {
  try {
    if (obj && typeof obj.destroy === 'function') {
      obj.destroy();
    }
  } catch (error) {
    console.warn('Error cleaning up object:', error);
  }
});
```
- **Conditions**: Game state management and victory conditions
- **Nested Conditions**: Complex game logic
```js
if (this.health <= 0) {
  console.log('Ghast destroyed!');
  if (this.parent && this.gameEnv && this.gameEnv.gameObjects) {
    const index = this.gameEnv.gameObjects.indexOf(this.parent);
    if (index > -1) {
      this.gameEnv.gameObjects.splice(index, 1);
    }
  }
  // Trigger victory when ghast is destroyed
  if (gameLevel) {
    gameLevel.handleVictory();
  }
}
```

---

### ⌨️ Input/Output

- **HTML5 Input**: Dynamic element creation for game screens
```js
// Creating victory screen dynamically
const victoryDiv = document.createElement('div');
victoryDiv.id = 'victory-screen';
victoryDiv.style.cssText = `
  position: fixed !important; 
  background-color: rgba(0, 50, 0, 0.95) !important; 
  display: flex !important;
`;
```
- **Validation**: Input checking and error handling
```js
// Validate game objects before processing
if (!this.gameEnv || !this.gameEnv.gameObjects) {
  console.log('No gameEnv or gameObjects');
  return;
}
```
- **Key Events & DOM**: Player controls and game interaction
```js
// Attack system with key detection
handleAttack: function() {
  if (this.attackCooldown <= 0) {
    this.isAttacking = true;
    this.attackCooldown = 20;
    this.checkFireballHit.call(this);
  }
}
```

---

## 🧱 Classes and Object-Oriented Programming

### **Writing Classes**: Custom game objects
```js
class GhastFireball {
  constructor(x, y, target, gameEnv, speed = 3, turnRate = 0.06) {
    this.gameEnv = gameEnv;
    this.target = target;
    this.speed = speed;
    this.position = { x: x, y: y };
    this.active = true;
  }
}
```

### **Creating Methods**: Object behaviors
```js
// Fireball homing behavior
update() {
  const dx = this.target.position.x - this.position.x;
  const dy = this.target.position.y - this.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Homing calculation
  const targetAngle = Math.atan2(dy, dx);
  const currentAngle = Math.atan2(this.velocity.y, this.velocity.x);
  const newAngle = currentAngle + this.turnRate * angleDiff;
  
  this.velocity.x = Math.cos(newAngle) * this.speed;
  this.velocity.y = Math.sin(newAngle) * this.speed;
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
}
```

### **Instantiating Objects**: Creating game entities
```js
let fireball = new GhastFireball(startX, startY, player, gameEnv);
```

### **Parameters & Return Values**: Data flow between methods
```js
reverseDirection(newTarget) {
  if (!newTarget || !newTarget.position) return;
  
  // Calculate new direction and return success
  const dx = newTarget.position.x - this.position.x;
  const dy = newTarget.position.y - this.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance > 0) {
    this.velocity.x = (dx / distance) * this.spriteData.hitBackSpeed;
    this.velocity.y = (dy / distance) * this.spriteData.hitBackSpeed;
    return true;
  }
  return false;
}
```

---

## 🎯 Advanced Game Programming Concepts

### **Canvas API Management**: Graphics rendering system
```js
// Dynamic canvas creation for projectiles
this.canvas = document.createElement('canvas');
this.canvas.width = gameEnv.innerWidth;
this.canvas.height = gameEnv.innerHeight;
this.canvas.style.position = 'absolute';
this.canvas.id = `fireball-canvas-${Date.now()}`;
this.ctx = this.canvas.getContext('2d');
```

### **Particle Systems**: Visual effects
```js
// Fireball trail and particle effects
updateParticles() {
  if (this.particles.length < this.maxParticles) {
    this.particles.push({
      x: this.position.x + (Math.random() - 0.5) * 10,
      y: this.position.y + (Math.random() - 0.5) * 10,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 1.0,
      decay: 0.05 + Math.random() * 0.05
    });
  }
}
```

### **AI Behavior Systems**: Enemy intelligence
```js
updateGhastBehavior: function() {
  // Target tracking
  const dx = player.position.x - this.position.x;
  const dy = player.position.y - this.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // State-based behavior
  if (this.spriteData.fireballCooldown <= 0 && distance < 600) {
    this.shootFireball(player);
    this.direction = 'shooting';
  } else {
    this.direction = 'idle';
  }
}
```

---

## ✅ Coding Practices Applied

- **SRP (Single Responsibility Principle)**: Each function handles one specific task
```js
// Separate functions for different responsibilities
function handleVictory() { /* Only handles victory logic */ }
function showVictoryScreen() { /* Only displays victory screen */ }
function clearGameObjects() { /* Only cleans up objects */ }
```

- **Object Literal**: Game configuration objects
```js
const sprite_data_lava = {
  id: 'Lava-Pool',
  damage: 15,
  hitbox: { widthPercentage: 0.9, heightPercentage: 0.5 }
};
```

- **Object Instance**: Dynamic game entity creation
```js
let ghast = new Enemy("Ghast", 150);
let fireball = new GhastFireball(x, y, target, gameEnv);
```

- **FSMs (Finite State Machines)**: Game and animation states
```js
// Animation state management
if (attacking) {
  this.direction = 'shooting';
} else {
  this.direction = 'idle';
}

// Game state transitions
if (fireballHitCount >= 2) {
  gameState = 'victory';
  handleVictory();
}
```

- **Event-Driven Programming**: Collision detection and user interaction
```js
// Collision-based interactions
if (distance < collisionDistance) {
  this.explode();
  this.damagePlayer();
}
```

---

## 🎨 Visual Programming Techniques

### **Dynamic Styling**: Runtime CSS manipulation
```js
victoryDiv.style.cssText = `
  position: fixed !important; 
  background-color: rgba(0, 50, 0, 0.95) !important; 
  z-index: 99999 !important;
  color: #00FF00 !important;
`;
```

### **Canvas Graphics**: Custom drawing and effects
```js
drawFireball(ctx) {
  // Gradient effects
  const gradient = ctx.createRadialGradient(
    this.position.x, this.position.y, 0,
    this.position.x, this.position.y, drawRadius + 10
  );
  gradient.addColorStop(0, 'rgba(255, 255, 100, 0.8)');
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0.1)');
  
  ctx.fillStyle = gradient;
  ctx.fill();
}
```

---

## 🚀 Game Features Implemented

### **Combat System**
- Player attack mechanics with cooldowns
- Projectile physics and homing behavior
- Hit detection and damage calculation
- Fireball reflection mechanic

### **AI Enemies**
- Ghast with shooting behavior
- Target tracking and distance calculation
- Health system and destruction logic
- Animation state management

### **Visual Effects**
- Particle systems for fireballs
- Explosion animations
- Trail effects and gradients
- Dynamic UI screens

### **Game Management**
- Victory and game over conditions
- Object lifecycle management
- Canvas and resource cleanup
- State persistence

---

## 🏁 Final Thoughts

This project not only helped me apply technical skills but also encouraged creativity, problem-solving, and system design thinking. I learned to manage complex game state, implement physics systems, create engaging visual effects, and handle user interaction. The combination of object-oriented programming, graphics programming, and game logic has given me a strong foundation for future development projects.

**Key Achievements:**
- Built a fully functional game with multiple systems
- Implemented advanced graphics and particle effects
- Created intelligent enemy AI behavior
- Developed robust collision detection and physics
- Designed engaging gameplay mechanics

I now have confidence in tackling complex programming challenges and look forward to building even more sophisticated games and applications.
