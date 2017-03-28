var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function () {
    console.log('gulp is running...');
    return gulp.src('public/**/*.scss')
        .pipe(sass({
            includePaths : ['/public'],
            onError: function (err) {
                return notify().write(err);
            }
        }))
        .pipe(gulp.dest('public/styles'));
});

gulp.task('default', function () {
    gulp.watch('public/**/*.scss', ['styles']);
});