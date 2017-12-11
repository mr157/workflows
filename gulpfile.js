var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect');
var imageResize = require('gulp-image-resize');

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = ['components/scripts/rclick.js',
                 'components/scripts/pixgrid.js',
                 'components/scripts/tagline.js',
                 'components/scripts/template.js'
];
var sassSources = ['components/sass/style.scss'];
var htmlSources = ['builds/development/*.html'];
var jsonSources = ['builds/development/js/*.json'];

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
        .pipe(gulp.dest('builds/development/js'))
        .pipe(connect.reload())
});

gulp.task('compass', function () {
    return gulp.src(sassSources)
        .pipe(compass({
            css: 'builds/development/css',
            sass: 'components/sass',
            image: 'builds/development/images',
            comments: 'true',
            style: 'expanded'
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('builds/development/css'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch(htmlSources, ['html']);
    gulp.watch('builds/development/js/*.json', ['json'])
});

gulp.task('html', function () {
    gulp.src(htmlSources)
        .pipe(connect.reload())
});

gulp.task('json', function () {
    gulp.src(jsonSources)
        .pipe(connect.reload())
})

gulp.task('connect', function () {
    connect.server({
        root: 'builds/development/',
        livereload: true
    });
})

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