// Karma configuration
// Generated on Tue May 01 2018 21:02:58 GMT+0200 (CEST)

console.log('**************************************************');
console.log('*                Karma E2E-Tests                 *');
console.log('*                                                *');


// BrowserList-Konfiguration

const browserConfig = require( './config/karma-browser-list.json');
const browserList = [];
console.log('*       Browser:                                 *');

if ( browserConfig.CHROME )  { browserList.push( 'ChromeHeadlessCI' );    console.log('*                   Chrome                       *'); }
if ( browserConfig.FIREFOX ) { browserList.push( 'Firefox' );   console.log('*                   Firefox                      *'); }
if ( browserConfig.OPERA )   { browserList.push( 'Opera' );     console.log('*                   Opera                        *'); }
if ( browserConfig.SAFARI )  { browserList.push( 'Safari' );    console.log('*                   Safari                       *'); }
if ( browserConfig.EDGE )    { browserList.push( 'Edge' );      console.log('*                   Edge                         *'); }
console.log('*                                                *');


// FileList-Konfiguration

console.log('*       Konfiguration:                           *');
const fileList = [];
fileList.push( './test/e2e/action/*.spec.js' );    console.log('*                   Action                       *');
fileList.push( './test/e2e/audio/*.spec.js' );     console.log('*                   Audio                        *');
fileList.push( './test/e2e/bot/*.spec.js' );       console.log('*                   Bot                          *');
fileList.push( './test/e2e/dialog/*.spec.js' );    console.log('*                   Dialog                       *');
fileList.push( './test/e2e/intent/*.spec.js' );    console.log('*                   Intent                       *');
fileList.push( './test/e2e/listen/*.spec.js' );    console.log('*                   Listen                       *');
fileList.push( './test/e2e/speak/*.spec.js' );     console.log('*                   Speak                        *');
fileList.push( './test/e2e/*.spec.js' );
fileList.push( './dist/speech-framework.js' );
fileList.push({ pattern: 'test/lib/corti.js', watched: false, included: true, served: true, nocache: false });
fileList.push({ pattern: './test/e2e/assets/speech/*.def', watched: false, included: false, served: true, nocache: false });
fileList.push({ pattern: './test/e2e/assets/*.mp3', watched: false, included: false, served: true, nocache: false });
fileList.push({ pattern: './test/e2e/assets/*.wav', watched: false, included: false, served: true, nocache: false });

console.log('**************************************************');


module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: fileList,

        proxies: {
            '/assets/': 'http://localhost:9876/base/test/e2e/assets/'
        },

        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-opera-launcher'),
            require('karma-safari-launcher'),
            require('karma-edge-launcher'),
            require('karma-jasmine-html-reporter'),
        ],

        // list of files / patterns to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },

        client: {
            captureConsole: true,
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
        reporters: ['progress', 'kjhtml'],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher

        // for all platforms
        // browsers: ['Chrome', 'Firefox', 'Opera'],

        // only for Mac
        // browsers: ['Chrome', 'Firefox', 'Opera', 'Safari'],

        // only for Windows
        // browsers: ['Chrome', 'Firefox', 'OperaWindows', 'Edge'],
        
        browsers: browserList,

        // browsers: ['ChromeHeadless'],
        // browsers: ['Chrome'],
        // browsers: ['Firefox'],
        // browsers: ['Opera'],
        // browsers: ['OperaWindows'],
        // browsers: ['Safari'],
        // browsers: ['Edge'],

        customLaunchers: {
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            },
            OperaWindows: {
                base: 'Opera',
                flags: ['--ran-launcher']
            }
        },

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: 1,

        browserNoActivityTimeout: 100000,


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true

    });
};
