// Generative Landscape 2 — "Radial Bloom"
// Rings drawn around the center. sin() adds petals and noise() makes
// each ring a little wobbly. Move the mouse left/right to open the bloom.
//
// Click the canvas to save a PNG.

// ---- tweak these to make your variations ----
let numRings = 12; // how many rings
let ringGap = 18; // distance between rings
let petals = 6; // number of petals
let petalSize = 10; // how deep the petals are
let noiseAmount = 25; // how wobbly the rings are
let innerColor, outerColor;

function setup() {
  createCanvas(800, 500);
  innerColor = color(255, 210, 90);
  outerColor = color(200, 40, 110);
}

function draw() {
  background(25, 10, 35);
  let t = frameCount * 0.01;
  let open = map(mouseX, 0, width, 0.5, 2);

  translate(width / 2, height / 2);
  stroke(25, 10, 35);

  // draw the biggest ring first so smaller ones sit on top
  for (let r = numRings; r >= 1; r--) {
    fill(lerpColor(innerColor, outerColor, r / numRings));

    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.05) {
      let petal = sin(a * petals + t) * petalSize * open;
      let wobble = noise(cos(a) + 1, sin(a) + 1, t + r * 0.1) * noiseAmount;
      let rad = r * ringGap + petal + wobble;
      vertex(cos(a) * rad, sin(a) * rad);
    }
    endShape(CLOSE);
  }
}

function mousePressed() {
  saveCanvas("radial-bloom", "png");
}
