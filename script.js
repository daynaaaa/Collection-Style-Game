//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let backgroundImg, catcherImg, fallingObjectImg, catcherImg2;
let ms, startmsani, startmsobject;
/* PRELOAD LOADS FILES */
function preload(){
  backgroundImg = loadImage("assets/bg.jpg");
  catcherImg = loadImage("assets/cat.png");
  catcherImg2 = loadImage("assets/cat2.png");
  fallingObjectImg = loadImage("assets/chiken.png");
}

/* SETUP */
function setup() {
  createCanvas(400,400);
  //Resize images
  backgroundImg.resize(700,400);
  catcherImg.resize(200,0);
  catcherImg2.resize(100,0);

  fallingObjectImg.resize(30,0);
  //Create catcher 
  catcher = new Sprite(catcherImg,200,380,100,20, "k");
  catcher.color = color(95,158,160);
  startmsobject = 0;
  
  //Create falling object
  fallingObject = new Sprite(fallingObjectImg,100,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y = 2;
}

/* DRAW */
function draw() {
  background(224,224,224);
  //Draw background image
  image(backgroundImg, -150, 0);
  ms = millis();
  if(ms - startmsani > 500) catcher.image = catcherImg;
  /*if(ms - startmsobject > 1000){
    fallingObject = new Sprite(fallingObjectImg,100,0,10);
    startmsobject = millis();
  }*/
  // Draw directions to screen
  fill("#766aba");
  textSize(12);
  text("Move the \npopcat with the \nleft and right \narrow keys to \ncatch the falling \nchicken nuggs.", width-100, 20);
  //If fallingObject reaches bottom, move back to random position at top
  if(fallingObject.y >= height){
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(3,6);
    score --;
  }
  //Move catcher
  if(kb.pressing("left")){
    catcher.vel.x = -5;
  }
  else if(kb.pressing("right")){
      catcher.vel.x = 5;
  }
  else{
    catcher.vel.x = 0;
  }
  //Stop catcher at edges of screen
  if(catcher.x < 30) catcher.x = 30;
  else if(catcher.x > 370)catcher.x = 370;
  //If fallingObject collides with catcher, move back to random position at top
  if(fallingObject.collides(catcher)){
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(3,6);
    fallingObject.direction = "down";
    catcher.image = catcherImg2;
    startmsani = millis();
    score++;
  }
  fill("#766aba");
  textSize(20);
  text("Score: "+score, 10, 20)
}