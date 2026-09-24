// Generative Landscape 2 — "Radial Bloom"
// Rings of dots around the center that pulse with sin().
// Click the canvas to save a PNG.

let rings = 10; // how many rings
let dotsPerRing = 12; // dots in each ring
let gap = 22; // distance between rings

function setup() {
  createCanvas(800, 500);
  noStroke();
}

function draw() {
  background(25, 10, 35);
  translate(width / 2, height / 2);
  let t = frameCount * 0.05;

  for (let r = 1; r <= rings; r++) {
    for (let i = 0; i < dotsPerRing; i++) {
      let angle = (TWO_PI / dotsPerRing) * i;
      let x = cos(angle) * r * gap;
      let y = sin(angle) * r * gap;
      let size = 10 + sin(t + r) * 6;

      fill(255, 200 - r * 15, 100);
      circle(x, y, size);
    }
  }
}

function mousePressed() {
  saveCanvas("radial-bloom", "png");
}
