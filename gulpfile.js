/**
 * Automatisierung des Buildprozesses von Speech-Framework
 */

'use strict';


// Module definieren

const gulp = require('gulp');
const shell = require('gulp-shell');
const runSequence = require('run-sequence');
const typedoc = require('gulp-typedoc');
const del = require('del');
const fs = require('fs');
const rename = require('gulp-rename');


// Dokumentations-Funktionen


/**  
 * Erzeugt eine TypeDoc Nutzer Ausgabe fuer SpeechFramework (stable)
 */

gulp.task('dist-typedoc', (cb) => {
    return gulp
        .src([
            'src/action/*.ts',
            'src/audio/*.ts',
            'src/base/*.ts',
            'src/bot/*.ts',
            'src/dialog/*.ts',
            'src/intent/*.ts',
            'src/listen/*.ts',
            'src/speak/*.ts'
        ])
        .pipe(typedoc({
            // TypeScript options (see typescript docs)
            module: 'umd',
            target: 'es6',
            includeDeclarations: false,
            // Output options (see typedoc docs)
            out: 'dist/docs/api',
            // json: './typedoc.json',
            // TypeDoc options (see typedoc docs)
            name: 'Speech-Framework',
            mode: 'modules',
            readme: 'src/README.md',
            types: [],
            exclude: [
                '**/action/action.ts',
                '**/audio/audio.ts',
                '**/base/base.ts',
                '**/bot/bot.ts',
                '**/intent/intent.ts',
                '**/dialog/dialog.ts',
                '**/listen/listen.ts',
                '**/speak/speak.ts',
                '**/*mock.ts'
            ],
            externalPattern: './node_modules/**',
            excludeExternals: true,
            ignoreCompilerErrors: true,
            plugins: ['typedoc-plugin-external-module-name'],
            version: true,
            verbose: true,
            hideGenerator: true,
            logger: typedoc.Logger
        }), cb);
});


gulp.task('typedoc', (cb) => {
    return gulp
        .src([
            'src/**/*.ts'
        ])
        .pipe(typedoc({
            // TypeScript options (see typescript docs)
            module: 'umd',
            target: 'es6',
            includeDeclarations: false,
            // Output options (see typedoc docs)
            out: 'docs/api',
            // json: './typedoc.json',
            // TypeDoc options (see typedoc docs)
            name: 'Speech-Framework',
            mode: 'modules',
            readme: 'src/README.md',
            types: [],
            exclude: [
                '**/*mock.ts'
            ],
            externalPattern: './node_modules/**',
            excludeExternals: true,
            ignoreCompilerErrors: true,
            plugins: ['typedoc-plugin-external-module-name'],
            version: true,
            verbose: true,
            hideGenerator: true,
            logger: typedoc.Logger
        }), cb);
});


// Test Funktionen


/** 
 * Stable E2E-Tests in Karma starten
 */

gulp.task('test', shell.task('karma start karma.conf.js'));


// Kopiert Quellcode


/** 
 * Kopiert die Indexdatei aus build/ nach dist/
 */ 

gulp.task('copy-index', function() {
    return gulp.src([
        'build/index.d.ts',
        'build/speech-framework.js',
        'src/speech-version.json'
    ])
        .pipe( gulp.dest('dist'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src/ nach dist/src/
 */ 

gulp.task('copy-main', function() {
    return gulp.src([
        'build/src/speech-main.d.ts'
    ])
        .pipe( gulp.dest('dist/src'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src/const nach dist/src/const
 */ 

gulp.task('copy-const', function() {
    return gulp.src([
        'build/src/const/speech-version.d.ts'
    ])
        .pipe( gulp.dest('dist/src/const'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/
 */ 

gulp.task('copy-interface', function() {
    return gulp.src([
        'build/src/interface/speech-function.type.d.ts'
    ])
        .pipe( gulp.dest('dist/src/interface'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Base
 */ 

gulp.task('copy-base', function() {
    return gulp.src([
        'build/src/base/base-const.d.ts',
        'build/src/base/base-function.type.d.ts',
        'build/src/base/base-option.interface.d.ts',
        'build/src/base/base.interface.d.ts',
    ])
        .pipe( gulp.dest('dist/src/base'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Action
 */ 

gulp.task('copy-action', function() {
    return gulp.src([
        'build/src/action/action-const.d.ts',
        'build/src/action/action-data.interface.d.ts',
        'build/src/action/action-factory.d.ts',
        'build/src/action/action-function.type.d.ts',
        'build/src/action/action-option.interface.d.ts',
        'build/src/action/action.interface.d.ts',
    ])
        .pipe( gulp.dest('dist/src/action'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Audio
 */ 

gulp.task('copy-audio', function() {
    return gulp.src([
        'build/src/audio/audio-const.d.ts',
        'build/src/audio/audio-factory.d.ts',
        'build/src/audio/audio-function.type.d.ts',
        'build/src/audio/audio.interface.d.ts',
    ])
        .pipe( gulp.dest('dist/src/audio'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Speak
 */ 

gulp.task('copy-speak', function() {
    return gulp.src([
        'build/src/speak/speak-const.d.ts',
        'build/src/speak/speak-data.interface.d.ts',
        'build/src/speak/speak-factory.d.ts',
        'build/src/speak/speak-function.type.d.ts',
        'build/src/speak/speak-option.interface.d.ts',
        'build/src/speak/speak.interface.d.ts',
    ])
        .pipe( gulp.dest('dist/src/speak'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Listen
 */ 

gulp.task('copy-listen', function() {
    return gulp.src([
        'build/src/listen/listen-const.d.ts',
        'build/src/listen/listen-factory.d.ts',
        'build/src/listen/listen-function.type.d.ts',
        'build/src/listen/listen-option.interface.d.ts',
        'build/src/listen/listen.interface.d.ts',
    ])
        .pipe( gulp.dest('dist/src/listen'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Dialog
 */ 

gulp.task('copy-dialog', function() {
    return gulp.src([
        'build/src/dialog/dialog-action.interface.d.ts',
        'build/src/dialog/dialog-const.d.ts',
        'build/src/dialog/dialog-factory.d.ts',
        'build/src/dialog/dialog-function.type.d.ts',
        'build/src/dialog/dialog-option.interface.d.ts',
        'build/src/dialog/dialog-speak.interface.d.ts',
        'build/src/dialog/dialog-state-context.interface.d.ts',
        'build/src/dialog/dialog.interface.d.ts',
    ])
        .pipe( gulp.dest('dist/src/dialog'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Intent
 */ 

gulp.task('copy-intent', function() {
    return gulp.src([
        'build/src/intent/intent-action.interface.d.ts',
        'build/src/intent/intent-const.d.ts',
        'build/src/intent/intent-data.interface.d.ts',
        'build/src/intent/intent-event-const.d.ts',
        'build/src/intent/intent-factory.d.ts',
        'build/src/intent/intent-function.type.d.ts',
        'build/src/intent/intent-option.interface.d.ts',
        'build/src/intent/intent-speak.interface.d.ts',
        'build/src/intent/intent-state-context.interface.d.ts',
        'build/src/intent/intent.interface.d.ts'
    ])
        .pipe( gulp.dest('dist/src/intent'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Bot
 */ 

gulp.task('copy-bot', function() {
    return gulp.src([
        'build/src/bot/bot-const.d.ts',
        'build/src/bot/bot-factory.d.ts',
        'build/src/bot/bot-option.interface.d.ts',
        'build/src/bot/bot.interface.d.ts'
    ])
        .pipe( gulp.dest('dist/src/bot'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Bot
 */ 

gulp.task('copy-nuance', function() {
    return gulp.src([
        'build/src/cloud/nuance/nuance-const.d.ts',
        'build/src/cloud/nuance/nuance-option.interface.d.ts',
        'src/cloud/nuance/nuance.d.ts',
    ])
        .pipe( gulp.dest('dist/src/cloud/nuance'));
}); 


/** 
 * Kopiert die Bundledateien aus bundle/ nach dist/
 */ 

gulp.task('copy-bundle', function() {
    return gulp.src([
        'bundle/index.js',
        'bundle/package.json'
    ])
        .pipe( gulp.dest('dist/'));
}); 


/** 
 * Kopiert die Originaldateien aus / nach dist/
 */ 

gulp.task('copy-original', function() {
    return gulp.src([
        'CHANGELOG.md',
        'LICENSE',
        'README.md'
    ])
        .pipe( gulp.dest('dist/'));
}); 


/** 
 * Kopiert alle benoetigten Dateien aus bundle/ nach dist/
 */ 

gulp.task('dist-copy-src', (callback) => {
    runSequence(
        'copy-index',
        'copy-bundle',
        'copy-original',        
        'copy-main',        
        'copy-const',
        'copy-interface',
        'copy-base',        
        'copy-action',
        'copy-audio',
        'copy-speak',
        'copy-listen',
        'copy-dialog',
        'copy-intent',
        'copy-bot',
        'copy-nuance',
        callback
    );
});


/**
 * Kopiert die Credentials
 */

gulp.task('install-nuance-credentials-ts', function() {
    try {
        // pruefen auf vorhandene Nuance-Credentials Datei
        fs.accessSync( './config/nuance-credentials.ts' );
    } catch (e) {
        // Datei ist nicht vorhanden und kann erzeugt werden
        return gulp.src( './config/nuance-credentials.default.ts' )
            .pipe( rename( 'nuance-credentials.ts' ))
            .pipe( gulp.dest( './config' ));
    }
    return gulp.src([]); // empty stream
});


/**
 * Kopiert die Credentials
 */

gulp.task('install-nuance-credentials-js', function() {
    try {
        // pruefen auf vorhandene Nuance-Credentials Datei
        fs.accessSync( './config/nuance-credentials.js' );
    } catch (e) {
        // Datei ist nicht vorhanden und kann erzeugt werden
        return gulp.src( './config/nuance-credentials.default.js' )
            .pipe( rename('nuance-credentials.js'))
            .pipe( gulp.dest( './config' ));
    }
    return gulp.src([]); // empty stream
});


/**
 * Installiert alle benoetigten Dateien
 */

gulp.task('install', (callback) => {
    runSequence(
        'install-nuance-credentials-ts',
        'install-nuance-credentials-js',
        callback
    );
});



/** 
 * Loeschen der temporaeren Build-Verzeichnisse
 */

gulp.task('build-clean', function () {
    return del([
        'build',
        'dist'
    ]);
});


/**
 * Erzeugen von src-Ordner im Dist-Verzeichnis  
 */ 

gulp.task('build-dir', shell.task('mkdir dist'));


/**
 * Typescript transpilieren in build-Ordner
 */

gulp.task('build-transpile', shell.task('tsc '));


/** 
 * Erzeugt die auszuliefernde Client-Bibliothek
 */

gulp.task('build-rollup', shell.task('rollup -c ./rollup.config.js'));


/**
 * Verpackt die auszuliefernde Client-Bibliothek
 */

gulp.task('dist-pack', shell.task('cd dist && npm pack'));


/** 
 * Erzeugt die lauffaehige Speech-Bibliothek speech.bundle.js aus dem API-Quellcode
 */

gulp.task('build', function(callback) {
    runSequence(
        'build-clean',
        'build-dir',
        'build-transpile',
        'build-rollup',
        'dist-copy-src',
        'dist-pack',
        callback
    );
});

