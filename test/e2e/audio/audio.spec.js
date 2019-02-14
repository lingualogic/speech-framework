/**
 * E2E-Tests fuer Audio API
 * 
 * Letzte Aenderung: 12.02.19
 * Status: rot
 *
 * Getestet:
 * 
 *          - Chrome 72 unter MacOS Mojave
 *          - Chrome 72 unter Ubuntu 18.04
 *          - Chrome 72 unter Windows 10 (1809)
 * 
 *          - Firefox 65 unter MacOS Mojave
 *          - Firefox 65 unter Ubuntu 18.04
 *          - Firefox 65 unter Windows 10 (1809)
 * 
 *          - Opera 58 unter MacOS Mojave
 *          - Opera 58 unter Ubuntu 18.04
 *          - Opera 58 unter Windows 10 (1809)
 * 
 *          - Safari 12 unter MacOS Mojave
 * 
 *          - Edge .. unter Windows 10 (1809)
 *
 * @module audio
 * @author SB
 */


// Variablen

const TEST_AUDIO_NAME = 'TestAudio';
const ERROR_AUDIO_OUTPUT = false;

const jasmineAudioTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;


// Audio-Datei zum Testen

const TEST_AUDIO_FILE = './../assets/HalloWelt.mp3';


// Tests

describe('Audio', () => {

    let audio = null;

    beforeAll((done) => {
        // eslint-disable-next-line
        console.log('Audio E2E-Tests gestartet...');
        // eslint-disable-next-line
        speech.SpeechMain.init();
        // eslint-disable-next-line
        audio = speech.AudioFactory.create( '', { errorOutputFlag: ERROR_AUDIO_OUTPUT });
        expect( audio ).toBeTruthy();
        if ( audio.isUnlockAudio()) {
            done();
        } else {
            // eslint-disable-next-line
            expect( audio.addUnlockEvent( TEST_AUDIO_NAME, (aAudioState) => {
                // console.log('===> Audio-E2E AudioContext.state:', aAudioState);
                done();
            })).toBe( 0 );
            audio.unlockAudio();
            setTimeout( done, 5000 );
        }
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmineAudioTimeout;
        // eslint-disable-next-line
        speech.SpeechMain.done();
    });

    afterEach(() => {
        expect( audio.removeAllEvent( TEST_AUDIO_NAME )).toBe( 0 );
        // expect( audio.reset()).toBe( 0 );
        if( ERROR_AUDIO_OUTPUT ) {
            audio.setErrorOutputOn();
        } else {
            audio.setErrorOutputOff();
        }
    });

    // playFile

    describe('Funktion playFile', () => {

        it('sollte -1 zurueckgeben, wenn kein Dateiname uebergeben wurde', () => {
            let errorText = '';
            expect( audio.addErrorEvent( TEST_AUDIO_NAME, (aError) => {
                errorText = aError.message;
            })).toBe( 0 );
            expect( audio.playFile( '' )).toBe( -1 );
            expect( errorText ).toBe( 'AudioPlayer.playFile: kein Dateiname uebergeben' ); 
        });


        it('sollte 0 zurueckgeben, wenn Dateiname uebergeben wurde', (done) => {
            let errorText = '';
            expect( audio.addErrorEvent( TEST_AUDIO_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Audio-E2E ErrorEvent:', errorText);
            })).toBe( 0 );
            expect( audio.addPlayerStartEvent( TEST_AUDIO_NAME, () => {
                // console.log('===> Audio-E2E: PlayerStartEvent');
            })).toBe( 0 );
            expect( audio.addPlayerStopEvent( TEST_AUDIO_NAME, () => {
                // console.log('===> Audio-E2E: PlayerStopEvent');
                done();
            })).toBe( 0 );
            if ( audio.isUnlockAudio()) {
                expect( audio.playFile( TEST_AUDIO_FILE )).toBe( 0 );
                expect( errorText ).toBe( '' ); 
            } else {
                expect( audio.playFile( TEST_AUDIO_FILE )).toBe( -1 );
                expect( errorText ).toBe( 'AudioPlayer.playFile: AudioContext ist nicht entsperrt' ); 
                done();                
            }
        });

    });

    // stopPlay

    describe('Funktion stopPlay', () => {

    });

});
