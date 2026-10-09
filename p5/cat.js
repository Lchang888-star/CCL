// A cat creature that follows the mouse, swishing its tail and blinking.

let tailAngle = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250, 235, 215); // warm floor
  cat(mouseX, mouseY);
}

function cat(x, y) {
  push(); // keep the move, fill and stroke to ourselves
  translate(x, y); // everything below is drawn around the mouse

  stroke(60);
  strokeWeight(2);
  fill(240, 150, 60); // orange tabby

  // tail, drawn first so the body sits on top of it
  push();
  translate(35, 40);
  rotate(sin(tailAngle) * 0.4);
  noFill();
  strokeWeight(10);
  stroke(240, 150, 60);
  bezier(0, 0, 40, -10, 50, -50, 30, -70);
  pop();
  tailAngle += 0.08;

  ellipse(0, 45, 90, 80); // body
  ellipse(-20, 80, 25, 15); // left paw
  ellipse(20, 80, 25, 15); // right paw

  triangle(-35, -30, -30, -70, -5, -40); // left ear
  triangle(35, -30, 30, -70, 5, -40); // right ear
  fill(250, 180, 190); // pink inner ears
  triangle(-30, -36, -28, -60, -12, -40);
  triangle(30, -36, 28, -60, 12, -40);

  fill(240, 150, 60);
  ellipse(0, -15, 85, 70); // head

  // eyes, closed for a few frames every couple of seconds
  if (frameCount % 150 < 8) {
    line(-24, -20, -8, -20);
    line(8, -20, 24, -20);
  } else {
    fill(120, 200, 90); // green eyes
    ellipse(-16, -20, 16, 18);
    ellipse(16, -20, 16, 18);
    fill(20);
    ellipse(-16, -20, 4, 14); // slit pupils
    ellipse(16, -20, 4, 14);
  }

  fill(250, 140, 160);
  triangle(-5, -6, 5, -6, 0, 0); // nose
  noFill();
  arc(-5, 0, 10, 10, 0, PI); // mouth
  arc(5, 0, 10, 10, 0, PI);

  // whiskers
  strokeWeight(1);
  line(-12, -3, -45, -10);
  line(-12, 0, -45, 2);
  line(12, -3, 45, -10);
  line(12, 0, 45, 2);

  pop();
}
