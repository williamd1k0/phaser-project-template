
var SampleScene = new Phaser.Class({
	Extends: Phaser.Scene,

	initialize: function SampleScene() {
		Phaser.Scene.call(this, { key: 'Sample' });
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
		console.log('Create Sample');
	}

});