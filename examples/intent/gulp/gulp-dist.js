/**
 * Gulp-Datei zur Erzeugung der Dist-Version der Intent-App
 */


const rimraf = require('rimraf');
const path = require('path');
const inject = require('gulp-inject-string');
const runSquence = require('run-sequence');

module.exports = ({ gulp, exec, rootDir, globalCredentialsDir, globalDistDir, distDir, srcDir }) => {

    gulp.task('dist-prepare', (done) => {
        rimraf( distDir, done);
    });

    gulp.task('dist-copy-credentials', () => {
        return gulp.src([
            path.join( globalCredentialsDir, 'nuance-credentials.js'),
            path.join( globalCredentialsDir, 'google-credentials.js'),
            path.join( globalCredentialsDir, 'rasa-credentials.js')            
        ])
            .pipe( gulp.dest(path.join( distDir, 'js')));
    });

    gulp.task('dist-copy-speech', () => {
        return gulp.src( path.join( globalDistDir, 'speech-framework.js'))
            .pipe(gulp.dest( path.join( distDir, 'js')));
    });

    gulp.task('dist-copy-src', () => {
        return gulp.src( path.join(srcDir, '**', '*'))
            .pipe( gulp.dest( distDir ));
    });

    gulp.task( 'dist-replace-credentials', (done) => {
        gulp.src(path.join( distDir, 'index.html'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../credentials/nuance-credentials.js"></script>', '<script type="text/javascript" src="js/nuance-credentials.js"></script>'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../credentials/google-credentials.js"></script>', '<script type="text/javascript" src="js/google-credentials.js"></script>'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../credentials/rasa-credentials.js"></script>', '<script type="text/javascript" src="js/rasa-credentials.js"></script>'))
            .pipe(gulp.dest( distDir ))
            .on('end', done);
    });

    gulp.task('dist-replace-speech', (done) => {
        gulp.src(path.join( distDir, 'index.html'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../dist/speech-framework.js"></script>', '<script type="text/javascript" src="js/speech-framework.js"></script>'))
            .pipe(gulp.dest( distDir ))
            .on('end', done);
    });

    gulp.task('dist-remove-absolute-assets', (done) => {
        gulp.src(path.join( distDir, '**', '*.js'))
            .pipe(inject.replace('/assets/', 'assets/'))
            .pipe(gulp.dest( distDir))
            .on('end', done);
    });

    gulp.task('dist-run-app', (done) => {
        exec(`cd ${rootDir}/${distDir} && http-server -o -c-1`, done);
    });


    /**
     * Erzeugt die Web-App
     */

    gulp.task('dist-build', (done) => {
        runSquence(
            'dist-prepare',
            'dist-copy-src',
            'dist-copy-credentials',
            'dist-replace-credentials',
            'dist-copy-speech',
            'dist-replace-speech',
            'dist-remove-absolute-assets',
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

    /**
     * Erzeugt und startet die Web-App
     */

    gulp.task('dist-run', (done) => {
        runSquence(
            'dist-build',
            'dist-run-app',
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
