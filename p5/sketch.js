// Revolving circle in p5.js — self-contained, leaves no state behind.

let circleAngle = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250);

  revolvingCircle();

  // Anything below runs with the default origin, fill and stroke —
  // the circle's transform and colors don't reach this far.
  text("drawn at the top-left, as usual", 10, 20);
}

function revolvingCircle() {
  push(); // save the current transform and style
  translate(width / 2, height / 2);
  rotate(circleAngle);
  noStroke();
  fill("#e5484d");
  circle(100, 0, 40);
  pop(); // put everything back the way it was

  circleAngle += 0.02;
}
