
var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	babel = require("gulp-babel"),
	minify = require("gulp-babel-minify"),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	download = require("gulp-download"),
	browser_sync = require('browser-sync'),
	fs = require('fs'),
	argv = require('yargs').argv;

var dist = (argv.dist === undefined) ? false : true;

var js_sources = [
	'src/**/*.js'
];
var babel_presets = {"presets": [
	["env", {
	  "targets": {
		"browsers": [ ">0.25%", "not op_mini all"]
	  }
	}]
]};

var dist_path = dist ? 'build/dist/' : 'build/dev/';
var assets_path = dist ? 'build/dist/assets/' : 'build/dev/assets/';

var phaser = require('./package.json').phaser;
var phaser_cdn = `https://cdn.jsdelivr.net/gh/photonstorm/phaser@${phaser}/dist/phaser.js`;
var phasermin_cdn = `https://cdn.jsdelivr.net/gh/photonstorm/phaser@${phaser}/dist/phaser.min.js`;
var phaser_defs = 'https://github.com/photonstorm/phaser3-docs/raw/master/typescript/phaser.d.ts';

gulp.task('js', function() {
	if (dist) {
		fs.createReadStream('phaser/phaser.min.js')
			.pipe(fs.createWriteStream(dist_path+'phaser.js'));
			
		gulp.src(js_sources)
			.pipe(plumber())
			.pipe(concat('main.js'))
			.pipe(babel(babel_presets))
			.pipe(minify())
			.pipe(gulp.dest(dist_path));
	} else {
		gulp.src('phaser/phaser.js')
			.pipe(gulp.dest(dist_path));

		gulp.src(js_sources)
			.pipe(plumber())
			.pipe(sourcemaps.init())
				.pipe(concat('main.js'))
				.pipe(babel(babel_presets))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(dist_path))
			.pipe(browser_sync.reload({stream:true}));
	}
});

gulp.task('assets', ['html'], function() {
	gulp.src('assets/**')
		.pipe(plumber())
		.pipe(gulp.dest(assets_path));
});

gulp.task('html', function() {
	gulp.src('src/*.html')
		.pipe(plumber())
		.pipe(gulp.dest(dist_path));
});

gulp.task('sync', function() {
	browser_sync({
		server: {
			baseDir: dist_path
		}
	});
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['js']);
});

gulp.task('update', function() {
	download(phaser_cdn)
		.pipe(gulp.dest('phaser/'));
	download(phasermin_cdn)
		.pipe(gulp.dest('phaser/'));
	download(phaser_defs)
		.pipe(gulp.dest('typings/'));
});

gulp.task('build', function() {
	if (!fs.existsSync('phaser') || !fs.existsSync('typings')) {
		gulp.start('update');
		console.warn('[gulp] Updating Phaser, try building again.');
	} else {
		gulp.start('js');
		gulp.start('assets');
	}
});

gulp.task('default', ['build', 'sync', 'watch']);
