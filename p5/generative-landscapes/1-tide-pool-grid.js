// Generative Landscape 1 — "Tide Pool Grid"
// A grid of circles that swell and drift with noise() + sin(), like light
// on the floor of a shallow sea. Move the mouse to stir the water.
//
// Click the canvas to save a PNG. Press any key for a new noise seed.

// ---- tweak these to make your variations ----
let spacing = 25; // distance between grid cells (try 15, 40)
let noiseScale = 0.08; // smaller = smoother, bigger blobs
let waveFreq = 0.15; // how tight the sine ripples are
let speed = 0.01; // how fast the pattern drifts (0 = frozen)
let maxSize = 22; // largest circle diameter
let wobble = 0.6; // how far circles are displaced from the grid (0 = strict)
let mouseRadius = 150; // how far the mouse reaches
let deepColor, shallowColor, glowColor;

function setup() {
  createCanvas(800, 500);
  deepColor = color(10, 35, 80);
  shallowColor = color(40, 180, 185);
  glowColor = color(255, 225, 140);
  noStroke();
}

function draw() {
  background(5, 15, 35);
  let t = frameCount * speed;

  for (let x = spacing / 2; x < width; x += spacing) {
    for (let y = spacing / 2; y < height; y += spacing) {
      let col = x / spacing;
      let row = y / spacing;

      // noise gives organic blobs, sin adds a regular diagonal ripple
      let n = noise(col * noiseScale, row * noiseScale, t);
      let wave = sin(col * waveFreq + row * waveFreq * 0.5 + t * 3) * 0.5 + 0.5;
      let v = constrain(n * 0.7 + wave * 0.3, 0, 1);

      // closer to the mouse = bigger and brighter
      let d = dist(mouseX, mouseY, x, y);
      let near = constrain(map(d, 0, mouseRadius, 1, 0), 0, 1);

      // drift each circle a little off the grid
      let offX = (noise(col * 0.3, row * 0.3, t + 100) - 0.5) * spacing * wobble;
      let offY = (noise(col * 0.3, row * 0.3, t + 200) - 0.5) * spacing * wobble;

      let c = lerpColor(deepColor, shallowColor, v);
      c = lerpColor(c, glowColor, near * 0.8);
      fill(c);
      circle(x + offX, y + offY, v * maxSize + near * maxSize * 0.6);
    }
  }
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    saveCanvas("tide-pool-grid", "png");
  }
}

function keyPressed() {
  noiseSeed(floor(random(10000)));
}
