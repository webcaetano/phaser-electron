'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var _ = require('lodash');

var options = {
	src: 'src',
	dist: 'dist',
	tmp: '.tmp',
	errorHandler: function(title) {
		return function(err) {
			gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
			this.emit('end');
		};
	}
};

options.electronFiles = [
	options.src + '/bower_components/**/*',
	options.src + '/package.json',
	options.src + '/electron.js',
	options.src + '/helpers/**/*',
	options.src + '/node_modules/**/*',
	options.src + '/images/**/*',
	// options.src + '/**/*.html',
]

_.each([
	'scripts.js',
	'inject.js',
	'build.js',
	'github.js',
	'watch.js',
	'electron.js',
],function(file){
	require('./gulp/' + file)(options);
})

gulp.task('default', gulp.series('clean','electron'));
