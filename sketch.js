var ground,groundImg,invisibleGround;
var mario,marioImg;
var pipes,pipeImage;
var  cloud,cloudImage;
var enemy, enemyImage,enemy_deadIamge;
var cloudsGroup,enimiesGroup,pipesGroup;
var coin,coinImage,coinsGroup;
var bullet, bulletImage, bulletGroup;
var gameOver,gameOverImage, restart,restartImage,mario_deadImage, mario_headImage,textImage;
var score=0;
var count=0;
var coinsCount=0;
var PLAY=1;
var END=0;
var gameState=PLAY;

// gamestate play and end 
function preload(){
  groundImg=loadImage("Images/ground.png");
  marioImg=loadAnimation("Images/mario1.png","Images/mario2.png");
  pipeImage=loadImage("Images/pipes.png");
  cloudImage=loadImage("Images/cloud.png");
  enemyImage=loadAnimation("Images/enemy1.png","Images/enemy2.png");
  coinImage=loadImage("Images/coin.png");
  bulletImage=loadImage("Images/bullet.png");
  gameOverImage=loadImage("Images/gameOver.png");
  restartImage=loadImage("Images/restart.png");
  mario_deadImage=loadAnimation("Images/mario_dead.png");
  mario_headImage=loadImage("Images/mario-head.png");
  textImage=loadImage("Images/text.png");
  enemy_deadIamge=loadImage("Images/enemy1.png");
}

function setup() {
  createCanvas(1200,400);
  ground=createSprite(600, 380, width, 50);
  ground.addImage("ground",groundImg);


  mario=createSprite(100,300,20,20);
  mario.addAnimation("mario",marioImg);
  mario.addAnimation("dead",mario_deadImage);
  mario.addAnimation("head",mario_headImage);
  mario.scale=0.3;

  invisibleGround=createSprite(600,350,width,10);
  invisibleGround.visible=false;

  gameOver=createSprite(600,200);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale=0.5;

  restart=createSprite(900,60);
  restart.addImage("restart",restartImage);
  restart.scale=0.3;

   cloudsGroup=new Group();
   enimiesGroup=new Group();
   pipesGroup=new Group();
   coinsGroup=new Group(); 
   bulletGroup=new Group();
  
}

function draw() {
  background("skyblue");  
  drawSprites();
  fill("black");
  textSize(30);
  textFont("monospace");
  text("Score :"+ score,800,30);
  text("Count :"+ count,80,30);
  text("coinsCount: "+coinsCount,400,30);

  score=score+5;
  count= count+1;
   if(gameState===PLAY){

    ground.velocityX=-10;

    if(ground.x<0){
      ground.x=ground.width/2;
      }
    

      if(keyWentDown("space")){
        bullet=createSprite(mario.x,mario.y,20,20);
        bullet.addImage("bullet",bulletImage);
        bullet.velocityX=5;
        bulletGroup.add(bullet);
      }
    
      if(keyDown(UP_ARROW)&&mario.y>304){
        mario.velocityY=-10;
      }
      console.log(mario.y);
      mario.velocityY=mario.velocityY+0.8;
                          
        coins();
        spawnEnimies();
        spawnClouds();
        spawnPipes();

  
          if(pipesGroup.isTouching(mario)){
            score= score-1;
          // count= count-1;
          gameState=END;
        }

        if(enimiesGroup.isTouching(mario)){
        score= score-1;
        //count= count-1;
        gameState=END;
        }

        if(bulletGroup.isTouching(enimiesGroup)){
        enimiesGroup.destroyEach();
        bulletGroup.destroyEach();
        }

        if(coinsGroup.isTouching(mario)){
        coinsGroup.destroyEach();
        coinsCount= conisCount+1;
        }

        gameOver.visible= false;
        restart.visible=false;


   }
   else if ( gameState===END){
    ground.velocityX=0;
    mario.velocityY=0;
    cloudsGroup.setVelocityXEach(0);
    pipesGroup.setVelocityXEach(0);
    enimiesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    pipesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    enimiesGroup.setLifetimeEach(-1);

    gameOver.visible= true;
    restart.visible= true;
    mario.changeAnimation("dead",mario_deadImage);

    if(mousePressedOver(restart)){
      reset();
      
   }
   


   }
 
  /*if(gameState===END && score>0){
    reset();
  }

  if(score===0){
    gameState===END;
  }*/

  
  mario.collide(invisibleGround);
  
 
}

function reset(){
  gameState=PLAY;
  count=0;
  score=0;
  coinsCount=0;
  coinsGroup.destroyEach();
  pipesGroup.destroyEach();
  coinsGroup.destroyEach();
  cloudsGroup.destroyEach();
  enimiesGroup.destroyEach();
  
  mario.changeAnimation("mario",marioImg);
}

function spawnPipes(){

if(frameCount%90===0){
  pipes=createSprite(1200,300,80,80);
  pipes.addImage("pipe",pipeImage);
  pipes.scale=0.5;
  pipes.velocityX=-5;
  pipes.lifetime= 240;
  pipesGroup.add(pipes);
}
}

function spawnClouds() {
  if(frameCount%100===0){
    // Math, random and round  concept
    // 1 t0 10 pick any odd number randomly=  3 , 5 7,9
    // height is 400=y 1 t0 400 
    cloud = createSprite(1100,random(50,200),40,10);
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 2;
    cloud.velocityX=-3;
    cloud.lifetime= 370;
    cloudsGroup.add(cloud);
  }
}

function spawnEnimies(){
  if(frameCount%300===0){
  enemy = createSprite(1000,300,30,30);
  enemy.addAnimation("enemy",enemyImage);
  enemy.scale=-0.15;
  enemy.velocityX=-6;
  enemy.lifetime=167; 
  enimiesGroup.add(enemy);
  }
  

}

function coins(){
  if(frameCount%200==0){
    for(var i= 0; i<5 ;i=i+10){
      coin=createSprite(1200+i*20,200,10,10);
      coin.addImage("coin",coinImage);
      coin.velocityX=-4;
      coin.lifetime=300;
      coinsGroup.add(coin);
    }
    
    
  }
 
}