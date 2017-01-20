function drawDuck(_x, _y, _img, _spd) {
  return {
    x : _x, 
    y : _y,
    image : _img,
    spd : _spd
  };
}

function drawDuck2(_x, _y, _img, _width, _height, _spd) {
  return {
    x : _x, 
    y : _y,
    image : _img,
    width : _width,
    height : _height,
    spd : _spd
  };
}

function drawFlappyBird(_x, _y, _img, _spd){
  return{
    x : _x,
    y : _y,
    image : _img,
    spd : _spd
  }  
}


var Crosshair = {
  colour: 0,
  colourChanger:0,
  counter: 0,
  temp: 0,
  sound: ("assets/gunshot.wav")
}

// var ReplayButton={
//   Xstart : 475,
//   Ystart : 334.5,

//   Width : 300,
//   Height : 100,

//   Xend : 775,
//   Yend : 434.5
// }

  function drawCrosshair(){
  noFill();
  stroke(Crosshair.colour, 0, 0);
  ellipse(mouseX, mouseY, 40, 40);
  fill(Crosshair.colour, 0, 0);
  ellipse(mouseX, mouseY, 5, 5);
  line(mouseX-30, mouseY, mouseX+30, mouseY);
  line(mouseX, mouseY+30, mouseX, mouseY-30);
}

//ARRAYS

ducks = [];

flappyBirds = [];

duckFlapping = ["assets/duckFlapUp.png", "assets/duckFlapDown.png"];

//VARIABLES

var duckSprite; //this changes between 2 images which creates the effect of the fuck flapping its wings

var flapCount = 0; //for counting frames between changing the sprite image

var ducksShot = 0; //for scoring

var flappyBirdsShot = 0; //special score

var lucky; //this decides whether the flappy bird is spawned

var score = 0;

var duckFlapping = ["assets/duckFlapUp.png","assets/duckFlapDown.png"];
//this array has 2 images, the first being of the duck with its wings up, and the second of the duck with its wings down, 
//switching between these 2 images creates the flapping effect

var stageSetting;

var timeLeft = 60;

var ignorer = 0; //this is used as reference value to stop spawning code from repeating itself


function preload(){
  flapUp = loadImage(duckFlapping[0]);
  flapDown = loadImage(duckFlapping[1]);
  stage = loadImage("assets/stage.png");
  flappyBird = loadImage("assets/flappyBird.png");
  bonusSeal = loadImage("assets/gold-bonus-seal.png");  
  gunShot = loadSound(Crosshair.sound);
  stageMusic = loadSound("assets/Background Music.mp3");
  quack = loadSound("assets/quack1.wav")
  flappyBirdSFX = loadSound("assets/FlappyBirdSFX.mp3")
}

function setup() {
  //set stage to the menu
  stageSetting=1;
  //canvas becomes equal the background image size
  createCanvas(stage.width,stage.height);
  //sprite instantiated
  duckSprite = flapUp;
  //background music volume set and starts playing
  stageMusic.setVolume(0.5);
  stageMusic.play();
  
  lucky = random(1,101); //value for lucky set
  //console.log(lucky);
  
  //first 2 ducks are pushed in setup to call them only once, also the values need to be inputed manually as the variable that keeps the values hasn't been defined yet
  ducks.push(drawDuck(-137, random(25, 400), duckSprite, random(4,9)));
  ducks.push(drawDuck(-137, random(25, 400), duckSprite, random(4,9)));
}

function draw() {
  
  //bonus condition
  if(stageSetting ==2 && ducksShot==61){
    score *= 2;
  }
  
  if(timeLeft<0 || ducksShot==61){
    stageSetting = 3;    
  }
  
  if (stageSetting ==1 && mouseIsPressed){
    stageSetting = 2;
  }
  
  if (stageSetting == 1){
  image(stage);
  
  textAlign(CENTER, CENTER);
  textFont("Calibri");
  textSize(80);
  textStyle(BOLD);
  fill(0);
  text("DUCK HUNT", stage.width/2, stage.height/7)
  textSize(60);
  text("PRESS MOUSE1 TO BEGIN", stage.width/2, stage.height/3);
  textSize(40);
  textStyle(NORMAL);
  text("THE FURTHER YOU GET THE MORE THE DIFFICULTY INCREASES", stage.width/2, stage.height/2)
  text("YOU HAVE ONE MINUTE TO SHOOT AS MANY AS YOU CAN", stage.width/2, stage.height/2+100);

  }
  
  if(stageSetting == 3){
  image(stage);
  
  if(ducksShot==61){
    image(bonusSeal, 10, 50);
  }
  
  fill(0, 0, 255);
  rect(stage.width/2-150, 334.5, 300, 100);
  
  textAlign(CENTER, CENTER);
  textFont("Calibri");
  textSize(80);
  textStyle(BOLD);
  fill(0);
  text("GAME OVER", stage.width/2, stage.height/7)
  textSize(60);
  text("Your Score: "+score, stage.width/2, stage.height/3);
  textStyle(NORMAL);
  textSize(50);
  fill(255);
  text("Play Again?", stage.width/2, 385);
  }
  
  if(stageSetting == 2){
  timeLeft = timeLeft - 0.01666666666;
  
  //background drawn
  image(stage);  
  
  //Level Text
  textAlign(LEFT);
  textFont("Calibri");
  textSize(60);
  textStyle(BOLD);
  fill(0);
  
  if(ducksShot<2){
  text("Level 1", stage.width/2-100, 60);
  }
  if(ducksShot>1 && ducksShot<5){
  text("Level 2", stage.width/2-100, 60);
  }
  if(ducksShot>4 && ducksShot<10){
  text("Level 3", stage.width/2-100, 60);
  }
  if(ducksShot>9 && ducksShot<19){
  text("Level 4", stage.width/2-100, 60);
  }
  if(ducksShot>18 && ducksShot<30){
  text("Level 5", stage.width/2-100, 60);
  }
  if(ducksShot>29 && ducksShot<36){
  text("Level 6", stage.width/2-100, 60);
  }
  if(ducksShot>35 && ducksShot<45){
  text("Level 7", stage.width/2-100, 60);
  }
  if(ducksShot>44 && ducksShot<54){
  text("Level 8", stage.width/2-100, 60);
  }
  if(ducksShot>53 && ducksShot<61){
  text("Level 9", stage.width/2-100, 60);
  }
  
  //SCORE TEXT
  textFont("Calibri");
  textSize(30);
  textStyle(BOLD);
  fill(0);
  
  score = ducksShot+flappyBirdsShot;
  
  text("SCORE= " + score, 10, 50);
  text("TIME LEFT: " + floor(timeLeft), stage.width-200, 50);
  //Changing between images for sprite
  if(flapCount==8){
    flapCount = 0
  }
  flapCount +=1;

  if(flapCount>4){
    duckSprite=flapDown
  }
  if(flapCount<4){
    duckSprite=flapUp
  }
  
  //console.log("flapCount " + flapCount);
  //console.log("CURRENT IMG" + duckSprite);
  
  //console.log(ducks);
  
  //////////REGULAR DUCKS CODE//////////////
  
  //This code creates and moves the ducks
  for(var i = 0; i<ducks.length; i++){
    if(ducksShot<36){
      image(duckSprite, ducks[i].x, ducks[i].y);
    }
    if(ducksShot>35){
      image(duckSprite, ducks[i].x, ducks[i].y, ducks[i].width, ducks[i].height);
    }
    ducks[i].x += ducks[i].spd;
  }
  
  //This code resets the ducks back to the left side of the screen when the go past the width of the screen
  for(var i = ducks.length-1; i>= 0; i--){
    if(ducks[i].x > width){
      ducks[i].x = -137;
      // or splice it (remove it) ducks.splice(i, 1);
      return;
      //console.log(duck[i]);
    }
  }
  
  ///////SPECIAL BIRD CODE//////////
  
    //This code creates and moves
  for(var i = 0; i<flappyBirds.length; i++){
    image(flappyBird, flappyBirds[i].x, flappyBirds[i].y);
    flappyBirds[i].x += flappyBirds[i].spd;
  }
  
  //This code resets back to left of screen
  for(var i = flappyBirds.length-1; i>= 0; i--){
    if(flappyBirds[i].x > width){
      flappyBirds.splice(i, 1);
      return;
      //console.log(duck[i]);
    }
  }
  
  //spawns 3 ducks after the first 2 have been shot
  if(ducksShot==2 && ignorer<1){
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,9)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,9)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,9)));
  ignorer+=1;
  }
  
  //spawns 5 ducks after last ones are all shot
  if(ducksShot==5 && ignorer<2){
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  if(lucky>50){
  flappyBirds.push(drawFlappyBird(-137, random(25, 400), flappyBird, 7));
  }
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ignorer+=1;
  }
  
  //spawns 9 ducks after last group are all shot
  if(ducksShot==10 && ignorer<3){
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ignorer+=1;
  }
  
  //11 more ducks
  if(ducksShot==19 && ignorer<4){
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ducks.push(drawDuck(-137, random(25,400), duckSprite, random(6,10)));
  ignorer+=1;
  }
  
  //6 regukar ducks and special bird if lucky<50
  if(ducksShot==30 && ignorer<5){
  ducks.push(drawDuck(-137, random(20,400), duckSprite, random(7,11)));
  ducks.push(drawDuck(-137, random(20,400), duckSprite, random(7,11)));
  ducks.push(drawDuck(-137, random(20,400), duckSprite, random(7,11)));
  if(lucky<50){
  flappyBirds.push(drawFlappyBird(-137, random(20, 400), flappyBird, 8));
  }
  ducks.push(drawDuck(-137, random(20,400), duckSprite, random(7,11)));
  ducks.push(drawDuck(-137, random(20,400), duckSprite, random(7,11)));
  ducks.push(drawDuck(-137, random(20,400), duckSprite, random(7,11)));
  ignorer+=1;
  }
  
  //9 ducks with randomised sizes, that can be smaller
  if(ducksShot==36 && ignorer<6){
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(80,142), random(40,89), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(80,142), random(40,89), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(80,142), random(40,89), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(80,142), random(40,89), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(80,142), random(40,89), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(80,142), random(40,89), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(80,142), random(40,89), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(80,142), random(40,89), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(80,142), random(40,89), random(8,12)));
  ignorer+=1;
  }
  
  //9 ducks with randomised sizes, smaller than the last
  if(ducksShot==45 && ignorer<7){
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  ignorer+=1;
  }
  
  //fast small ducks with 2 special ducks
  if(ducksShot==54 && ignorer<8){
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  flappyBirds.push(drawFlappyBird(-137, random(20, 400), flappyBird, 9));
  flappyBirds.push(drawFlappyBird(-137, random(20, 400), flappyBird, 9));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  ducks.push(drawDuck2(-137, random(20,400), duckSprite, random(70,122), random(40,70), random(8,12)));
  ignorer+=1;
  }
  
  Crosshair.counter = Crosshair.counter + Crosshair.temp;

  //this is the logger for the mouse being pressed, and sets the colour value to red and the timer addition value to 1 so it incremints by 1
  if(Crosshair.colourChanger == 1){
    Crosshair.colour = 255;
    Crosshair.temp = 1;
  }
  //when the counter hits 60 the counting stops as temp becomes 0 and the counter is reset to 0,
  //and the colour becomes black, and the counter value returns to 0
  if(Crosshair.counter >= 20){
    Crosshair.temp = 0;
    Crosshair.counter = 0;
    Crosshair.colour = 0;
    Crosshair.colourChanger = 0;
  }
  
  //Crosshair drawn
  drawCrosshair();
  
}
//end of if(stageSetting==2)

}
//end of draw


function mousePressed(){
  
  gunShot.setVolume(1);
  gunShot.play();
  Crosshair.counter = 0;
  Crosshair.colourChanger = 1;
  
  for(var i = 0; i<ducks.length; i++){
    if(mouseX<ducks[i].x+flapUp.width && mouseX>ducks[i].x && mouseY<ducks[i].y+flapUp.height && mouseY>ducks[i].y){
      ducksShot +=1;
      quack.setVolume(1.5);
      quack.play();
      //console.log("ducksShot= "+ducksShot);
      //ducks[i].x = -137;
      ducks.splice(i, 1);
      return;
    }
  }
  
  for(var i = 0; i<flappyBirds.length; i++){
    if(mouseX<flappyBirds[i].x+flappyBird.width && mouseX>flappyBirds[i].x && mouseY<flappyBirds[i].y+flappyBird.height && mouseY>flappyBirds[i].y){
    flappyBirdsShot +=10;
    flappyBirdSFX.setVolume(1);
    flappyBirdSFX.play();
    flappyBirds.splice(i, 1);
    return;
    }
  }
  
  if(stageSetting == 3 && mouseX<stage.width/2+150 && mouseX>stage.width/2-150 && mouseY<434.5 && mouseY>334.5){
    stageMusic.stop();
    stageMusic.play();
    stageSetting = 2;
    ducksShot = 0;
    timeLeft = 60;
    ignorer = 0;
    flappyBirdsShot = 0;
    lucky= random(1,101);
    ducks.push(drawDuck(-137, random(25, 400), duckSprite, random(4,9)));
    ducks.push(drawDuck(-137, random(25, 400), duckSprite, random(4,9)));
  }

}


