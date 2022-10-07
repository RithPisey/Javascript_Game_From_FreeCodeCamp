/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGTH = (canvas.height = 1000);

const numberOfEnemy = 10;
const enemiesArray = [];

const enemeyImage = new Image();
enemeyImage.src = "./Image/enemy1.png";

let gameFrame = 0;

class Enemy {
	constructor(image, spriteWidth, spriteHeight) {
		this.image = new Image();
		this.image.src = image;

		this.speed = Math.random() * 4 + 1;
		this.spriteWidth = spriteWidth;
		this.spriteHeight = spriteHeight;
		this.width = this.spriteWidth / 2;
		this.height = this.spriteHeight / 2;
		this.x = Math.random() * (canvas.width - this.width);
		this.y = Math.random() * (canvas.height - this.height);
		this.newX = Math.random() * (canvas.width - this.width);
		this.newY = Math.random() * (canvas.height - this.height);

		this.frame = 0;
		this.flapSpeed = Math.floor(Math.random() * 3 + 1);
		this.angle = Math.floor(Math.random() * 361); //<--
		this.angleSpeed = Math.random() * 2;
		this.curve = Math.random() * 200;

		this.interval = Math.floor(Math.random() * 200 + 50);
	}
	update() {
		// this.x += Math.random() * 5 - 2.5;
		// this.y += Math.random() * 5 - 2.5;

		// this.x -= this.speed;
		// this.y += this.curve * Math.sin(this.angle);

		// this.x =
		// 	(canvas.width / 2) * Math.sin((this.angle * Math.PI) / 90) +
		// 	canvas.width / 2 -
		// 	this.width / 2;
		// this.y =
		// 	(canvas.height / 2) * Math.cos((this.angle * Math.PI) / 180) +
		// 	canvas.height / 2 -
		// 	this.height / 2;

		if (gameFrame % this.interval === 0) {
			this.newX = Math.random() * (CANVAS_WIDTH - this.width);
			this.newY = Math.random() * (CANVAS_HEIGTH - this.height);
		}

		let dx = this.x - this.newX;
		let dy = this.y - this.newY;
		this.x -= dx / 70;
		this.y -= dy / 70;

		// this.angle += this.angleSpeed;
		//this.y -= this.speed;
		if (this.x + this.width < 0) this.x = canvas.width;
		if (gameFrame % this.flapSpeed === 0) {
			this.frame > 4 ? (this.frame = 0) : this.frame++;
		}
	}
	draw() {
		//ctx.strokeRect(this.x, this.y, this.width, this.height);
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

for (let index = 0; index < numberOfEnemy; index++) {
	//enemiesArray.push(new Enemy("./Image/enemy3.png", 218, 177));
	enemiesArray.push(new Enemy("./Image/enemy4.png", 213, 213));
}

function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);

	enemiesArray.forEach((enemy) => {
		enemy.update();
		enemy.draw();
	});
	gameFrame++;
	requestAnimationFrame(animate);
}
animate();
