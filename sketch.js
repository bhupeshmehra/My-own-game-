var END = 0;
var PLAY = 1;
var gameState = PLAY;
var bird,birdImg
var path,pathImg
var Pipe1Group,Pipe1Img
var Pipe2Group,Pipe2Img
var invisibleGround

var gameOver,gameOverImg,Restart,RestartImg
var score=0;
var hit;




function preload(){
  birdImg = loadAnimation("yellowbird1.png","yellowbird2.png","yellowbird3.png")
  pathImg = loadImage("base.png")
  Pipe1Img = loadImage("1.png")
  Pipe2Img = loadImage("2.png")
  gameOverImg = loadImage("gameover.png")
  
  hit  =loadSound("hit.mp3")
  
  RestartImg = loadImage("restart.png")
  
}


function setup(){
  createCanvas(550 ,windowHeight)

  


gameOver = createSprite(280,350,50,50)
gameOver.addImage("gameover",gameOverImg)
gameOver.scale  = 1.3
gameOver.visible = false


Restart = createSprite(280,390,50,50)
Restart.addImage("restart",RestartImg)
Restart.scale  = 0.5
Restart.visible = false


bird = createSprite(90,200,20,20)
    bird.scale = 1.5
    bird.addAnimation("birdRun",birdImg)
  


Pipe1Group = new Group();
Pipe2Group = new Group();

invisibleGround = createSprite(60,649,600,20)


path = createSprite(200,722,800,20)
path.addImage("base",pathImg)
path.scale = 2
path.velocityX = -5

invisibleGround.visible = false;


score = 0


}


function draw(){
  background("skyblue");
  drawSprites(); 

  textSize(20);
  fill("black")
  text("Score:"+ score,450,50);

  textSize(20);
  fill("black")
  text("Press space to jump ",100,50);
  
  

  if(gameState === PLAY){




   
  


    score = score + Math.round(getFrameRate()/60);
    path.velocityX = -(6 + 3*score/100);


    if(path.x < 0){
      path.x = path.width/4;
    
    }

   
   
    spawnPipes();
   

if(keyDown("SPACE"))  {
    bird.velocityY = -10;
    text.visible = false;
    
    
     
  }


if(bird.isTouching(invisibleGround)){
  gameState = END;
  gameOver.visible = true;
  Restart.visible = true;
  hit.play()
}


bird.velocityY = bird.velocityY + 2



  bird.collide(invisibleGround)
  

if(Pipe1Group.isTouching(bird)){ 
  gameOver.visible = true;
    Restart.visible = true;

  hit.play();
  gameState = END
}


if(Pipe2Group.isTouching(bird)){
  gameOver.visible = true;
    Restart.visible = true;

  hit.play();
  gameState = END
}


Pipe1Group.setlifetime = -1
Pipe2Group.setlifetime = -1

  }
  
    else if(gameState === END){
   


   bird.velocityY = 0;
    
    
    Pipe1Group.setVelocityXEach(0);
    Pipe2Group.setVelocityXEach(0);
 
  path.velocityX = 0;
 
   

  
 if( mousePressedOver(Restart)) {      
  
  
   
  gameState = PLAY;
 
  gameOver.visible = false;
  Restart.visible = false;  

  Pipe1Group.destroyEach();
  Pipe2Group.destroyEach();
    score = 0

    bird.y = 200
    
    
  }
}
  
}








 






function spawnPipes(){




  if(World.frameCount % 50  === 0){
  

   var Pipe1 = createSprite(450,160,20,20)
   Pipe1.y = Math.round(random(50,120));
   Pipe1.addImage(Pipe1Img)
   Pipe1.scale = 1.2
   Pipe1.velocityX = -5 
   Pipe1.lifetime = 300
   Pipe1Group.add(Pipe1)




   var Pipe2 = createSprite(450,600,20,20)
    //Pipe2.y = Math.round(random(10,700  ));
   Pipe2.addImage(Pipe2Img)
   Pipe2.scale = 1.2
   Pipe2.velocityX = -5
   Pipe2Group.add(Pipe2)

  Pipe2.depth = path.depth
  path.depth = path.depth+1


  }
  }
 
  

  
  

  


   
        
  

  


