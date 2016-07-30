'use strict';

var gulp = require('gulp');
module.exports = function(options) {

	gulp.task('watch', gulp.series(function watch(done) {
		// gulp.watch(options.electronFiles, gulp.series('electronFiles'));

		// gulp.watch([
		// 	options.src+'/**/*.js'
		// ], gulp.series('bundle'));

		done();
	}));


};

