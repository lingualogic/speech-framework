const gulp = require('gulp');
const path = require('path');
const childProcess = require('child_process');


// Verzeichnis-Konstanten

const rootDir = path.resolve(__dirname);
const globalLibDir = './../../lib';
const globalDistDir = './../../dist';
const globalCredentialsDir = './../../credentials';
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
    globalLibDir,
    globalDistDir,
    globalCredentialsDir,
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

