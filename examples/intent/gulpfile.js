const gulp = require('gulp');
const path = require('path');
const childProcess = require('child_process');

// Verzeichnis-Konstanten

const rootDir = path.resolve(__dirname);
const globalCredentialsDir = './../../credentials';
const globalDistDir = './../../dist';
const distDir = 'dist';
const srcDir = 'src';
const assetsDir = 'src/assets';
const buildDir = 'build';
const appDir = 'app';
const cordovaDir = 'cordova';
const cordovaAppDir = 'cordova/app';
const cordovaWwwDir = 'cordova/app/www';
const electronDir = 'electron';
const wwwElectronDir = 'electron/www';

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
    distDir,
    srcDir,
    assetsDir,
    buildDir,
    appDir,
    cordovaDir,
    cordovaAppDir,
    cordovaWwwDir,
    electronDir,
    wwwElectronDir
};

require('./gulp/gulp-cordova')(settings);
require('./gulp/gulp-electron')(settings);
require('./gulp/gulp-dist')(settings);

