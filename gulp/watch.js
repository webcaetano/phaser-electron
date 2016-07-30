'use strict';

var gulp = require('gulp');
// var batch = require('gulp-batch');
var browserSync = require('browser-sync');

module.exports = function(options) {

	gulp.task('watch', gulp.series(function watch(done) {
		gulp.watch(options.electronFiles, gulp.series('electronFiles'));

		gulp.watch([
			options.src+'/**/*.js'
		], gulp.series('bundle'));

		done();
	}));


};

// watch('src/**/*.js', batch(function (events, done) {
//     gulp.start('bundle-watch', done);
// }));
// watch(paths.copyFromAppDir, { cwd: 'src' }, batch(function (events, done) {
//     gulp.start('copy-watch', done);
// }));
