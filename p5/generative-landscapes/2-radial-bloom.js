// Generative Landscape 2 — "Radial Bloom"
// Rings of custom vertex shapes around a center. Each ring's radius is pushed
// out by sin() petals plus noise(), so it reads like a sun, a flower or a
// sea anemone. Mouse distance from the center opens and closes the bloom.
//
// Click the canvas to save a PNG. Press any key for a new noise seed.

// ---- tweak these to make your variations ----
let numRings = 14; // how many rings
let ringGap = 16; // distance between rings
let petals = 6; // sine bumps per ring (kaleidoscope symmetry)
let petalAmp = 12; // how deep the petals are
let noiseAmp = 30; // how much noise distorts each ring
let noiseScale = 0.8; // smaller = smoother rings
let twist = 0.12; // extra rotation per ring (spiral feel)
let speed = 0.008; // animation speed
let innerColor, outerColor, bgColor;

function setup() {
  createCanvas(800, 500);
  innerColor = color(255, 210, 90);
  outerColor = color(200, 40, 110);
  bgColor = color(25, 10, 35);
}

function draw() {
  background(bgColor);
  let t = frameCount * speed;

  // background dust: fixed random positions, twinkling with sin
  randomSeed(1);
  noStroke();
  for (let i = 0; i < 150; i++) {
    let x = random(width);
    let y = random(height);
    fill(255, 120 + sin(t * 20 + i) * 100);
    circle(x, y, random(1, 3));
  }

  // how open the bloom is depends on the mouse distance from the center
  let d = dist(mouseX, mouseY, width / 2, height / 2);
  let open = map(d, 0, 400, 1.6, 0.6, true);

  push();
  translate(width / 2, height / 2);

  // outer rings first so inner ones sit on top
  for (let r = numRings; r >= 1; r--) {
    let pct = r / numRings;
    let base = r * ringGap;
    let c = lerpColor(innerColor, outerColor, pct);

    fill(red(c), green(c), blue(c), 180);
    stroke(bgColor);
    strokeWeight(1.5);

    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.03) {
      // cos/sin inside noise make the ring close up without a seam
      let n = noise(cos(a * 2) * noiseScale + r * 0.1, sin(a * 2) * noiseScale, t);
      let petal = sin(a * petals + t * 5 + r * twist) * petalAmp * pct * open;
      let rad = base + petal + (n - 0.5) * noiseAmp * pct * open;
      vertex(cos(a + r * twist) * rad, sin(a + r * twist) * rad);
    }
    endShape(CLOSE);

    // dots riding each ring, one per petal
    noStroke();
    fill(255, 240, 200, 200);
    for (let p = 0; p < petals * 2; p++) {
      let a = (TWO_PI / (petals * 2)) * p + t * (r % 2 === 0 ? 1 : -1);
      circle(cos(a) * base, sin(a) * base, 3 + pct * 4);
    }
  }
  pop();
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    saveCanvas("radial-bloom", "png");
  }
}

function keyPressed() {
  noiseSeed(floor(random(10000)));
}
