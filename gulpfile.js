var gulp = require('gulp');
var htmlClean = require("gulp-htmlclean");
var imageMin = require('gulp-imagemin');
var uglify = require("gulp-uglify");
var debug = require("gulp-strip-debug");
var less = require("gulp-less");
var cssClean = require("gulp-clean-css");
var postCss = require("gulp-postcss");
var autoPrefixer = require("autoprefixer");
var connect = require("gulp-connect");
var folder = {
    src: 'src/',
    dist: 'dist/'
}
var devMod = process.env.NODE_ENV == "development";
console.log(devMod);
gulp.task("server",function() {
    connect.server({
        port:'8181',
        livereload: true
    });
})
gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"]);
    gulp.watch(folder.src + "css/*",["css"]);
    gulp.watch(folder.src + "js/*",["js"]);
})
gulp.task("default",["html","css","js","image","server","watch"])


gulp.task("html",function () {
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload())
        if(!devMod){
            page.pipe(htmlClean())
        }
        page.pipe(gulp.dest(folder.dist + "html/"))
})
gulp.task("css",function () {
    gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoPrefixer()]))
        .pipe(cssClean())
        .pipe(gulp.dest(folder.dist + "css/"))
})
gulp.task("js",function () {
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())
        if(!devMod){
            page.pipe(debug())
            .pipe(uglify())
        } 
        page.pipe(gulp.dest(folder.dist + "js/"))
})
gulp.task("image",function () {
    gulp.src(folder.src + 'img/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "img/"))
})