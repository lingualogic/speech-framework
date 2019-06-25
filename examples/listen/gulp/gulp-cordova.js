/**
 * Gulp-Datei zur Erzeugung der Cordova-Version der Listen-App
 */


const del = require('del');
const path = require('path');
const inject = require('gulp-inject-string');
const runSquence = require('run-sequence');


module.exports = ({ gulp, exec, srcDir, globalLibDir, globalDistDir, globalCredentialsDir, appDir, cordovaDir, cordovaAppDir, cordovaWwwDir }) => {


    /** 
     * Loeschen von Cordova-App
     */

    gulp.task('cordova-clean-app', () => {
        return del( cordovaAppDir );
    });


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

    gulp.task('cordova-install-speechrecognition', (done) => {
        exec(`cd ${cordovaAppDir} && cordova plugin add https://github.com/lingualogic/SpeechRecognitionPlugin`, done);
    });

    gulp.task('cordova-install', (done) => {
        runSquence(
            'cordova-clean-app',
            'cordova-create-app',
            'cordova-copy-original',
            // fuer alle Betriebssysteme verfuegbar
            'cordova-install-browser',
            'cordova-install-android',
            // koennen nur unter Mac-Rechner installiert werden !
            // werden deshalb separat installiert
            // 'cordova-install-ios',
            // 'cordova-install-osx',
            'cordova-install-speechrecognition',
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

    gulp.task('cordova-prepare', () => {
        return del( cordovaWwwDir );
    });

    gulp.task('cordova-copy-speech', () => {
        return gulp.src(path.join( globalDistDir, 'speech-framework.js'))
            .pipe(gulp.dest(path.join( cordovaWwwDir, 'js')));
    });

    gulp.task('cordova-copy-azure-sdk', () => {
        return gulp.src(path.join( globalLibDir, 'microsoft.cognitiveservices.speech.sdk.bundle-min.js'))
            .pipe(gulp.dest(path.join( cordovaWwwDir, 'js')));
    });

    gulp.task('cordova-copy-google-credentials', () => {
        return gulp.src(path.join( globalCredentialsDir, 'google-credentials.js'))
            .pipe(gulp.dest(path.join( cordovaWwwDir, 'js')));
    });

    gulp.task('cordova-copy-microsoft-credentials', () => {
        return gulp.src(path.join( globalCredentialsDir, 'microsoft-credentials.js'))
            .pipe(gulp.dest(path.join( cordovaWwwDir, 'js')));
    });

    gulp.task('cordova-copy-nuance-credentials', () => {
        return gulp.src(path.join( globalCredentialsDir, 'nuance-credentials.js'))
            .pipe(gulp.dest(path.join( cordovaWwwDir, 'js')));
    });

    gulp.task('cordova-copy-src', () => {
        return gulp.src(path.join(srcDir, '**', '*'))
            .pipe(gulp.dest( cordovaWwwDir ));
    });

    gulp.task('cordova-replace-cordova', (done) => {
        gulp.src(path.join( cordovaWwwDir, 'index.html'))
            .pipe(inject.replace('<!-- CORDOVA JS -->', '<script type="text/javascript" src="cordova.js"></script>'))
            .pipe(gulp.dest( cordovaWwwDir ))
            .on('end', done);
    });

    gulp.task('cordova-replace-speech', (done) => {
        gulp.src(path.join( cordovaWwwDir, 'index.html'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../dist/speech-framework.js"></script>', '<script type="text/javascript" src="js/speech-framework.js"></script>'))
            .pipe(gulp.dest( cordovaWwwDir))
            .on('end', done);
    });

    gulp.task('cordova-replace-azure-sdk', (done) => {
        gulp.src(path.join( cordovaWwwDir, 'index.html'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../lib/microsoft.cognitiveservices.speech.sdk.bundle-min.js"></script>', '<script type="text/javascript" src="js/microsoft.cognitiveservices.speech.sdk.bundle-min.js"></script>'))
            .pipe(gulp.dest( cordovaWwwDir))
            .on('end', done);
    });

    gulp.task('cordova-replace-google-credentials', (done) => {
        gulp.src(path.join( cordovaWwwDir, 'index.html'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../credentials/google-credentials.js"></script>', '<script type="text/javascript" src="js/google-credentials.js"></script>'))
            .pipe(gulp.dest( cordovaWwwDir))
            .on('end', done);
    });

    gulp.task('cordova-replace-microsoft-credentials', (done) => {
        gulp.src(path.join( cordovaWwwDir, 'index.html'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../credentials/microsoft-credentials.js"></script>', '<script type="text/javascript" src="js/microsoft-credentials.js"></script>'))
            .pipe(gulp.dest( cordovaWwwDir))
            .on('end', done);
    });

    gulp.task('cordova-replace-nuance-credentials', (done) => {
        gulp.src(path.join( cordovaWwwDir, 'index.html'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../credentials/nuance-credentials.js"></script>', '<script type="text/javascript" src="js/nuance-credentials.js"></script>'))
            .pipe(gulp.dest( cordovaWwwDir))
            .on('end', done);
    });

    gulp.task('cordova-remove-absolute-assets', (done) => {
        gulp.src(path.join( cordovaWwwDir, '**', '*.js'))
            .pipe(inject.replace('/assets/', 'assets/'))
            .pipe(gulp.dest( cordovaWwwDir))
            .on('end', done);
    });


    gulp.task('cordova-generate', (done) => {
        runSquence(
            'cordova-prepare',
            'cordova-copy-speech',
            'cordova-copy-azure-sdk',
            'cordova-copy-google-credentials',
            'cordova-copy-microsoft-credentials',
            'cordova-copy-nuance-credentials',
            'cordova-copy-src',
            'cordova-replace-cordova',
            'cordova-replace-speech',
            'cordova-replace-azure-sdk',
            'cordova-replace-google-credentials',
            'cordova-replace-microsoft-credentials',
            'cordova-replace-nuance-credentials',
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

    gulp.task('cordova-run-apk', (done) => {
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
            'cordova-run-apk',
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
