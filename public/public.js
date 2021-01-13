// Made by Raunak Sudhakar, as ViZrdLabs.

// You need two devices to run it.
// Demo
// "Controller" on: https://fireburst.herokuapp.com/
// "Screen" on: https://fireburst.herokuapp.com/screen/
// Allows multiple devices as "controllers"
// to send "Fireworks" to the "Screen".

// Three main apps -
// The server App ("Server")
// The User App ("Controller") (this file)
// The Client App ("Screen")

// This Runs on "p5.js"
// http://p5js.org/
// p5.js is a JavaScript library for creative coding,
// with a focus on making coding accessible and inclusive.

// Declare the Variables we use.
let sendButton; // Button
let colour, h, s; // A colour variable, and h and s for hue and saturation.
let scene = 0; // Scenes for splash screen or instructions.
let sentTime = 0;

// This is a p5 function
// The setup() function is called once when the program starts.
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB); // colour mode as HUE SATURATION BRIGHTNESS mode.
  textAlign(CENTER);
  ellipseMode(CENTER);
  background(200);

  // Create a HTML button element and set parameters.
  sendButton = createButton("SEND\nFIREWORKS!");
  sendButton.size(100, 100);
  sendButton.style("background : #fff");
  sendButton.style("border-radius: 50px");
  sendButton.position(width / 2 - 50, height / 2 - 50);
  // Add the function "sendData" to the button.
  sendButton.mousePressed(sendData);

  // pos is a vector to store the position of the circle on screen
  pos = createVector(random(width), random(height));
  textSize(20);
}

// Called directly after setup(), the draw() function
// continuously executes the lines of code contained
// inside its block until the program is stopped or noLoop() is called.
function draw() {
  switch (scene) {
    case 0:
      if (pos.x > width) {
        pos.x = 0;
      }
      if (pos.y > height) {
        pos.y = 0;
      }
      s = map(pos.x, 0, width, 0, 255);
      h = map(pos.y, 0, height, 0, 360);
      colour = color(h, s, 200);
      background(220, 0.02);
      stroke(h, s, 150);
      strokeWeight(5);
      fill(h, s, 200, 0.6);
      ellipse(pos.x, pos.y, 100);
      pos.x++;
      pos.y++;
      fill(20);
      noStroke();
      text("Choose a colour by\ntouching the screen", width / 2, 20);
      break;
    case 1:
      if (!mouseIsPressed) {
        background(220, 0.1);
      }
      fill(colour);
      ellipse(pos.x, pos.y, 100);
      break;
  }
}

function mouseDragged() {
  if (
    mouseX > width / 2 - 50 &&
    mouseX < width / 2 + 50 &&
    mouseY > height / 2 - 50 &&
    mouseY < height / 2 + 50
  ) {
    // console.log("bingo");
  } else {
    scene = 1;
    pos.x = mouseX;
    pos.y = mouseY;
    s = map(pos.x, 0, width, 0, 255);
    h = map(pos.y, 0, height, 0, 360);
    colour = color(h, s, 200);

    background(colour, 0.1);
  }
}

function mousePressed() {
  if (
    mouseX > width / 2 - 50 &&
    mouseX < width / 2 + 50 &&
    mouseY > height / 2 - 50 &&
    mouseY < height / 2 + 50
  ) {
    // console.log("bingo");
  } else {
    background(colour, 0.1);
    scene = 1;
    pos.x = mouseX;
    pos.y = mouseY;
    s = map(pos.x, 0, width, 0, 255);
    h = map(pos.y, 0, height, 0, 360);
    colour = color(h, s, 200);
    background(colour, 0.1);
  }
}

function sendData() {
  if (sentTime + 1000 < millis()) {
    let data = {
      hue: h,
      saturation: s,
    };
    // console.log(data);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("/api", options, (response) => {
      console.log(response);
    });
    sentTime = millis();
  } else {
    // console.log("Dont Spam I say!");
  }
}
