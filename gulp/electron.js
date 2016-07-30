'use strict';

var gulp = require('gulp');
var childProcess = require('child_process');
var electron = require('electron-prebuilt');

module.exports = function(options) {
	gulp.task('electron', gulp.series(function electronBuild(done) {
		childProcess.spawn(electron, ['./src'], {
			stdio: 'inherit'
		})
		.on('close', function () {
			// User closed the app. Kill the host process.
			process.exit();
		});

		done();
	},'watch'));
};
