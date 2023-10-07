// Frank Poth 08/13/2017
var images = [];
var ctx1, controller, loop, obs, cntr = 0, enemy;
//var objX = 250;
//var objY = 140;
var colLeft = false;
var colRight = false;
var colBottom = false;
var button = false;
var keyPressed = '';
var timer = 0;
var timer_left = 0;
var movement_state = 'idle_right';
var on_ground = false;
function Bullet(x1 , y1, speed, live) {
  this.x1 = x1;
  this.y1 = y1;
  this.speed = speed;
  this.live = live;
};
var boom = false;
var x_cor = 0;
var previousDirection = 'right';
var directionChanged = false; // Initialize the direction change flag
var previousPosition = 0;
var onPlatform = false;
var canvas = document.getElementById("game");

//////////////////////////////////////////////////////console.log(cntr);
// Get the 2D rendering ctx1
var ctx1 = canvas.getContext("2d");
var player = {

  height:32,
  jumping:true,
  width:32,
  x:484, // center of the canvas
  x_velocity:0,
  y:0,
  y_velocity:0

};

// Load the background image
//background.load();
//floor.load();
enemy = {

  height:32,
  jump:false,
  width:32,
  x:958, // center of the canvas
  x_vel:0,
  y:132,
  y_vel:0,
  live: true,

};



var obstacles;
var gameAbbyses = [];
obstacles = [];
function Obstacle(x,y,w,h)  {
  this. x = x;
  this. y = y;
  this. w = w;
  this. h = h;
};
function GameAbbys(x,y,w,h)  {
  this. x = x;
  this. y = y;
  this. w = w;
  this. h = h;
};
var bullets_right = [];
var bullet_right = {
  live: false,
};
var bullets_left = [];
var bullet_left = {
  live: false,  
};

// var obstacle = {
//   x: 500,
//   y: 132,
//   h: 32,
//   w: 32  
// }
////////////////////////////////////////////////////console.log(rectangles);
for (let i = 0; i < tempRectangles.length; i++){
  var obstacle = new Obstacle(tempRectangles[i].startX - right, tempRectangles[i].startY, rectangles[i].width, rectangles[i].height)
  
  obstacles.push(obstacle)
  //////////console.log(obstacles);
  
 }
//////////////////////////////////////////////////////console.log(obstacles);
for (let i = 0; i < tempAbbyses.length; i++){
  var gameAbbys = new GameAbbys(tempAbbyses[i].startX - right, tempAbbyses[i].startY, abbyses[i].width, abbyses[i].height)
  
  gameAbbyses.push(gameAbbys)
  //////////console.log(obstacles);
  
 }
controller = {

  left:false,
  right:false,
  jump:false,
  shoot:false,
  keyListener:function(event) {

    const keyState = event.type === "keydown";

  switch (event.keyCode) {
    case 38: // Spacebar
      controller.jump = keyState;
      break;
    case 37: // Left arrow key
      controller.left = keyState;
      break;
    case 39: // Right arrow key
      controller.right = keyState;
      break;
    case 83: // Control key
      controller.shoot = keyState;
      break;
  }

    //////////////////console.log(controller.left)

  }
};

var player_right = {
  x: 476, // Initial x-coordinate
  y: 132, // Initial y-coordinate
  width: 48, // Width of each frame in the player sprite sheet
  height: 48, // Height of each frame in the player sprite sheet
  image: new Image(), // Create a new image object
  frameIndex: 0, // Current frame index
  frameCount: 6, // Total number of frames in the sprite sheet
  speed: 0.15, // Speed of animation transition
  frameTime: 0, // Time accumulator for frame animation
  x_velocity:0,
  y_velocity:0,
  jumping: true,
  // Load the player sprite sheet image
  load: function (src) {
    this.image.src = src;
  },

  // Draw the player sprite on the canvas
  draw: function () {
    
    //ctx1.clearRect(0, 0, this.width, this.height);
    
    ctx1.drawImage(
      this.image,
      this.frameIndex * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  },

  // Update the animation frame of the player sprite
  updateFrame: function (deltaTime) {
    this.frameTime += deltaTime;
    if (this.frameTime >= this.speed) {
      this.frameIndex++;
      if (this.frameIndex >= this.frameCount) {
        this.frameIndex = 0;
      }
      this.frameTime = 0;
    }
  }
};

var player_left = {
  x: 476, // Initial x-coordinate
  y: 132, // Initial y-coordinate
  width: 48, // Width of each frame in the player sprite sheet
  height: 48, // Height of each frame in the player sprite sheet
  image: new Image(), // Create a new image object
  frameIndex: 0, // Current frame index
  frameCount: 6, // Total number of frames in the sprite sheet
  speed: 0.15, // Speed of animation transition
  frameTime: 0, // Time accumulator for frame animation
  x_velocity:0,
  y_velocity:0,
  jumping: true,

  // Load the player sprite sheet image
  load: function (src) {
    this.image.src = src;
  },

  // Draw the player sprite on the canvas
  draw: function () {
    
    //ctx1.clearRect(0, 0, this.width, this.height);
    
    ctx1.drawImage(
      this.image,
      this.frameIndex * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  },

  // Update the animation frame of the player sprite
  updateFrame: function (deltaTime) {
    this.frameTime += deltaTime;
    if (this.frameTime >= this.speed) {
      this.frameIndex++;
      if (this.frameIndex >= this.frameCount) {
        this.frameIndex = 0;
      }
      this.frameTime = 0;
    }
  }
};

var player_idle_right = {
  x: 476, // Initial x-coordinate
  y: 0, // Initial y-coordinate
  width: 48, // Width of each frame in the player sprite sheet
  height: 48, // Height of each frame in the player sprite sheet
  image: new Image(), // Create a new image object
  frameIndex: 0, // Current frame index
  frameCount: 6, // Total number of frames in the sprite sheet
  speed: 0.15, // Speed of animation transition
  frameTime: 0, // Time accumulator for frame animation
  x_velocity:0,
  y_velocity:0,
  jumping: true,
  // Load the player sprite sheet image
  load: function (src) {
    this.image.src = src;
  },

  // Draw the player sprite on the canvas
  draw: function () {
    
    //ctx1.clearRect(0, 0, this.width, this.height);
    
    ctx1.drawImage(
      this.image,
      this.frameIndex * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  },

  // Update the animation frame of the player sprite
  updateFrame: function (deltaTime) {
    this.frameTime += deltaTime;
    if (this.frameTime >= this.speed) {
      this.frameIndex++;
      if (this.frameIndex >= this.frameCount) {
        this.frameIndex = 0;
      }
      this.frameTime = 0;
    }
  }
};

var player_idle_left = {
  x: 476, // Initial x-coordinate
  y: 132, // Initial y-coordinate
  width: 48, // Width of each frame in the player sprite sheet
  height: 48, // Height of each frame in the player sprite sheet
  image: new Image(), // Create a new image object
  frameIndex: 0, // Current frame index
  frameCount: 6, // Total number of frames in the sprite sheet
  speed: 0.15, // Speed of animation transition
  frameTime: 0, // Time accumulator for frame animation
  x_velocity:0,
  y_velocity:0,
  jumping: true,

  // Load the player sprite sheet image
  load: function (src) {
    this.image.src = src;
  },

  // Draw the player sprite on the canvas
  draw: function () {
    
    //ctx1.clearRect(0, 0, this.width, this.height);
    
    ctx1.drawImage(
      this.image,
      this.frameIndex * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  },

  // Update the animation frame of the player sprite
  updateFrame: function (deltaTime) {
    this.frameTime += deltaTime;
    if (this.frameTime >= this.speed) {
      this.frameIndex++;
      if (this.frameIndex >= this.frameCount) {
        this.frameIndex = 0;
      }
      this.frameTime = 0;
    }
  }
};

background.load();
floor.load();
player_right.load('Gunner_Black_Run.png');
player_left.load('run_left.png');
player_idle_right.load('Gunner_Black_Idle.png');
player_idle_left.load('Gunner_Black_Idle_Left.png');
var previousTime = 0;
//////////////////////////////////////////////////console.log("game");
////////////////////////////////////////////////////console.log(obstacles);
//background.load();
//floor.load();
window.onload = function () {

loop = function(currentTime) {
  var deltaTime = (currentTime - previousTime) / 1000;
  previousTime = currentTime;

  ctx1.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  floor.draw();
  if (enemy.live) ctx1.rect(enemy.x, enemy.y, enemy.width, enemy.height);
  //ctx1.fillRect(player.x, player.y, player.width, player.height);
  //ctx1.rect(player.x, player.y, player.width, player.height);
  for (let i = 0; i < bullets_right.length; i++) {
    if (bullets_right[i].live)
    ctx1.arc(bullets_right[i].x1, bullets_right[i].y1, 5, 0, 2 * Math.PI);
    ctx1.closePath();
    
  }
  for (let i = 0; i < bullets_left.length; i++) {
    if (bullets_left[i].live)
    ctx1.arc(bullets_left[i].x1, bullets_left[i].y1, 5, 0, 2 * Math.PI);
    ctx1.closePath();
    
  }
  
  // if (movement_state === 'right' && !player_idle_right.jumping) {
    
  //   player_right.updateFrame(deltaTime);
  //   player_right.draw();
  // }
  // if (movement_state === 'left' && !player_idle_left.jumping) {
  //   //player_left.y = player_idle_left.y
  //   player_left.updateFrame(deltaTime);
  //   player_left.draw();
  // }
  // if (movement_state === 'idle_right' || (movement_state === 'right' && player_idle_right.jumping)) {
  //   player_idle_right.draw();
  // }
  // if (movement_state === 'idle_left' || (movement_state === 'left' && player_idle_left.jumping)) {
  //   player_idle_left.draw();
  // }
  for (let i = 0; i < obstacles.length; i++) if (obstacles != undefined) {
    ctx1.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].h);
    ctx1.rect(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].h);
    //////////////////console.log(obstacles);
    }
  for (let i = 0; i < gameAbbyses.length; i++) if (gameAbbyses != undefined) {
    ctx1.fillRect(gameAbbyses[i].x, gameAbbyses[i].y, gameAbbyses[i].w, gameAbbyses[i].h);
    ctx1.rect(gameAbbyses[i].x, gameAbbyses[i].y, gameAbbyses[i].w, gameAbbyses[i].h);
    //////////////////console.log(obstacles);
    }
  if (cntr == 60) cntr = 0;
  //////////////////////////////////console.log(movement_state);
  if (controller.jump && player.jumping == false) {

    player.y_velocity -= 20;
    player.jumping = true;
    
  }

  if (controller.left && !colRight) {
    for (let i = 0; i < obstacles.length; i++){
    //player.x_velocity -= 0.5;
    //objX += 2;
    obstacles[i].x += 6;
    ////////console.log("left c");
    }
    for (let i = 0; i < gameAbbyses.length; i++){
    gameAbbyses[i].x += 6;
      ////////console.log("right c");
      
    }
    x_cor += 2;
    
    background.updateLeft();
    floor.updateLeft();
    colLeft = false;

  }

  else if (controller.right && !colLeft) {

    for (let i = 0; i < obstacles.length; i++){
    obstacles[i].x -= 6;
    ////////console.log("right c");
    
    }
    for (let i = 0; i < gameAbbyses.length; i++){
      gameAbbyses[i].x -= 6;
      ////////console.log("right c");
      
    }
    x_cor -= 2;
    
    background.updateRight();
    floor.updateRight();
    
    colRight = false;
  }
  if (controller.shoot) {
    
    if (movement_state === 'right') bullet_right = new Bullet(player_right.x + 32, player_right.y + 20, 5, false);
    if (movement_state === 'idle_right' || movement_state === 'right') bullet_right = new Bullet(player_idle_right.x + 32, player_idle_right.y + 20, 5, false);
    if ((movement_state === 'right' || movement_state === 'idle_right') && timer <= 0){
      bullet_right.live = true
      bullets_right.push(bullet_right);
      timer = 7;
    }
    if (movement_state === 'right' || movement_state === 'idle_right') timer--;
    if (movement_state === 'left') bullet_left = new Bullet(player_left.x + 32, player_left.y + 20, 5, false);
    if (movement_state === 'idle_left' || movement_state === 'left') bullet_left = new Bullet(player_idle_left.x + 32, player_idle_left.y + 20, 5, false);
    if ((movement_state === 'left' || movement_state === 'idle_left') && timer_left <= 0){
      bullet_left.live = true
      bullets_left.push(bullet_left);
      timer_left = 7;
      ////////////////////////console.log(bullet_left)
    }
    if (movement_state === 'left' || movement_state === 'idle_left')timer_left--;
    //////////////////////////////////////////console.log(bullets_right);
    //////////////////////////console.log(bullets_left);
    keyPressed = 'shoot';
    //console.log(bullets_right);
  }
  
  for (let i = 0; i < bullets_right.length; i++) {
    if (bullets_right[i].x1 > 1000)
    bullets_right[i].live = false;
  }
  for (let i = 0; i < bullets_right.length; i++) {
    if (bullets_right[i].live)
    
    
    bullets_right[i].x1 += 20;
   
    
  }
  for (let i = 0; i < bullets_left.length; i++) {
    if (bullets_left[i].x1 < 0)
    bullets_left[i].live = false;
  }
  for (let i = 0; i < bullets_left.length; i++) {
    if (bullets_left[i].live)
    
    
    bullets_left[i].x1 -= 20;
   
    
  }
  

  player.y_velocity += 1.5;// gravity
  player.x += player.x_velocity;
  player.y += player.y_velocity;
  player.x_velocity *= 0.9;// friction
  player.y_velocity *= 0.9;// friction
  if (movement_state === 'right') player_right.y = player.y;
  if (movement_state === 'left') player_left.y = player.y;
  if (movement_state === 'idle_right') player_idle_right.y = player.y;
  if (movement_state === 'idle_left') player_idle_left.y = player.y;
  // if player is falling below floor line
  if (player.y >= 180 - 16 - 32) {

    player.jumping = false;
    player.y = 180 - 16 - 32;
    player.y_velocity = 0;
    player_idle_right.y = player.y;
    player_idle_right.y_velocity = player.y_velocity;
    player_idle_left.y = player.y;
    player_idle_left.y_velocity = player.y_velocity;
    on_ground = true;
    if (movement_state === 'idle_right'){
      player_idle_right.updateFrame();
      player_idle_right.draw();
      player_idle_right.y = player.y;
      ////console.log(player_idle_right.y)
    }
    if (movement_state === 'idle_left'){
      player_idle_left.updateFrame();
      player_idle_left.draw();
      player_idle_left.y = player.y;
    }
  }
  if ((!player.jumping && movement_state === 'left')) {
    player_left.updateFrame(deltaTime);
    player_left.draw();
  }
  if ((!player.jumping && movement_state === 'right')) {
    player_right.updateFrame(deltaTime);
    player_right.draw();
  }
  if ((!player.jumping && movement_state === 'idle_left')) {
    //player_idle_left.updateFrame(deltaTime);
    player_idle_left.draw();
  }
  if ((!player.jumping && movement_state === 'idle_right')) {
    //player_idle_right.updateFrame(deltaTime);
    player_idle_right.draw();
  }
  if (player.jumping && (movement_state === 'idle_right' || movement_state === 'right')) {
    player_idle_right.y = player.y;
    player_idle_right.y_velocity = player.y_velocity;
    player_idle_right.updateFrame(deltaTime);
    player_idle_right.draw();
  }
  if (player.jumping && (movement_state === 'idle_left' || movement_state === 'left')) {
    player_idle_left.y = player.y;
    player_idle_left.y_velocity = player.y_velocity;
    player_idle_left.updateFrame(deltaTime);
    player_idle_left.draw();
  }
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].w > 0 && obstacles[i].h > 0 &&
        (player.x + 32) > obstacles[i].x + 3 && player.x < obstacles[i].x + obstacles[i].w - 3 &&
        (obstacles[i].y + obstacles[i].h) - (player.y + 32) < obstacles[i].h + 7 &&
        (obstacles[i].y + obstacles[i].h) - (player.y + 32) > obstacles[i].h - 7
    ) {
        player.jumping = false;
        player.y = obstacles[i].y - 32;
        player.y_velocity = 0;
        //colLeft = false;
        //colRight = false;
        on_ground = true;
        ////console.log("up");
        break;
    } else if (obstacles[i].w > 0 && obstacles[i].h < 0 &&
        (player.x + 32) > obstacles[i].x + 3 && player.x < obstacles[i].x + obstacles[i].w - 3 &&
        obstacles[i].y - (player.y + 32) < Math.abs(obstacles[i].h) + 7 &&
        obstacles[i].y - (player.y + 32) > Math.abs(obstacles[i].h) - 7

    )

    {
        player.jumping = false;
        player.y = obstacles[i].y - Math.abs(obstacles[i].h) - 32;
        player.y_velocity = 0;
        colLeft = false;
        colRight = false;
        ////console.log("up w+ h-");
        break;

    } else if (obstacles[i].w < 0 && obstacles[i].h > 0 &&
        (player.x + 32) > obstacles[i].x - Math.abs(obstacles[i].w) + 3 && player.x < obstacles[i].x - 3 &&
        (obstacles[i].y + obstacles[i].h) - (player.y + 32) < obstacles[i].h + 7 &&
        (obstacles[i].y + obstacles[i].h) - (player.y + 32) > obstacles[i].h - 7
    )

    {
        player.jumping = false;
        player.y = obstacles[i].y - 32;
        player.y_velocity = 0;
        colLeft = false;
        colRight = false;
        ////console.log("up");
        break;

    } else if (obstacles[i].w < 0 && obstacles[i].h < 0 &&
        (player.x + 32) > obstacles[i].x - Math.abs(obstacles[i].w) + 3 && player.x < obstacles[i].x - 3 &&
        obstacles[i].y - (player.y + 32) < Math.abs(obstacles[i].h) + 7 &&
        obstacles[i].y - (player.y + 32) > Math.abs(obstacles[i].h) - 7
    )

    {
        player.jumping = false;
        player.y = obstacles[i].y - Math.abs(obstacles[i].h) - 32;
        player.y_velocity = 0;
        colLeft = false;
        colRight = false;
        ////console.log("up");
        break;

    }
    else on_ground = false;
}
for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].w > 0 && obstacles[i].h < 0 &&
        player.y + 32 > obstacles[i].y - Math.abs(obstacles[i].h) && player.y < obstacles[i].y &&
        (((player.x + 32 > obstacles[i].x) && (obstacles[i].x + obstacles[i].w) - (player.x + 32) < obstacles[i].w) &&
            (obstacles[i].x + obstacles[i].w) - (player.x + 32) > 0)) {
        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////console.log("collision left -");
        colLeft = true;
        break;
    }
    //else colLeft = false;  
    else if (player.y != obstacles[i].y - 32 && obstacles[i].w > 0 && obstacles[i].h > 0 &&
        player.y + 32 > obstacles[i].y && player.y < obstacles[i].y + obstacles[i].h &&
        (((player.x + 32 > obstacles[i].x) && (obstacles[i].x + obstacles[i].w) - (player.x + 32) < obstacles[i].w) &&
            (obstacles[i].x + obstacles[i].w) - (player.x + 32) > 0)) {

        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////console.log("collision left");
        colLeft = true;
        break;
    } else if (obstacles[i].w < 0 && obstacles[i].h < 0 &&
        player.y + 32 > obstacles[i].y - Math.abs(obstacles[i].h) && player.y < obstacles[i].y &&
        (((player.x + 32 > obstacles[i].x - Math.abs(obstacles[i].w)) && (obstacles[i].x) - (player.x + 32) < Math.abs(obstacles[i].w)) &&
            (obstacles[i].x) - (player.x + 32) > 0)) {

        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////console.log("collision left");
        colLeft = true;
        break;
    } else if (obstacles[i].w < 0 && obstacles[i].h > 0 &&
        player.y + 32 > obstacles[i].y && player.y < obstacles[i].y + obstacles[i].h &&
        (((player.x + 32 > obstacles[i].x - Math.abs(obstacles[i].w)) && (obstacles[i].x) - (player.x + 32) < Math.abs(obstacles[i].w)) &&
            (obstacles[i].x) - (player.x + 32) > 0)) {

        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////console.log("collision left");
        colLeft = true;
        break;
    } else colLeft = false;

}
for (let i = 0; i < obstacles.length; i++) {
    if (player.y != obstacles[i].y - 32 && obstacles[i].w > 0 && obstacles[i].h > 0 &&
        player.y + 32 > obstacles[i].y && player.y < obstacles[i].y + obstacles[i].h &&
        (player.x + 32) - (obstacles[i].x + obstacles[i].w) < 32 && (player.x + 32) - (obstacles[i].x + obstacles[i].w) > 0 &&
        player.x < obstacles[i].x + obstacles[i].w) {

        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////console.log("collision right");
        colRight = true;
        break;
    } else if (obstacles[i].w > 0 && obstacles[i].h < 0 &&
        player.y + 32 > obstacles[i].y - Math.abs(obstacles[i].h) && player.y < obstacles[i].y &&
        (player.x + 32) - (obstacles[i].x + obstacles[i].w) < 32 && (player.x + 32) - (obstacles[i].x + obstacles[i].w) > 0 &&
        player.x < obstacles[i].x + obstacles[i].w) {

        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////console.log("collision right");
        colRight = true;
        break;

    } else if (obstacles[i].w < 0 && obstacles[i].h > 0 &&
        player.y + 32 > obstacles[i].y && player.y < obstacles[i].y + obstacles[i].h &&
        (player.x + 32) - (obstacles[i].x) < 32 && (player.x + 32) - (obstacles[i].x) > 0 &&
        player.x < obstacles[i].x) {

        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////console.log("collision right w- h+");
        colRight = true;
        break;

    } else if (obstacles[i].w < 0 && obstacles[i].h < 0 &&
        player.y + 32 > obstacles[i].y - Math.abs(obstacles[i].h) && player.y < obstacles[i].y &&
        (player.x + 32) - (obstacles[i].x) < 32 && (player.x + 32) - (obstacles[i].x) > 0 &&
        player.x < obstacles[i].x) {

        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////console.log("collision right w- h+");
        colRight = true;
        break;

    } else colRight = false;
}

for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].w > 0 && obstacles[i].h > 0 &&
        (player.x + 32) > obstacles[i].x + 3 && player.x < obstacles[i].x + obstacles[i].w - 3 &&
        (player.y + 32) - (obstacles[i].y + obstacles[i].h) < 32 && (player.y + 32) - (obstacles[i].y + obstacles[i].h) > 0
    ) {
        player.y_velocity = 0;
        player.y = obstacles[i].y + obstacles[i].h;
        //player.y = 132;
        //player.jumping = false;
        //player.jumping = false;

        ////////console.log("botttom")
        break;
    } else if (obstacles[i].w > 0 && obstacles[i].h < 0 &&
        (player.x + 32) > obstacles[i].x + 3 && player.x < obstacles[i].x + obstacles[i].w - 3 &&
        (player.y + 32) - (obstacles[i].y) < 32 && (player.y + 32) - (obstacles[i].y) > 0
    ) {
        player.y_velocity = 0;
        player.y = obstacles[i].y;
        //player.y = 132;
        //player.jumping = false;
        //player.jumping = false;

        //////console.log("botttom w+ h-")
        break;

    } else if (obstacles[i].w < 0 && obstacles[i].h < 0 &&
        (player.x + 32) > obstacles[i].x + 3 - Math.abs(obstacles[i].w) && player.x < obstacles[i].x - 3 &&
        (player.y + 32) - (obstacles[i].y) < 32 && (player.y + 32) - (obstacles[i].y) > 0
    ) {
        player.y_velocity = 0;
        player.y = obstacles[i].y;
        //player.y = 132;
        //player.jumping = false;
        //player.jumping = false;

        //////console.log("botttom w- h-")
        break;

    } else if (obstacles[i].w < 0 && obstacles[i].h > 0 &&
        (player.x + 32) > obstacles[i].x + 3 - Math.abs(obstacles[i].w) && player.x < obstacles[i].x - 3 &&
        (player.y + 32) - (obstacles[i].y + obstacles[i].h) < 32 && (player.y + 32) - (obstacles[i].y + obstacles[i].h) > 0

    ) {
        player.y_velocity = 0;
        player.y = obstacles[i].y + obstacles[i].h;
        //player.y = 132;
        //player.jumping = false;
        //player.jumping = false;

        //////console.log("botttom w- h+")
        break;

    }
}
  //ctx1.rect(player.x, player.y, player.width, player.height);
  
  // ctx1.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
  // ctx1.rect(obstacle.x, obstacle.y, obstacle.w, obstacles.h);
  ////////////////////////////////////////////////////console.log(obstacles);
  if (enemy.jump == false && enemy.live) {
    //console.log("jump");
    enemy.y_vel -= 20;
    enemy.jump = true;
    //button = false;
    }
    enemy.y_vel += 1.5;// gravity
    enemy.x_vel -= 0.5
    //enemy.x += enemy.x_vel;
    enemy.y += enemy.y_vel;
    //enemy.x_vel *= 0.9;// friction
    enemy.y_vel *= 0.9;// friction
  if (enemy.y > 180 - 16 - 32 && enemy.live) {
  
    enemy.jump = false;
    enemy.y = 180 - 16 - 32;
    enemy.y_vel = 0;
  
  }
  for (let i = 0; i < bullets_right.length; i++)
  if (bullets_right[i].x1 > enemy.x && bullets_right[i].x1 < enemy.x + 32 && bullets_right[i].y1 > enemy.y
     && bullets_right[i].y1 < enemy.y + 32){
     enemy.live = false;
     console.log("shoot");
     }
  ctx1.fill();
  ctx1.strokeStyle = "#202830";
  ctx1.lineWidth = 4;
  ctx1.beginPath();
  ctx1.moveTo(0, 164);
  ctx1.lineTo(320, 164);
  ctx1.stroke();
  // Get the current position of the player
  var currentPosition = x_cor; // Get the current position of the player

  // Check if the current position is greater or smaller than the previous position
  if (currentPosition < previousPosition && previousDirection !== 'right') {
    ////////////console.log('Player is moving right');
    previousDirection = 'right';
    movement_state = 'change from left';
    
  } else if (currentPosition > previousPosition && previousDirection !== 'left') {
    ////////////console.log('Player is moving left');
    previousDirection = 'left';
    movement_state = 'change from right';
  }
  else if (currentPosition < previousPosition) {
    ////////////console.log('Player is moving right');
    //previousDirection = 'right';
    movement_state = 'right';
    
  } else if (currentPosition > previousPosition) {
    ////////////console.log('Player is moving left');
    //previousDirection = 'left';
    movement_state = 'left';
  }
  else if (currentPosition === previousPosition && previousDirection === 'left')
  movement_state = 'idle_left';
  else if (currentPosition === previousPosition && previousDirection === 'right')
  movement_state = 'idle_right'
  // Update the previous position to the current position for the next frame
  previousPosition = currentPosition;
  ////////console.log(movement_state);
  window.requestAnimationFrame(loop);
  //console.log(player_idle_right.y);
  //////////////////////////////////////////////////////console.log("player" + player.y)
  //////////////////////////////////////////////////////console.log(obstacles[i].y + obstacles[i].h)
  
};
  window.addEventListener("keydown", controller.keyListener)
  window.addEventListener("keyup", controller.keyListener);
  window.requestAnimationFrame(loop);
}




