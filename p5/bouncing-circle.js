// A circle that bounces around the canvas edges, drifting through the spectrum.

let x, y;
let xSpeed, ySpeed;
let dia;
let hue;

function setup() {
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100); // hue in degrees, so it wraps at 360

  x = width / 2;
  y = height / 2;
  // random direction, so it doesn't always head down-right
  xSpeed = random(2, 5) * (random() < 0.5 ? -1 : 1);
  ySpeed = random(2, 5) * (random() < 0.5 ? -1 : 1);
  dia = 100;
  hue = random(360); // start on a different color each run
}

function draw() {
  background(0, 0, 86); // the same grey as before, written in HSB

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

  // creep around the color wheel — a full lap every 720 frames, ~12 seconds
  hue = (hue + 0.5) % 360;

  noStroke();
  fill(hue, 70, 90); // saturation and brightness stay put, so only the hue moves
  circle(x, y, dia);
}
