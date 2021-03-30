const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var create = true;
var engine, world;
var box1, pig1, pig3;
var backgroundImg, platform;
var bird, bird1, bird2, slingshot;
var level = 1;
var birds = [];
var structure = [];
var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
var chances = 3;
function preload() {
  getBackgroundImg();
  // pigstep=loadSound("https://raw.githubusercontent.com/whitehatjr/sounds-for-angry-bird/main/sounds/pig_snort.mp3");
  //  flybird=loadSound("https://raw.githubusercontent.com/whitehatjr/sounds-for-angry-bird/main/sounds/bird_flying.mp3");
  //  bridselect=loadSound("https://raw.githubusercontent.com/whitehatjr/sounds-for-angry-bird/main/sounds/bird_select.mp3");
}

function setup() {
  var canvas = createCanvas(1200, 400);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(600, height, 1200, 20);
  // platform = new Ground(150, 305, 300, 170);
  bird = birds[0];
}

function draw() {
  if (backgroundImg) {
    background(backgroundImg);
  } else {
    background(0);
  }
  noStroke();
  textSize(35);
  fill("white");
  text("Score  " + score, width - 300, 50);
  text("Lives  " + chances, 300, 50);

  Engine.update(engine);
  //strokeWeight(4);
  ground.display();
  bird = birds[0];

  if (level === 1 && gameState === "onSling") {
    createLevel1Bodies();
    //platform.display();
    //log6.display();
    if (score >= 400) {
      // level = 2;
      gameState = "wait";
    }
  }

  if (gameState === "wait" && level == 1) {
    background(0);
    noStroke();
    textSize(35);
    fill("white");
    textAlign(CENTER);

    text("Press N to go to the next level", width / 2, height / 2);
  }

  if (level === 2) {
    createLevel2Bodies();
  }
  if (chances <= 0) {
    gameState = "over";
  }
  if (gameState === "over") {
    noStroke();
    textSize(35);
    fill("white");
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
    text("Press R to Restart", width / 2, height / 2 + 50);
  }

  if (bird.body.position.x <= 200 && gameState === "onSling") {
    push();
    translate(bird.body.position.x,
      bird.body.position.y);
    var v1 = createVector(
    slingshot.pointB.x-bird.body.position.x,slingshot.pointB.y-bird.body.position.y
    );

   v1.mult(7)
    stroke(255);
    strokeWeight(1);
    
    line(0, 0, v1.x, v1.y);

    pop();
  }
  slingshot.display();

  for (var i = 0; i < structure.length; i++) {
    structure[i].display();
  }
  for (var i = 0; i < birds.length; i++) {
    birds[i].display();
  }
}

function mouseDragged() {
  if (gameState !== "launched") {
    Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
  }
}

function mouseReleased() {
  slingshot.fly();
  gameState = "launched";
  chances--;
}

function keyPressed() {
  if (keyCode === 32 && gameState != "over") {
    if (gameState === "onSling") {
      var temp = birds.splice(0, 1);
      console.log(temp);
      append(birds, temp[0]);
      console.log(birds);

      bird = birds[0];
    }
    slingshot.attach(bird.body);
    bird.trajectory = [];
    Matter.Body.setPosition(bird.body, { x: 200, y: 220 });
    gameState = "onSling";
  }

  if (keyCode === 78 && gameState === "wait") {
    if (level == 1) {
      level = 2;
    }
    gameState = "onSling";
  }
  if (gameState === "over" && keyCode === 82) {
    gameState = "onSling";
    level = 1;
    create = true;
    chances = 3;
    score = 0;
  }
}

async function getBackgroundImg() {
  var response = await fetch(
    "http://worldtimeapi.org/api/timezone/Asia/Kolkata"
  );
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11, 13);

  if (hour >= 06 && hour <= 19) {
    bg = "sprites/bg1.png";
  } else {
    bg = "sprites/bg2.jpg";
  }

  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}
function createLevel1Bodies() {
  if (create === true) {
    if (structure.length) {
      for (var i = 0; i < structure.length; i++) {
        structure[i].remove();
      }
      for (var i = 0; i < birds.length; i++) {
        birds[i].remove();
      }
      slingshot.remove();
    }

    box1 = new Box(700, 320, 70, 70);
    box2 = new Box(920, 320, 70, 70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810, 260, 300, PI / 2);

    box3 = new Box(700, 240, 70, 70);
    box4 = new Box(920, 240, 70, 70);
    pig3 = new Pig(810, 220);

    log3 = new Log(810, 180, 300, PI / 2);

    box5 = new Box(810, 160, 70, 70);
    log4 = new Log(760, 120, 150, PI / 7);
    log5 = new Log(870, 120, 150, -PI / 7);
    structure = [box1, box2, box3, box4, pig1, pig3, log1, log3, log4, log5];
    bird1 = new RedBird(200, 220);
    bird2 = new YellowBird(200, 50);
    birds = [bird1, bird2];
    bird = birds[0];

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body, { x: 200, y: 50 + 170 });
    create = false;
  }
}
function createLevel2Bodies() {
  if (create === true) {
    if (structure.length) {
      for (var i = 0; i < structure.length; i++) {
        structure[i].remove();
      }
      for (var i = 0; i < birds.length; i++) {
        birds[i].remove();
      }
      slingshot.remove();
    }
    box1 = new Box(700, 320, 70, 70);
    box2 = new Box(920, 320, 70, 70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810, 260, 300, PI / 2);

    box3 = new Box(700, 240, 70, 70);
    box4 = new Box(920, 240, 70, 70);
    pig3 = new Pig(810, 220);

    log3 = new Log(810, 180, 300, PI / 2);

    log4 = new Log(760, 120, 150, PI / 7);
    log5 = new Log(870, 120, 150, -PI / 7);
    structure = [box1, box2, box3, box4, pig1, pig3, log1, log3, log4, log5];
    bird1 = new RedBird(200, 220);
    bird2 = new YellowBird(200, 50);
    birds = [bird1, bird2];
    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body, { x: 200, y: 50 + 170 });
    create = false;
  }
}
