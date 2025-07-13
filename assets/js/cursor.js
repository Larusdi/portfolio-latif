/*===============================================================
🎯 CURSOR TRAIL EFFECT — Premium Motion for Latif Rusdi Website
📌 Efek jejak kursor dinamis dengan warna gradasi & animasi halus
🧠 Dibuat dengan JavaScript Vanilla · Performant & Elegant
===============================================================*/

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d",
  "#e36e5c", "#df685c", "#d5585c", "#d1525c", "#c5415d", "#c03b5d",
  "#b22c5e", "#ac265e", "#9c155f", "#950f5f", "#830060", "#7c0060",
  "#680060", "#60005f", "#48005f", "#3d005e"
];

function initCircles() {
  circles.forEach((circle, index) => {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
  });
}

window.addEventListener("mousemove", (e) => {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach((circle, index) => {
    const scale = (circles.length - index) / circles.length;
    circle.style.transform = `translate(${x - 12}px, ${y - 12}px) scale(${scale})`;

    circle.x = x;
    circle.y = y;

    const next = circles[index + 1] || circles[0];
    x += (next.x - x) * 0.3;
    y += (next.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

initCircles();
animateCircles();
