var gulp 		= require('gulp'),
	gutil 		= require('gulp-util'),
	jshint		= require('gulp-jshint'),
	concat		= require('gulp-concat'),
	rename		= require('gulp-rename'),
	uglify		= require('gulp-uglify'),
	sass 		= require('gulp-sass'),
	sourcemaps	= require('gulp-sourcemaps'),
	prefix		= require('gulp-autoprefixer'),
	filter		= require('gulp-filter'),
	bs			= require('browser-sync'),
	reload		= bs.reload;

var src = {
	scss 		: '_src/scss/*.scss',
	css  		: 'css',
	js   		: '_src/js/*.js',
	jsmin		: 'js',
	html  		: '*.html'
};

gulp.task('jshint', function() {
	gulp.src([src.js, './gulpfile.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', function() {
	return gulp.src(src.js)
		.pipe(uglify())
		.pipe(sourcemaps.init())
			.pipe(concat('index.min.js', {newLine: '\n'}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(src.jsmin));
});

gulp.task('build-css', function () {
	gulp.src(src.scss)
		.pipe(sourcemaps.init()) // Process the original sources
			.pipe(sass({
				errLogToConsole: true,
				outputStyle: 'compressed'
			}))
			.pipe(prefix({
				browsers: ['last 2 versions'],
				cascade: true
			})) // Autoprefixer FTW
		.pipe(sourcemaps.write('./')) // Add the map to the modified source.
		.pipe(gulp.dest(src.css))
		.pipe(filter('**/*.css')) // Filter stream to only css files for BS
		.pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
	bs({
		server: "./"
	});
});

gulp.task('bs-reload', function() {
	bs.reload();
});

gulp.task('bacon', ['browser-sync'], function() {
	gulp.watch(src.scss, ['build-css']);
});

gulp.task('default', ['browser-sync'], function() {
	gulp.watch(src.js, ['build-js', 'bs-reload']); // Watch for changes to JS
	gulp.watch(src.scss, ['build-css']); // Watch for changes to SCSS
	gulp.watch(src.html, ['bs-reload']); // Watch for changes to HTML
});
