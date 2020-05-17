/**
 * Gulp-Datei zur Erzeugung der Dist-Version der Intent-App
 */


const rimraf = require('rimraf');
const path = require('path');
const inject = require('gulp-inject-string');
const runSquence = require('gulp4-run-sequence');

module.exports = ({ gulp, exec, rootDir, globalCredentialsDir, globalDistDir, globalLibDir, distDir, srcDir }) => {

    gulp.task('dist-prepare', (done) => {
        rimraf( distDir, done);
    });

    gulp.task('dist-copy-credentials', () => {
        return gulp.src([
            `${globalCredentialsDir}/nuance-credentials.js`,
            `${globalCredentialsDir}/google-credentials.js`,
            `${globalCredentialsDir}/microsoft-credentials.js`,
            `${globalCredentialsDir}/rasa-credentials.js`            
        ])
            .pipe( gulp.dest( `${distDir}/js` ));
    });

    gulp.task('dist-copy-lib', () => {
        return gulp.src([
            `${globalLibDir}/microsoft.cognitiveservices.speech.sdk.bundle-min.js`
        ], { allowEmpty: true })
            .pipe(gulp.dest( `${distDir}/js` ));
    });

    gulp.task('dist-copy-speech', () => {
        return gulp.src( `${globalDistDir}/speech-framework.js` )
            .pipe(gulp.dest( `${distDir}/js` ));
    });

    gulp.task('dist-copy-src', () => {
        return gulp.src( `${srcDir}/**/*`)
            .pipe( gulp.dest( distDir ));
    });

    gulp.task('dist-replace-lib', (done) => {
        gulp.src( `${distDir}/index.html` )
            .pipe(inject.replace('<script type="text/javascript" src="./../../../lib/microsoft.cognitiveservices.speech.sdk.bundle-min.js"></script>', '<script type="text/javascript" src="js/microsoft.cognitiveservices.speech.sdk.bundle-min.js"></script>'))
            .pipe(gulp.dest( distDir ))
            .on('end', done);
    });

    gulp.task( 'dist-replace-credentials', (done) => {
        gulp.src( `${distDir}/index.html` )
            .pipe(inject.replace('<script type="text/javascript" src="./../../../credentials/nuance-credentials.js"></script>', '<script type="text/javascript" src="js/nuance-credentials.js"></script>'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../credentials/google-credentials.js"></script>', '<script type="text/javascript" src="js/google-credentials.js"></script>'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../credentials/microsoft-credentials.js"></script>', '<script type="text/javascript" src="js/microsoft-credentials.js"></script>'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../credentials/rasa-credentials.js"></script>', '<script type="text/javascript" src="js/rasa-credentials.js"></script>'))
            .pipe(gulp.dest( distDir ))
            .on('end', done);
    });

    gulp.task('dist-replace-speech', (done) => {
        gulp.src( `${distDir}/index.html` )
            .pipe(inject.replace('<script type="text/javascript" src="./../../../dist/speech-framework.js"></script>', '<script type="text/javascript" src="js/speech-framework.js"></script>'))
            .pipe(gulp.dest( distDir ))
            .on('end', done);
    });

    gulp.task('dist-remove-absolute-assets', (done) => {
        gulp.src( `${distDir}/**/*.js` )
            .pipe(inject.replace('/assets/', 'assets/'))
            .pipe(gulp.dest( distDir ))
            .on('end', done);
    });

    gulp.task('dist-run-app', (done) => {
        exec(`cd ${rootDir}/${distDir} && http-server -p 4200 -o -c-1`, done);
    });


    /**
     * Erzeugt die Web-App
     */

    gulp.task('dist-build', (done) => {
        runSquence(
            'dist-prepare',
            'dist-copy-src',
            'dist-copy-lib',
            'dist-replace-lib',
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
