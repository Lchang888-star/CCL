// Revolving circle in p5.js — paste into sketch.js in the p5 web editor.

let angle = 0;

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(250);
  translate(width / 2, height / 2); // move the origin to the center
  rotate(angle); // spin the whole coordinate system
  fill("#e5484d");
  circle(100, 0, 40); // 100px out from the center, 40px across
  angle += 0.02;
}
