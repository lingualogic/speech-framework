/**
 * Automatisierung des Buildprozesses von Speech-Framework
 * 
 * Gulp4 Version
 */

'use strict';


// Module definieren

const gulp = require('gulp');
const shell = require('gulp-shell');
const runSequence = require('gulp4-run-sequence');
const typedoc = require('gulp-typedoc');
const del = require('del');
const fs = require('fs');
// const rename = require('gulp-rename');
const file = require('gulp-file');
const inject = require('gulp-inject-string');


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
            'src/inference/*.ts',
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
                '**/dialog/dialog.ts',
                '**/inference/inference.ts',
                '**/intent/intent.ts',
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


/** 
 * Installationstext des veroeffentlichten NPM-Packages
 */

gulp.task('test-install', shell.task('npm install ./dist/speech-framework-0.5.20.tgz'));


// Kopiert Quellcode


/** 
 * Kopiert die Indexdatei aus build/ nach dist/
 */ 

gulp.task('copy-index', function() {
    return gulp.src([
        'build/index.d.ts',
        'build/speech-framework.js',
        'config/speech-version.json'
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
    ], { allowEmpty: true })
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
        'build/src/speak/speak-factory.d.ts',
        'build/src/speak/speak-function.type.d.ts',
        'build/src/speak/speak-option.interface.d.ts',
        'build/src/speak/speak.interface.d.ts',
    ], { allowEmpty: true })
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
    ], { allowEmpty: true })
        .pipe( gulp.dest('dist/src/listen'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Dialog
 */ 

gulp.task('copy-dialog', function() {
    return gulp.src([
        'build/src/dialog/dialog-action.interface.d.ts',
        'build/src/dialog/dialog-const.d.ts',
        'build/src/dialog/dialog-data.interface.d.ts',
        'build/src/dialog/dialog-factory.d.ts',
        'build/src/dialog/dialog-function.type.d.ts',
        'build/src/dialog/dialog-option.interface.d.ts',
        'build/src/dialog/dialog-speak.interface.d.ts',
        'build/src/dialog/dialog-state-context.interface.d.ts',
        'build/src/dialog/dialog.interface.d.ts',
    ], { allowEmpty: true })
        .pipe( gulp.dest('dist/src/dialog'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Inference
 */ 

gulp.task('copy-inference', function() {
    return gulp.src([
        'build/src/inference/inference-action.interface.d.ts',
        'build/src/inference/inference-const.d.ts',
        'build/src/inference/inference-event-const.d.ts',
        'build/src/inference/inference-factory.d.ts',
        'build/src/inference/inference-function.type.d.ts',
        'build/src/inference/inference-message-const.d.ts',
        'build/src/inference/inference-option.interface.d.ts',
        'build/src/inference/inference-speak.interface.d.ts',
        'build/src/inference/inference-state-context.interface.d.ts',
        'build/src/inference/inference.interface.d.ts',
    ], { allowEmpty: true })
        .pipe( gulp.dest('dist/src/inference'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Intent
 */ 

gulp.task('copy-intent', function() {
    return gulp.src([
        'build/src/intent/intent-const.d.ts',
        'build/src/intent/intent-data.interface.d.ts',
        'build/src/intent/intent-factory.d.ts',
        'build/src/intent/intent-function.type.d.ts',
        'build/src/intent/intent-option.interface.d.ts',
        'build/src/intent/intent.interface.d.ts'
    ], { allowEmpty: true })
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
    ], { allowEmpty: true })
        .pipe( gulp.dest('dist/src/bot'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Nuance
 */ 

gulp.task('copy-nuance', function() {
    return gulp.src([
        'bundle/nuance.d.ts',
        'build/src/cloud/nuance/nuance-const.d.ts',
        'build/src/cloud/nuance/nuance-config-data.interface.d.ts',
        'build/src/cloud/nuance/nuance-option.interface.d.ts'
    ], { allowEmpty: true })
        .pipe( gulp.dest('dist/src/cloud/nuance'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Amazon
 */ 

gulp.task('copy-amazon', function() {
    return gulp.src([
        'bundle/amazon.d.ts',
        'build/src/cloud/amazon/amazon-const.d.ts',
        'build/src/cloud/amazon/amazon-config-data.interface.d.ts',
        'build/src/cloud/amazon/amazon-option.interface.d.ts'
    ], { allowEmpty: true })
        .pipe( gulp.dest('dist/src/cloud/amazon'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Google
 */ 

gulp.task('copy-google', function() {
    return gulp.src([
        'bundle/google.d.ts',
        'build/src/cloud/google/google-const.d.ts',
        'build/src/cloud/google/google-config-data.interface.d.ts',
        'build/src/cloud/google/google-option.interface.d.ts'
    ], { allowEmpty: true })
        .pipe( gulp.dest('dist/src/cloud/google'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Microsoft
 */ 

gulp.task('copy-microsoft', function() {
    return gulp.src([
        'bundle/microsoft.d.ts',
        'build/src/cloud/microsoft/microsoft-const.d.ts',
        'build/src/cloud/microsoft/microsoft-config-data.interface.d.ts',
        'build/src/cloud/microsoft/microsoft-option.interface.d.ts'
    ], { allowEmpty: true })
        .pipe( gulp.dest('dist/src/cloud/microsoft'));
}); 


/** 
 * Kopiert die Sourcedateien aus build/src nach dist/src/ von Rasa
 */ 

gulp.task('copy-rasa', function() {
    return gulp.src([
        'bundle/rasa.d.ts',
        'build/src/cloud/rasa/rasa-const.d.ts',
        'build/src/cloud/rasa/rasa-config-data.interface.d.ts',
        'build/src/cloud/rasa/rasa-option.interface.d.ts'
    ], { allowEmpty: true })
        .pipe( gulp.dest('dist/src/cloud/rasa'));
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

gulp.task('copy-lib-aws-sdk', function() {
    return gulp.src([
        'lib/AWS_SDK_LICENSE.txt',
        'lib/aws-sdk-speech.min.js'
    ], { allowEmpty: true })
        .pipe( gulp.dest('dist/'));
}); 


/** 
 * Kopiert die Originaldateien aus / nach dist/
 */ 

gulp.task('copy-lib-azure-sdk', function() {
    return gulp.src([
        'lib/AZURE_SDK_LICENSE',
        'lib/microsoft.cognitiveservices.speech.sdk.bundle-min.js',
        'lib/speech-processor.js'
    ], { allowEmpty: true })
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
        'copy-lib-aws-sdk',        
        'copy-lib-azure-sdk',        
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
        'copy-inference',
        'copy-intent',
        'copy-bot',
        'copy-nuance',
        'copy-amazon',
        'copy-google',
        'copy-microsoft',
        'copy-rasa',
        callback
    );
});


/**
 * Erzeugt nuance.credentials.ts in credentials/
 */

gulp.task('install-nuance-credentials-ts', function() {
    try {
        // pruefen auf vorhandene Nuance-Credentials Datei
        fs.accessSync( 'credentials/nuance-credentials.ts' );
        return gulp.src( '*' ); // empty stream
    } catch (e) {
        // Datei ist nicht vorhanden und kann erzeugt werden
        return gulp.src([ 'credentials/nuance-credentials.ts' ], { allowEmpty: true })
            .pipe( file( 'nuance-credentials.ts', ''))
            .pipe( inject.append( "/**\n" ))
            .pipe( inject.append( " * Nuance Credentials\n" ))
            .pipe( inject.append( " */\n" ))
            .pipe( inject.append( "\n" ))
            .pipe( inject.append( "\n" ))
            .pipe( inject.append( "export const APP_ID = '';\n" ))
            .pipe( inject.append( "export const APP_KEY = '';\n" ))
            .pipe( inject.append( "export const NLU_TAG = '';\n" ))
            .pipe( gulp.dest( 'credentials' ));
    }
});


/**
 * Erzeugt nuance.credentials.js in credentials/
 */

gulp.task('install-nuance-credentials-js', function() {
    try {
        // pruefen auf vorhandene Nuance-Credentials Datei
        fs.accessSync( 'credentials/nuance-credentials.js' );
        return gulp.src( '*' ); // empty stream
    } catch (e) {
        // Datei ist nicht vorhanden und kann erzeugt werden
        return gulp.src([ 'credentials/nuance-credentials.js' ], { allowEmpty: true })
            .pipe( file( 'nuance-credentials.js', ''))
            .pipe(inject.append( "/**\n" ))
            .pipe(inject.append( " * Nuance Credentials\n" ))
            .pipe(inject.append( " */\n" ))
            .pipe(inject.append( "\n" ))
            .pipe(inject.append( "\n" ))
            .pipe(inject.append( "var APP_ID = '';\n" ))
            .pipe(inject.append( "var APP_KEY = '';\n" ))
            .pipe(inject.append( "var NLU_TAG = '';\n" ))
            .pipe( gulp.dest( 'credentials' ));
    }
});


/**
 * Erzeugt amazon.credentials.ts in credentials/
 */

gulp.task('install-amazon-credentials-ts', function() {
    try {
        // pruefen auf vorhandene Amazon-Credentials Datei
        fs.accessSync( 'credentials/amazon-credentials.ts' );
        return gulp.src( '*' ); // empty stream
    } catch (e) {
        // Datei ist nicht vorhanden und kann erzeugt werden
        return gulp.src([ 'credentials/amazon-credentials.ts' ], { allowEmpty: true })
            .pipe( file( 'amazon-credentials.ts', ''))
            .pipe( inject.append( "/**\n" ))
            .pipe( inject.append( " * Amazon Credentials\n" ))
            .pipe( inject.append( " */\n" ))
            .pipe( inject.append( "\n" ))
            .pipe( inject.append( "\n" ))
            .pipe( inject.append( "export const REGION = '';\n" ))
            .pipe( inject.append( "export const IDENTITY_POOL_ID = '';\n" ))
            .pipe( gulp.dest( 'credentials' ));
    }
});


/**
 * Erzeugt amazon.credentials.js in credentials/
 */

gulp.task('install-amazon-credentials-js', function() {
    try {
        // pruefen auf vorhandene Amazon-Credentials Datei
        fs.accessSync( 'credentials/amazon-credentials.js' );
        return gulp.src( '*' ); // empty stream
    } catch (e) {
        // Datei ist nicht vorhanden und kann erzeugt werden
        return gulp.src([ 'credentials/amazon-credentials.js' ], { allowEmpty: true })
            .pipe( file( 'amazon-credentials.js', ''))
            .pipe(inject.append( "/**\n" ))
            .pipe(inject.append( " * Amazon Credentials\n" ))
            .pipe(inject.append( " */\n" ))
            .pipe(inject.append( "\n" ))
            .pipe(inject.append( "\n" ))
            .pipe(inject.append( "var REGION = '';\n" ))
            .pipe(inject.append( "var IDENTITY_POOL_ID = '';\n" ))
            .pipe( gulp.dest( 'credentials' ));
    }
});


/**
 * Erzeugt amazon.credentials.ts in credentials/
 */

gulp.task('install-google-credentials-ts', function() {
    try {
        // pruefen auf vorhandene Google-Credentials Datei
        fs.accessSync( 'credentials/google-credentials.ts' );
        return gulp.src( '*' ); // empty stream
    } catch (e) {
        // Datei ist nicht vorhanden und kann erzeugt werden
        return gulp.src([ 'credentials/google-credentials.ts' ], { allowEmpty: true })
            .pipe( file( 'google-credentials.ts', ''))
            .pipe( inject.append( "/**\n" ))
            .pipe( inject.append( " * Google Credentials\n" ))
            .pipe( inject.append( " */\n" ))
            .pipe( inject.append( "\n" ))
            .pipe( inject.append( "\n" ))
            .pipe( inject.append( "export const GOOGLE_APP_KEY = '';\n" ))
            .pipe( inject.append( "export const GOOGLE_SERVER_URL = '';\n" ))
            .pipe( inject.append( "export const DIALOGFLOW_TOKENSERVER_URL = '';\n" ))
            .pipe( inject.append( "export const DIALOGFLOW_PROJECT_ID = '';\n" ))
            .pipe( gulp.dest( 'credentials' ));
    }
});


/**
 * Erzeugt google.credentials.js in credentials/
 */

gulp.task('install-google-credentials-js', function() {
    try {
        // pruefen auf vorhandene Google-Credentials Datei
        fs.accessSync( 'credentials/google-credentials.js' );
        return gulp.src( '*' ); // empty stream
    } catch (e) {
        // Datei ist nicht vorhanden und kann erzeugt werden
        return gulp.src([ 'credentials/google-credentials.js' ], { allowEmpty: true })
            .pipe( file( 'google-credentials.js', ''))
            .pipe(inject.append( "/**\n" ))
            .pipe(inject.append( " * Google Credentials\n" ))
            .pipe(inject.append( " */\n" ))
            .pipe(inject.append( "\n" ))
            .pipe(inject.append( "\n" ))
            .pipe(inject.append( "var GOOGLE_APP_KEY = '';\n" ))
            .pipe(inject.append( "var GOOGLE_SERVER_URL = '';\n" ))
            .pipe(inject.append( "var DIALOGFLOW_TOKENSERVER_URL = '';\n" ))
            .pipe(inject.append( "var DIALOGFLOW_PROJECT_ID = '';\n" ))
            .pipe( gulp.dest( 'credentials' ));
    }
});


/**
 * Erzeugt microsoft-credentials.ts in credentials/
 */

gulp.task('install-microsoft-credentials-ts', function() {
    try {
        // pruefen auf vorhandene Microsoft-Credentials Datei
        fs.accessSync( 'credentials/microsoft-credentials.ts' );
        return gulp.src( '*' ); // empty stream
    } catch (e) {
        // Datei ist nicht vorhanden und kann erzeugt werden
        return gulp.src([ 'credentials/microsoft-credentials.ts' ], { allowEmpty: true })
            .pipe( file( 'microsoft-credentials.ts', ''))
            .pipe(inject.append( "/**\n" ))
            .pipe(inject.append( " * Microsoft Credentials\n" ))
            .pipe(inject.append( " */\n" ))
            .pipe(inject.append( "\n" ))
            .pipe(inject.append( "\n" ))
            .pipe(inject.append( "export const MICROSOFT_REGION = '';\n" ))
            .pipe(inject.append( "export const MICROSOFT_SUBSCRIPTION_KEY = '';\n" ))
            .pipe(inject.append( "export const MICROSOFT_LUIS_ENDPOINT = '';\n" ))
            .pipe( gulp.dest(  'credentials' ));
    }
});


/**
 * Erzeugt microsoft-credentials.js in credentials/
 */

gulp.task('install-microsoft-credentials-js', function() {
    try {
        // pruefen auf vorhandene Microsoft-Credentials Datei
        fs.accessSync( 'credentials/microsoft-credentials.js' );
        return gulp.src( '*' ); // empty stream
    } catch (e) {
        // Datei ist nicht vorhanden und kann erzeugt werden
        return gulp.src([ 'credentials/microsoft-credentials.js' ], { allowEmpty: true })
            .pipe( file( 'microsoft-credentials.js', ''))
            .pipe(inject.append( "/**\n" ))
            .pipe(inject.append( " * Microsoft Credentials\n" ))
            .pipe(inject.append( " */\n" ))
            .pipe(inject.append( "\n" ))
            .pipe(inject.append( "\n" ))
            .pipe(inject.append( "var MICROSOFT_REGION = '';\n" ))
            .pipe(inject.append( "var MICROSOFT_SUBSCRIPTION_KEY = '';\n" ))
            .pipe(inject.append( "var MICROSOFT_LUIS_ENDPOINT = '';\n" ))
            .pipe( gulp.dest(  'credentials' ));
    }
});


/**
 * Erzeugt rasa-credentials.ts in credentials/
 */

gulp.task('install-rasa-credentials-ts', function() {
    try {
        // pruefen auf vorhandene Rasa-Credentials Datei
        fs.accessSync( 'credentials/rasa-credentials.ts' );
        return gulp.src( '*' ); // empty stream
    } catch (e) {
        // Datei ist nicht vorhanden und kann erzeugt werden
        return gulp.src([ 'credentials/rasa-credentials.ts' ], { allowEmpty: true })
            .pipe( file( 'rasa-credentials.ts', ''))
            .pipe( inject.append( "/**\n" ))
            .pipe( inject.append( " * Rasa Credentials\n" ))
            .pipe( inject.append( " */\n" ))
            .pipe( inject.append( "\n" ))
            .pipe( inject.append( "\n" ))
            .pipe( inject.append( "export const RASA_SERVER_URL = '';\n" ))
            .pipe( inject.append( "export const RASA_APP_KEY = '';\n" ))
            .pipe( gulp.dest( 'credentials' ));
    }
});


/**
 * Erzeugt rasa-credentials.js in credentials/
 */

gulp.task('install-rasa-credentials-js', function() {
    try {
        // pruefen auf vorhandene Rasa-Credentials Datei
        fs.accessSync( 'credentials/rasa-credentials.js' );
        return gulp.src( '*' ); // empty stream
    } catch (e) {
        // Datei ist nicht vorhanden und kann erzeugt werden
        return gulp.src([ 'credentials/rasa-credentials.js' ], { allowEmpty: true })
            .pipe( file( 'rasa-credentials.js', ''))
            .pipe( inject.append( "/**\n" ))
            .pipe( inject.append( " * Rasa Credentials\n" ))
            .pipe( inject.append( " */\n" ))
            .pipe( inject.append( "\n" ))
            .pipe( inject.append( "\n" ))
            .pipe( inject.append( "var RASA_SERVER_URL = '';\n" ))            
            .pipe( inject.append( "var RASA_APP_KEY = '';\n" ))
            .pipe( gulp.dest( 'credentials' ));
    }
});


/**
 * Installiert die WebDriver-Treiber fuer die  Protractor-Tests
 */

gulp.task('install-webdriver', shell.task('node node_modules/protractor/bin/webdriver-manager update'));


// Gulp-Task


gulp.task('install-electron', shell.task('npm install --save-dev electron electron-packager'));

gulp.task('install-cordova', shell.task('npm install --save-dev cordova'));


/**
 * Installiert alle benoetigten Dateien
 */

gulp.task('install', (callback) => {
    runSequence(
        'install-nuance-credentials-ts',
        'install-nuance-credentials-js',
        'install-amazon-credentials-ts',
        'install-amazon-credentials-js',
        'install-google-credentials-ts',
        'install-google-credentials-js',
        'install-microsoft-credentials-ts',
        'install-microsoft-credentials-js',
        'install-rasa-credentials-ts',
        'install-rasa-credentials-js',
        'install-webdriver',
        'install-electron',
        'install-cordova',
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

// TODO: funktioniert unter Windows nicht 
// gulp.task('build-dir', shell.task('mkdir dist'));
gulp.task('build-dir', function(cb) {
    fs.mkdir( 'dist', {recursive: true}, cb);
});

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
 * Veroeffentlichen der auszuliefernde Client-Bibliothek in NPMJS-Repository
 */

gulp.task('dist-publish', shell.task('cd dist && npm publish'));



// Intent-Beispiel erzeugen


/**
 * Installiert das Intent Web-Beispiel
 */

gulp.task('install-intent', shell.task('cd examples/intent && npm install'));


/**
 * Erzeugt das Intent Web-Beispiel
 */

gulp.task('build-intent', shell.task('cd examples/intent && npm run build'));


/**
 * Erzeugt das Intent-Electron Beispiel
 */

gulp.task('build-intent-electron', shell.task('cd examples/intent && npm run build:electron'));


/**
 * Erzeugt das Intent-Android Beispiel
 */

gulp.task('build-intent-android', shell.task('cd examples/intent && npm run build:android'));


/**
 * Testet das Intent Web-Beispiel
 */

gulp.task('test-intent', shell.task('cd examples/intent && npm run e2e'));


/** 
 * Erzeugt das Intent-Example
 */

gulp.task('build-intent-example', function(callback) {
    try {
        // pruefen auf vorhandenes Intent-Beispiel
        fs.accessSync( 'examples/intent/package.json' );
        runSequence(
            // 'install-intent',
            'build-intent',
            // 'build-intent-electron',
            // 'build-intent-android',
            'test-intent',
            callback
        );
    } catch (e) {
        callback();
    }
});


// Listen-Beispiel erzeugen


/**
 * Installiert das Listen Web-Beispiel
 */

gulp.task('install-listen', shell.task('cd examples/listen && npm install'));


/**
 * Erzeugt das Listen-Beispiel
 */

gulp.task('build-listen', shell.task('cd examples/listen && npm run build'));


/**
 * Erzeugt das Listen-Electron Beispiel
 */

gulp.task('build-listen-electron', shell.task('cd examples/listen && npm run build:electron'));


/**
 * Erzeugt das Listen-Android Beispiel
 */

gulp.task('build-listen-android', shell.task('cd examples/listen && npm run build:android'));


/**
 * Testet das Listen Web-Beispiel
 */

gulp.task('test-listen', shell.task('cd examples/listen && npm run e2e'));


/** 
 * Erzeugt das Listen-Example
 */

gulp.task('build-listen-example', function(callback) {
    try {
        // pruefen auf vorhandenes Listen-Beispiel
        fs.accessSync( 'examples/listen/package.json' );
        runSequence(
            // 'install-listen',
            'build-listen',
            // 'build-listen-electron',
            // 'build-listen-android',
            'test-listen',
            callback
        );
    } catch (e) {
        callback();
    }
});


// Speak-Beispiel erzeugen


/**
 * Installiert das Speak Web-Beispiel
 */

gulp.task('install-speak', shell.task('cd examples/speak && npm install'));


/**
 * Erzeugt das Speak-Beispiel
 */

gulp.task('build-speak', shell.task('cd examples/speak && npm run build'));


/**
 * Erzeugt das Speak-Electron Beispiel
 */

gulp.task('build-speak-electron', shell.task('cd examples/speak && npm run build:electron'));


/**
 * Erzeugt das Speak-Android Beispiel
 */

gulp.task('build-speak-android', shell.task('cd examples/speak && npm run build:android'));


/**
 * Testet das Speak Web-Beispiel
 */

gulp.task('test-speak', shell.task('cd examples/speak && npm run e2e'));


/** 
 * Erzeugt das Speak-Example
 */

gulp.task('build-speak-example', function(callback) {
    try {
        // pruefen auf vorhandenes Speak-Beispiel
        fs.accessSync( 'examples/speak/package.json' );
        runSequence(
            // 'install-speak',
            'build-speak',
            // 'build-speak-electron',
            // 'build-speak-android',
            'test-speak',
            callback
        );
    } catch (e) {
        callback();
    }
});


// Beispiele erzeugen


/** 
 * Erzeugt die Examples
 */

gulp.task('build-examples', function(callback) {
    runSequence(
        'build-intent-example',
        'build-listen-example',
        'build-speak-example',
        callback
    );
});


// Speech-Bibliothek erzeugeun


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
        'test',
        callback
    );
});


/** 
 * Erzeugt die lauffaehige Speech-Bibliothek fuer NPM
 */

gulp.task('build-npm', function(callback) {
    runSequence(
        'build',
        'test-install',
        'build-clean',
        'build-dir',
        'build-transpile',
        'build-rollup',
        'dist-copy-src',
        callback
    );
});


/** 
 * Erzeugt und veroeffentlicht das NPM-Package 
 */

gulp.task('publish-npm', function(callback) {
    runSequence(
        'build-npm',
        'dist-publish',
        callback
    );
});
