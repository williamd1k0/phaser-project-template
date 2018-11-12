var CONFIGS = {
	type: Phaser.AUTO,
	parent: 'game',
	width: 800,
	height: 600,
	scene: [
		SampleSceneES6,
		SampleSceneES5,
	]
};

var game = new Phaser.Game(CONFIGS);
