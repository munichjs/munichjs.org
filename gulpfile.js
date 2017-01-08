var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
  gulp.src('./scss/main.scss')
    .pipe(sass({
      includePaths: ['./node_modules/bootstrap/scss/']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./assets/'))
});

gulp.task('default',function() {
  gulp.start('styles');
  gulp.watch('./scss/*.scss',['styles']);
});