var gulp            = require('gulp');

var babel           = require('gulp-babel');
var del             = require('del');
var cleanCSS        = require('gulp-clean-css');
var combineMQ       = require('gulp-combine-mq');
var htmlmin         = require('gulp-htmlmin');
var injectCSS       = require('gulp-inject-css');
var less            = require('gulp-less');
var LessAutoprefix  = require('less-plugin-autoprefix');
var sequence        = require('gulp-sequence');
var uglify          = require('gulp-uglify');

var autoprefix = new LessAutoprefix({browsers: ['defaults']});

// directories
var HTML_ROOT = "/html";
var SRC = './src' + HTML_ROOT;
var TMP = './tmp' + HTML_ROOT; // Intermediate build files.
var BUILD = './com' + HTML_ROOT;

const PAGES = [
    {
        html: 'explore',
        css: ['explore'],
        js: [],
    },
    {
        html: 'new-post',
        css: ['new-post'],
        js: [],
    }
]

/* Helper functions: */

/**
 * Pipes a .less file through less, autoprefixer, and clean
 * css, outputting it to the target directory.
 *
 * @param dir   the directory containing the source file
 * @param file  the source file
 * @param cb    the callback to execute when the css finishes
 *              compiling
 */
let compileCss = (file, cb) => {
    gulp.src(SRC + '/' + file + '.less')
        .pipe(less({
            plugins: [autoprefix],
        }))
        .pipe(combineMQ({
            beautify: false,
        }))
        .pipe(cleanCSS({
            compatibility: '*',
        }))
        .pipe(gulp.dest(TMP))
        .on('end', cb);
};

/**
 * Compiles a .html file through htmlmin, outputting it to the
 * target directory.
 *
 * @param dir   the directory containing the source file
 * @param file  the source file
 * @param css   the css files that the html depends on
 * @param css   the js files that the html depends on
 */
let compileHtml = (dir, file, css, js) => {
    let tmpDest = gulp.dest(TMP + '/' + dir);
    var cb;
    if (css.length === 0) {
        if (js.length === 0) {
            // base case
            cb = () => {
                gulp.src(TMP + '/' + dir + '/' + file + '.html')
                .pipe(injectCSS())
                .pipe(htmlmin({
                    collapseWhitespace: true,
                }))
                .pipe(gulp.dest(BUILD + '/' + dir));
            }

            gulp.src(SRC + '/' + dir + '/' + file + '.html')
                .pipe(gulp.dest(TMP + '/' + dir))
                .on('end', cb);

        } else {
            // recursive case
            cb = () => { compileHtml(dir, file, css, js.slice(1)); }

            compileJs(js[0], cb);
        }
    } else {
        // recursive case
        cb = () => { compileHtml(dir, file, css.slice(1), js); }

        compileCss(css[0], cb);
    }
};

/**
 * Compiles a .js file through babel, then uglify, outputting it
 * to the target directory.
 *
 * @param dir   the directory containing the source file
 * @param file  the source file
 * @param cb    the callback to execute when the css finishes
 *              compiling
 */
let compileJs = (file, cb) => {
    return gulp.src(SRC + '/' + file + '.js')
        .pipe(babel({
            presets: ['env'],
        }))
        .pipe(uglify())
        .pipe(gulp.dest(BUILD))
        .on('end', cb);
}


/**
 * Copies a file or directory.
 *
 * @param dir   the directory containing the source file
 * @param file  the source file
 * @param bld   the build file or directory
 */
let copyFile = (dir, file, bld) => {
    gulp.src(SRC + '/' + dir + '/' + file)
        .pipe(gulp.dest(bld + '/' + dir));
}

/**
 * Copies a glob to the target directory
 * without modification.
 *
 * @param src   the source glob, file, or directory
 * @param dest  the destination file or directory
 * @param bld   the build file or directory
 */
let copyGlob = (src, dest, bld) => {
    gulp.src([SRC + '/' + src])
        .pipe(gulp.dest(bld + '/' + dest));
};

/**
 * Copies an html file to the intermediate folder.
 *
 * @param dir   the directory containing the source
 * @param file  the source file
 */
let copyHtml = (dir, file) => {
    gulp.src(SRC + '/' + dir + '/' + file + '.html')
        .pipe(gulp.dest(TMP + '/' + dir));
};

// Cleans up all build files.
gulp.task('clean', ['clean:tmp'], function() {
    return del([BUILD + '/**/*', 'com.zip']);
});

// Copies raw html files to the temp directory.
gulp.task('html:copy', function() {
    copyGlob('**/*.html', '', TMP);
});

// Cleans up intermediary build files.
gulp.task('clean:tmp', function() {
    del([TMP]);
});

// Compiles the html pages and their css/js assets.
gulp.task('html:compile', ['html:copy'], function() {
    for (let file of PAGES) {
        compileHtml('', file.html, file.css, file.js);
    }

    return true;
});

// Copies raw html files to the 
gulp.task('html', sequence('html:copy', 'html:compile'));

// Copies all files in the asset directory to the target
// directory.
gulp.task('asset', function() {
    copyGlob('asset/**/*', 'asset', BUILD);
});

gulp.task('default', ['asset', 'html']);
