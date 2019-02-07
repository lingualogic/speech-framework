/**
 * Gulp-Datei zur Erzeugung der Cordova-Version der SpeakApp unter Mac OS X
 */


const rimraf = require('rimraf');
const path = require('path');
const inject = require('gulp-inject-string');
const runSquence = require('run-sequence');


module.exports = ({ gulp, exec, srcDir, globalDistDir, appDir, cordovaDir, cordovaAppDir, cordovaWwwDir }) => {


    gulp.task('cordova-create-app', (done) => {
        exec(`cd ${cordovaDir} && cordova create ${appDir}`, done);
    });


    gulp.task('cordova-copy-original', () => {
        return gulp.src([
            `${cordovaDir}/config.xml`,
            `${cordovaDir}/package.json`,
        ])
            .pipe(gulp.dest( cordovaAppDir ));
    });


    gulp.task('cordova-install-browser', (done) => {
        exec(`cd ${cordovaAppDir} && cordova platform add browser`, done);
    });


    gulp.task('cordova-install-android', (done) => {
        exec(`cd ${cordovaAppDir} && cordova platform add android`, done);
    });

    gulp.task('cordova-install-ios', (done) => {
        exec(`cd ${cordovaAppDir} && cordova platform add ios`, done);
    });

    gulp.task('cordova-install-osx', (done) => {
        exec(`cd ${cordovaAppDir} && cordova platform add osx`, done);
    });

    gulp.task('cordova-install-speechsynthesis', (done) => {
        exec(`cd ${cordovaAppDir} && cordova plugin add https://github.com/lingualogic/SpeechSynthesisPlugin`, done);
    });

    gulp.task('cordova-install', (done) => {
        runSquence(
            'cordova-create-app',
            'cordova-copy-original',
            // fuer alle Betriebssysteme verfuegbar
            'cordova-install-browser',
            'cordova-install-android',
            // koennen nur unter Mac-Rechner installiert werden !
            // werden deshalb separat installiert
            // 'cordova-install-ios',
            // 'cordova-install-osx',
            'cordova-install-speechsynthesis',
            (err) => {
                if(err) {
                    // eslint-disable-next-line
                    console.log('failed to install to cordova project');
                    done(err);
                    return;
                }
                // eslint-disable-next-line
                console.log('DONE!');
                done();
            }
        );
    });


    gulp.task('cordova-prepare', (done) => {
        rimraf( cordovaWwwDir, done );
    });

    gulp.task('cordova-copy-dist', () => {
        return gulp.src( path.join( globalDistDir, 'speech.bundle.js'))
            .pipe(gulp.dest( path.join( cordovaWwwDir, 'js')));
    });

    gulp.task('cordova-copy-src', () => {
        return gulp.src(path.join( srcDir, '**', '*'))
            .pipe(gulp.dest( cordovaWwwDir ));
    });

    gulp.task('cordova-replace-cordova', (done) => {
        gulp.src(path.join( cordovaWwwDir, 'index.html' ))
            .pipe(inject.replace('<!-- CORDOVA JS -->', '<script type="text/javascript" src="cordova.js"></script>'))
            .pipe(gulp.dest( cordovaWwwDir ))
            .on( 'end', done );
    });

    gulp.task('cordova-replace-speech', (done) => {
        gulp.src( path.join( cordovaWwwDir, 'index.html' ))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../dist/speech-framework.js"></script>', '<script type="text/javascript" src="js/speech-framework.js"></script>'))
            .pipe(gulp.dest( cordovaWwwDir))
            .on( 'end', done );
    });

    gulp.task('cordova-remove-absolute-assets', (done) => {
        gulp.src(path.join( cordovaWwwDir, '**', '*.js' ))
            .pipe(inject.replace( '/assets/', 'assets/' ))
            .pipe(gulp.dest( cordovaWwwDir ))
            .on( 'end', done );
    });


    gulp.task('cordova-generate', (done) => {
        runSquence(
            'cordova-prepare',
            'cordova-copy-dist',
            'cordova-copy-src',
            'cordova-replace-cordova',
            'cordova-replace-speech',
            'cordova-remove-absolute-assets',
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


    // Cordova erzeugen

    gulp.task('cordova-compile-android', (done) => {
        exec(`cd ${cordovaAppDir} && cordova build android --scan`, done);
    });


    gulp.task('cordova-build-android', (done) => {
        runSquence(
            'cordova-generate',
            'cordova-compile-android',
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

    // Cordova starten

    gulp.task('cordova-run-browser', (done) => {
        exec(`cd ${cordovaAppDir} && cordova run browser --debug`, done);
    });

    gulp.task('cordova-run-android', (done) => {
        exec(`cd ${cordovaAppDir} && cordova run android --debug`, done);
    });

    gulp.task('cordova-run-ios', (done) => {
        exec(`cd ${cordovaAppDir} && cordova run ios --debug`, done);
    });

    gulp.task('cordova-run-osx', (done) => {
        exec(`cd ${cordovaAppDir} && cordova run osx --debug`, done);
    });


    gulp.task('cordova-browser', (done) => {
        runSquence(
            'cordova-generate',
            'cordova-run-browser',
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

    gulp.task('cordova-android', (done) => {
        runSquence(
            'cordova-generate',
            'cordova-run-android',
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

    gulp.task('cordova-ios', (done) => {
        runSquence(
            'cordova-generate',
            'cordova-run-ios',
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

    gulp.task('cordova-osx', (done) => {
        runSquence(
            'cordova-generate',
            'cordova-run-osx',
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
