'use strict';

var gulp = require('gulp');

module.exports = function(options) {

	gulp.task('reload',function(done){
		if(options.electronServer){
			options.electronServer.reload();
		}
		done();
	});

	gulp.task('watch', gulp.series('scripts:watch', function watch(done) {
		// ! NEED to be split between assets and modules
		// ! it reduce over 80% the reload time
		gulp.watch(options.electronFiles.concat([
			options.src+'/index.html'
		]), gulp.series('electronFiles','reload'));

		done();
	}));


};

