class Layer {
	constructor(game, width, height, speedModifier, image) {
		this.game = game;
		this.width = width;
		this.height = height;
		this.speedModifier = speedModifier;
		this.image = image;
		this.x = 0;
		this.y = 0;
	}
	update() {
		if (this.x < -this.width) this.x = 0;
		else this.x -= this.game.speed * this.speedModifier;
	}
	draw(context) {
		context.drawImage(this.image, this.x, this.y, this.width + 20, this.height);
		context.drawImage(
			this.image,
			this.x + this.width,
			this.y,
			this.width,
			this.height
		);
	}
}

export class Background {
	constructor(game) {
		this.game = game;
		this.width = 1667;
		this.height = 500;
		this.Layer5Image = document.getElementById("layer-5");
		this.Layer4Image = document.getElementById("layer-4");
		this.Layer3Image = document.getElementById("layer-3");
		this.Layer2Image = document.getElementById("layer-2");
		this.Layer1Image = document.getElementById("layer-1");

		this.layer1 = new Layer(
			this.game,
			this.width,
			this.height,
			0,
			this.Layer1Image
		);
		this.layer2 = new Layer(
			this.game,
			this.width,
			this.height,
			0.2,
			this.Layer2Image
		);
		this.layer3 = new Layer(
			this.game,
			this.width,
			this.height,
			0.4,
			this.Layer3Image
		);
		this.layer4 = new Layer(
			this.game,
			this.width,
			this.height,
			0.8,
			this.Layer4Image
		);
		this.layer5 = new Layer(
			this.game,
			this.width,
			this.height,
			1,
			this.Layer5Image
		);
		this.backgroundLayers = [
			this.layer1,
			this.layer2,
			this.layer3,
			this.layer4,
			this.layer5,
		];
	}

	update(deltaTime) {
		this.backgroundLayers.forEach((layer) => {
			layer.update();
		});
	}
	draw(context) {
		this.backgroundLayers.forEach((layer) => {
			layer.draw(context);
		});
	}
}
