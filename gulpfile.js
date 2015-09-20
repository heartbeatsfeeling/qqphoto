var gulp=require('gulp'),
	sass=require('gulp-sass');
gulp.task("default",function(){});
gulp.task('css',function(){
	gulp.src('sass/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('static/css/'))
});


gulp.watch("sass/**/*.scss",['css']);