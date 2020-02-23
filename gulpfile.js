const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require("gulp-rename");

sass.compiler = require('node-sass');

gulp.task('clean', () => {
    return del([
        'dist/**'
    ]);
});

gulp.task('index', () => {
    return gulp.src('src/*.html')
      .pipe(gulp.dest('./dist'));
})

gulp.task('styles', () => {
    return gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('minifyjs', () => {
	return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('./dist/js/'))
  	.pipe(concat('all.min.js'))
  	.pipe(uglify())
  	.pipe(gulp.dest('./dist/js/'));
});

gulp.task('static', () =>{
  return gulp.src('src/static/**')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', () => {
    gulp.watch('src/**', (done) => {
        gulp.series(['clean', 'index', 'styles', 'minifyjs', 'static'])(done);
    });
});

gulp.task('default', gulp.series(['clean', 'index', 'styles', 'minifyjs']));
