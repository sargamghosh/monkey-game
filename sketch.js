
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survival;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  survival = 0;
  
}


function draw() {
  background("white");
  
  if(ground.x<0) {
    ground.x = ground.width/2;
  }
  if(keyDown("space")) {
    monkey.velocityY = -12; 
  }
  monkey.velocityY = monkey.velocityY+0.8;
    
  monkey.collide(ground);
  
  if(obstacleGroup.isTouching(monkey)) {
    monkey.velocityY = 0;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
  }
  
  spawnFood();
  spawnObstacles();
  
  
  drawSprites();
 text("survival time:"+survival,100,50);
  survival = Math.ceil(frameCount/frameRate());
}

function spawnFood() {
  if(World.frameCount%80===0) {
    banana = createSprite(800,180,10,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
    banana.lifetime = 300;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
 if(World.frameCount % 300 === 0) {
   obstacle = createSprite(800,340,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.15;
   obstacle.velocityX = -3;
   obstacle.lifetime = 300;
   
   obstacleGroup.add(obstacle);
 } 
}


