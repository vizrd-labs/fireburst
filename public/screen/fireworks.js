// const { text } = require("express");

var cent;
var r = 10;
var col, h, scene, colChosen;
var socket;
var fireWorks = [];

function setup() {
  colorMode(HSB);
  createCanvas(windowWidth, windowHeight);
  //   socket = io.connect("http://localhost:9000/api");
  socket = io.connect();
  // file: socket = io();
  socket.on("message", (data) => {
    console.log(data);
  });

  socket.on("mouse", (data) => {
    console.log(data.hue, data.saturation);
    fireWorks.push(new fireWork(data.hue, data.saturation));
  });

  background(0);
  textFont("Great Vibes");
  angleMode(DEGREES);
  textAlign(CENTER);
  noStroke();
  col1 = color(250, 220, 0);
  col2 = color(220, 220, 0);
  col3 = color(170, 0, 220);
  col4 = color(255, 255, 0);
  col5 = color(255, 255, 0);
  col6 = color(255, 170, 0);
  col7 = color(0, 120, 0);
  col8 = color(220, 220, 0);
  col9 = color(220, 220, 0);
  col = [col1, col2, col3, col4, col5, col6, col7, col8, col9];
  for (let i = 0; i < 1; i++) {
    fireWorks[i] = new fireWork(0, 200);
  }
}

function draw() {
  background(0, 100);
  fill(200);
  textSize(30);
  text("Go to\nfireburst.herokuapp.com\nTo Send Fireworks!", width / 2, 30);
  for (let i = fireWorks.length - 1; i > -1; i--) {
    fireWorks[i].display();
    fireWorks[i].update();
    if (fireWorks[i].dead) {
      // fireWorks[i] = new fireWork();
      fireWorks.splice(i, 1);
    }
  }
}

function mousePressed() {
  fireWorks.push(new fireWork(0, 200));
}

class fireWork {
  constructor(h, s) {
    this.pos = createVector(
      random(width / 6, (5 * width) / 6),
      random((2 * height) / 3)
    );
    // this.colChosen = col[Math.floor(Math.random() * col.length)];
    this.colChosen = color(h, s, 200);
    this.ele = height;
    this.boom = false;
    this.r = 0;
    this.dead = false;
  }
  display() {
    if (!this.boom) {
      fill(this.colChosen);
      ellipse(this.pos.x, this.ele, 4, 10);
    } else {
      let rand = random();
      if (rand > 0.3) {
        fill(this.colChosen);
      } else {
        fill(255, 155, 0);
      }
      for (let angle = 0; angle < 360; angle = angle + random(10)) {
        let x = this.r * random() * sin(angle);
        let y = this.r * random() * cos(angle);
        ellipse(this.pos.x + x, this.pos.y + y, 7 * random());
      }
    }
  }
  update() {
    if (!this.boom) {
      if (this.ele > this.pos.y) {
        this.ele = this.ele - 7;
      } else {
        this.boom = true;
      }
    } else {
      if (this.r > 100) {
        this.dead = true;
      } else {
        this.r = this.r + random(2);
      }
    }
  }
}
