// Generative Landscape 5 — "Sine Lines"
// Twenty wavy lines of random-sized dots. Mouse left/right slides the waves,
// mouse up/down changes how tall they are.
// Click the canvas to save a PNG.

let numLines = 20;

function setup() {
  createCanvas(800, 500);
  background(0);
}

function draw() {
  background(50, 30);
  noStroke();

  for (let i = 0; i < numLines; i++) {
    let lineY = map(i, 0, numLines - 1, 25, height - 25); // spread lines down the canvas

    for (let x = 0; x < width; x += 5) {
      let freq = x * 0.01 + mouseX * 0.01 + i * 0.3; // i * 0.3 shifts each line a bit
      let amp = map(mouseY, 0, height, 40, 0);
      let y = lineY + sin(freq) * amp;

      let dia = random(1, 5);
      circle(x, y, dia);
    }
  }
}

function mousePressed() {
  saveCanvas("sine-lines", "png");
}
