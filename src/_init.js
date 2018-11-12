var CONFIGS = {
	type: Phaser.AUTO,
	parent: 'game',
	width: 800,
	height: 600,
	scene: [
		SampleScene
	]
};

var game = new Phaser.Game(CONFIGS);
