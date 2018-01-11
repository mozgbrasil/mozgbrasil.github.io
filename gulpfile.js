var config = require('./gulpconfig.json');
var	gulp = require('gulp');
var	shell = require('gulp-shell');
var minifyHTML = require('gulp-minify-html');
var cloudflare = require('gulp-cloudflare');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var uncss = require('gulp-uncss');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jpegtran = require('imagemin-jpegtran');
var gifsicle = require('imagemin-gifsicle');
var replace = require('gulp-replace');
var fs = require('fs');
var download = require('gulp-download');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var cp          = require('child_process');

gulp.task('jekyll', function() {
	return gulp.src('index.html', { read: false })
		.pipe(shell([
			'jekyll build'
		]));
});

gulp.task('optimize-images', function () {
	return gulp.src(['_site/**/*.jpg', '_site/**/*.jpeg', '_site/**/*.gif', '_site/**/*.png'])
		.pipe(imagemin({
			progressive: false,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant(), jpegtran(), gifsicle()]
		}))
		.pipe(gulp.dest('_site/'));
});

gulp.task('optimize-css', function() {
   return gulp.src('_site/css/main.css')
	   .pipe(autoprefixer())
	   .pipe(uncss({
		   html: ['_site/**/*.html'],
		   ignore: []
	   }))
	   .pipe(minifyCss({keepBreaks: false}))
	   .pipe(gulp.dest('_site/css/'));
});

gulp.task('optimize-html', function() {
    console.log('gulp::optimize-html');
	return gulp.src('_site/**/*.html')
		/*.pipe(minifyHTML({
			quotes: true
		}))*/
		.pipe(replace(/<link rel=\"stylesheet\" href=\"\/assets\/css\/main.css\"[^>]*>/, function(s) {
            console.log('gulp::TROCANDO');
			var style = fs.readFileSync('_site/assets/css/main.css', 'utf8');
			return '<style>\n' + style + '\n</style>';
		}))
		.pipe(gulp.dest('_site/'));
});

gulp.task('fetch-newest-analytics', function() {
	return download('https://www.google-analytics.com/analytics.js')
    	.pipe(gulp.dest('assets/'));
});

gulp.task('rsync-files', function() {
	return gulp.src('index.html', { read: false })
		.pipe(shell([
			'cd _site && rsync -az --delete . ' + config.remoteServer + ':' + config.remotePath
		]));
});

gulp.task('purge-cache', function() {
	var options = {
		token: config.cloudflareToken,
		email: config.cloudflareEmail,
		domain: config.cloudflareDomain
	};

	cloudflare(options);
});

gulp.task('raw-deploy', function(callback) {
	runSequence(
		'jekyll',
		'rsync-files',
		'purge-cache',
		callback
	);
});

gulp.task('dry-run', function(callback) {
	runSequence(
		'fetch-newest-analytics',
		'jekyll',
		//'optimize-images',
		'optimize-css',
		'optimize-html',
		callback
	);
});

gulp.task('deploy', function(callback) {
	runSequence(
		'fetch-newest-analytics',
		'jekyll',
		'optimize-images',
		'optimize-css',
		'optimize-html',
		'rsync-files',
		'purge-cache',
		callback
	);
});

// FASE 2

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    console.log('this::jekyll-build');
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    console.log('this::jekyll-rebuild');
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    console.log('this::browser-sync');
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    console.log('this::sass');
    return gulp.src('_scss/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    console.log('this::watch');
    gulp.watch('_scss/*.scss', ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['dry-run', 'browser-sync', 'watch']);
