/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 800;

ctx.beginPath();
ctx.moveTo(250, 400);
ctx.lineTo(250, 0);

ctx.stroke();
