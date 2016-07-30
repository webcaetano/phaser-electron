var utils = require('./modules/utils');
var _ = require('lodash');
var Phaser = require('phaser');


var assets = {
	images:{
		phaser:'images/phaser-dude.png'
	},
	sprites:{},
	audio:{},
	atlas:{}
}
var scope = {};

// var atlas = {};
// atlas.loading = require('./data/loading.json');
// assets.atlas['loading'] = {
// 	image:'images/loading.png',
// 	json:utils.frameAtlas(atlas.loading)
// }


module.exports = function(game,rootScope){
	var state = {};

	var craft = require('craft')(game);

	state.init = function(){
	}

	state.preload = function(){
		game.stage.disableVisibilityChange = false;
		game.stage.backgroundColor = '#fff';
		utils.loadAssets(game,assets);
		game.load.start();
	}

	state.create = function(){
		var group = craft.$g();

		var sprite = craft.$sprite('phaser')
		.$set({
			x:100,
			y:100
		})
		.$into(group)
		.$mid()
		.$tint('#FF0000');

		var ball = craft.$circle({
			fill:'#FF0000',
			size:50
		}).$set({
			x:200,
			y:200,
		})
		.$into(group);

		var speed = {
			x:5,
			y:2,
		}

		ball.update = function(){
			ball.x += speed.x;
			ball.y += speed.y;
			if(ball.x+speed.x>=game.width) speed.x = -Math.abs(speed.x);
			if(ball.x+speed.x<=0) speed.x = Math.abs(speed.x);
			if(ball.y+speed.y>=game.height) speed.y = -Math.abs(speed.y);
			if(ball.y+speed.y<=0) speed.y = Math.abs(speed.y);
		}
	}

	return state;
}
