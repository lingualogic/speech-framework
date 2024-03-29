/**
 * Gulp-Datei zur Erzeugung der Electron-Version der Listen-App
 */


const del = require('del');
const path = require('path');
const inject = require('gulp-inject-string');
const runSquence = require('gulp4-run-sequence');


// Electron spezifisch


var packager = require('electron-packager');
// var electronPackage = require('electron/package.json');
// var globalPkg = require('./../../../package.json');
var localPkg = require('./../package.json');


// pull the electron version from the package.json file
// var electronVersion = electronPackage.version;


module.exports = ({ gulp, exec, globalLibDir, globalDistDir, globalCredentialsDir, srcDir, electronDir, electronAppDir, electronWwwDir }) => {


    var opts = {
        name: localPkg.productName,
        // platform: 'darwin',
        // arch: 'x64',                             // ia32, x64 or all
        dir: electronDir,                                  // source location of app
        out: electronAppDir,                              // destination location for app os/native binaries
        // ignore: config.electronignore,           // don't include these directories in the electron app build
        // icon: config.icon,
        // asar: {unpackDir: config.electroncompiled}, // compress project/modules into an asar blob but don't use asar to pack the native compiled modules
        overwrite: true,
        prune: true,
        // electronVersion: electronVersion ,       // Tell the packager what version of electron to build with
        // appCopyright: pkg.copyright,            // copyright info
        appVersion: localPkg.version,         // The version of the application we are building
        win32metadata: {                        // Windows Only config data
            CompanyName: localPkg.authors,
            ProductName: localPkg.productName,
            FileDescription: localPkg.description,
            OriginalFilename: localPkg.prductName + '.exe'
        }
    };
    

    gulp.task('electron-prepare', () => {
        return del([
            electronWwwDir,
            electronAppDir
        ]);
    });

    gulp.task('electron-copy-speech', () => {
        return gulp.src(path.join( globalDistDir, 'speech-framework.js'))
            .pipe(gulp.dest(path.join(electronWwwDir, 'js')));
    });

    gulp.task('electron-copy-lib', () => {
        return gulp.src(path.join( globalLibDir, 'microsoft.cognitiveservices.speech.sdk.bundle-min.js'))
            .pipe(gulp.dest(path.join(electronWwwDir, 'js')));
    });

    gulp.task('electron-copy-credentials', () => {
        return gulp.src([
            path.join( globalCredentialsDir, 'google-credentials.js'),
            path.join( globalCredentialsDir, 'microsoft-credentials.js'),
            path.join( globalCredentialsDir, 'nuance-credentials.js')
        ])
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

    gulp.task('electron-replace-lib', (done) => {
        gulp.src(path.join(electronWwwDir, 'index.html'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../lib/microsoft.cognitiveservices.speech.sdk.bundle-min.js"></script>', '<script type="text/javascript" src="js/microsoft.cognitiveservices.speech.sdk.bundle-min.js"></script>'))
            .pipe(gulp.dest(electronWwwDir))
            .on('end', done);
    });

    gulp.task('electron-replace-credentials', (done) => {
        gulp.src(path.join( electronWwwDir, 'index.html'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../credentials/google-credentials.js"></script>', '<script type="text/javascript" src="js/google-credentials.js"></script>'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../credentials/microsoft-credentials.js"></script>', '<script type="text/javascript" src="js/microsoft-credentials.js"></script>'))
            .pipe(inject.replace('<script type="text/javascript" src="./../../../credentials/nuance-credentials.js"></script>', '<script type="text/javascript" src="js/nuance-credentials.js"></script>'))
            .pipe(gulp.dest( electronWwwDir))
            .on('end', done);
    });

    gulp.task('electron-remove-absolute-assets', (done) => {
        gulp.src(path.join(electronWwwDir, '**', '*.js'))
            .pipe(inject.replace('/assets/', 'assets/'))
            .pipe(gulp.dest(electronWwwDir))
            .on('end', done);
    });
    
    gulp.task('electron-mkdir-app', (done) => {
        exec(`cd ${electronDir} && mkdir app`, done);
    });

       
    // Build the electron app

    gulp.task('electron-build-app', function (cb) {
    
        console.log('Launching task to package binaries for ' + opts.name + ' v' + opts['appVersion']);
    
        packager(opts, function (err, electronAppDir) {
            console.log(' <- packagerDone() ' + err + ' ' + electronAppDir);
            console.log(' all done!');
            cb();
        });
    });


    gulp.task('electron-run-app', (done) => {
        exec(`electron ${electronDir}`, done);
    });


    gulp.task('electron-generate', (done) => {
        runSquence(
            'electron-prepare',
            'electron-copy-speech',
            'electron-copy-lib',
            'electron-copy-credentials',
            'electron-copy-src',
            'electron-replace-speech',
            'electron-replace-lib',
            'electron-replace-credentials',
            'electron-remove-absolute-assets',
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


    gulp.task('electron-build', (done) => {
        runSquence(
            'electron-generate',
            'electron-mkdir-app',
            'electron-build-app',
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


    gulp.task('electron-run', (done) => {
        runSquence(
            'electron-generate',
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
