// rollup.config.js fuer SpeechService

import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';


// SpeechFramework

import * as speechVersion from './src/speech-version.json';

const SPEECH_VERSION_STRING = speechVersion.SPEECH_VERSION_NUMBER + '.' + speechVersion.SPEECH_VERSION_BUILD + ' (' + speechVersion.SPEECH_VERSION_TYPE + ') vom ' + speechVersion.SPEECH_VERSION_DATE;

console.log('');
console.log('*******************************************************************');
console.log('**                                                               **');
console.log('**  Speech-Framework VERSION: ' + SPEECH_VERSION_STRING + '  **');
console.log('**                                                               **');
console.log('*******************************************************************');
console.log('');


// Parameter fuer die Erzeugung der SpeechDialog..bundle.js Datei

let readableSourceCode = true; // true, wenn Code lesbar sein soll, false sonst (uglify/minify)
let preambleText =
`/**
 * Speech-Framework
 * 
 * Version: ${speechVersion.SPEECH_VERSION_NUMBER}
 * Build:   ${speechVersion.SPEECH_VERSION_BUILD}
 * TYPE:    ${speechVersion.SPEECH_VERSION_TYPE}
 * Datum:   ${speechVersion.SPEECH_VERSION_DATE}
 *
 * Autor:   LinguaLogic Team
 * Lizenz:  MIT
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
`;


let typescriptDefaults = { compilerOptions: { declaration: true } };
let typescriptOverride = { compilerOptions: { declaration: false } };

export default {
    input: './index.ts',
    output: {
        file: './build/speech-framework.js',
        format: 'umd',
        name: 'speech',
        sourcemap: false,
        globals: {
        }

    },
    plugins: [
        typescript({
            tsconfigDefaults: typescriptDefaults,
            tsconfig: 'tsconfig.build.json',
            tsconfigOverride: typescriptOverride
        }),

        json(),

        uglify({ output: {
            beautify: readableSourceCode,
            preamble: preambleText,
            quote_style: 3
        }}, minify),

        nodeResolve({
            jsnext: true,
            main: false
        }),

        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            include: [
                './src/action/**',
                './src/audio/**',
                './src/base/**',
                './src/bot/**',
                './src/cloud/**',
                './src/common/**', 
                './src/const/**', 
                './src/core/**', 
                './src/dialog/**',
                './src/file/**',
                './src/inference/**',
                './src/interface/**',
                './src/intent/**',
                './src/listen/**',
                './src/net/**',
                './src/speak/**',
                './node_modules/**'], 
            // Default: undefined
            // exclude: ['node_modules/**'], // Default: undefined
            // these values can also be regular expressions
            // include: /node_modules/

            // search for files other than .js files (must already
            // be transpiled by a previous plugin!)
            extensions: ['.js', '.ts'], // Default: [ '.js' ]

            // if true then uses of `global` won't be dealt with by this plugin
            ignoreGlobal: false, // Default: false

            // if false then skip sourceMap generation for CommonJS modules
            sourceMap: false, // Default: true

            // explicitly specify unresolvable named exports
            // (see below for more details)
            /*
            namedExports: { 
                'node_modules/rxjs/Observable.js': [ 'Observable' ],
                'node_modules/rxjs/Subject': [ 'Subject' ] }  // Default: undefined
            */
            // sometimes you have to leave require statements
            // unconverted. Pass an array containing the IDs
            // or a `id => boolean` function. Only use this
            // option if you know what you're doing!
            //ignore: [ 'conditional-runtime-dependency' ]
        })
    ],

};