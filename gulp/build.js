'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var exec = require('sync-exec');
var surge = require('gulp-surge');
var jetpack = require('fs-jetpack');
var bundle = require('./bundle');
var Q = require('q');

var $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'del']
});

module.exports = function(options) {
	// gulp.task('html', gulp.series('inject', function html() {
	// 	var assets;
	// 	return gulp.src(options.tmp + '/serve/*.html')
	// 		// .pipe($.rev())
	// 		.pipe($.useref())
	// 		.pipe($.if('*.js', $.preprocess({context: {dist: true}})))
	// 		.pipe($.if('*.js', $.uglify()))
	// 		.pipe($.if('*.html', $.preprocess({context: {dist: true}})))
	// 		.pipe($.if('*.html', $.minifyHtml({empty: true,	spare: true, quotes: true, conditionals: true})))
	// 		// .pipe($.if('*.js', $.rev()))
	// 		// .pipe($.revReplace())

	// 		.pipe(gulp.dest(options.dist + '/'))
	// 		.pipe($.size({ title: options.dist + '/', showFiles: true }));
	// }));


	gulp.task('bundle', function () {
	    return Q.all([
			bundle(options.src+'/electron.js', options.dist+'/electron.js'),
			bundle(options.src+'/scripts/index.js', options.dist+'/scripts/index.js'),
		]);
	});


	gulp.task('other', function () {
		return gulp.src([
			options.src + '/images/**/*',
		],{ base: './src' })
		.pipe(gulp.dest(options.dist + '/'));
	});

	gulp.task('electronFiles', gulp.series('inject', function () {
		return gulp.src(options.electronFiles,{ base: './src' })
		.pipe(gulp.dest(options.dist + '/'));
	}));


	gulp.task('clean', function () {
		return $.del([
			options.dist + '/',
			options.tmp + '/'
		]);
	});


	gulp.task('prepare',gulp.series('clean','other'));

	gulp.task('build',gulp.series('prepare'));

	gulp.task('deploy',function(done){
		var c = [
			'cd dist',
			'git init',
			'git add .',
			'git commit -m "Deploy to Github Pages"',
			'git push --force git@github.com:webcaetano/phaser-boilerplate.git master:gh-pages' // change adress to you repo
		].join(" && ")
		console.log(exec(c));
		done();
	})

	// gulp.task('deploy:build',gulp.series('build','d'));

	gulp.task('surge', function () {
		return surge({
			project: './dist',         // Path to your static build directory
			domain: 'phaser-boilerplate.surge.sh'  // Your domain or Surge subdomain
		})
	});

	gulp.task('surge:build',gulp.series('build','surge'));
};
