// A circle that bounces around the canvas edges.

let x, y;
let xSpeed, ySpeed;
let dia;

function setup() {
  createCanvas(500, 400);

  x = width / 2;
  y = height / 2;
  // random direction, so it doesn't always head down-right
  xSpeed = random(2, 5) * (random() < 0.5 ? -1 : 1);
  ySpeed = random(2, 5) * (random() < 0.5 ? -1 : 1);
  dia = 100;
}

function draw() {
  background(220);

  x = x + xSpeed;
  y = y + ySpeed;

  // bounce off the edge the rim touches, not the one the centre reaches
  const r = dia / 2;
  if (x - r < 0 || x + r > width) {
    xSpeed = xSpeed * -1;
    x = constrain(x, r, width - r); // nudge back in, so it can't stick
  }
  if (y - r < 0 || y + r > height) {
    ySpeed = ySpeed * -1;
    y = constrain(y, r, height - r);
  }

  noStroke();
  fill("#3b7ddd");
  circle(x, y, dia);
}
