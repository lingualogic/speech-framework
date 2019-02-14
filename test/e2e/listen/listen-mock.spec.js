
/**
 * E2E-Tests fuer Listen
 * 
 * Alle SpeechRecognition-Tests werden mit dem lib/corti Mock durchgefuehrt
 *
 * Letzte Aenderung: 13.02.2019
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
 * @module listen
 * @author SB
 */


const TEST_LISTEN_NAME = 'TestListen';
const ERROR_LISTEN_OUTPUT = false;

const jasmineListenTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;


// Helper

function _listenASR( aListen, aText ) {
    // console.log('===> _listenASR: begin', aResultText);
    return new Promise((response,reject) => {
        let resultText = '';
        // console.log('===> _listenASR: begin promise');
        aListen.addListenResultEvent( TEST_LISTEN_NAME, (aResultText) => {
            // console.log('===> _listenASR: listenResult Event ', aResultText);
            if ( !aResultText ) {
                aListen.removeListenResultEvent( TEST_LISTEN_NAME );
                aListen.removeStopEvent( TEST_LISTEN_NAME );
                aListen.removeErrorEvent( TEST_LISTEN_NAME );
                reject(new Error('kein Ergebnistext vorhanden'));
                return;
            }
            resultText = aResultText;
        });
        aListen.addStopEvent( TEST_LISTEN_NAME, () => {
            // console.log('===> _listenASR: listenStop Event');
            aListen.removeListenResultEvent( TEST_LISTEN_NAME );
            aListen.removeStopEvent( TEST_LISTEN_NAME );
            aListen.removeErrorEvent( TEST_LISTEN_NAME );
            response( resultText );
        });
        aListen.addErrorEvent( TEST_LISTEN_NAME, (aErrorEvent) => {
            // console.log('===> _listenASR: error Event');
            aListen.removeListenResultEvent( TEST_LISTEN_NAME );
            aListen.removeStopEvent( TEST_LISTEN_NAME );
            aListen.removeErrorEvent( TEST_LISTEN_NAME );
            reject( aErrorEvent );
        });
        // console.log('===> _listenASR: startListen');
        if ( aListen.start() !== 0 ) {
            // console.log('===> _listenASR-Fehler:', aEqualText);
            aListen.removeListenResultEvent( TEST_LISTEN_NAME );
            aListen.removeStopEvent( TEST_LISTEN_NAME );
            aListen.removeErrorEvent( TEST_LISTEN_NAME );
            reject(new Error('Fehler aufgetreten'));
        }
        // Testfunktion say ausfuehren
        aListen.test( 'say', { sayText: aText });
        // console.log('===> _listenASR: end');
    });
}


// Tests

describe('Listen', () => {

    let listen = null;

    beforeAll(() => {
        console.log('Listen (gemockt) E2E-Tests gestartet...');
        // Mock fuer SpeechRecognition eintragen
        Corti.patch();
        speech.SpeechMain.init();
        listen = speech.ListenFactory.create( speech.LISTEN_COMPONENT_NAME, { errorOutputFlag: ERROR_LISTEN_OUTPUT });
        expect( listen ).toBeTruthy();
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmineListenTimeout;
        speech.SpeechMain.done();
        // Mock fuer SpeechRecognition entfernen
        Corti.unpatch();
    });

    afterEach(() => {
        expect( listen.removeAllEvent( TEST_LISTEN_NAME )).toBe( 0 );
        expect( listen.abort()).toBe( 0 );
        expect( listen.reset()).toBe( 0 );
        if( ERROR_LISTEN_OUTPUT ) {
            listen.setErrorOutputOn();
        } else {
            listen.setErrorOutputOff();
        }
    });

    // reset

    describe('Funktion reset', () => {

        it('sollte 0 zurueckgeben, wenn keine Optionen uebergeben werden', () => {
            expect( listen.reset()).toBe( 0 );
        });

    });

    // getType

    describe('Funktion getType', () => {

        it('sollte den Typ zurueckgeben', () => {
            // eslint-disable-next-line
            expect( listen.getType()).toBe( speech.LISTEN_TYPE_NAME );
        });
    });

    // getName

    describe('Funktion getName', () => {

        it('sollte den Komponentennamen zurueckgeben', () => {
            // eslint-disable-next-line
            expect( listen.getName()).toBe( speech.LISTEN_COMPONENT_NAME );
        });

    });

    // getVersion

    describe('Funktion getVersion', () => {
        it('sollte SPEECH_API_VERSION zurueckgeben', () => {
            // eslint-disable-next-line
            expect( listen.getVersion()).toBe( speech.SPEECH_API_VERSION );
        });
    });

    // getServerVersion

    describe('Funktion getServerVersion', () => {

        it('sollte leeren String zurueckgeben', () => {
            expect( listen.getServerVersion()).toBe( '' );
        });
    
    });

    // isActive

    describe('Funktion isActive', () => {

        it('sollte true zurueckgeben', () => {
            expect( listen.isActive()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn Active abgeschaltet wurde', () => {
            expect( listen.setActiveOff()).toBe( 0 );
            expect( listen.isActive()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn Active angeschaltet wurde', () => {
            expect( listen.setActiveOff()).toBe( 0 );
            expect( listen.isActive()).toBe( false );
            expect( listen.setActiveOn()).toBe( 0 );
            expect( listen.isActive()).toBe( true );
        });

    });

    // setActiveOn

    describe('Funktion setActiveOn', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( listen.setActiveOn()).toBe( 0 );
            expect( listen.isActive()).toBe( true );
        });

    });

    // setActiveOff

    describe('Funktion setActiveOff', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( listen.isActive()).toBe( true );
            expect( listen.setActiveOff()).toBe( 0 );
            expect( listen.isActive()).toBe( false );
        });
        
    });

    // isErrorOutput

    describe('Funktion isErrorOutput', () => {

        it('sollte true zurueckgeben, wenn ErrorOutput eingeschaltet wurde', () => {
            listen.setErrorOutputOn();
            expect( listen.isErrorOutput()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn ErrorOutput ausgeschaltet wurde', () => {
            listen.setErrorOutputOff();
            expect( listen.isErrorOutput()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn ErrorOutput aus- und eingeschaltet wurde', () => {
            listen.setErrorOutputOff();
            expect( listen.isErrorOutput()).toBe( false );
            listen.setErrorOutputOn();
            expect( listen.isErrorOutput()).toBe( true );
        });

    });

    // addInitEvent

    describe('Funktion addInitEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( listen.addInitEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( listen.addInitEvent( TEST_LISTEN_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( listen.addInitEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( listen.addInitEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.addInitEvent( TEST_LISTEN_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addStartEvent

    describe('Funktion addStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( listen.addStartEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( listen.addStartEvent( TEST_LISTEN_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( listen.addStartEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( listen.addStartEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.addStartEvent( TEST_LISTEN_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addStopEvent

    describe('Funktion addStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( listen.addStopEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( listen.addStopEvent( TEST_LISTEN_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( listen.addStopEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( listen.addStopEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.addStopEvent( TEST_LISTEN_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addErrorEvent

    describe('Funktion addErrorEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( listen.addErrorEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( listen.addErrorEvent( TEST_LISTEN_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( listen.addErrorEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( listen.addErrorEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.addErrorEvent( TEST_LISTEN_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addListenResultEvent

    describe('Funktion addListenResultEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( listen.addListenResultEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( listen.addListenResultEvent( TEST_LISTEN_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( listen.addListenResultEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( listen.addListenResultEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.addListenResultEvent( TEST_LISTEN_NAME, () => 0 )).toBe( -1 );
        });

    });

    // removeInitEvent

    describe('Funktion removeInitEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( listen.removeInitEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( listen.removeInitEvent( TEST_LISTEN_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( listen.addInitEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.removeInitEvent( TEST_LISTEN_NAME )).toBe( 0 );
        });

    });

    // removeStartEvent

    describe('Funktion removeStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( listen.removeStartEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( listen.removeStartEvent( TEST_LISTEN_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( listen.addStartEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.removeStartEvent( TEST_LISTEN_NAME )).toBe( 0 );
        });

    });

    // removeStopEvent

    describe('Funktion removeStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( listen.removeStopEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( listen.removeStopEvent( TEST_LISTEN_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( listen.addStopEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.removeStopEvent( TEST_LISTEN_NAME )).toBe( 0 );
        });

    });

    // removeErrorEvent

    describe('Funktion removeErrorEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( listen.removeErrorEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( listen.removeErrorEvent( TEST_LISTEN_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( listen.addErrorEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.removeErrorEvent( TEST_LISTEN_NAME )).toBe( 0 );
        });

    });

    // removeListenResultEvent

    describe('Funktion removeListenResultEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( listen.removeListenResultEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( listen.removeListenResultEvent( TEST_LISTEN_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( listen.addListenResultEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.removeListenResultEvent( TEST_LISTEN_NAME )).toBe( 0 );
        });

    });

    // removeAllEvent

    describe('Funktion removeAllEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( listen.removeAllEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event eingetragen wurde', () => {
            expect( listen.removeAllEvent( TEST_LISTEN_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenm Events eingefuegt wurden', () => {
            expect( listen.addInitEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.addStartEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.addStopEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.addErrorEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.addListenResultEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.removeAllEvent( TEST_LISTEN_NAME )).toBe( 0 );
            expect( listen.addInitEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.addStartEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.addStopEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.addErrorEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
            expect( listen.addListenResultEvent( TEST_LISTEN_NAME, () => 0 )).toBe( 0 );
        });

    });

    // isRunning

    describe('Funktion isRunning', () => {

        it('sollte false zurueckgeben', () => {
            expect( listen.isRunning()).toBe( false );
        });

    });

    // listen story 1

    describe('listen story 1 with ASR', () => {

        it('should input all listen sentense', async () => {
            try {
                // console.log('===> Begin Listen Story 1');
                let startCall = 0;
                listen.addStartEvent( TEST_LISTEN_NAME, () => {
                    startCall += 1;
                    return 0;
                });
                // zu erkennende Texte
                expect( await _listenASR( listen, 'Dies ist ein erster Testtext' )).toBe( 'Dies ist ein erster Testtext' );
                expect( await _listenASR( listen, 'Dies ist ein zweiter Testtext' )).toBe( 'Dies ist ein zweiter Testtext' );
                expect( await _listenASR( listen, 'Dies ist ein dritter Testtext' )).toBe( 'Dies ist ein dritter Testtext' );
                expect( await _listenASR( listen, 'Dies ist ein vierter Testtext' )).toBe( 'Dies ist ein vierter Testtext' );
                expect( await _listenASR( listen, 'Dies ist ein fuenfter Testtext' )).toBe( 'Dies ist ein fuenfter Testtext' );
                listen.removeStartEvent( TEST_LISTEN_NAME );
                expect( startCall ).toBe( 5 );
                // console.log('===> End Listen Story 1');
            } catch ( aException ) {
                console.log('===> Listen.listenStory1: Exception', aException);
                fail('should not throw exception');
            }
        });

    });

   // listen story 2

   describe('listen story 2 with ASR', () => {

        it('sollte einen Text erkennen', (done) => {
            try {
                // console.log('===> Begin Listen Story 2');
                let errorText = '';
                listen.addErrorEvent( TEST_LISTEN_NAME, (aError) => {
                    // console.log('ListenMock.errorEvent', aError.message );
                    errorText = aError.message;
                    return 0;
                });
                let startCall = false;
                listen.addStartEvent( TEST_LISTEN_NAME, () => {
                    // console.log('ListenMock.startEvent' );
                    startCall = true;
                    return 0;
                });
                let resultText = '';
                listen.addListenResultEvent( TEST_LISTEN_NAME, (aResult) => {
                    // console.log('ListenMock.resultEvent', aResult );
                    resultText = aResult;
                    return 0;
                });
                let stopCall = false;
                listen.addStopEvent( TEST_LISTEN_NAME, () => {
                    // console.log('ListenMock.stopEvent' );
                    listen.removeStartEvent( TEST_LISTEN_NAME );
                    listen.removeStopEvent( TEST_LISTEN_NAME );
                    listen.removeListenResultEvent( TEST_LISTEN_NAME );
                    listen.removeErrorEvent( TEST_LISTEN_NAME );
                    expect( startCall ).toBe( true );
                    expect( resultText ).toBe( 'Dies ist ein Testtext' );
                    expect( errorText ).toBe( '' ); 
                    done();
                    return 0;
                });
                expect( listen.start()).toBe( 0 );
                // zu erkennende Texte
                listen.test( 'say', { sayText: 'Dies ist ein Testtext' });
                // console.log('===> End Listen Story 2');
            } catch ( aException ) {
                console.log('===> Listen.listenStory2: Exception', aException);
                fail('should not throw exception');
            }
        });

    });

   // listen story 3

   describe('listen story 3 with ASR', () => {

        it('sollte starten und stoppen von Listen', () => {
            try {
                // console.log('===> Begin Listen Story 3');
                let errorText = '';
                listen.addErrorEvent( TEST_LISTEN_NAME, (aError) => {
                    // console.log('ListenMock.errorEvent', aError.message );
                    errorText = aError.message;
                    return 0;
                });
                let startCall = false;
                listen.addStartEvent( TEST_LISTEN_NAME, () => {
                    // console.log('ListenMock.startEvent' );
                    startCall = true;
                    return 0;
                });
                let resultText = '';
                listen.addListenResultEvent( TEST_LISTEN_NAME, (aResult) => {
                    // console.log('ListenMock.resultEvent', aResult );
                    resultText = aResult;
                    return 0;
                });
                let stopCall = false;
                listen.addStopEvent( TEST_LISTEN_NAME, () => {
                    // console.log('ListenMock.stopEvent' );
                    stopCall = true;
                    return 0;
                });
                expect( listen.start()).toBe( 0 );
                expect( listen.stop()).toBe( 0 );
                // zu erkennende Texte
                expect( startCall ).toBe( true );
                expect( stopCall ).toBe( true );
                expect( resultText ).toBe( '' );
                expect( errorText ).toBe( '' ); 
                // console.log('===> End Listen Story 3');
            } catch ( aException ) {
                console.log('===> Listen.listenStory3: Exception', aException);
                fail('should not throw exception');
            }
        });

    });

    // isASR

    describe('Funktion isASR', () => {

        it('sollte true zurueckgeben', () => {
            expect( listen.isASR()).toBe( true );
        });

    });

    // setASR

    describe('Funktion setASR', () => {

        it('sollte -1 zurueckgeben, bei leerem ASR Namen', () => {
            let errorText = '';
            expect( listen.addErrorEvent( TEST_LISTEN_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Listen-E2E setASR ErrorEvent:', errorText);                
            })).toBe( 0 );
            expect( listen.setASR( '' )).toBe( -1 );
            expect( errorText ).toBe( 'ASRGroup.setASR: Keine ASR vorhanden' );
        });

        it('sollte -1 zurueckgeben, bei falschem ASR Namen', () => {
            let errorText = '';
            expect( listen.addErrorEvent( TEST_LISTEN_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Listen-E2E setASR ErrorEvent:', errorText);                
            })).toBe( 0 );
            expect( listen.setASR( 'NoASR' )).toBe( -1 );
            expect( errorText ).toBe( 'ASRGroup.setASR: Keine ASR vorhanden' );
        });

        it('sollte 0 zurueckgeben, bei HTML5 ASR Namen', () => {
            // eslint-disable-next-line
            expect( listen.setASR( speech.LISTEN_HTML5_ASR )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, bei Nuance ASR Namen', () => {
            const asrList = listen.getASRList();
            if ( asrList.length > 1 ) {
                // eslint-disable-next-line
                expect( listen.setASR( speech.LISTEN_NUANCE_ASR )).toBe( 0 );
            } else {
                let errorText = '';
                expect( listen.addErrorEvent( TEST_LISTEN_NAME, (aError) => {
                    errorText = aError.message;
                    // console.log('===> Listen-E2E setASR ErrorEvent:', errorText);                
                })).toBe( 0 );
                // eslint-disable-next-line
                expect( listen.setASR( speech.LISTEN_NUANCE_ASR )).toBe( -1 );
                expect( errorText ).toBe( 'ASRGroup.setASR: Keine ASR vorhanden' );
            }
        });

    });

    // getASR

    describe('Funktion getASR', () => {

        it('sollte Html5 ASR zurueckgeben', () => {
            // eslint-disable-next-line
            expect( listen.getASR()).toBe( speech.LISTEN_HTML5_ASR );
        });

    });

    // getASRList

    describe('Funktion getASRList', () => {

        it('sollte ASR-Liste zurueckgeben', () => {
            const asrList = listen.getASRList();
            if ( asrList.length > 0 ) {
                // eslint-disable-next-line
                expect( asrList[ 0 ]).toBe( speech.LISTEN_HTML5_ASR );
            }
            if ( asrList.length > 1 ) {
                // eslint-disable-next-line
                expect( asrList[ 1 ]).toBe( speech.LISTEN_NUANCE_ASR );
            }
        });

    });

    // setLanguage

    describe('Funktion setLanguage', () => {

        it('sollte -1 zurueckgeben, wenn keine Sprache eingetragen wird', () => {
            let errorText = '';
            expect( listen.addErrorEvent( TEST_LISTEN_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Listen-E2E setLanguage ErrorEvent:', errorText);                
            })).toBe( 0 );
            expect( listen.setASR( speech.LISTEN_HTML5_ASR )).toBe( 0 );
            expect( listen.setLanguage( '' )).toBe( -1 );
            expect( errorText ).toBe( 'ASRHtml5.setLanguage: keine gueltige Sprache uebergeben' );
        });

        it('sollte -1 zurueckgeben, wenn falsche Sprache eingetragen wird', () => {
            let errorText = '';
            expect( listen.addErrorEvent( TEST_LISTEN_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Listen-E2E setLanguage ErrorEvent:', errorText);                
            })).toBe( 0 );
            expect( listen.setASR( speech.LISTEN_HTML5_ASR )).toBe( 0 );
            expect( listen.setLanguage( 'noLanguage' )).toBe( -1 );
            expect( errorText ).toBe( 'ASRHtml5.setLanguage: keine gueltige Sprache uebergeben' );
        });

        it('sollte 0 zurueckgeben, wenn Deutsch eingetragen wird', () => {
            // eslint-disable-next-line
            expect( listen.setASR( speech.LISTEN_HTML5_ASR )).toBe( 0 );
            expect( listen.setLanguage( speech.LISTEN_DE_LANGUAGE )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Englisch eingetragen wird', () => {
            // eslint-disable-next-line
            expect( listen.setASR( speech.LISTEN_HTML5_ASR )).toBe( 0 );
            expect( listen.setLanguage( speech.LISTEN_EN_LANGUAGE )).toBe( 0 );
        });

    });

    // getLanguage

    describe('Funktion getLanguage', () => {

        it('sollte Deutsch zurueckgeben, wenn Deutsch eingestellt wurde', () => {
            // eslint-disable-next-line
            expect( listen.setASR( speech.LISTEN_HTML5_ASR )).toBe( 0 );
            expect( listen.setLanguage( speech.LISTEN_DE_LANGUAGE )).toBe( 0 );
            // eslint-disable-next-line
            expect( listen.getLanguage()).toBe( speech.LISTEN_DE_LANGUAGE );
        });

        it('sollte Englisch zurueckgeben, wenn Englisch eingestellt wurde', () => {
            // eslint-disable-next-line
            expect( listen.setASR( speech.LISTEN_HTML5_ASR )).toBe( 0 );
            expect( listen.setLanguage( speech.LISTEN_EN_LANGUAGE )).toBe( 0 );
            // eslint-disable-next-line
            expect( listen.getLanguage()).toBe( speech.LISTEN_EN_LANGUAGE );
        });

    });

    // getLanguageList

    describe('Funktion getLanguageList', () => {

        it('sollte Sprachliste zurueckgeben', () => {
            const languageList = listen.getLanguageList();
            // eslint-disable-next-line
            expect( languageList[ 0 ]).toBe( speech.LISTEN_DE_LANGUAGE );
            // eslint-disable-next-line
            expect( languageList[ 1 ]).toBe( speech.LISTEN_EN_LANGUAGE );
        });

    });

    // abort

    describe('Funktion abort', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( listen.abort()).toBe( 0 );
        });
    });

});


