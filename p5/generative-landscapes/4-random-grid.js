// Generative Landscape 4 — "Random Grid"
// A grid where every cell gets a random size, color and shape.
// Each run looks different. Press any key for a new grid.
// Click the canvas to save a PNG.

let spacing = 40; // size of each grid cell

function setup() {
  createCanvas(800, 500);
  noLoop(); // draw once, so the grid stays still
}

function draw() {
  background(20, 30, 50);
  noStroke();

  for (let x = spacing / 2; x < width; x += spacing) {
    for (let y = spacing / 2; y < height; y += spacing) {
      let size = random(5, spacing);
      fill(random(100, 255), random(150, 255), 200);

      if (random() < 0.5) {
        circle(x, y, size);
      } else {
        square(x - size / 2, y - size / 2, size);
      }
    }
  }
}

function mousePressed() {
  saveCanvas("random-grid", "png");
}

function keyPressed() {
  redraw(); // new random grid
}
