'use strict';

var gulp = require('gulp');
// var browserSync = require('browser-sync');
var gutil = require('gulp-util');
var fs = require('fs');
var _ = require('lodash');
var $ = require('gulp-load-plugins')();;


module.exports = function(options) {
	var nodeModules = _.reduce([
		'assert',
		'buffer',
		'child_process',
		'cluster',
		'console',
		'constants',
		'crypto',
		'dgram',
		'dns',
		'domain',
		'events',
		'fs',
		'http',
		'https',
		'module',
		'net',
		'os',
		'path',
		'process',
		'punycode',
		'querystring',
		'readline',
		'repl',
		'stream',
		'string_decoder',
		'timers',
		'tls',
		'tty',
		'url',
		'util',
		'v8',
		'vm',
		'zlib'
	],function(resp,val,i){
		resp[val] = "require('"+val+"')";

		return resp;
	},{});

	var bowerModules = JSON.parse(fs.readFileSync('./bower.json','utf8')).externals;

	function webpack(watch=false, callback=null, reload=null) {
		var webpackOptions = {
			watch: watch,
			cache: watch,
			module: {
				loaders: [
					// { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
					// { test: /\.json$/, exclude: /node_modules/, loader: 'json'}
				]
			},
			plugins:[function(){
				this.plugin("done", function(stats){
					if (stats.compilation.errors && stats.compilation.errors.length)gutil.beep();
				});
			}],
			externals: _.extend({},bowerModules,nodeModules),
			output: { filename: 'index.js' }
		};

		if(watch) webpackOptions.devtool = 'inline-source-map';

		var webpackChangeHandler = function(err, stats) {
			if(err) {
				options.errorHandler('WEBPACK')(err);
			}
			$.util.log(stats.toString({
				colors: $.util.colors.supportsColor,
				chunks: false,
				hash: false,
				version: false
			}));
			if(reload && options.electronServer) {
				options.electronServer.reload();
			}
			if(watch) {
				watch = false;
				callback();
			}
		};

		return gulp.src(options.src + '/scripts/index.js')
			.pipe($.webpack(webpackOptions, null, webpackChangeHandler))
			.pipe(gulp.dest(options.tmp + '/serve/scripts'))
	}

	gulp.task('scripts', function () {
		return webpack(false);
	});

	gulp.task('scripts:watch', function (callback) {
		return webpack(true, callback, true);
	});
};
