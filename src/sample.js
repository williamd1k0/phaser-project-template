
var SampleSceneES5 = new Phaser.Class({
	Extends: Phaser.Scene,

	initialize: function SampleScene() {
		Phaser.Scene.call(this, { key: 'SampleSceneES5' });
	},

	preload: function() {
		this.load.image('logo', 'assets/logo.png');
	},

	create: function() {
		var logo = this.add.image(400, 150, 'logo');

		this.tweens.add({
			targets: logo,
			y: 450,
			duration: 2000,
			ease: 'Power2',
			yoyo: true,
			loop: -1
		});
		
		this.input.once("pointerdown", function() {
			this.scene.start('SampleSceneES6');
		}, this);
		console.log('Create SampleSceneES5');
	}

});

class SampleSceneES6 extends Phaser.Scene {
	constructor() {
		super({ key: 'SampleSceneES6' });
	}

	preload() {
		this.load.image('logo', 'assets/logo.png');
	}

	create() {
		var logo = this.add.image(400, 150, 'logo');

		this.tweens.add({
			targets: logo,
			y: 450,
			duration: 2000,
			ease: 'Power2',
			yoyo: true,
			loop: -1
		});

		this.input.once("pointerdown", () => {
			this.scene.start('SampleSceneES5');
		});
		console.log('Create SampleSceneES6');
	}
}