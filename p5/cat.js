// Creature Prototype: a walking cat.
// Built on the template: an 800x500 canvas, draw() only calls drawCreature(),
// and every shape is placed relative to the origin at the center of the canvas.
// Press the mouse to startle the cat.

// picked once in setup() so every run gives a slightly different cat
let furR, furG, furB;
let stripeCount;
let eyeSize;

function setup() {
  createCanvas(800, 500);
  furR = random(200, 255);
  furG = random(110, 170);
  furB = random(40, 90);
  stripeCount = floor(random(3, 6));
  eyeSize = random(24, 32);
}

function draw() {
  background(245, 238, 225);
  drawCreature();
}

function drawCreature() {
  push();
  translate(width / 2, height / 2); // (0, 0) is now the center of the canvas

  stroke(50);
  strokeWeight(3);

  let scared = mouseIsPressed;
  let step = scared ? 0 : frameCount * 0.08; // walk cycle, frozen when startled
  let swing = sin(step) * 0.35; // how far the legs swing
  let bob = -abs(sin(step)) * 5; // the body rises a little with each step
  let breath = sin(frameCount * 0.05) * 4; // the body swells and shrinks

  // far-side legs are darker so they read as further away
  drawLeg(-125, 40 + bob, 100, swing, 0.75);
  drawLeg(80, 40 + bob, 100, -swing, 0.75);
  drawTail(-150, -10 + bob, 12, 16, 22, scared);
  drawLeg(-95, 45 + bob, 100, -swing, 1);
  drawLeg(110, 45 + bob, 100, swing, 1);

  drawBody(0, bob, 320, 150 + breath);
  drawHead(165, -70 + bob, scared);

  pop();
}

// A leg that swings from its hip or shoulder at (x, y).
// shade darkens the fur color: 1 is the normal color, lower is darker.
function drawLeg(x, y, len, angle, shade) {
  push();
  translate(x, y);
  rotate(angle);
  fill(furR * shade, furG * shade, furB * shade);
  rect(-14, 0, 28, len, 14);
  ellipse(0, len, 38, 20); // paw
  pop();
}

// A tail made of short segments, each rotated a bit further than the last,
// so a single sin() wave travels down it like a whip.
function drawTail(x, y, segments, segLen, thickness, scared) {
  let speed = scared ? 0.3 : 0.06; // lashes fast when startled
  let puff = scared ? 1.7 : 1; // and the fur puffs up

  // outline pass, then the fur pass on top of it
  tailPass(x, y, segments, segLen, thickness * puff + 6, speed, color(50));
  tailPass(x, y, segments, segLen, thickness * puff, speed, color(furR, furG, furB));
}

function tailPass(x, y, segments, segLen, thickness, speed, c) {
  push();
  translate(x, y);
  rotate(-2.4); // start pointing up and back
  stroke(c);
  strokeCap(ROUND);
  for (let i = 0; i < segments; i++) {
    rotate(0.12 + sin(frameCount * speed - i * 0.5) * 0.12);
    strokeWeight(thickness * map(i, 0, segments - 1, 1, 0.6)); // taper to the tip
    line(0, 0, segLen, 0);
    translate(segLen, 0); // the next segment starts where this one ends
  }
  pop();
}

// The body is a custom vertex shape: an ellipse with a flatter belly.
function drawBody(x, y, w, h) {
  push();
  translate(x, y);

  fill(furR, furG, furB);
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.1) {
    let px = (cos(a) * w) / 2;
    let py = (sin(a) * h) / 2;
    if (py > 0) {
      py *= 0.8;
    }
    vertex(px, py);
  }
  endShape(CLOSE);

  fill(255, 240, 220); // pale belly
  ellipse(10, h * 0.18, w * 0.55, h * 0.35);

  // tabby stripes hanging down from the back
  for (let i = 0; i < stripeCount; i++) {
    let sx = map(i, 0, stripeCount - 1, -w * 0.32, w * 0.12);
    let topY = (-h / 2) * sqrt(1 - sq((2 * sx) / w));
    drawStripe(sx, topY, h * 0.3);
  }

  pop();
}

function drawStripe(x, y, len) {
  push();
  translate(x, y);
  noStroke();
  fill(furR * 0.6, furG * 0.6, furB * 0.6);
  beginShape();
  vertex(-10, 2);
  vertex(10, 2);
  vertex(0, len);
  endShape(CLOSE);
  pop();
}

function drawHead(x, y, scared) {
  push();
  translate(x, y);
  rotate(map(mouseY, 0, height, -0.25, 0.25)); // tilt toward the mouse

  let flat = scared ? 0.9 : 0; // ears flatten when startled
  let twitch = map(noise(frameCount * 0.03), 0, 1, -0.4, 0.4);
  drawEar(-42, -40, -0.35 - flat, 60);
  drawEar(42, -40, 0.35 + flat + twitch, 60);

  fill(furR, furG, furB);
  ellipse(0, 0, 150, 130);

  drawEye(-30, -10, eyeSize, scared);
  drawEye(30, -10, eyeSize, scared);

  fill(240, 130, 150);
  triangle(-8, 12, 8, 12, 0, 21); // nose

  if (scared) {
    fill(80, 20, 30);
    ellipse(0, 36, 22, 26); // hiss
  } else {
    noFill();
    arc(-6, 24, 12, 12, 0, PI);
    arc(6, 24, 12, 12, 0, PI);
  }

  drawWhiskers(1); // right side
  drawWhiskers(-1); // left side, mirrored

  pop();
}

// A triangular ear made with vertex(), rotated around its base at (x, y).
function drawEar(x, y, angle, size) {
  push();
  translate(x, y);
  rotate(angle);

  fill(furR, furG, furB);
  beginShape();
  vertex(-size * 0.5, 0);
  vertex(0, -size);
  vertex(size * 0.5, 0);
  endShape(CLOSE);

  fill(250, 180, 190); // pink inside
  noStroke();
  beginShape();
  vertex(-size * 0.28, -size * 0.1);
  vertex(0, -size * 0.75);
  vertex(size * 0.28, -size * 0.1);
  endShape(CLOSE);

  pop();
}

// An eye whose pupil follows the mouse and widens when startled.
function drawEye(x, y, size, scared) {
  push();
  translate(x, y);

  let blinking = frameCount % 200 < 7 && !scared;
  if (blinking) {
    line(-size / 2, 0, size / 2, 0);
  } else {
    fill(140, 200, 80);
    ellipse(0, 0, size, size * 1.1);

    let lookX = map(mouseX, 0, width, -size * 0.2, size * 0.2);
    let lookY = map(mouseY, 0, height, -size * 0.2, size * 0.2);
    let pupilW = scared ? size * 0.7 : size * 0.25;
    fill(20);
    ellipse(lookX, lookY, pupilW, size * 0.8);

    noStroke();
    fill(255);
    circle(lookX - size * 0.12, lookY - size * 0.2, size * 0.2); // shine
  }

  pop();
}

// Three whiskers on one side of the face. side is 1 for right, -1 for left:
// scale(-1, 1) mirrors the same lines onto the other cheek.
function drawWhiskers(side) {
  push();
  scale(side, 1);
  strokeWeight(1.5);
  line(20, 16, 78, 6);
  line(20, 21, 82, 22);
  line(20, 26, 76, 38);
  pop();
}
