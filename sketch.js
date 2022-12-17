/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  lion_running =   loadAnimation("assets/lion1.png","assets/lion2.png","assets/lion3.png","assets/lion4.png",
  "assets/lion5.png","assets/lion6.png","assets/lion7.png",);
  lion_collided = loadAnimation("assets/angry lion.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");

}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  lion = createSprite(100,270,20,50);
  lion.addAnimation("running", kangaroo_running);
  lion.addAnimation("collided", kangaroo_collided);
  lion.scale = 0.37;
  lion.setCollider("circle",0,0,200)
  lion.debug = true;

  invisibleGround = createSprite(400,400,1600,10);
  invisibleGround.visible = false;
  
  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);

  // kangaroo.x=camera.positionX-270;
  // kangaroo.x=Camera.position.x-270;
   lion.x=camera.position.x-270;
  // kangaroo.x=Camera.Position.X-270;
   
  if (gameState===PLAY){

    jungle.velocityX=-3

    if(jungle.x<100)
    {
       jungle.x=400
    }
   console.log(kangaroo.y)
    if(keyDown("space")&& lion.y>270) {
      jumpSound.play();
      lion.velocityY = -16;
    }
  
    lion.velocityY = kangaroo.velocityY + 0.8
    spawnShrubs();
    spawnObstacles();

    lion.collide(invisibleGround);
    
    if(obstaclesGroup.isTouching(lion)){
      collidedSound.play();
      gameState = END;
    }
    if(shrubsGroup.isTouching(lion)){

      shrubsGroup.destroyEach();
    }
  }
  else if (gameState === END) {
    
    lion.velocityY = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);

    lion.changeAnimation("collided",kangaroo_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
  }


  //lionMovement()
  drawSprites();


}

function spawnShrubs() {

  if (frameCount % 150 === 0) {

    // var shrub = createSprite(camera.position+500,330,40,10);
   var shrub = createSprite(camera.position.x+500,330,40,10);
    // var shrub = createSprite(camera.positionX+500,330,40,10);
    // var shrub = createSprite(Camera.position.x+500,330,40,10);

    shrub.velocityX = -(6 + 3*score/100)
    shrub.scale = 0.6;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
              break;
      case 2: shrub.addImage(shrub2);
              break;
      case 3: shrub.addImage(shrub3);
              break;
      default: break;
    }
         
    shrub.scale = 0.05;
    shrub.lifetime = 400;
    
    shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
    shrubsGroup.add(shrub);
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {

    // var obstacle = createSprite(camera.Position.X+400,330,40,40);
    // var obstacle = createSprite(Camera.Position.x+400,330,40,40);
     var obstacle = createSprite(camera.position.x+400,330,40,40);
    // var obstacle = createSprite(camera.position.x.400,330,40,40);

    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.addImage(obstacle1);
    obstacle.velocityX = -(6 + 3*score/100)
    obstacle.scale = 0.15;   
 
    obstacle.lifetime = 400;
    obstaclesGroup.add(obstacle);
    
  }
}
/*function lionMovement(){
  if(keyIsDown(RIGHT_ARROW))  {
     lion.position.x+=20
}
}*/