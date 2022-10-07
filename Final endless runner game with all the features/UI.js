export class UI {
	constructor(game) {
		this.game = game;
		this.fontSize = 30;
		this.fontFamily = "Helvetica";
		this.livesImage = document.getElementById("lives");
	}
	draw(context) {
		context.save();
		context.shadowOffsetX = 2;
		context.shadowOffsetY = 2;
		context.shadowColor = "white";
		context.shadowBlur = 0;
		context.font = this.fontSize + "px " + this.fontFamily;
		context.textAlign = "left";
		context.fillStyle = this.game.fontColor;

		//score
		context.fillText("Score: " + this.game.score, 20, 50);

		//timer
		context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
		context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80);

		//lives
		for (let index = 0; index < this.game.lives; index++) {
			context.drawImage(this.livesImage, 25 * index + 20, 95, 25, 25);
		}

		//game over messages
		if (this.game.gameOver) {
			context.textAlign = "center";
			context.font = this.fontSize * 2 + "px " + this.fontFamily;

			if (this.game.score > this.game.winningScore) {
				context.fillText(
					"Boo-yah",
					this.game.width * 0.5,
					this.game.height * 0.5
				);
				context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
				context.fillText(
					"What are creatrues of the night afraid of? You!!!",
					this.game.width * 0.5,
					this.game.height * 0.5 + 20
				);
			} else {
				context.fillText(
					"Love at first bite?",
					this.game.width * 0.5,
					this.game.height * 0.5
				);
				context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
				context.fillText(
					"Nope, Better luck next timer!",
					this.game.width * 0.5,
					this.game.height * 0.5 + 20
				);
			}
		}
		context.restore();
	}
}
