// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var addSrc = require('gulp-add-src'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    // header = require('gulp-header'), // unused
    replace = require('gulp-replace'),
    // concat = require('gulp-concat'), // unused
    browserSync = require('browser-sync').create();

// file watch paths
var paths = {
        css: {
            home: 'src/css/',
            src: '**/*.scss',
        },
        js: {
            home: 'src/js/',
            src: '**/*.js',
        }
    },

    dist = './dist/prod/',
    dev = './dist/dev/';

// JS Linting
gulp.task('lint', function() {
    return gulp.src(paths.js.home + paths.js.src, { base: './src' })
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


// JS Task
gulp.task('js', function() {
    return gulp.src(paths.js.home + paths.js.src, { base: './src' })
        .pipe(gulp.dest(dev));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(paths.css.home + paths.css.src, { base: './src' })
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['> 0.75%', 'not IE 7', 'not IE 8', 'not IE 9' /*, 'not OperaMobile'*/ ]
        }))
        .pipe(gulp.dest(dev));
});

// Minify JS
gulp.task('buildJS', ['lint'], function() {

    return gulp.src([
            paths.js.home + paths.js.src
        ], { base: './src' })
        // .pipe(babel())
        .pipe(uglify({
            preserveComments: 'license'
        }))
        // .pipe(rename({
        //     suffix: ".min"
        // }))
        // .pipe(rename('main.min.js'))
        // .pipe(header(headerText('main.min.js')))
        .pipe(gulp.dest(dist));
});

// Minify CSS
gulp.task('buildCSS', ['sass'], function() {

    return gulp.src(paths.css.home + paths.css.src, { base: './src' })
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['> 0.75%', 'not IE 7', 'not IE 8', 'not IE 9' /*, 'not OperaMobile'*/ ]
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        // .pipe(rename('main.min.css'))
        // .pipe(header(headerText('main.min.css')))
        .pipe(gulp.dest(dist));
});

// process demo CSS
gulp.task('demoCSS', function() {
    return gulp.src(["demo-media/css/*.css", "demo-media/css/*.scss"])
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['> 0.75%', 'not IE 7', 'not IE 8', 'not IE 9' /*, 'not OperaMobile'*/ ]
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        // .pipe(rename({
        //     suffix: ".min"
        // }))
        .pipe(gulp.dest("./demo-media/dist/prod/css"));
});

// Minify JS
gulp.task('demoJS', function() {

    return gulp.src("demo-media/js/*.js")
        // .pipe(babel())
        .pipe(uglify({
            preserveComments: 'license'
        }))
        // .pipe(rename({
        //     suffix: ".min"
        // }))
        // .pipe(header(headerText('main.min.js')))
        .pipe(gulp.dest("./demo-media/dist/prod/js"));
});

// Copy Vendor Content
gulp.task('copyVendorJS', function() {
    gulp.src([
            'vendor/**/*.js',
        ], {
            base: './src/js'
        })
        .pipe(addSrc([
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/js-cookie/src/js.cookie.js'
        ]))
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(gulp.dest(dev + 'vendor/js'))
        .pipe(gulp.dest(dist + 'vendor/js'));
});

gulp.task('copyVendorCSS', function() {
    gulp.src([
            'vendor/**/*.css',
        ], {
            base: './src/css'
        })
        // .pipe(addSrc([
        //     './node_modules/normalize/normalize.css',
        // ]))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(dev + 'vendor/css'))
        .pipe(gulp.dest(dist + 'vendor/css'));
});


gulp.task('start', function() {
    // webserver
    browserSync.init({
        server: {
            baseDir: "./"
        },
        open: false,
        notify: false,
        port: 3000
    });
})

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['./demo-media/css/*.scss', './demo-media/css/*.css'], ["demoCSS"])
        .on('change', function() {
            gulp.src('./demo-media/dist/prod/*.css').pipe(browserSync.stream());
        });
    gulp.watch(['./demo-media/js/*.js'], ["demoJS"])
        .on('change', function() {
            gulp.src('./demo-media/dist/prod/*.js').pipe(browserSync.stream());
        });
    gulp.watch(dev + '**/*.html', browserSync.reload);
    gulp.watch(dev + paths.js.home + paths.js.src, browserSync.reload);
    gulp.watch(paths.js.home + paths.js.src, ['js'], browserSync.reload);
    gulp.watch(paths.css.home + paths.css.src, ['sass']).on('change', function() {
        gulp.src(dist + '**/*.css').pipe(browserSync.stream());
    });;
    gulp.watch(dev + paths.css.home + paths.css.src + '*.css', browserSync.reload);
});

gulp.task('demo', ['demoCSS', 'demoJS']);
gulp.task('dist', ['buildCSS', 'buildJS']);
gulp.task('build', ['dist', 'dev', 'lint', 'demo', /*'default'], function() {
    console.log("\nNow starting with default task…\n");
});*/]);
gulp.task('dev', ['lint', 'js', 'sass', 'copyVendorCSS', 'copyVendorJS']);
gulp.task('default', ['watch', 'dev', 'demo', 'start']);
