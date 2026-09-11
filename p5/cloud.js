// A grey cloud that follows the mouse.

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(160, 200, 235); // sky
  cloud(mouseX, mouseY);
}

function cloud(x, y) {
  push(); // keep the move and the fill to ourselves
  translate(x, y); // everything below is drawn around the mouse

  noStroke();
  fill(150); // grey

  ellipse(0, 15, 100, 45); // flat base
  ellipse(-40, 10, 70, 50); // left puff
  ellipse(40, 10, 70, 50); // right puff
  ellipse(-15, -10, 80, 65); // tall middle puff
  ellipse(20, -18, 70, 60); // smaller top puff

  pop();
}
