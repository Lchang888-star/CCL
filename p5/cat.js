// Creature Prototype: an abstract black cat.
// Built on the template: an 800x500 canvas, draw() only calls drawCreature(),
// and every shape is placed relative to the origin at the center of the canvas.
// Hold the mouse down and the cat curls up.

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

  let curled = mouseIsPressed;
  let bodySize = 220 + sin(frameCount * 0.05) * 10; // the body breathes

  drawTail(-90, 20, curled);

  // the ears float above the body and bob up and down;
  // they tip outward when the cat curls up
  let earY = -130 + sin(frameCount * 0.08) * 8;
  let earTilt = 0.3;
  if (curled) {
    earTilt = 1.1;
  }
  drawEar(-50, earY, -earTilt);
  drawEar(50, earY, earTilt);

  noStroke();
  fill(20);
  circle(0, 0, bodySize); // body

  drawEye(-38, -20, curled);
  drawEye(38, -20, curled);

  // whiskers disappear when the cat curls up
  if (!curled) {
    drawWhisker(20, 25, -0.3);
    drawWhisker(20, 25, 0.3);
    drawWhisker(-20, 25, PI - 0.3);
    drawWhisker(-20, 25, PI + 0.3);
  }

  pop();
}

// A tail of short segments. Each one rotates from where the last one ended,
// so the sin() wave travels down the tail like a whip.
function drawTail(x, y, curled) {
  push();
  translate(x, y);
  rotate(PI); // start pointing left, away from the body
  stroke(20);
  strokeWeight(14);
  for (let i = 0; i < 16; i++) {
    let bend = sin(frameCount * 0.05 - i * 0.4) * 0.2;
    if (curled) {
      bend += 0.3; // curl the tail around the body
    }
    rotate(bend);
    line(0, 0, 14, 0);
    translate(14, 0);
  }
  pop();
}

// A pointed ear made with vertex(), rotated around its base at (x, y).
function drawEar(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  noStroke();
  fill(20);
  beginShape();
  vertex(-32, 0);
  vertex(0, -70);
  vertex(32, 0);
  endShape(CLOSE);

  fill(240, 120, 150); // pink inside
  beginShape();
  vertex(-14, -8);
  vertex(0, -45);
  vertex(14, -8);
  endShape(CLOSE);
  pop();
}

// A yellow eye with a slit pupil that follows the mouse,
// or a closed line when the cat is curled up.
function drawEye(x, y, curled) {
  push();
  translate(x, y);
  if (curled) {
    stroke(250, 210, 60);
    strokeWeight(4);
    line(-20, 0, 20, 0);
  } else {
    noStroke();
    fill(250, 210, 60);
    circle(0, 0, 50);
    let lookX = map(mouseX, 0, width, -8, 8);
    fill(20);
    ellipse(lookX, 0, 9, 38);
  }
  pop();
}

// A whisker growing out of (x, y) at the given angle.
function drawWhisker(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  stroke(240);
  strokeWeight(2);
  line(0, 0, 80, 0);
  pop();
}
