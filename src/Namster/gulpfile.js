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
    webpack = require("webpack"),
    sourcemaps = require("gulp-sourcemaps");

var webpackConfig = require("./webpack.config.js");

var paths = {
    webroot: "./wwwroot/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.jsx = paths.webroot + "js/**/*.jsx";
paths.minJs = paths.webroot + "js/**/*.min.js";

paths.sass = paths.webroot + "sass/**/*.scss";
paths.css = paths.webroot + "css";

paths.concatJsDest = paths.webroot + "js/site.js";
paths.concatJsMinDest = paths.webroot + "js/dist/site.min.js";
paths.concatCssDest = paths.webroot + "css/dist/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);


gulp.task("build:js", function (callback) {
    var myConfig = Object.create(webpackConfig);

    webpack(myConfig, function(err, stats) {
        util.log('[build:js]', stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("watch:js", function() {
    var myConfig = Object.create(webpackConfig);
    myConfig.watch = true;

    webpack(myConfig, function (err, stats) {
        util.log('[watch:js]', stats.toString({
            colors: true
        }));
    });
});

gulp.task("min:css", function () {
    return gulp.src([paths.sass])
        .pipe(sourcemaps.init())            // start source maps
        .pipe(sass())                       // compile sass
        .pipe(rename({                      // with new directory, filename ext
            dirname: paths.css + '/dist/',
            extname: '.css'}))
        .pipe(sourcemaps.write())           // create sourcemaps
        .pipe(gulp.dest("."))               // write out compiled files
        .pipe(concat(paths.concatCssDest))  // concat + min
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("watch:css", function() {
    gulp.watch([paths.sass], ["min:css"]);
});

gulp.task("build", ["min:css", "build:js"]);

gulp.task("watch", ["watch:css", "watch:js"]);
