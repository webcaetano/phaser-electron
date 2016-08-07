var fs = require('fs');
var Phaser = require('phaser');
var main = require('./main');
var pkg = JSON.parse(String(fs.readFileSync('package.json')))

var setup = {
	options:{
		width:700,
		height:500,
		where:'master-canvas'
	},
}

console.log('%c Phaser Electron Boilerplate v'+pkg.version+' ', 'background: #002874; color: #ffffff');

// @if !dist
require('./modules/stats')();
// @endif

var game = main.game = new Phaser.Game(
	setup.options.width,
	setup.options.height,
	Phaser.CANVAS,
	setup.options.where,
	null
);

main.craft = require('craft')(game);

game.state.add('game', require('./game'));
game.state.add('preload', require('./preload'));

game.state.start('preload');
