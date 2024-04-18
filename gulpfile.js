const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const exec = require('child_process').exec;

// Tasks
require('./gulp/dev.js');
require('./gulp/docs.js');
require('./gulp/fontsDev.js');
require('./gulp/fontsDocs.js');

gulp.task(
	'default',
	gulp.series(
		'clean:dev', 'fontsDev',
		gulp.parallel('html:dev', 'sass:dev', 'images:dev', gulp.series('svgStack:dev', 'svgSymbol:dev'), 'files:dev', 'js:dev'),
		gulp.parallel('server:dev', 'watch:dev')
	)
);

gulp.task(
	'docs',
	gulp.series(
		'clean:docs', 'fontsDocs',
		gulp.parallel('html:docs', 'sass:docs', 'images:docs', gulp.series('svgStack:docs', 'svgSymbol:docs'), 'files:docs', 'js:docs'),
		gulp.parallel('server:docs')
	)
);

// Создание ветки gh-pages
gulp.task('create-gh-pages-branch', function(cb) {
    exec('git branch gh-pages', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// Задача развертывания
gulp.task('deploy', gulp.series('create-gh-pages-branch', function() {
    return gulp.src('./build/**/*')
        .pipe(ghPages({
            remoteUrl: "https://github.com/gumirus/Modimal_Gulp_WebCademy.git",
            branch: "gh-pages"
        }));
}));