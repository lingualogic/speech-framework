/**
 * Gulp-Datei zur Erzeugung der Electron-Version der Intent-App
 */


const rimraf = require('rimraf');
const path = require('path');
const inject = require('gulp-inject-string');
const runSquence = require('run-sequence');

module.exports = ({ gulp, exec, globalDistDir, srcDir, wwwElectronDir, electronDir }) => {

    gulp.task('electron-prepare', (done) => {
        rimraf(wwwElectronDir, done);
    });

    gulp.task('electron-copy-dist', () => {
        return gulp.src(path.join( globalDistDir, 'speech-framework.js'))
            .pipe(gulp.dest(path.join(wwwElectronDir, 'js')));
    });

    gulp.task('electron-copy-src', () => {
        return gulp.src(path.join(srcDir, '**', '*'))
            .pipe(gulp.dest(wwwElectronDir));
    });

    gulp.task('electron-replace-speech', (done) => {
        gulp.src(path.join(wwwElectronDir, 'index.html'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../dist/speech-framework.js"></script>', '<script type="text/javascript" src="js/speech-framework.js"></script>'))
            .pipe(gulp.dest(wwwElectronDir))
            .on('end', done);
    });

    gulp.task('electron-remove-absolute-assets', (done) => {
        gulp.src(path.join(wwwElectronDir, '**', '*.js'))
            .pipe(inject.replace('/assets/', 'assets/'))
            .pipe(gulp.dest(wwwElectronDir))
            .on('end', done);
    });

    gulp.task('electron-run-app', (done) => {
        exec(`./../../node_modules/.bin/electron ${electronDir}`, done);
    });

    gulp.task('electron-run', (done) => {
        runSquence(
            'electron-prepare',
            'electron-copy-dist',
            'electron-copy-src',
            'electron-replace-speech',
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
