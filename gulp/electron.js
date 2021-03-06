'use strict';

var gulp = require('gulp');
var childProcess = require('child_process');
var electron = require('electron-prebuilt');
var electronServer = require('electron-connect').server.create({
	path:'./.tmp/serve'
});

module.exports = function(options) {
	gulp.task('electron', gulp.series('electronFiles', function electronBuild(done) {
		electronServer.start();
		options.electronServer = electronServer;
		// gulp.series('watch')();

		done();
	},'watch'));
};
