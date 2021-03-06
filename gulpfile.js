const gulp = require("gulp");
const minify_js = require("gulp-uglify");
const minify_css = require("gulp-csso");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");
const babelify = require("gulp-babel");
const watch = require("gulp-watch");
const nodemon = require("gulp-nodemon");
const sass = require("gulp-sass");

gulp.task("css", () => {
  return gulp
    .src("stylesheets/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(minify_css())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("stylesheets"));
});

gulp.task("js", () => {
  return gulp
    .src("javascripts/app.js")
    .pipe(
      babelify({
        presets: ["es2015"]
      })
    )
    .pipe(minify_js({ mangle: true }))
    .pipe(rename("app.min.js"))
    .pipe(gulp.dest("javascripts"));
});

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "./",
      browser: "chrome",
      port: 1337
    }
  });
  gulp
    .watch("stylesheets/style.scss", ["css"])
    .on("change", browserSync.reload);

  gulp.watch("javascripts/app.js", ["js"]).on("change", browserSync.reload);

  gulp.watch("index.html").on("change", browserSync.reload);
});

gulp.task("build", ["css", "js"]);

gulp.task("default", ["css", "js", "browser-sync"]);
