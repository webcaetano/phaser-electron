'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'del']
});

module.exports = function(options) {
	gulp.task('clean', function () {
		return $.del([
			options.dist + '/',
			// options.tmp + '/'
		]);
	});

	gulp.task('electronFiles', gulp.series('inject', function () {
		return gulp.src(options.electronFiles,{ base: './src' })
		.pipe(gulp.dest(options.tmp + '/serve'));
	}));
};
