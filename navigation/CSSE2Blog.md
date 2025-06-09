---
layout: page
title: CSSE2 Blog
permalink: /CSSE2blog/
---

# Final Project Reflection: What I Learned in JavaScript and Computer Science

Through building a **Minecraft-style Nether dimension game**, I explored key **Computer Science**, **JavaScript**, and **Object-Oriented Programming** concepts. Below is a summary of the terms I learned and how I applied them in my project.
<img width="467" alt="Screenshot 2025-06-09 at 11 19 34 AM" src="https://github.com/user-attachments/assets/f068a766-b91b-4f3d-9800-9332ee72af57" />
<img width="1418" alt="Screenshot 2025-06-09 at 1 46 45 PM" src="https://github.com/user-attachments/assets/133accc2-befd-40e3-90fb-62d43717a5ed" />
<img width="1357" alt="Screenshot 2025-06-09 at 1 47 12 PM" src="https://github.com/user-attachments/assets/b8ce399c-df89-4c04-8af7-6a8b36c3a699" />
## Marketed our game to multiple parents and other computer science students using tools such as voice, body language, and thouroughly explaining the game.
---

## Software Engineering Practices

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

## Software Development Lifecycle Practices

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

## Retrospective Engineering Practices

- **Presentation**: Sharing and explaining the project to an audience.
- **Live Reviews**: Getting real-time feedback while showing your work.
- **Demos**: Showing off working features like the victory screen and enemy AI.
- **Code Reviews**: Letting others examine your code for suggestions.
- **Revising Plans**: Adjusting your project based on feedback or progress.

---

## Key Coding Concepts

### Data Types

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

**Enhanced Examples from My Code:**
```js
// Complex nested object structure for game management
this.classes = [
  { class: GameEnvBackground, data: image_data_nether },
  { class: Player, data: sprite_data_steve, 
    postCreate: (playerInstance) => {
      // Function as data type
      sprite_data_steve.parent = playerInstance;
    }
  }
];

// Array of particles for visual effects
this.particles = [];
this.maxParticles = 6;

// Boolean state management
this.victoryTriggered = false;
this.exploding = false;
this.active = true;
```

---

### Operators

- **String Operations**: Building dynamic CSS and HTML content
```js
victoryDiv.innerHTML = `
  <div>VICTORY!</div>
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

**Enhanced Examples from My Code:**
```js
// Complex mathematical operations for homing projectiles
const targetAngle = Math.atan2(dy, dx);
const currentAngle = Math.atan2(this.velocity.y, this.velocity.x);
let angleDiff = targetAngle - currentAngle;
while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

// Template literals for dynamic canvas IDs
this.canvas.id = `fireball-canvas-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Boolean logic for game state management
if (!this.active && !this.exploding) {
  return;
}
```

---

### Control Structures

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

**Enhanced Examples from My Code:**
```js
// Complex nested conditions with multiple checks
const initializeGhast = (attempt = 1, maxAttempts = 15) => {
  const size = forceSetSize();
  
  const hasPosition = npcInstance.position && 
                     !isNaN(npcInstance.position.x) && 
                     !isNaN(npcInstance.position.y);
  
  if (!hasPosition) {
    if (attempt < maxAttempts) {
      setTimeout(() => initializeGhast(attempt + 1, maxAttempts), 50);
      return;
    } else {
      npcInstance.position = { ...sprite_data_ghast.INIT_POSITION };
    }
  }
};

// For-loop with filtering and complex conditions
for (let fireball of fireballs) {
  if (!fireball.position) continue;
  
  const dx = fireball.position.x - playerPos.x;
  const dy = fireball.position.y - playerPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < 80) {
    // Hit detected - reverse fireball
    break;
  }
}
```

---

### Input/Output

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

**Enhanced Examples from My Code:**
```js
// Advanced DOM manipulation with validation
if (gameEnv && gameEnv.gameContainer) {
  gameEnv.gameContainer.appendChild(this.canvas);
} else {
  document.getElementById('gameContainer')?.appendChild(this.canvas);
}

// Event listener management with cleanup
playerInstance.handleKeyDown = function(event) {
  if (originalHandleKeyDown) {
    originalHandleKeyDown(event);
  }
  
  if (event.code === 'Space' && this.spriteData && this.spriteData.handleAttack) {
    event.preventDefault();
    console.log('Space key pressed - calling handleAttack');
    this.spriteData.handleAttack.call(this.spriteData);
  }
};

// Complex input validation with multiple checks
if (isNaN(this.position.x) || isNaN(this.position.y)) {
  console.error(`Invalid GhastFireball position: x=${this.position.x}, y=${this.position.y}`);
  this.explode();
  return;
}
```

---

## Classes and Object-Oriented Programming

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

**Enhanced Examples from My Code:**
```js
// Complex class with multiple responsibilities
class GameLevelNether {
  constructor(gameEnv) {
    this.gameEnv = gameEnv;
    this.fireballHitCount = 0; // Instance variable
    this.victoryTriggered = false;
    
    // Method binding and context management
    const gameLevel = this;
    
    // Complex object composition
    this.classes = [
      { class: GameEnvBackground, data: image_data_nether },
      { class: Player, data: sprite_data_steve, 
        postCreate: (playerInstance) => {
          // Callback function as parameter
          sprite_data_steve.parent = playerInstance;
        }
      }
    ];
  }
  
  // Method with complex logic and return values
  cleanupPreviousLevel(gameEnv) {
    const essentialElements = this.preserveEssentialElements();
    this.clearGameObjects(gameEnv);
    this.removePreviousUI(essentialElements);
    return essentialElements; // Return processed data
  }
}

// Method chaining and fluid interface
npcInstance.shootFireball = function(target) {
  const fireball = new GhastFireball(
    finalMouthX,
    finalMouthY,
    target,
    this.gameEnv,
    3,
    0.06
  );
  
  if (this.gameEnv && this.gameEnv.gameObjects) {
    this.gameEnv.gameObjects.push(fireball);
  }
};
```

---

## Advanced Game Programming Concepts

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

**Enhanced Examples from My Code:**
```js
// Advanced canvas rendering with gradients and effects
drawFireball(ctx) {
  // Pulsing effect while moving
  const time = Date.now();
  const pulse = Math.sin(time / 80) * 3;
  const drawRadius = this.baseRadius + pulse;

  // Outer glow with gradient
  const gradient = ctx.createRadialGradient(
    this.position.x, this.position.y, 0,
    this.position.x, this.position.y, drawRadius + 10
  );
  gradient.addColorStop(0, 'rgba(255, 255, 100, 0.8)');
  gradient.addColorStop(0.4, 'rgba(255, 69, 0, 0.6)');
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0.1)');

  ctx.fillStyle = gradient;
  ctx.fill();
}

// Complex particle system with physics
updateParticles() {
  // Add new particles with randomized properties
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
  
  // Update existing particles with physics
  this.particles = this.particles.filter(particle => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.life -= particle.decay;
    return particle.life > 0;
  });
}
```

---

## Coding Practices Applied

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

**Enhanced Examples from My Code:**
```js
// SRP - Specialized cleanup method
preserveEssentialElements() {
  const essentialSelectors = [
    'canvas',
    '#gameContainer',
    '[data-game-env]',
    '.game-engine'
  ];
  
  const essential = [];
  essentialSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => essential.push(el));
  });
  
  return essential;
}

// Complex object literal with nested functions
const sprite_data_steve = {
  id: 'Steve',
  health: 100,
  canHitFireballs: true,
  gameLevel: gameLevel, // Reference to parent object
  
  // Method as property
  handleAttack: function() {
    if (this.attackCooldown <= 0) {
      this.isAttacking = true;
      this.attackCooldown = 20;
      this.checkFireballHit.call(this);
    }
  },
  
  // Complex method with multiple responsibilities (could be refactored)
  checkFireballHit: function() {
    // Filter and find objects
    const fireballs = this.gameEnv.gameObjects.filter(obj => 
      obj instanceof GhastFireball && 
      obj.spriteData && 
      obj.spriteData.canBeHitBack
    );
    
    // Process each fireball
    for (let fireball of fireballs) {
      // Collision detection logic
      if (distance < 80) {
        fireball.reverseDirection(ghasts[0]);
        this.gameLevel.fireballHitCount++;
        break;
      }
    }
  }
};

// State machine implementation
updateExplosion() {
  this.impactFrames++;
  if (this.impactFrames > this.maxImpactFrames) {
    this.markForRemoval(); // State: cleanup
    return;
  }
  
  // State: active explosion
  if (this.impactFrames < 15) {
    // Add explosion particles
  }
  
  this.updateParticles();
  this.draw();
}
```

---

## Visual Programming Techniques

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

**Enhanced Examples from My Code:**
```js
// Complex CSS generation with template literals
showVictoryScreen() {
  const victoryDiv = document.createElement('div');
  victoryDiv.style.cssText = `
    position: fixed !important; 
    top: 0 !important; 
    left: 0 !important; 
    width: 100% !important; 
    height: 100% !important;
    background-color: rgba(0, 50, 0, 0.95) !important; 
    display: flex !important; 
    flex-direction: column !important;
    justify-content: center !important; 
    align-items: center !important; 
    z-index: 99999 !important;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
  `;
  
  // Dynamic content with game state
  victoryDiv.innerHTML = `
    <div>VICTORY!</div>
    <div style="font-size: 32px;">You defeated the Ghast!</div>
    <div>Fireballs Hit Back: ${this.fireballHitCount}/2</div>
  `;
}

// Advanced canvas drawing with multiple layers
draw() {
  // Clear the entire canvas for this fireball
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.ctx.save();
  this.ctx.globalCompositeOperation = 'source-over';

  if (this.exploding) {
    this.drawExplosion(this.ctx);
  } else {
    this.drawTrail(this.ctx);      // Layer 1: Trail
    this.drawParticles(this.ctx);  // Layer 2: Particles
    this.drawFireball(this.ctx);   // Layer 3: Main fireball
  }

  this.ctx.restore();
}
```

---

## Game Features Implemented

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

**Enhanced Examples from My Code:**
```js
// Advanced combat system with state management
checkFireballHit: function() {
  const fireballs = this.gameEnv.gameObjects.filter(obj => 
    obj instanceof GhastFireball && 
    obj.spriteData && 
    obj.spriteData.canBeHitBack &&
    obj.spriteData.damagePlayer === true
  );
  
  for (let fireball of fireballs) {
    if (distance < 80) {
      fireball.reverseDirection(ghasts[0]);
      this.gameLevel.fireballHitCount++;
      
      if (this.gameLevel.fireballHitCount >= 2) {
        this.gameLevel.handleVictory();
      }
      break;
    }
  }
},

// Comprehensive cleanup system
cleanupPreviousLevel(gameEnv) {
  const essentialElements = this.preserveEssentialElements();
  this.clearGameObjects(gameEnv);
  this.removePreviousUI(essentialElements);
  this.clearIntervals();
  this.resetGlobalStates();
  this.cleanupEventListeners();
}
```

---

## Final Thoughts

This project not only helped me apply technical skills but also encouraged creativity, problem-solving, and system design thinking. I learned to manage complex game state, implement physics systems, create engaging visual effects, and handle user interaction. The combination of object-oriented programming, graphics programming, and game logic has given me a strong foundation for future development projects.

**Key Achievements:**
- Built a fully functional game with multiple systems
- Implemented advanced graphics and particle effects
- Created intelligent enemy AI behavior
- Developed robust collision detection and physics
- Designed engaging gameplay mechanics
- Applied advanced programming patterns like SRP and state machines
- Managed complex object lifecycles and memory cleanup
- Created dynamic user interfaces with real-time updates

**Advanced Programming Techniques Mastered:**
- Canvas API manipulation and custom rendering
- Event-driven architecture with cleanup management
- Complex mathematical calculations for game physics
- Dynamic object creation and destruction
- State management across multiple game systems
- Error handling and validation throughout the codebase

I now have confidence in tackling complex programming challenges and look forward to building even more sophisticated games and applications.
