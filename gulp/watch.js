'use strict';

var gulp = require('gulp');

module.exports = function(options) {

	// gulp.task('reload',function(done){
	// 	if(options.electronServer){
	// 		options.electronServer.reload();
	// 	}
	// 	done();
	// });

	gulp.task('watch', gulp.series('scripts:watch', function watch(done) {
		// gulp.watch([
		// 	options.src+'/**/*.js'
		// ], gulp.series('reload'));

		done();
	}));


};

