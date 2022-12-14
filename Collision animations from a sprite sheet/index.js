/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
const explosion = [];
let canvasPosition = canvas.getBoundingClientRect();

ctx.fillStyle = "red";
ctx.fillRect(100, 100, 200, 200);
class Explosion {
	constructor(x, y) {
		this.spriteWidth = 200;
		this.spriteHeight = 179;
		this.width = this.spriteWidth / 2;
		this.height = this.spriteHeight / 2;

		this.x = x;
		this.y = y;
		this.image = new Image();
		this.image.src = "boom.png";
		this.frame = 0;
		this.timer = 0;
		this.angle = Math.random() * 6.2;

		this.soundFx = new Audio();
		this.soundFx.src = "steam-hisses1.wav";
	}

	update() {
		if (this.frame === 0) {
			this.soundFx.play();
		}
		this.timer++;
		if (this.timer % 10 === 0) {
			this.frame++;
		}
	}
	draw() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		// ctx.drawImage(
		// 	this.image,
		// 	this.spriteWidth * this.frame,
		// 	0,
		// 	this.spriteWidth,
		// 	this.spriteHeight,
		// 	this.x,
		// 	this.y,
		// 	this.width,
		// 	this.height
		// );
		ctx.drawImage(
			this.image,
			this.spriteWidth * this.frame,
			0,
			this.spriteWidth,
			this.spriteHeight,
			0 - this.width / 2,
			0 - this.height / 2,
			this.width,
			this.height
		);

		ctx.restore();
	}
}

window.addEventListener("click", (e) => {
	createAnimation(e);

	// ctx.fillStyle = "white";
	// ctx.fillRect(positionX - 25, positionY - 25, 50, 50);
});
// window.addEventListener("mousemove", (e) => {
// 	createAnimation(e);

// 	// ctx.fillStyle = "white";
// 	// ctx.fillRect(positionX - 25, positionY - 25, 50, 50);
// });

function createAnimation(e) {
	let positionX = e.x - canvasPosition.left;
	let positionY = e.y - canvasPosition.top;

	explosion.push(new Explosion(positionX, positionY));
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < explosion.length; i++) {
		explosion[i].update();
		explosion[i].draw();

		if (explosion[i].frame == 5) {
			explosion.splice(i, 1);
			i--;
		}
	}
	requestAnimationFrame(animate);
}
animate();
