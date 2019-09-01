const gulp = require('gulp');
const path = require('path');
const childProcess = require('child_process');
const protractor = require('gulp-protractor').protractor;


// Verzeichnis-Konstanten

const rootDir = path.resolve(__dirname);
const globalCredentialsDir = './../../credentials';
const globalDistDir = './../../dist';
const globalLibDir = './../../lib';
const distDir = 'dist';
const srcDir = 'src';
const assetsDir = 'src/assets';
const buildDir = 'build';
const appDir = 'app';
const cordovaDir = 'cordova';
const cordovaAppDir = 'cordova/app';
const cordovaWwwDir = 'cordova/app/www';
const electronDir = 'electron';
const electronAppDir = 'electron/app';
const electronWwwDir = 'electron/www';

// Ausfuehrungs-Funktion

const exec = (cmd, done) => {
    const proc = childProcess.exec(cmd, {maxBuffer: 1024 * 1000}, (error, stdout, stderr) => {
        if(error) {
            console.log(`${cmd} exited with code ${error.code}`);
            done(error);
            return;
        }
        done();
    });

    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
};

const settings = {
    gulp,
    exec,
    rootDir,
    globalCredentialsDir,
    globalDistDir,
    globalLibDir,
    distDir,
    srcDir,
    assetsDir,
    buildDir,
    appDir,
    cordovaDir,
    cordovaAppDir,
    cordovaWwwDir,
    electronDir,
    electronAppDir,
    electronWwwDir
};

require('./gulp/gulp-cordova')(settings);
require('./gulp/gulp-electron')(settings);
require('./gulp/gulp-dist')(settings);


// Gulp-Tasks


/**
 * E2E-Tests mit Protractor ausfuehren
 */

gulp.task( 'e2e', () =>
    gulp.src([ './e2e/src/*.ts' ])
        .pipe( protractor({
            configFile: 'e2e/protractor.conf.js'
        }))
        .on( 'error', function(e) { throw e; })
);
