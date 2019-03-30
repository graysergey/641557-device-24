"use strict";
var gulp = require("gulp"); // сам сборщик
var sass = require("gulp-sass"); // sass препроцессор
var plumber = require("gulp-plumber"); // отслеживает ошибки, продолжает выполнение потока в случае ошибки
var postcss = require("gulp-postcss"); // плагин для парсинга css
var autoprefixer = require("autoprefixer"); // автопрефексер, работает в потоке postcss
var server = require("browser-sync").create();  // автоматически перезагружает страницу
var csso = require("gulp-csso"); // минификатор css
var rename = require("gulp-rename"); // плагин для переименования файлов
var imagemin = require("gulp-imagemin"); // сжатие графики без потерь
var webp = require("gulp-webp"); // конвертирует графику в формат webp
var svgstore = require("gulp-svgstore"); // сборщик спрайтов
var posthtml = require("gulp-posthtml"); // парсер HTML
var del = require("del"); // плагин для удаления файлов/папок
var include = require("posthtml-include"); // плагин для posthtml, позволяет использовать <include> в HTML
var htmlmin = require("gulp-htmlmin"); // минификатор HTML
var uglify = require('gulp-uglify'); // минификатор JS
var pump = require('pump'); // передает ошибки в консоль в нормальном виде
var babel = require('gulp-babel'); // конвертирует JavaScript es6  в es5

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/js/**/*.js", gulp.series("compressjs"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html").on("change", gulp.series("html_clean", "html", "refresh"));
  gulp.watch("source/img/**/*", gulp.series("clean_image", "copy_image", "sprite", "html", "refresh"));
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icons/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task("html_clean", function () {
  return del("build/*.html");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("clean_image", function () {
  return del("build/img/**");
});

gulp.task("copy_image", function () {
  return gulp.src([
    "source/img/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("compressjs", function (cb) {
    gulp.src("source/js/main.js")
      .pipe(plumber());
  pump([
      gulp.src("source/js/*.js"),
      gulp.dest("build/js"),
      babel({
        presets: ['@babel/env']
      }),
      rename("main.min.js"),
      uglify(),
      gulp.dest("build/js")
    ],
    cb
  );
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "sprite",
  "html",
  "images",
  "compressjs"
));

gulp.task("start", gulp.series("build", "server"));
