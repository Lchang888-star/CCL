// Two triangles that appear while the mouse is held down.

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250);

  if (mouseIsPressed) {
    twoTriangles();
  }
}

function twoTriangles() {
  push(); // keep the fill and stroke changes to ourselves

  noStroke();

  fill("#e5484d");
  triangle(100, 250, 200, 100, 300, 250); // pointing up

  fill("#3b7ddd");
  triangle(100, 150, 200, 300, 300, 150); // pointing down

  pop();
}
