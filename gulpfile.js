const gulp = require("gulp");
const ts = require("gulp-typescript");
const browserify = require("browserify");
const source = require('vinyl-source-stream')
const tsify = require("tsify");


// gulp.task("default", function () {
//     console.log('开始构建  头文件');
//     var tsResult = gulp.src(["tssrc/**/*.ts"]) // or tsProject.src()
//         .pipe(ts()).on('error', () => { /* Ignore compiler errors */ })
//     return tsResult.js.pipe(gulp.dest('dist'));//tsResult.js.pipe(gulp.dest('release'));
// })

// gulp.task("default", function () {
//     console.log('开始构建  头文件');
//     var tsResult = gulp.src(["tssrc/**/*.ts"]) // or tsProject.src()
//         .pipe(ts()).on('error', () => { /* Ignore compiler errors */ })
//     return tsResult.js.pipe(gulp.dest('dist'));//tsResult.js.pipe(gulp.dest('release'));
// })


gulp.task("build" , function() {
	return browserify({
			basedir: '.',
			debug: false,
			entries: ['tssrc/main.ts'],
			cache: {},
			packageCache: {}
		})
		.plugin(tsify)
		.bundle()
		//调用bundle后，使用source把输出文件命名为bundle.js
		.pipe(source('bundle.js'))
		.pipe(gulp.dest("dist"));
});


gulp.task('watch',function(){

    gulp.watch('./tssrc/**/*.ts',['build']);

});



gulp.task('build-plugins', function (cb) {
    console.log(111);
    var b = browserify();
	b.require("lodash")
	b.require("jquery")
	b.require("axios")
    b.bundle().pipe(source('plugins.js')).pipe(gulp.dest('plugins'));
});
