// Generative Landscape 3 — "Layered Ridges"
// Stacked ridge lines built from additive waves (two sin() waves + noise()).
// Near the top they read as distant mountains, near the bottom as sea swell.
// Moving the mouse sideways raises a hill under the cursor; moving it up and
// down changes how rough the ridges are.
//
// Click the canvas to save a PNG. Press any key for a new noise seed.

// ---- tweak these to make your variations ----
let numLayers = 16; // how many ridges
let step = 6; // horizontal detail (smaller = smoother lines)
let freq1 = 0.01; // slow, wide wave
let freq2 = 0.043; // fast, small wave
let waveAmp = 18; // height of the sine waves
let noiseAmp = 90; // height of the noise hills
let noiseScale = 0.004; // smaller = broader hills
let speed = 0.004; // drift speed
let skyTop, skyBottom, nearColor, farColor;

function setup() {
  createCanvas(800, 500);
  skyTop = color(30, 20, 70);
  skyBottom = color(250, 140, 110);
  farColor = color(170, 110, 150);
  nearColor = color(15, 25, 60);
}

function draw() {
  let t = frameCount * speed;

  // sky gradient, one line at a time
  for (let y = 0; y < height; y++) {
    stroke(lerpColor(skyTop, skyBottom, y / height));
    line(0, y, width, y);
  }

  // sun with rings rippling out of it
  noStroke();
  for (let i = 6; i > 0; i--) {
    fill(255, 220, 160, 25 + sin(t * 40 - i) * 10);
    circle(width * 0.7, 130, 60 + i * 22);
  }
  fill(255, 235, 190);
  circle(width * 0.7, 130, 60);

  // mouseY controls roughness, mouseX places a hill
  let rough = map(mouseY, 0, height, 0.4, 1.6, true);

  for (let i = 0; i < numLayers; i++) {
    let pct = i / (numLayers - 1); // 0 = far, 1 = near
    let baseY = lerp(290, height + 30, pct);

    fill(lerpColor(farColor, nearColor, pct));
    stroke(255, 60);
    strokeWeight(1);

    beginShape();
    vertex(0, height);
    for (let x = 0; x <= width + step; x += step) {
      let w = sin(x * freq1 + t * 10 + i) * waveAmp + sin(x * freq2 - t * 15 + i * 0.7) * waveAmp * 0.4;
      let n = noise(x * noiseScale, i * 0.3, t) * noiseAmp * rough;
      let hill = map(abs(x - mouseX), 0, 120, 40, 0, true) * (1 - pct * 0.5);
      vertex(x, baseY - n - w * (0.3 + pct) - hill);
    }
    vertex(width, height);
    endShape(CLOSE);
  }
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    saveCanvas("layered-ridges", "png");
  }
}

function keyPressed() {
  noiseSeed(floor(random(10000)));
}
