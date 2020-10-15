const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, blobBodyPosition,stoneBodyPosition,frameAmount,world, backgroundImg, tower, stone, towerImg, pole, canonImg, sling, king, kingImg, blobImg;

var blob, spawnAmount;
var blobs = [];
var towerHP = 100;
var score = 0;
var gameState = "play";
var gameover, gameImg;
function preload(){
  towerImg = loadImage("sprites/Castle.png");
  canonImg = loadImage("sprites/Canon.png");
  kingImg = loadImage("sprites/king.png");
  blobImg = loadImage("sprites/blob.png");
  gameImg = loadImage("sprites/gameover.png");
}
function setup() {
  
  createCanvas(1400,670);
 engine = Engine.create();
 world = engine.world;
  ground  = new Ground(700, 655, 1400, 55);
 

  stone = new Stone(1170,50,40);

  sling = new SlingShot(stone.body, {x:1170,y:40});

  frameAmount = 90;

  gameover = createSprite(700,335);
  gameover.addImage("gameover", gameImg);

  spawnAmount = 100;

  king = createSprite(1200, 90, 10, 10);
  king.addImage("king", kingImg);
  king.scale = 0.1;

  blob = new Blob(50,600, 40,40);

  //tower = new Tower(1200, 390, 600, 620);
  

 
   
  

}

function draw() {

  Engine.update(engine);
  background("gray");
  textSize(20);
  fill("blue");
  text(mouseX+":"+mouseY,20,20);
  text("Tower Health: "+towerHP,400, 30);
  ground.display();
 
  stone.display();
  sling.display();
  if(gameState==="play"){
    gameover.visible = false;
  if(frameCount%frameAmount===0){
    blobs.push(new Blob(100,650));
  }
  for(var j = 0; j<blobs.length;j++){
    blobs[j].display();
    
    if(blobs[j].body.position.x>1100){
      if(frameCount%7===0){
      towerHP = towerHP-1;
      }
    }
    if(blobs[j].score%10===0&&towerHP<50){
      towerHP++;
    }
    

  
  }
    
  }
  fill("blue");
 
  text("SCORE:" +score,700, 40);
  if(towerHP<0){
    gameState="end";
  }
  if(gameState==="end"){
    gameover.visible = true;
  }
  
 
 


 


 
  //tower.display();
  
  push();
  image(towerImg, 900, 90);
  pop();
  //detectColision(stone,blob);
  drawSprites();
  
  /*for(var i = 0; i<spawnAmount; i++){
    blobs[i].display();
    blobs[i].updatePos();
    blobs[i].update();
  }
  */

}
function mouseDragged(){
    
  Matter.Body.setPosition(stone.body, {x: mouseX , y: mouseY});

}


function mouseReleased(){
sling.fly();

}
function keyPressed(){
  if(keyCode === 32){
   
  }
}
function BlobSpawn(){
  if(frameCount%120===0){
    /*var blobS = createSprite(50, 600, 10,10);
    blobS.addImage("blob", blobImg);
    blobS.velocityX = 3;
    blobS.scale = 0.2;*/
    blob.display();
  }
}
/*function detectColision(lstone,lblob){
  blobBodyPosition=lblob.body.position
	stoneBodyPosition=lstone.body.position

	
}*/

  

