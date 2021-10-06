const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, blobBodyPosition,stoneBodyPosition,frameAmount,world, backgroundImg, tower, stone, towerImg, pole, canonImg, sling, king, kingImg, blobImg;

var blob, spawnAmount;
var blobs = [];
var towerHP = 100;
var score = 0;
var gameState = "serve";
var gameover, gameImg, restart, resImg, title, titleImg, restartB, resBImg, story, storyImg;
function preload(){
  towerImg = loadImage("sprites/Castle.png");
  canonImg = loadImage("sprites/Canon.png");
  kingImg = loadImage("sprites/king.png");
  blobImg = loadImage("sprites/blob.png");
  gameImg = loadImage("sprites/gameover.png");
  resImg = loadImage("sprites/restart.png");
  titleImg = loadImage("sprites/Drawing.png");
  resBImg = loadImage("sprites/restartB.png");
  storyImg = loadImage("sprites/Story.png");
}
function setup() {
  
  createCanvas(1400,670);
 engine = Engine.create();
 world = engine.world;
  ground  = new Ground(700, 620, 1400, 100);
 

  stone = new Stone(1170,50,40);

  sling = new SlingShot(stone.body, {x:1170,y:40});

  frameAmount = 90;

  gameover = createSprite(700,335);
  gameover.addImage("gameover", gameImg);

  restart = createSprite(700,520);
  restart.addImage("restart", resImg);

  title = createSprite(700,180);
  title.addImage("name", titleImg);
  title.scale = 0.5;

  restartB = createSprite(300, 480);
  restartB.addImage("restartB", resBImg);

  story = createSprite(700, 390);
  story.addImage("story", storyImg);
  story.scale = 0.7;

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
  if(gameState==="serve"){
    title.visible = true;
    gameover.visible = false;
    restart.visible = true;
    restartB.visible = false;
    story.visible = true;
  }
  if(gameState==="play"){
    gameover.visible = false;
    restart.visible = false;
    title.visible = false;
    restartB.visible = false;
    story.visible = false;
  if(frameCount%frameAmount===0){
    blobs.push(new Blob(100,540));
  }
  for(var j = 0; j<blobs.length;j++){
    blobs[j].display();
 
    
    if(blobs[j].body.position.x>1100){
      if(frameCount%12===0){
      towerHP = towerHP-1;
      blobs[j].body.position.x --;
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
  if(gameState==="end" || mousePressedOver(restartB)){
    gameover.visible = true;
    restartB.visible = true;
  }
  if(gameState==="serve" && keyDown("space")){
    gameState="play";
  }
  if(gameState==="end" && keyDown("space")){
    restartGame();
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
    if(gameState==="play"){
  Matter.Body.setPosition(stone.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
  if(gameState==="play"){
sling.fly();
  }
}
function keyPressed(){
  if(keyCode === 32){
    sling.attach(stone.body);
  }
}

/*function detectColision(lstone,lblob){
  blobBodyPosition=lblob.body.position
	stoneBodyPosition=lstone.body.position

	
}*/
function restartGame(){
  towerHP = 100;
  gameState="serve";
  score=0;
  blobs = [];
}

  

