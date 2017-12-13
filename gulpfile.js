var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpIf = require('gulp-if'),
    minifyHTML = require('gulp-minify-html'),
    jsonMinify = require('gulp-jsonminify'),
    uglify = require('gulp-uglify');

var imageResize = require('gulp-image-resize');

var env,
    coffeeSources,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    outputDir,
    sassStyle;

env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    outputDir = 'builds/development/';
    sassStyle = 'expanded'
}
else {
    gutil.log('Workflows are yawesome');
    outputDir = 'builds/production/';
    sassStyle = 'compressed'
}

coffeeSources = ['components/coffee/tagline.coffee'];
jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];
jsonSources = [outputDir + '/js/*.json'];

gulp.task('log', function () {
    gutil.log('Workflows are awesome');
});

gulp.task('coffee', function () {
    gulp.src(coffeeSources)
        .pipe(coffee({
                bare: true
            })
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulpIf(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + '/js'))
        .pipe(connect.reload())
});

gulp.task('compass', function () {
    return gulp.src(sassSources)
        .pipe(compass({
            css: outputDir + 'css',
            sass: 'components/sass',
            image: outputDir + 'images',
            comments: 'true',
            style: sassStyle
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch('builds/development/*.html', ['html']);
    gulp.watch('builds/development/js/*.json', ['json'])
});

gulp.task('html', function () {
    gulp.src('builds/development/*.html')
        .pipe(gulpIf(env === 'production', minifyHTML()))
        .pipe(gulpIf(env === 'production', gulp.dest(outputDir)))
        .pipe(connect.reload())
});

gulp.task('json', function () {
    gulp.src('builds/development/js/*.json')
        .pipe(gulpIf(env === 'production', jsonMinify()))
        .pipe(gulpIf(env === 'production', gulp.dest('builds/production/js')))
        .pipe(connect.reload())
});

gulp.task('connect', function () {
    connect.server({
        root: outputDir,
        livereload: true
    });
})

gulp.task('stopServer', function () {
    connect.server({
        port: 8888
    });
    // run some headless tests with phantomjs 
    // when process exits: 
    connect.serverClose();
});

gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch']);

gulp.task('image', function () {
    gulp.src('test.png')
        .pipe(imageResize({
            width: 100,
            height: 100,
            crop: true,
            upscale: false
        }))
        .pipe(gulp.dest('builds'));
});