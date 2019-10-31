var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src([
        'src/scss/*.scss'
    ]) // Gets all files ending with .scss in src/scss and children dirs
      .pipe(sass())
      .pipe(gulp.dest('src/css'))
  })