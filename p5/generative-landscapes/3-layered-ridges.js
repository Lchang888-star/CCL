// Generative Landscape 3 — "Layered Ridges"
// Rows of hills made from a sin() wave plus noise(). Far rows are light,
// near rows are dark. Move the mouse up/down to make the hills taller.
//
// Click the canvas to save a PNG.

// ---- tweak these to make your variations ----
let numLayers = 10; // how many rows of hills
let waveHeight = 20; // height of the sine wave
let hillHeight = 100; // height of the noise hills
let farColor, nearColor;

function setup() {
  createCanvas(800, 500);
  farColor = color(200, 130, 160);
  nearColor = color(20, 30, 70);
}

function draw() {
  background(250, 170, 130);
  let t = frameCount * 0.005;
  let tall = map(mouseY, 0, height, 0.5, 1.5);

  // sun
  noStroke();
  fill(255, 235, 190);
  circle(560, 130, 80);

  stroke(255, 60);
  for (let i = 0; i < numLayers; i++) {
    fill(lerpColor(farColor, nearColor, i / (numLayers - 1)));
    let baseY = 250 + i * 28;

    beginShape();
    vertex(0, height);
    for (let x = 0; x <= width; x += 10) {
      let wave = sin(x * 0.02 + t * 5 + i) * waveHeight;
      let hill = noise(x * 0.005, i * 0.3, t) * hillHeight * tall;
      vertex(x, baseY + wave - hill);
    }
    vertex(width, height);
    endShape(CLOSE);
  }
}

function mousePressed() {
  saveCanvas("layered-ridges", "png");
}
