let playerState = "ko";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (e) => {
	playerState = e.target.value;
});
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVA_WIDTH = (canvas.width = 600);
const CANVA_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "./Image/shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
const staggerFrames = 7;

const spriteAnimations = [];
const animationState = [
	{
		name: "idle",
		frames: 7,
	},
	{
		name: "jump",
		frames: 7,
	},
	{
		name: "fall",
		frames: 7,
	},
	{
		name: "run",
		frames: 9,
	},
	{
		name: "dizzy",
		frames: 11,
	},
	{
		name: "sit",
		frames: 5,
	},
	{
		name: "roll",
		frames: 7,
	},
	{
		name: "bite",
		frames: 7,
	},
	{
		name: "ko",
		frames: 12,
	},
	{
		name: "getHit",
		frames: 4,
	},
];

animationState.forEach((state, index) => {
	let frames = {
		loc: [],
	};
	for (let j = 0; j < state.frames; j++) {
		let positionX = j * spriteWidth;
		let positionY = index * spriteHeight;
		frames.loc.push({ x: positionX, y: positionY });
	}
	spriteAnimations[state.name] = frames;
});

function animate() {
	//ctx.fillRect(50, 50, 300, 150);
	ctx.clearRect(0, 0, CANVA_WIDTH, CANVA_HEIGHT);
	let position =
		Math.floor(gameFrame / staggerFrames) %
		spriteAnimations[playerState].loc.length;
	let frameX = spriteWidth * position;
	let frameY = spriteAnimations[playerState].loc[position].y;
	ctx.drawImage(
		playerImage,
		frameX,
		frameY,
		spriteWidth,
		spriteHeight,
		0,
		0,
		spriteWidth,
		spriteHeight
	);
	// if (gameFrame % staggerFrames == 0) {
	// 	if (frameX < 6) frameX++;
	// 	else frameX = 0;
	// }

	gameFrame++;
	requestAnimationFrame(animate);
}
animate();
