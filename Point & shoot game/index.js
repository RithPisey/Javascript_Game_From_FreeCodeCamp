/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById("collisionCanvas");

const collisionCtx = collisionCanvas.getContext("2d");
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;
let score = 0;
ctx.font = "50px Impact";
let gameOver = false;

let ravens = [];
let ravensParticles = [];
let explosions = [];

class Raven {
	constructor() {
		this.spriteWidth = 271;
		this.spriteHeight = 194;

		this.sizeModifier = Math.random() * 0.6 + 0.4;
		this.width = this.spriteWidth * this.sizeModifier;
		this.height = this.spriteHeight * this.sizeModifier;
		this.x = canvas.width;
		this.y = Math.random() * (canvas.height - this.height);
		this.directionX = Math.random() * 5 + 3;
		this.directionY = Math.random() * 5 - 2.5;
		this.markedForDeleteion = false;
		this.image = new Image();
		this.image.src = "raven.png";
		this.frame = 0;
		this.maxFrame = 4;
		this.timeSinceFlap = 0;
		this.flapInterval = Math.random() * 50 + 50;
		this.randomColors = [
			Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255),
		];
		this.color = `rgb(${this.randomColors[0]},${this.randomColors[1]},${this.randomColors[2]})`;
	}
	update(deltatime) {
		if (this.y < 0 || this.y > canvas.height - this.height) {
			this.directionY = this.directionY * -1;
		}
		this.x -= this.directionX - 3;
		this.y += this.directionY;
		if (this.x < 0 - this.width) this.markedForDeleteion = true;
		this.timeSinceFlap += deltatime;
		if (this.timeSinceFlap > this.flapInterval) {
			if (this.frame > this.maxFrame) this.frame = 0;
			else this.frame++;
			this.timeSinceFlap = 0;

			setInterval(() => {
				ravensParticles.push(
					new RavenParticle(this.width, this.color, this.x, this.y)
				);
			}, 50);
		}

		if (this.x < 0 - this.width) {
			gameOver = true;
		}
	}
	draw() {
		collisionCtx.fillStyle = this.color;
		collisionCtx.fillRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(
			this.image,
			this.frame * this.spriteWidth,
			0,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
}

class Explosion {
	constructor(x, y, size) {
		this.image = new Image();
		this.image.src = "smoke.png";
		this.spriteWidth = 200;
		this.spriteHeight = 179;
		this.size = size;
		this.x = x;
		this.y = y;
		this.frame = 0;
		this.sound = new Audio();
		this.sound.src = "steam-hisses1.wav";
		this.timeSinceLastFrame = 0;
		this.frameInterval = 150;
		this.markedForDeleteion = false;
	}
	update(deltatime) {
		if (this.frame === 0) this.sound.play();
		this.timeSinceLastFrame += deltatime;
		if (this.timeSinceLastFrame > this.frameInterval) {
			this.frame++;
			this.timeSinceLastFrame = 0;
			if (this.frame > 5) this.markedForDeleteion = true;
		}
	}
	draw() {
		ctx.drawImage(
			this.image,
			this.frame * this.spriteWidth,
			0,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y - this.size / 4,
			this.size,
			this.size
		);
	}
}
class RavenParticle {
	constructor(size, color, x, y) {
		this.size = size;
		this.x = x + this.size / 2 + Math.random() * 50 - 25;
		this.y = y + this.size / 3 + Math.random() * 50 - 25;
		this.radius = (Math.random() * this.size) / 10;
		this.maxRadius = Math.random() * 20 + 35;
		this.markedForDeleteion = false;
		this.speedX = Math.random() * 1 + 0.5;
		this.color = `rgb(48, 48, 48)`;
		this.hasTrail = true;
	}
	update() {
		this.x += this.speedX;
		this.radius += 0.3;
		if (this.radius > this.maxRadius - 10) this.markedForDeleteion = true;
	}
	draw() {
		ctx.save();
		ctx.beginPath();
		ctx.globalAlpha = 1 - this.radius / this.maxRadius;

		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
}

function drawScore() {
	ctx.fillStyle = "black";
	ctx.fillText("Score: " + score, 50, 75);

	ctx.fillStyle = "white";
	ctx.fillText("Score: " + score, 55, 80);
}
function drawGameOver() {
	ctx.textAlign = "center";
	ctx.fillStyle = "black";
	ctx.fillText(
		"GAME OVER, Your Score is " + score,
		canvas.width / 2,
		canvas.height / 2
	);
	ctx.fillStyle = "white";
	ctx.fillText(
		"GAME OVER, Your Score is " + score,
		canvas.width / 2,
		canvas.height / 2 + 5
	);
}

window.addEventListener("click", (e) => {
	const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
	const pc = detectPixelColor.data;
	ravens.forEach((obj) => {
		if (
			obj.randomColors[0] === pc[0] &&
			obj.randomColors[1] === pc[1] &&
			obj.randomColors[2] === pc[2]
		) {
			// collision detect
			obj.markedForDeleteion = true;
			score++;
			explosions.push(new Explosion(obj.x, obj.y, obj.width));
		}
	});
});

function animate(timestamp) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	collisionCtx.clearRect(0, 0, canvas.width, canvas.height);

	let deltatime = timestamp - lastTime;

	lastTime = timestamp;
	timeToNextRaven += deltatime;

	if (timeToNextRaven > ravenInterval) {
		ravens.push(new Raven());
		timeToNextRaven = 0;
		ravens.sort((a, b) => {
			return a.width - b.width;
		});
	}
	drawScore();
	[...ravensParticles, ...ravens, ...explosions].forEach((Object) =>
		Object.update(deltatime)
	);
	[...ravensParticles, ...ravens, ...explosions].forEach((Object) =>
		Object.draw()
	);
	ravens = ravens.filter((object) => !object.markedForDeleteion);
	explosions = explosions.filter((object) => !object.markedForDeleteion);
	ravensParticles = ravensParticles.filter(
		(object) => !object.markedForDeleteion
	);
	!gameOver ? requestAnimationFrame(animate) : drawGameOver();
}

animate(0);
