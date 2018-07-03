/**
 * Default gulpfile. Compile, concat, minify .coffee, .sass, fonts, images, and Vendor JS
 */
 /*=================================
 =            Variables            =
 =================================*/

var moduleName    = 'bc-ui-styles';
var moduleTitle   = 'BeacuseCode Base CSS';

/*--  Shouldn't need to change these  --*/
var outputScriptName = moduleName+'.js';
var outputStyleName  = moduleName+'.css';

/*================================
=            Requires            =
================================*/

var coffee  = require('gulp-coffee');
var concat  = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var del     = require('del');
var gulp    = require('gulp');
var gutil   = require('gulp-util');
var header  = require('gulp-header');
var rename  = require('gulp-rename');
var sass    = require('gulp-sass');
var uglify  = require('gulp-uglify');


/*----------  Banner Text  ----------*/
var banner = ['/**',
	' * ' + moduleTitle,
	' * @author BeacuseCode',
	' * @link https://github.com/chrisbrady/' + moduleName,
	' * Copyright ' + new Date().getFullYear() + ' BecauseCode',
	' */',
	''].join('\n');

/*=============================
=            Tasks            =
=============================*/

/*----------  Clean  ----------*/
/**
 * Empty dist folder
 */

gulp.task('clean', function(){
	return del(['dist/'])
});

/*----------  Scripts  ----------*/
/**
 * Compile coffee, log errors, concat with rename, minifiy, add banner, save, update ui
 */
gulp.task('script', [ 'clean' ], function() {
	return gulp.src(['src/coffee/**/*.coffee'])
		.pipe(coffee()).on('error', gutil.log)
		.pipe(concat(outputScriptName))
		.pipe(uglify())
		.pipe(header(banner))
		.pipe(gulp.dest('dist/'))
});

/*----------  Styles  ----------*/
/**
 * Compile scss, log errors, add together with rename, minify, add banner, save, update ui
 */
gulp.task('style', [ 'clean' ], function(){
	return gulp.src(['src/**/*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(cssnano())
		.pipe(header(banner))
		.pipe(gulp.dest('dist/'))
});



/*----------  Individual Tasks  ----------*/
gulp.task('default', ['clean','script','style']);
