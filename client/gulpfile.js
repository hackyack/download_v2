'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

gulp.task('sass', function () {
	gulp.src('./sass/**/*.scss')
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
});