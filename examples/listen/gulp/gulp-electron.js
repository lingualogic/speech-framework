/**
 * Gulp-Datei zur Erzeugung der Electron-Version der Listen-App
 */


const rimraf = require('rimraf');
const path = require('path');
const inject = require('gulp-inject-string');
const runSquence = require('run-sequence');

module.exports = ({ gulp, exec, globalDistDir, globalConfigDir, srcDir, electronDir, electronWwwDir }) => {

    gulp.task('electron-prepare', (done) => {
        rimraf(electronWwwDir, done);
    });

    gulp.task('electron-copy-dist', () => {
        return gulp.src(path.join( globalDistDir, 'speech-framework.js'))
            .pipe(gulp.dest(path.join(electronWwwDir, 'js')));
    });

    gulp.task('electron-copy-credentials', () => {
        return gulp.src(path.join( globalConfigDir, 'nuance-credentials.js'))
            .pipe(gulp.dest(path.join( electronWwwDir, 'js')));
    });

    gulp.task('electron-copy-src', () => {
        return gulp.src(path.join(srcDir, '**', '*'))
            .pipe(gulp.dest(electronWwwDir));
    });

    gulp.task('electron-replace-speech', (done) => {
        gulp.src(path.join(electronWwwDir, 'index.html'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../dist/speech-framework.js"></script>', '<script type="text/javascript" src="js/speech-framework.js"></script>'))
            .pipe(gulp.dest(electronWwwDir))
            .on('end', done);
    });

    gulp.task('electron-replace-credentials', (done) => {
        gulp.src(path.join( electronWwwDir, 'index.html'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../config/nuance-credentials.js"></script>', '<script type="text/javascript" src="js/nuance-credentials.js"></script>'))
            .pipe(gulp.dest( electronWwwDir))
            .on('end', done);
    });

    gulp.task('electron-remove-absolute-assets', (done) => {
        gulp.src(path.join(electronWwwDir, '**', '*.js'))
            .pipe(inject.replace('/assets/', 'assets/'))
            .pipe(gulp.dest(electronWwwDir))
            .on('end', done);
    });

    gulp.task('electron-run-app', (done) => {
        exec(`./../../node_modules/.bin/electron ${electronDir}`, done);
    });

    gulp.task('electron-run', (done) => {
        runSquence(
            'electron-prepare',
            'electron-copy-dist',
            'electron-copy-credentials',
            'electron-copy-src',
            'electron-replace-speech',
            'electron-replace-credentials',
            'electron-remove-absolute-assets',
            'electron-run-app',
            (err) => {
                if(err) {
                    // eslint-disable-next-line
                    console.log('failed to build dist to cordova project');
                    done(err);
                    return;
                }
                // eslint-disable-next-line
                console.log('DONE!');
                done();
            }
        );
    });

};
