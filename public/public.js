let sendButton;
let colour, h, s;
let scene = 0;

function sendData() {
  let data = {
    hue: h,
    saturation: s,
  };
  console.log(data);
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
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  textAlign(CENTER);
  background(200);
  sendButton = createButton("SEND\nFIREWORKS!");
  sendButton.size(100, 100);
  sendButton.style("background : #fff");
  sendButton.style("border-radius: 50px");
  sendButton.position(width / 2, height / 2);
  sendButton.mousePressed(sendData);
  m = createVector(random(width), random(height));
  s = map(m.x, 0, width, 0, 255);
  h = map(m.y, 0, height, 0, 360);
  colour = color(h, s, 200);
  noStroke();
  textSize(20);
}

function draw() {
  switch (scene) {
    case 0:
      background(220, 0.1);
      fill(colour);
      ellipse(m.x, m.y, 100);
      m.x++;
      m.y++;
      if (m.x > width) {
        m.x = 0;
      }
      if (m.y > height) {
        m.y = 0;
      }
      s = map(m.x, 0, width, 0, 255);
      h = map(m.y, 0, height, 0, 360);
      colour = color(h, s, 200);
      fill(20);
      text("Choose a colour by\ntouching the screen", width / 2, 20);
      break;
    case 1:
      background(220, 0.1);
      fill(colour);
      ellipse(m.x, m.y, 100);
      break;
  }
}

function mouseDragged() {
  scene = 1;
  m.x = mouseX;
  m.y = mouseY;
  s = map(m.x, 0, width, 0, 255);
  h = map(m.y, 0, height, 0, 360);
  colour = color(h, s, 200);
}
