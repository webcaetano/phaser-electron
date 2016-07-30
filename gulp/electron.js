'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var childProcess = require('child_process');
var electron = require('electron-prebuilt');

module.exports = function(options) {
	gulp.task('electron', gulp.series('electronFiles', 'bundle', function electronBuild(done) {
		childProcess.spawn(electron, ['./dist'], {
			stdio: 'inherit'
		})
		.on('close', function () {
			// User closed the app. Kill the host process.
			process.exit();
		});

		done();
	},'watch'));

	gulp.task('electron:build', gulp.series('build', 'electron'));
};
