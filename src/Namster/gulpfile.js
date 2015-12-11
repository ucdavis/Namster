/// <binding BeforeBuild='webpack:build, min:css' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    debug = require("gulp-debug"),
    util = require("gulp-util"),
    rimraf = require("rimraf"),
    merge = require("merge-stream"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    webpack = require('webpack'),
    sourcemaps = require('gulp-sourcemaps');

var paths = {
    webroot: "./wwwroot/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.jsx = paths.webroot + "js/**/*.jsx";
paths.minJs = paths.webroot + "js/**/*.min.js";

paths.sass = paths.webroot + "sass/**/*.scss";
paths.css = paths.webroot + "css";

paths.concatJsDest = paths.webroot + "js/site.js";
paths.concatJsMinDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("webpack:build", function (callback) {
    webpack({
        entry: {
            search: paths.webroot + "js/views/search/main.jsx"
        },
        output: {
            path: paths.webroot + 'js/dist/',
            filename: '[name].js'
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015']
                    }
                }
            ]
        }
    }, function(err, stats) {
        util.log('[webpack:build]', stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("min:css", function () {
    return gulp.src([paths.sass])
        .pipe(sourcemaps.init())            // start source maps
        .pipe(sass())                       // compile sass
        .pipe(rename({                      // with new directory, filename ext
            dirname: paths.css,
            extname: '.css'}))      
        .pipe(sourcemaps.write())           // create sourcemaps
        .pipe(gulp.dest("."))               // write out compiled files     
        .pipe(concat(paths.concatCssDest))  // concat + min
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("build", ["min:css", "webpack:build"]);

gulp.task("watch:js", function() {
    gulp.watch([paths.js, paths.jsx], ["webpack:build"]);
});

gulp.task("watch", function() {
    gulp.watch([paths.js, paths.jsx], ["webpack:build"]);
    gulp.watch([paths.sass], ["min:css"]);
});