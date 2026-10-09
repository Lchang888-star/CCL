// Creature Prototype: an abstract cat.
// Built on the template: an 800x500 canvas, draw() only calls drawCreature(),
// and every shape is placed relative to the origin at the center of the canvas.
// Only the signs of a cat are kept (pointed ears, slit eyes, whiskers, tails,
// toe beans) and rearranged around a soft, breathing blob.
// Hold the mouse down and the cat curls up.

let bodyColor;
let tailCount;
let curl = 0; // 0 = open and relaxed, 1 = fully curled up

function setup() {
  createCanvas(800, 500);
  bodyColor = color(random(230, 255), random(170, 215), random(20, 70));
  tailCount = floor(random(3, 6));
}

function draw() {
  background(25, 95, 100);
  drawCreature();
}

function drawCreature() {
  push();
  translate(width / 2, height / 2); // (0, 0) is now the center of the canvas
  rotate(map(mouseX, 0, width, -0.2, 0.2)); // the whole cat leans toward the mouse

  // ease toward curled up while the mouse is held, back out when it's released
  curl = lerp(curl, mouseIsPressed ? 1 : 0, 0.08);

  let breath = 1 + sin(frameCount * 0.05) * 0.05;
  let bodyR = 110 * breath * (1 - curl * 0.15);

  // tails fan out from the back, alternating red, black and white
  let tailColors = [color(230, 50, 40), color(20), color(245)];
  for (let i = 0; i < tailCount; i++) {
    push();
    rotate(map(i, 0, tailCount - 1, PI * 0.7, PI * 1.2));
    translate(bodyR * 0.8, 0);
    drawTail(14, 14, 20, i * 1.3, tailColors[i % 3]);
    pop();
  }

  // ears float above the body instead of being attached to it
  let earY = -bodyR - 25 + sin(frameCount * 0.08) * 8;
  drawEar(-55, earY, -0.4 - curl * 0.8, 70, color(20));
  drawEar(55, earY, 0.4 + curl * 0.8, 70, color(230, 50, 40));

  // two paws knead under the body, out of step with each other
  drawPaw(-50, bodyR * 0.85 + sin(frameCount * 0.12) * 8, 34);
  drawPaw(50, bodyR * 0.85 + sin(frameCount * 0.12 + PI) * 8, 34);

  drawBody(bodyR);

  // one big eye and one small one
  drawEye(-38, -18, 64);
  drawEye(42, -30, 40);

  fill(240, 120, 150);
  noStroke();
  triangle(-9, 18, 9, 18, 0, 28); // nose

  // three whiskers per side; they fold away as the cat curls up
  let whiskerLen = (85 + sin(frameCount * 0.07) * 10) * (1 - curl);
  for (let i = -1; i <= 1; i++) {
    drawWhisker(20, 25, i * 0.3, whiskerLen); // right side
    drawWhisker(-20, 25, PI - i * 0.3, whiskerLen); // left side
  }

  pop();
}

// A blob built with vertex(). noise() nudges the edge so it never sits still.
function drawBody(r) {
  push();
  fill(bodyColor);
  stroke(20);
  strokeWeight(4);
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.1) {
    let wobble = map(noise(cos(a) + 1, sin(a) + 1, frameCount * 0.01), 0, 1, 0.88, 1.12);
    vertex(cos(a) * r * wobble, sin(a) * r * wobble);
  }
  endShape(CLOSE);
  pop();
}

// A tail of short segments. Each one rotates from where the last one ended,
// so the sin() wave travels down the tail; curling adds a bend to every joint.
function drawTail(segments, segLen, thickness, phase, c) {
  push();
  stroke(c);
  strokeCap(ROUND);
  for (let i = 0; i < segments; i++) {
    rotate(sin(frameCount * 0.05 + phase - i * 0.4) * 0.25 + curl * 0.35);
    strokeWeight(thickness * map(i, 0, segments - 1, 1, 0.3)); // taper to the tip
    line(0, 0, segLen, 0);
    translate(segLen, 0);
  }
  noStroke();
  fill(c);
  circle(0, 0, thickness * 0.8); // a dot on the tip
  pop();
}

// A pointed ear made with vertex(), rotated around its base at (x, y).
function drawEar(x, y, angle, size, c) {
  push();
  translate(x, y);
  rotate(angle);
  fill(c);
  stroke(20);
  strokeWeight(4);
  beginShape();
  vertex(-size * 0.45, 0);
  vertex(0, -size);
  vertex(size * 0.45, 0);
  endShape(CLOSE);

  noStroke();
  fill(240, 120, 150);
  beginShape();
  vertex(-size * 0.2, -size * 0.12);
  vertex(0, -size * 0.65);
  vertex(size * 0.2, -size * 0.12);
  endShape(CLOSE);
  pop();
}

// Concentric rings with a slit pupil that follows the mouse.
// The eye squeezes shut as the cat curls up, and blinks now and then.
function drawEye(x, y, size) {
  push();
  translate(x, y);

  let open = 1 - curl;
  if (frameCount % 180 < 6) {
    open = 0;
  }
  scale(1, max(open, 0.08));

  stroke(20);
  strokeWeight(3);
  fill(255);
  circle(0, 0, size);
  fill(120, 200, 90);
  circle(0, 0, size * 0.7);

  let lookX = map(mouseX, 0, width, -size * 0.12, size * 0.12);
  let lookY = map(mouseY, 0, height, -size * 0.12, size * 0.12);
  noStroke();
  fill(20);
  ellipse(lookX, lookY, size * 0.15, size * 0.6);
  fill(255);
  circle(lookX + size * 0.1, lookY - size * 0.15, size * 0.12); // shine
  pop();
}

// A whisker growing out of (x, y) at the given angle, with a dot at the end.
function drawWhisker(x, y, angle, len) {
  push();
  translate(x, y);
  rotate(angle);
  stroke(20);
  strokeWeight(2);
  line(0, 0, len, 0);
  noStroke();
  fill(20);
  circle(len, 0, 7);
  pop();
}

// A paw: one big pink pad with three toe beans above it.
function drawPaw(x, y, size) {
  push();
  translate(x, y);
  fill(245);
  stroke(20);
  strokeWeight(4);
  ellipse(0, 0, size * 1.6, size * 1.2);

  noStroke();
  fill(240, 120, 150);
  ellipse(0, size * 0.15, size * 0.7, size * 0.5);
  for (let i = -1; i <= 1; i++) {
    circle(i * size * 0.35, -size * 0.25, size * 0.25);
  }
  pop();
}
