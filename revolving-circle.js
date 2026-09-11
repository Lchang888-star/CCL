// Revolving circle: a small circle orbiting a fixed center on a canvas.

const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const orbitRadius = 100; // distance from the center
const circleRadius = 20; // size of the revolving circle
const speed = 0.02; // radians per frame

let angle = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // orbit path
  ctx.beginPath();
  ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
  ctx.strokeStyle = "#ccc";
  ctx.stroke();

  // current position on the orbit
  const x = centerX + orbitRadius * Math.cos(angle);
  const y = centerY + orbitRadius * Math.sin(angle);

  // the revolving circle
  ctx.beginPath();
  ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#e5484d";
  ctx.fill();

  angle += speed;
  requestAnimationFrame(draw);
}

draw();
