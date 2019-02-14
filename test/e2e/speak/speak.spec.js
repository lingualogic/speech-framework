/**
 * E2E-Tests fuer Speak API
 * 
 * Letzte Aenderung: 14.02.2019
 * Status: gelb
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
 * @module speak
 * @author SB
 */


const TEST_SPEAK_NAME = 'TestSpeak';
const ERROR_SPEAK_OUTPUT = false;

const jasmineSpeakTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;


// Konstanten fuer Verzeichnisse und Dateien

const TEST_SPEAKASSETS_PATH = 'assets/';
const TEST_SPEAKAUDIO_FILE = 'HalloWelt';


// Tests

describe('Speak', () => {

    let audio = null;
    let speak = null;

    beforeAll((done) => {
        // eslint-disable-next-line
        console.log('Speak E2E-Tests gestartet...');
        // eslint-disable-next-line
        speech.SpeechMain.init();
        // eslint-disable-next-line
        audio = speech.AudioFactory.create(  '', { errorOutputFlag: ERROR_SPEAK_OUTPUT });
        expect( audio ).toBeTruthy();
        // eslint-disable-next-line
        speak = speech.SpeakFactory.create(  '', { errorOutputFlag: ERROR_SPEAK_OUTPUT });
        expect( speak ).toBeTruthy();
        // Ausgabe fuer fehlende TTS
        if ( !speak.isTTS()) {
            console.log('******************************************************');
            console.log('*       Speak-E2E Tests:  keine TTS vorhanden        *');
            console.log('******************************************************');
        }
        if ( speak.isUnlockAudio()) {
            done();
        } else {
            // eslint-disable-next-line
            expect( audio.addUnlockEvent( TEST_SPEAK_NAME, (aAudioState) => {
                // eslint-disable-next-line
                // console.log('===> Speak-E2E AudioContext.state:', aAudioState);
                done();
            })).toBe( 0 );
            speak.unlockAudio();
            setTimeout( done, 2000 );
        }
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmineSpeakTimeout;
        // eslint-disable-next-line
        speech.SpeechMain.done();
    });

    afterEach(() => {
        expect( speak.removeAllEvent( TEST_SPEAK_NAME )).toBe( 0 );
        expect( speak.reset()).toBe( 0 );
        if( ERROR_SPEAK_OUTPUT ) {
            speak.setErrorOutputOn();
        } else {
            speak.setErrorOutputOff();
        }
    });

    // reset

    describe('Funktion reset', () => {

        it('sollte 0 zurueckgeben, wenn keine Optionen uebergeben werden', () => {
            expect( speak.reset()).toBe( 0 );
        });

    });

    // getType

    describe('Funktion getType', () => {

        it('sollte den Typ zurueckgeben', () => {
            // eslint-disable-next-line
            expect( speak.getType()).toBe( speech.SPEAK_TYPE_NAME );
        });
    });

    // getName

    describe('Funktion getName', () => {

        it('sollte den Komponentennamen zurueckgeben', () => {
            // eslint-disable-next-line
            expect( speak.getName()).toBe( speech.SPEAK_COMPONENT_NAME );
        });

    });

    // getVersion

    describe('Funktion getVersion', () => {
        it('sollte SPEECH_API_VERSION zurueckgeben', () => {
            // eslint-disable-next-line
            expect( speak.getVersion()).toBe( speech.SPEECH_API_VERSION );
        });
    });

    // getServerVersion

    describe('Funktion getServerVersion', () => {

        it('sollte leeren String zurueckgeben', () => {
            expect( speak.getServerVersion()).toBe( '' );
        });
    
    });

    // isActive

    describe('Funktion isActive', () => {

        it('sollte true zurueckgeben', () => {
            expect( speak.isActive()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn Active abgeschaltet wurde', () => {
            expect( speak.setActiveOff()).toBe( 0 );
            expect( speak.isActive()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn Active angeschaltet wurde', () => {
            expect( speak.setActiveOff()).toBe( 0 );
            expect( speak.isActive()).toBe( false );
            expect( speak.setActiveOn()).toBe( 0 );
            expect( speak.isActive()).toBe( true );
        });

    });

    // setActiveOn

    describe('Funktion setActiveOn', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( speak.setActiveOn()).toBe( 0 );
            expect( speak.isActive()).toBe( true );
        });

    });

    // setActiveOff

    describe('Funktion setActiveOff', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( speak.isActive()).toBe( true );
            expect( speak.setActiveOff()).toBe( 0 );
            expect( speak.isActive()).toBe( false );
        });
        
    });

    // isErrorOutput

    describe('Funktion isErrorOutput', () => {

        it('sollte true zurueckgeben, wenn ErrorOutput eingeschaltet wurde', () => {
            speak.setErrorOutputOn();
            expect( speak.isErrorOutput()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn ErrorOutput ausgeschaltet wurde', () => {
            speak.setErrorOutputOff();
            expect( speak.isErrorOutput()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn ErrorOutput aus- und eingeschaltet wurde', () => {
            speak.setErrorOutputOff();
            expect( speak.isErrorOutput()).toBe( false );
            speak.setErrorOutputOn();
            expect( speak.isErrorOutput()).toBe( true );
        });

    });

    // addInitEvent

    describe('Funktion addInitEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( speak.addInitEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( speak.addInitEvent( TEST_SPEAK_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( speak.addInitEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( speak.addInitEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
            expect( speak.addInitEvent( TEST_SPEAK_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addStartEvent

    describe('Funktion addStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( speak.addStartEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( speak.addStartEvent( TEST_SPEAK_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( speak.addStartEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( speak.addStartEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
            expect( speak.addStartEvent( TEST_SPEAK_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addStopEvent

    describe('Funktion addStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( speak.addStopEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( speak.addStopEvent( TEST_SPEAK_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( speak.addStopEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( speak.addStopEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
            expect( speak.addStopEvent( TEST_SPEAK_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addErrorEvent

    describe('Funktion addErrorEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( speak.addErrorEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( speak.addErrorEvent( TEST_SPEAK_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( speak.addErrorEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( speak.addErrorEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
            expect( speak.addErrorEvent( TEST_SPEAK_NAME, () => 0 )).toBe( -1 );
        });

    });

    // removeInitEvent

    describe('Funktion removeInitEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( speak.removeInitEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( speak.removeInitEvent( TEST_SPEAK_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( speak.addInitEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
            expect( speak.removeInitEvent( TEST_SPEAK_NAME )).toBe( 0 );
        });

    });

    // removeStartEvent

    describe('Funktion removeStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( speak.removeStartEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( speak.removeStartEvent( TEST_SPEAK_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( speak.addStartEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
            expect( speak.removeStartEvent( TEST_SPEAK_NAME )).toBe( 0 );
        });

    });

    // removeStopEvent

    describe('Funktion removeStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( speak.removeStopEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( speak.removeStopEvent( TEST_SPEAK_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( speak.addStopEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
            expect( speak.removeStopEvent( TEST_SPEAK_NAME )).toBe( 0 );
        });

    });

    // removeErrorEvent

    describe('Funktion removeErrorEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( speak.removeErrorEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( speak.removeErrorEvent( TEST_SPEAK_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( speak.addErrorEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
            expect( speak.removeErrorEvent( TEST_SPEAK_NAME )).toBe( 0 );
        });

    });

    // removeAllEvent

    describe('Funktion removeAllEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( speak.removeAllEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event eingetragen wurde', () => {
            expect( speak.removeAllEvent( TEST_SPEAK_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenm Events eingefuegt wurden', () => {
            expect( speak.addInitEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
            expect( speak.addStartEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
            expect( speak.addStopEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
            expect( speak.addErrorEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
            expect( speak.removeAllEvent( TEST_SPEAK_NAME )).toBe( 0 );
            expect( speak.addInitEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
            expect( speak.addStartEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
            expect( speak.addStopEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
            expect( speak.addErrorEvent( TEST_SPEAK_NAME, () => 0 )).toBe( 0 );
        });

    });

    // isRunning

    describe('Funktion isRunning', () => {

        it('sollte false zurueckgeben', () => {
            expect( speak.isRunning()).toBe( false );
        });

    });

    // start TTS

    describe('call start(TTS)', () => {

        it('should speak text', (done) => {
            // console.log('Test 1 Start');
            expect(speak.addStopEvent( TEST_SPEAK_NAME, () => {
                done();
                return 0;
            })).toBe(0);
            let errorText = '';
            expect(speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Speak-E2E start(TTS) ErrorEvent:', errorText );                
                speak.stop();
                return 0;
            })).toBe(0);
            expect(speak.setSpeakText('Dies ist ein erster TestText')).toBe(0);
            if ( speak.isTTS()) {
                expect(speak.start()).toBe( 0 );
                if ( errorText === '' ) {
                    expect(speak.isRunning()).toBe(true);
                } else {
                    expect(speak.isRunning()).toBe( false );
                    expect( errorText ).toBe( 'not-allowed' );
                    done();
                }
            } else {
                expect(speak.start()).toBe( -1 );
                expect( errorText ).toBe( 'SpeakComponent.start: keine TTS vorhanden' );
                done();
            }
            // console.log('Test 1 Ende');
        });

        it('should speak text english, if language english', (done) => {
            // console.log('Test 2 Start');
            expect(speak.addStopEvent( TEST_SPEAK_NAME, () => {
                // console.log('Test 2 Done');
                done();
                return 0;
            })).toBe(0);
            let errorText = '';
            expect(speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Speak-E2E start(TTS) ErrorEvent:', errorText );                
                speak.stop();
                return 0;
            })).toBe(0);
            if ( speak.isTTS()) {
                // eslint-disable-next-line
                expect(speak.setLanguage( speech.SPEAK_EN_LANGUAGE )).toBe( 0 );
                expect(speak.setSpeakText( 'this is a two TestText' )).toBe( 0 );
                expect(speak.start()).toBe( 0 );
                if ( errorText === '' ) {
                    expect( speak.isRunning()).toBe( true );
                } else {
                    expect( speak.isRunning()).toBe( false );
                    expect( errorText ).toBe( 'not-allowed' );
                    done();
                }
            } else {
                expect( speak.start()).toBe( -1 );
                expect( errorText ).toBe( 'SpeakComponent.start: keine TTS vorhanden' );
                done();
            }
            // console.log('Test 2 Ende');
        });

        it('should not speak text, if active off', () => {
            // console.log('Test 3 Start');
            expect(speak.addStartEvent( TEST_SPEAK_NAME, () => {
                fail('Test 3 should not call');
                return 0;
            })).toBe(0);
            expect(speak.addStopEvent( TEST_SPEAK_NAME, () => {
                fail('Test 3 should not call');
                return 0;
            })).toBe(0);
            let errorText = '';
            expect(speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                return 0;
            })).toBe(0);
            expect( speak.setActiveOff()).toBe( 0 );
            if ( speak.isTTS()) {
                expect( speak.start()).toBe( 0 );
                expect( speak.isRunning()).toBe( false );
                expect( errorText ).toBe( '' );
            } else {
                expect(speak.start()).toBe( -1 );
                expect( errorText ).toBe( 'SpeakComponent.start: keine TTS vorhanden' );
            }
            // console.log('Test 3 Ende');
        });

        it('should return -1, if start double', (done) => {
            // console.log('Test 4 Start');
            expect(speak.addStopEvent( TEST_SPEAK_NAME, () => {
                // console.log('Test 4 Done');
                done();
                return 0;
            })).toBe(0);
            let errorText = '';
            expect(speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Speak-E2E start(TTS) ErrorEvent:', errorText );                
                return 0;
            })).toBe(0);
            expect(speak.setSpeakText('Dies ist ein vierter TestText')).toBe( 0 );
            if ( speak.isTTS()) {
                expect(speak.start()).toBe( 0 );
                if ( errorText === '' ) {
                    expect(speak.isRunning()).toBe( true );
                    expect(speak.start()).toBe( -1 );
                    expect(errorText).toEqual('SpeakComponent.start: Sprachausgabe laeuft bereits');
                } else {
                    expect( speak.isRunning()).toBe( false );
                    expect( errorText ).toEqual('not-allowed');
                    done();
                }
            } else {
                expect(speak.start()).toBe( -1 );
                expect( errorText ).toBe( 'SpeakComponent.start: keine TTS vorhanden' );
                done();
            }
            // console.log('Test 4 Ende');
        });

        it('should return -1, if no text', () => {
            // console.log('Test 5 Start');
            expect(speak.addStartEvent( TEST_SPEAK_NAME, () => {
                fail('Test 5 should not call');
                return 0;
            })).toBe(0);
            expect(speak.addStopEvent( TEST_SPEAK_NAME, () => {
                fail('Test 5 should not call');
                return 0;
            })).toBe(0);
            let errorText = '';
            expect(speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                // console.log('Test 5 Error:', aError.message);
                errorText = aError.message;
                // console.log('Test 5 Done');
                return 0;
            })).toBe(0);
            expect( speak.start()).toBe( -1 );
            expect( speak.isRunning()).toBe( false );
            if ( speak.isTTS()) {
                expect( errorText ).toEqual('SpeakComponent._startSpeakTTS: kein Text fuer die Sprachausgabe vorhanden');
            } else {
                expect( errorText ).toBe( 'SpeakComponent.start: keine TTS vorhanden' );
            }
            // console.log('Test 5 Ende');
        });

    });

    // stop TTS

    describe('call stop(TTS)', () => {

        it('should return 0, if no speak', () => {
            // console.log('Test 6 Start');
            expect(speak.addStartEvent( TEST_SPEAK_NAME, () => {
                fail('Test 6 should not call');
                return 0;
            })).toBe(0);
            expect(speak.addStopEvent( TEST_SPEAK_NAME, () => {
                fail('Test 6 should not call');
                return 0;
            })).toBe(0);
            expect(speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                fail('Test 6 Error:', aError.message);
                return 0;
            })).toBe(0);
            expect(speak.stop()).toBe(0);
            // console.log('Test 6 Ende');
        });

        // TODO: Probleme mit Timepout, wegen fehldendem addSpeakEvent
        it('should return 0, if speak start', (done) => {
            // console.log('===> Speak-E2E stop(TTS): Start');
            expect(speak.addStopEvent( TEST_SPEAK_NAME, () => {
                // console.log('===> Speak-E2E stop(TTS): stopEvent');
                done();
                return 0;
            })).toBe(0);
            let errorText = '';
            expect(speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                // eslint-disable-next-line
                console.log('===> Speak-E2E start(TTS) ErrorEvent:', errorText );
                return 0;
            })).toBe(0);
            expect( speak.setSpeakText( 'this is a TestText' )).toBe(0);
            if ( speak.isTTS()) {
                expect( speak.start()).toBe( 0 );
                if ( errorText === '' ) {
                    expect( speak.isRunning()).toBe( true );
                    expect( speak.stop()).toBe( 0 );
                    expect( speak.isRunning()).toBe( false );
                    expect( errorText ).toBe( '' );
                } else {
                    expect( speak.isRunning()).toBe( false );
                    expect( errorText ).toEqual('not-allowed');
                    expect( speak.stop()).toBe( 0 );
                    done();
                }
            } else {
                expect( speak.start()).toBe( -1 );
                expect( errorText ).toBe( 'SpeakComponent.start: keine TTS vorhanden' );
                done();
            }
            // console.log('===> Speak-E2E stop(TTS): Ende');
        });

    });

    // start Audio

    describe('Funktion start(Audio)', () => {

        it('sollte play audio', (done) => {
            // console.log('Test 8 Start');
            expect( speak.addStopEvent( TEST_SPEAK_NAME, () => {
                // console.log('Test 8 Done');
                done();
                return 0;
            })).toBe( 0 );
            let errorText = '';
            expect( speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Speak-E2E start(audio) ErrorEvent:', errorText); 
                speak.stop();
                return 0;
            })).toBe( 0 );
            expect( speak.setAudioOn()).toBe( 0 );
            expect( speak.isAudio()).toBe( true );
            expect( speak.setAudioFilePath( TEST_SPEAKASSETS_PATH )).toBe( 0 );
            expect( speak.setAudioFileName( TEST_SPEAKAUDIO_FILE )).toBe( 0 );
            if ( speak.isTTS()) {
                if ( speak.isUnlockAudio()) {
                    expect( speak.start()).toBe( 0 );
                    expect( speak.isRunning()).toBe( true );
                    expect( errorText ).toBe( '' );
                } else {
                    expect( speak.start()).toBe( -1 );
                    expect( speak.isRunning()).toBe( false );
                    expect( errorText ).toBe( 'AudioPlayer.playFile: AudioContext ist nicht entsperrt' );
                    done();
                }
            } else {
                expect( speak.start()).toBe( -1 );
                expect( errorText ).toBe( 'SpeakComponent.start: keine TTS vorhanden' );
                done();
            }
            // console.log('Test 8 Ende');
        });

        it('should no play audio, if no audio file', () => {
            // console.log('Test 9 Start');
            expect(speak.addStartEvent( TEST_SPEAK_NAME, () => {
                fail('Test 9 should not call');
                return 0;
            })).toBe(0);
            expect(speak.addStopEvent( TEST_SPEAK_NAME, () => {
                fail('Test 9 should not call');
                return 0;
            })).toBe(0);
            let errorText = '';
            expect(speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                // console.log('Test 9 Done');
                return 0;
            })).toBe(0);
            expect(speak.setAudioOn()).toBe(0);
            expect(speak.isAudio()).toBe(true);
            expect(speak.setAudioFilePath(TEST_SPEAKASSETS_PATH)).toBe(0);
            expect(speak.setAudioFileName('')).toBe(0);
            expect(speak.start()).toBe(-1);
            if ( speak.isTTS()) {
                expect(errorText).toEqual('SpeakComponent._startSpeakAudio: kein Audiodateiname fuer die Sprachausgabe vorhanden');
            } else {
                expect( errorText ).toBe( 'SpeakComponent.start: keine TTS vorhanden' );
            }
            // console.log('Test 9 Ende');
        });

        it('should not audio play, if active off', () => {
            // console.log('Test 10 Start');
            expect(speak.addStartEvent( TEST_SPEAK_NAME, () => {
                fail('Test 10 should not call');
                return 0;
            })).toBe(0);
            expect(speak.addStopEvent( TEST_SPEAK_NAME, () => {
                fail('Test 10 should not call');
                return 0;
            })).toBe(0);
            let errorText = '';
            expect(speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                return 0;
            })).toBe(0);
            expect( speak.setActiveOff()).toBe(0);
            expect( speak.setAudioOn()).toBe(0);
            if ( speak.isTTS()) {
                expect( speak.start()).toBe( 0 );
                expect( speak.isRunning()).toBe( false );
                expect( errorText ).toBe( '' );
            } else {
                expect( speak.start()).toBe( -1 );
                expect( errorText ).toBe( 'SpeakComponent.start: keine TTS vorhanden' );
            }
            // console.log('Test 10 Ende');
        });

        it('should not audio play, if startSpeak double', () => {
            // console.log('Test 11 Start');
            let errorText = '';
            expect(speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Speak-E2E start(audio) ErrorEvent:', errorText);                
                return 0;
            })).toBe(0);
            expect(speak.setAudioOn()).toBe(0);
            expect(speak.isAudio()).toBe(true);
            expect(speak.setAudioFilePath(TEST_SPEAKASSETS_PATH)).toBe(0);
            expect(speak.setAudioFileName(TEST_SPEAKAUDIO_FILE)).toBe(0);
            if ( speak.isTTS()) {
                if ( speak.isUnlockAudio()) {
                    expect(speak.start()).toBe(0);
                    expect(speak.isRunning()).toBe(true);
                    expect(speak.start()).toBe(-1);
                    expect(errorText).toEqual('SpeakComponent.start: Sprachausgabe laeuft bereits');
                    expect( speak.stop()).toBe( 0 );
                } else {
                    expect( speak.start()).toBe( -1 );
                    expect( speak.isRunning()).toBe( false );
                    expect( errorText ).toBe( 'AudioPlayer.playFile: AudioContext ist nicht entsperrt' );
                }
            } else {
                expect( speak.start()).toBe( -1 );
                expect( errorText ).toBe( 'SpeakComponent.start: keine TTS vorhanden' );
            }
            // console.log('Test 11 Ende');
        });

    });

    // stop Audio

    describe('call stop(Audio)', () => {

        it('should return 0, if no speak', () => {
            // console.log('Test 12 Start');
            expect( speak.addStartEvent( TEST_SPEAK_NAME, () => {
                fail('Test 12 should not call');
                return 0;
            })).toBe(0);
            expect( speak.addStopEvent( TEST_SPEAK_NAME, () => {
                fail('Test 12 should not call');
                return 0;
            })).toBe(0);
            expect( speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                fail('Test 12 Error:', aError.message);
                return 0;
            })).toBe(0);
            expect( speak.setAudioOn()).toBe( 0 );
            expect( speak.stop()).toBe( 0 );
            // console.log('Test 12 Ende');
        });

        it('should return 0, if start and stop', () => {
            // console.log('Test 13 Start');
            expect( speak.addStartEvent( TEST_SPEAK_NAME, () => {
                fail('Test 13 should not call');
                return 0;
            })).toBe(0);
            expect( speak.addStopEvent( TEST_SPEAK_NAME, () => {
                return 0;
            })).toBe(0);
            let errorText = '';
            expect(speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Speak-E2E stop(audio) ErrorEvent:', errorText);                
                return 0;
            })).toBe(0);
            expect(speak.setAudioOn()).toBe( 0 );
            expect(speak.isAudio()).toBe( true );
            expect(speak.setAudioFilePath( TEST_SPEAKASSETS_PATH )).toBe( 0 );
            expect(speak.setAudioFileName( TEST_SPEAKAUDIO_FILE )).toBe( 0 );
            if ( speak.isTTS()) {
                if ( speak.isUnlockAudio()) {
                    expect(speak.start()).toBe(0);
                    expect(speak.isRunning()).toBe(true);
                    expect(speak.stop()).toBe(0);
                    expect(speak.isRunning()).toBe(false);
                    expect( errorText ).toBe( '' );
                } else {
                    expect( speak.start()).toBe( -1 );
                    expect( speak.isRunning()).toBe( false );
                    expect( errorText ).toBe( 'AudioPlayer.playFile: AudioContext ist nicht entsperrt' );
                }
            } else {
                expect(speak.start()).toBe( -1 );
                expect( errorText ).toBe( 'SpeakComponent.start: keine TTS vorhanden' );
            }
            // console.log('Test 13 Ende');
        });

    });

    // unlockAudio

    describe('Funktion unlockAudio', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( speak.unlockAudio()).toBe( 0 );
        });

    });

    // isUnlockAudio

    describe('Funktion isUnlockAudio', () => {

        it('sollte true zurueckgeben, wenn AudioContext auf running steht', () => {
            const audioContext = speak.getAudioContext();
            expect( audioContext ).toBeTruthy();
            if ( audioContext.state === 'running' ) {
                expect( speak.isUnlockAudio()).toBe( true );
            }
            else {
                expect( speak.isUnlockAudio()).toBe( false );
            }
        });

    });

    // isAudio

    describe('Funktion isAudio', () => {

        it('sollte false zurueckgeben, wenn Audio ausgeschaltet ist', () => {
            expect( speak.setAudioOff()).toBe( 0 );
            expect( speak.isAudio()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn Audio eingeschaltet ist', () => {
            expect( speak.setAudioOn()).toBe( 0 );
            expect( speak.isAudio()).toBe( true );
        });

    });

    // setAudioOn

    describe('Funktion setAudioOn', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( speak.setAudioOn()).toBe( 0 );
        });

    });

    // setAudioOff

    describe('Funktion setAudioOff', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( speak.setAudioOff()).toBe( 0 );
        });

    });

    // getAudioContext

    describe('Funktion getAudioContext', () => {

        it('sollte AudioContext zurueckgeben', () => {
            expect( speak.getAudioContext()).toBeTruthy();
        });

    });

    // setAudioFormat

    describe('Funktion setAudioFormat', () => {

        it('sollte -1 zurueckgeben, bei leerem Format', () => {
            let errorText = '';
            expect( speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Speak-E2E setAudioFormat ErrorEvent:', errorText);                
            })).toBe( 0 );
            expect( speak.setAudioFormat('')).toBe( -1 );
            expect( errorText ).toBe( 'AudioPlayer.setAudioFormat: kein gueltiges Audioformat uebergeben: ' );
        });
    
        it('sollte -1 zurueckgeben, bei falschem Format', () => {
            let errorText = '';
            expect( speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Speak-E2E setAudioFormat ErrorEvent:', errorText);                
            })).toBe( 0 );
            expect( speak.setAudioFormat('NoFormat')).toBe( -1 );
            expect( errorText ).toBe( 'AudioPlayer.setAudioFormat: kein gueltiges Audioformat uebergeben: NoFormat' );
        });

        it('sollte 0 zurueckgeben, bei MP3 Format', () => {
            // eslint-disable-next-line
            expect( speak.setAudioFormat( speech.AUDIO_MP3_FORMAT )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, bei WAV Format', () => {
            // eslint-disable-next-line
            expect( speak.setAudioFormat( speech.AUDIO_WAV_FORMAT )).toBe( 0 );
        });

    });

    // setAudioFilePath

    describe('Funktion setAudioFilePath', () => {

        it('sollte 0 zurueckgeben, bei leerem Pfad', () => {
            expect( speak.setAudioFilePath( '' )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, bei uebergebenen Pfad', () => {
            expect( speak.setAudioFilePath( 'Testpfad' )).toBe( 0 );
        });

    });

    // getAudioFilePath

    describe('Funktion getAudioFilePath', () => {

        it('sollte leeren String zurueckgeben, bei leerem Pfad', () => {
            expect( speak.setAudioFilePath( '' )).toBe( 0 );
            expect( speak.getAudioFilePath()).toBe( '' );
        });

        it('sollte string zurueckgeben, bei uebergebenen Pfad', () => {
            expect( speak.setAudioFilePath( 'Testpfad' )).toBe( 0 );
            expect( speak.getAudioFilePath()).toBe( 'Testpfad' );
        });

    });

    // setAudioFileName

    describe('Funktion setAudioFileName', () => {

        it('sollte 0 zurueckgeben, bei leerem Namen', () => {
            expect( speak.setAudioFileName( '' )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, bei uebergebenen Namen', () => {
            expect( speak.setAudioFileName( 'TestName' )).toBe( 0 );
        });

    });

    // getAudioFileName

    describe('Funktion getAudioFilePath', () => {

        it('sollte leeren String zurueckgeben, bei leerem Namen', () => {
            expect( speak.setAudioFileName( '' )).toBe( 0 );
            expect( speak.getAudioFileName()).toBe( '' );
        });

        it('sollte string zurueckgeben, bei uebergebenen Namen', () => {
            expect( speak.setAudioFileName( 'TestName' )).toBe( 0 );
            expect( speak.getAudioFileName()).toBe( 'TestName' );
        });

    });

    // isTTS

    describe('Funktion isTTS', () => {

        it('sollte boolean zurueckgeben', () => {
            const ttsList = speak.getTTSList();
            if ( ttsList.length > 0 ) {
                expect(speak.isTTS()).toBe( true );
            } else {
                expect(speak.isTTS()).toBe( false );
            }
        });

    });

    // setTTS

    describe('Funktion setTTS', () => {

        it('sollte -1 zurueckgeben, bei leerem TTS Namen', () => {
            let errorText = '';
            expect( speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Speak-E2E setAudioFormat ErrorEvent:', errorText);                
            })).toBe( 0 );
            expect( speak.setTTS( '' )).toBe( -1 );
            expect( errorText ).toBe( 'TTSGroup.setTTS: Keine TTS vorhanden' );
        });

        it('sollte -1 zurueckgeben, bei falschem TTS Namen', () => {
            let errorText = '';
            expect( speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Speak-E2E setAudioFormat ErrorEvent:', errorText);                
            })).toBe( 0 );
            expect( speak.setTTS( 'NoTTS' )).toBe( -1 );
            expect( errorText ).toBe( 'TTSGroup.setTTS: Keine TTS vorhanden' );
        });

        it('sollte 0 zurueckgeben, bei HTML5 TTS Namen', () => {
            if ( speak.isTTS()) {
                // eslint-disable-next-line
                expect( speak.setTTS( speech.SPEAK_HTML5_TTS )).toBe( 0 );
            } else {
                let errorText = '';
                expect( speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                    errorText = aError.message;
                    // console.log('===> Speak-E2E setAudioFormat ErrorEvent:', errorText);                
                })).toBe( 0 );
                // eslint-disable-next-line
                expect( speak.setTTS( speech.SPEAK_HTML5_TTS )).toBe( -1 );
                expect( errorText ).toBe( 'TTSGroup.setTTS: Keine TTS vorhanden' );
            }
        });

        it('sollte 0 zurueckgeben, bei Nuance TTS Namen', () => {
            const ttsList = speak.getTTSList();
            if ( ttsList.length > 1 ) {
                // eslint-disable-next-line
                expect( speak.setTTS( speech.SPEAK_NUANCE_TTS )).toBe( 0 );
            } else {
                let errorText = '';
                expect( speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                    errorText = aError.message;
                    // console.log('===> Speak-E2E setAudioFormat ErrorEvent:', errorText);                
                })).toBe( 0 );
                // eslint-disable-next-line
                expect( speak.setTTS( speech.SPEAK_NUANCE_TTS )).toBe( -1 );
                expect( errorText ).toBe( 'TTSGroup.setTTS: Keine TTS vorhanden' );
            }
        });

    });

    // getTTS

    describe('Funktion getTTS', () => {

        it('sollte Html5 TTS zurueckgeben', () => {
            if ( speak.isTTS()) {
                // eslint-disable-next-line
                expect( speak.getTTS()).toBe( speech.SPEAK_HTML5_TTS );
            } else {
                expect( speak.getTTS()).toBe( '' );
            }

        });

    });

    // getTTSList

    describe('Funktion getTTSList', () => {

        it('sollte TTS-Liste zurueckgeben', () => {
            const ttsList = speak.getTTSList();
            if ( ttsList.length > 0 ) {
                // eslint-disable-next-line
                expect( ttsList[ 0 ]).toBe( speech.SPEAK_HTML5_TTS );
            }
            if ( ttsList.length > 1 ) {
                // eslint-disable-next-line
                expect( ttsList[ 0 ]).toBe( speech.SPEAK_NUANCE_TTS );
            }
        });

    });

    // setLanguage

    describe('Funktion setLanguage', () => {

        it('sollte -1 zurueckgeben, wenn keine Sprache eingetragen wird', () => {
            let errorText = '';
            expect( speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Speak-E2E setLanguage ErrorEvent:', errorText);                
            })).toBe( 0 );
            expect( speak.setLanguage( '' )).toBe( -1 );
            if ( speak.isTTS()) {
                expect( errorText ).toBe( 'TTSHtml5.setLanguage: keine gueltige Sprache uebergeben' );
            } else {
                expect( errorText ).toBe( 'TTSGroup.setTTS: Keine TTS vorhanden' );
            }
        });

        it('sollte -1 zurueckgeben, wenn falsche Sprache eingetragen wird', () => {
            let errorText = '';
            expect( speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Speak-E2E setLanguage ErrorEvent:', errorText);                
            })).toBe( 0 );
            expect( speak.setLanguage( 'noLanguage' )).toBe( -1 );
            if ( speak.isTTS()) {
                expect( errorText ).toBe( 'TTSHtml5.setLanguage: keine gueltige Sprache uebergeben' );
            } else {
                expect( errorText ).toBe( 'TTSGroup.setTTS: Keine TTS vorhanden' );
            }
        });

        it('sollte 0 zurueckgeben, wenn Deutsch eingetragen wird', () => {
            if ( speak.isTTS()) {
                // eslint-disable-next-line
                expect( speak.setLanguage( speech.SPEAK_DE_LANGUAGE )).toBe( 0 );
            } else {
                let errorText = '';
                expect( speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                    errorText = aError.message;
                    // console.log('===> Speak-E2E setLanguage ErrorEvent:', errorText);                
                })).toBe( 0 );
                // eslint-disable-next-line
                expect( speak.setLanguage( speech.SPEAK_DE_LANGUAGE )).toBe( -1 );
                expect( errorText ).toBe( 'TTSGroup.setTTS: Keine TTS vorhanden' );
            }
        });

        it('sollte 0 zurueckgeben, wenn Englisch eingetragen wird', () => {
            if ( speak.isTTS()) {
                // eslint-disable-next-line
                expect( speak.setLanguage( speech.SPEAK_EN_LANGUAGE )).toBe( 0 );
            } else {
                let errorText = '';
                expect( speak.addErrorEvent( TEST_SPEAK_NAME, (aError) => {
                    errorText = aError.message;
                    // console.log('===> Speak-E2E setLanguage ErrorEvent:', errorText);                
                })).toBe( 0 );
                // eslint-disable-next-line
                expect( speak.setLanguage( speech.SPEAK_EN_LANGUAGE )).toBe( -1 );
                expect( errorText ).toBe( 'TTSGroup.setTTS: Keine TTS vorhanden' );
            }
        });

    });

    // getLanguage

    describe('Funktion getLanguage', () => {

        it('sollte Deutsch zurueckgeben, wenn Deutsch eingestellt wurde', () => {
            if ( speak.isTTS()) {
                // eslint-disable-next-line
                expect( speak.setLanguage( speech.SPEAK_DE_LANGUAGE )).toBe( 0 );
                // eslint-disable-next-line
                expect( speak.getLanguage()).toBe( speech.SPEAK_DE_LANGUAGE );
            } else {
                expect( speak.getLanguage()).toBe( '' );
            }
        });

        it('sollte Englisch zurueckgeben, wenn Englisch eingestellt wurde', () => {
            if ( speak.isTTS()) {
                // eslint-disable-next-line
                expect( speak.setLanguage( speech.SPEAK_EN_LANGUAGE )).toBe( 0 );
                // eslint-disable-next-line
                expect( speak.getLanguage()).toBe( speech.SPEAK_EN_LANGUAGE );
            } else {
                expect( speak.getLanguage()).toBe( '' );
            }
        });

    });

    // getLanguageList

    describe('Funktion getLanguageList', () => {

        it('sollte Sprachliste zurueckgeben', () => {
            const languageList = speak.getLanguageList();
            if ( languageList.length > 0 ) {
                // eslint-disable-next-line
                expect( languageList[ 0 ]).toBe( speech.SPEAK_DE_LANGUAGE );
            }
            if ( languageList.length > 1 ) {
                // eslint-disable-next-line
                expect( languageList[ 1 ]).toBe( speech.SPEAK_EN_LANGUAGE );
            }
        });

    });

    // setVoice

    describe('Funktion setVoice', () => {

        it('sollte 0 zurueckgeben, wenn leere Stimme uebergeben wird', () => {
            if ( speak.isTTS()) {
                expect( speak.setVoice( '' )).toBe( 0 );
            } else {
                expect( speak.setVoice( '' )).toBe( -1 );
            }
        });

        it('sollte 0 zurueckgeben, wenn Stimme uebergeben wird', () => {
            if ( speak.isTTS()) {
                expect( speak.setVoice( 'TestVoice' )).toBe( 0 );
            } else {
                expect( speak.setVoice( 'TestVoice' )).toBe( -1 );
            }
        });

    });

    // getVoice

    describe('Funktion getVoice', () => {

        it('sollte leeren String zurueckgeben, wenn leere Stimme uebergeben wird', () => {
            if ( speak.isTTS()) {
                expect( speak.setVoice( '' )).toBe( 0 );
                expect( speak.getVoice()).toBe( '' );
            } else {
                expect( speak.getVoice()).toBe( '' );
            }
        });

        it('sollte Stimme zurueckgeben, wenn Stimme uebergeben wurde', () => {
            if ( speak.isTTS()) {
                expect( speak.setVoice( 'TestVoice' )).toBe( 0 );
                expect( speak.getVoice()).toBe( 'TestVoice' );
            } else {
                expect( speak.setVoice( 'TestVoice' )).toBe( -1 );
                expect( speak.getVoice()).toBe( '' );
            }
        });

    });

    // getVoiceList

    // TODO: bei dieser Funktion wird bei der Erstverwendung mit der Html5-TTS eine leere Liste zurueckgegeben
    
    describe('Funktion getVoiceList', () => {

        it('sollte Stimmenliste der jeweiligen TTS zurueckgeben', () => {
            const voiceList = speak.getVoiceList();
            // console.log('===> Speak-E2E getVoiceList:', voiceList);
            expect( voiceList instanceof Array ).toBe( true );
        });

    });

    // setSpeakText

    describe('Funktion setSpeakText', () => {

        it('sollte 0 zurueckgeben, wenn leerer Text uebergeben wurde', () => {
            expect( speak.setSpeakText( '' )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Text uebergeben wurde', () => {
            expect( speak.setSpeakText( 'TestText' )).toBe( 0 );
        });

    });

    // getSpeakText

    describe('Funktion getSpeakText', () => {

        it('sollte leeren String zurueckgeben, wenn leerer Text uebergeben wurde', () => {
            expect( speak.setSpeakText( '' )).toBe( 0 );
            expect( speak.getSpeakText()).toBe( '' );
        });

        it('sollte String zurueckgeben, wenn Text uebergeben wurde', () => {
            expect( speak.setSpeakText( 'TestText' )).toBe( 0 );
            expect( speak.getSpeakText()).toBe( 'TestText' );
        });

    });

});


