// Creature Prototype: an abstract black cat.
// Built on the template: an 800x500 canvas, draw() only calls drawCreature(),
// and every shape is placed relative to the origin at the center of the canvas.
// Hold the mouse down and the cat curls up.

let curl = 0; // 0 = relaxed, 1 = curled up

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(120, 190, 200);
  drawCreature();
}

function drawCreature() {
  push();
  translate(width / 2, height / 2); // (0, 0) is now the center of the canvas

  // ease toward curled up while the mouse is held, back out when it's released
  curl = lerp(curl, mouseIsPressed ? 1 : 0, 0.08);

  let bodyR = 110 + sin(frameCount * 0.05) * 5; // the body breathes

  drawTail(-bodyR * 0.8, 20, 16);

  drawBody(bodyR);

  drawEye(-38, -20, 50);
  drawEye(38, -20, 50);

  // three whiskers per side that fold away as the cat curls up
  let whiskerLen = 80 * (1 - curl);
  for (let i = -1; i <= 1; i++) {
    drawWhisker(20, 25, i * 0.3, whiskerLen); // right side
    drawWhisker(-20, 25, PI - i * 0.3, whiskerLen); // left side
  }

  pop();
}

// A round body built with vertex(); sin() makes the edge ripple slowly.
function drawBody(r) {
  push();
  noStroke();
  fill(20);
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.1) {
    let ripple = r + sin(a * 5 + frameCount * 0.05) * 6;
    vertex(cos(a) * ripple, sin(a) * ripple);
  }
  endShape(CLOSE);
  pop();
}

// A tail of short segments. Each one rotates from where the last one ended,
// so the sin() wave travels down the tail; curling bends every joint further.
function drawTail(x, y, segments) {
  push();
  translate(x, y);
  rotate(PI); // start pointing left, away from the body
  stroke(20);
  strokeCap(ROUND);
  for (let i = 0; i < segments; i++) {
    rotate(sin(frameCount * 0.05 - i * 0.4) * 0.2 + curl * 0.3);
    strokeWeight(map(i, 0, segments - 1, 22, 8)); // taper to the tip
    line(0, 0, 14, 0);
    translate(14, 0);
  }
  pop();
}

// A yellow eye with a slit pupil that follows the mouse.
// It squeezes shut as the cat curls up.
function drawEye(x, y, size) {
  push();
  translate(x, y);
  scale(1, max(1 - curl, 0.08));

  noStroke();
  fill(250, 210, 60);
  circle(0, 0, size);

  let lookX = map(mouseX, 0, width, -size * 0.15, size * 0.15);
  fill(20);
  ellipse(lookX, 0, size * 0.18, size * 0.75);
  pop();
}

// A whisker growing out of (x, y) at the given angle.
function drawWhisker(x, y, angle, len) {
  push();
  translate(x, y);
  rotate(angle);
  stroke(240);
  strokeWeight(2);
  line(0, 0, len, 0);
  pop();
}
