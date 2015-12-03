/// <binding BeforeBuild='min' Clean='clean' />
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
    babel = require("gulp-babel"),
    webpack = require('gulp-webpack'),
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

gulp.task("min:js", function() {
    return gulp.src([paths.jsx], { base: "." })
        .pipe(debug({ title: 'jsx:' }))
        .pipe(sourcemaps.init())            // start source maps
        .pipe(babel({                       // compile jsx
            presets: ["react", "es2015"]
        }))
        .pipe(webpack({
            entry: {
                search: paths.webroot + "js/views/search/main.js"
            },
            output: {
                filename: '[name].js'
            }
        }))
        .pipe(gulp.dest(paths.webroot + "js/dist"));
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

gulp.task("min", ["min:js", "min:css"]);
