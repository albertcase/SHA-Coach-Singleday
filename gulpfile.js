// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    gulpCopy = require('gulp-file-copy'),
    del = require('del'),
    browserSync = require('browser-sync').create();

//Define the app path
var path = {
    all:['./template/*.html','./assets/css/*.css','./assets/js/*.js','./assets/js/lib/*.js'],
    template:['./template/*.html'],
    css:['./assets/css/*.css'],
    js:['./assets/js/lib/zepto.min.js','./assets/js/rem.js','./assets/js/lib/cookie.js','./assets/js/common.js','./assets/js/wxshare.js','./assets/js/qa.js'],
    staticFolder:['./assets/images','./assets/font','./assets/video']
};
// Browser-sync
gulp.task('browser-sync', function() {
    browserSync.init(path.all,{
        server: {
            baseDir: "./",
            startPath: ''
        }
    });
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['build']);
});

// Copy all static images
gulp.task('images', ['clean'], function() {
    return gulp.src(path.staticFolder)
        // Pass in options to the task
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/images'));
});

//css
gulp.task('css',function () {
    // 1. 找到文件
    gulp.src(path.css)
        //.pipe(concat('style.css'))
        // 2. 压缩文件
        .pipe(minify())
        // 3. 另存为压缩文件
        .pipe(gulp.dest('./dist/css'));
});

// Concatenate & Minify
gulp.task('scripts',['clean'], function() {
    return gulp.src(path.js)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('scripts_vjs', function() {
    return gulp.src(path.selectvjs)
        .pipe(concat('vjs2.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('vjs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('scripts_formjs', function() {
    return gulp.src(path.formjs)
        .pipe(concat('form.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('form.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(path.js, ['scripts','scripts_vjs','scripts_formjs']);
    gulp.watch(path.css,['css']);
});

// Default Task
gulp.task('default', ['scripts', 'css','watch','browser-sync']);