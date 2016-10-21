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
    all:['./*.html','./assets/css/*.css','./assets/js/*.js','./assets/js/lib/*.js'],
    template:['./template/*.html'],
    css:['./assets/css/*.css'],
    js:['./assets/js/lib/zepto.min.js','./assets/js/rem.js','./assets/js/common.js','./assets/js/api.js','./assets/js/home.js'],
    images:['./assets/images/*'],
    staticFolder:['./assets/images/*','./assets/font/*','./assets/video/*']
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
    return gulp.src(path.images)
        // Pass in options to the task
        //.pipe(imagemin({optimizationLevel: 5}))
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

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(path.js, ['scripts']);
    gulp.watch(path.css,['css']);
    gulp.watch(path.images,['images']);
    gulp.watch(path.template,['css']);
});

// Default Task
gulp.task('default', ['watch', 'scripts', 'images','css','browser-sync']);