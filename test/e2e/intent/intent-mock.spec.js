/**
 * E2E-Tests fuer Intent
 * 
 * Alle Nuance-Tests werden mit dem Nuance-Mock durchgefuehrt
 * Alle Google-Tests werden mit dem Google-Mock durchgefuehrt
 *
 * Letzte Aenderung: 11.05.2019
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
 * @module intent
 * @author SB
 */


const TEST_INTENT_NAME = 'TestIntent';
const ERROR_INTENT_OUTPUT = true;

const jasmineIntentTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;


// Tests

describe('Intent', () => {

    let nuanceFlag = false;
    let googleFlag = false;
    let rasaFlag = false;
    let intent = null;
    let nluCount = 0;

    beforeAll((done) => {
        // eslint-disable-next-line
        console.log('Intent (gemockt) E2E-Tests gestartet...');
        // console.log('Nuance vorhanden:', speech.Nuance);
        // console.log('Google vorhanden:', speech.Google);
        // console.log('Rasa vorhanden:', speech.Rasa);
        // eslint-disable-next-line
        if ( speech.Nuance ) {
            // console.log('IntentTest: Nuance wird erzeugt');
            // Nuance initialisieren
            // eslint-disable-next-line
            expect( speech.Nuance.init({ nuancePortName: 'NuanceMock', nuanceAppId: 'testAppId', nuanceAppKey: 'testAppKey', errorOutputFlag: ERROR_INTENT_OUTPUT })).toBe( 0 );
            // eslint-disable-next-line
            expect( speech.Nuance.open(() => {
                // eslint-disable-next-line
                speech.SpeechMain.init();
                // eslint-disable-next-line
                intent = speech.IntentFactory.create( speech.INTENT_COMPONENT_NAME, { errorOutputFlag: ERROR_INTENT_OUTPUT });
                expect( intent ).toBeTruthy();
                nuanceFlag = true;
                nluCount++;
                done();
            })).toBe( 0 );
        } else {
            // eslint-disable-next-line
            if ( speech.Google ) {
                // console.log('IntentTest: Google wird erzeugt');
                // Google initialisieren
                // eslint-disable-next-line
                expect( speech.Google.init({ googlePortName: 'GoogleMock', googleAppKey: 'testAppKey', errorOutputFlag: ERROR_INTENT_OUTPUT })).toBe( 0 );
                // eslint-disable-next-line
                expect( speech.Google.open(() => {
                    // eslint-disable-next-line
                    speech.SpeechMain.init();
                    // eslint-disable-next-line
                    intent = speech.IntentFactory.create( speech.INTENT_COMPONENT_NAME, { errorOutputFlag: ERROR_INTENT_OUTPUT });
                    expect( intent ).toBeTruthy();
                    googleFlag = true;
                    nluCount++;
                    done();
                })).toBe( 0 );
            } else {
                // eslint-disable-next-line
                if ( speech.Rasa ) {
                    console.log('IntentTest: Rasa wird erzeugt');
                    // Google initialisieren
                    // eslint-disable-next-line
                    expect( speech.Rasa.init({ rasaPortName: 'RasaMock', rasaAppKey: 'testAppKey', errorOutputFlag: ERROR_INTENT_OUTPUT })).toBe( 0 );
                    // eslint-disable-next-line
                    expect( speech.Rasa.open(() => {
                        // eslint-disable-next-line
                        speech.SpeechMain.init();
                        // eslint-disable-next-line
                        intent = speech.IntentFactory.create( speech.INTENT_COMPONENT_NAME, { errorOutputFlag: ERROR_INTENT_OUTPUT });
                        expect( intent ).toBeTruthy();
                        rasaFlag = true;
                        nluCount++;
                        done();
                    })).toBe( 0 );
                }
            }
        } 
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmineIntentTimeout;
        intent = null;
        // eslint-disable-next-line
        speech.SpeechMain.done();
        // eslint-disable-next-line
        if ( speech.Nuance ) {
            // eslint-disable-next-line
            speech.Nuance.done();
        // eslint-disable-next-line
        } else if ( speech.Google ) {
            // eslint-disable-next-line
            speech.Google.done();
            // eslint-disable-next-line
        } else if ( speech.Rasa ) {
            // eslint-disable-next-line
            speech.Rasa.done();
        }
    });

    afterEach(() => {
        expect( intent.removeAllEvent( TEST_INTENT_NAME )).toBe( 0 );
        expect( intent.abort()).toBe( 0 );
        expect( intent.reset()).toBe( 0 );
        if( ERROR_INTENT_OUTPUT ) {
            intent.setErrorOutputOn();
        } else {
            intent.setErrorOutputOff();
        }

    });

    // reset

    describe('Funktion reset', () => {

        it('sollte 0 zurueckgeben, wenn keine Optionen uebergeben werden', () => {
            expect( intent.reset()).toBe( 0 );
        });

    });

    // getType

    describe('Funktion getType', () => {

        it('sollte den Typ zurueckgeben', () => {
            // eslint-disable-next-line
            expect( intent.getType()).toBe( speech.INTENT_TYPE_NAME );
        });
    });

    // getName

    describe('Funktion getName', () => {

        it('sollte den Komponentennamen zurueckgeben', () => {
            // eslint-disable-next-line
            expect( intent.getName()).toBe( speech.INTENT_COMPONENT_NAME );
        });

    });

    // getVersion

    describe('Funktion getVersion', () => {
        it('sollte SPEECH_API_VERSION zurueckgeben', () => {
            // eslint-disable-next-line
            expect( intent.getVersion()).toBe( speech.SPEECH_API_VERSION );
        });
    });

    // getServerVersion

    describe('Funktion getServerVersion', () => {

        it('sollte leeren String zurueckgeben', () => {
            expect( intent.getServerVersion()).toBe( '' );
        });
    
    });

    // isActive

    describe('Funktion isActive', () => {

        it('sollte true zurueckgeben', () => {
            expect( intent.isActive()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn Active abgeschaltet wurde', () => {
            expect( intent.setActiveOff()).toBe( 0 );
            expect( intent.isActive()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn Active angeschaltet wurde', () => {
            expect( intent.setActiveOff()).toBe( 0 );
            expect( intent.isActive()).toBe( false );
            expect( intent.setActiveOn()).toBe( 0 );
            expect( intent.isActive()).toBe( true );
        });

    });

    // setActiveOn

    describe('Funktion setActiveOn', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( intent.setActiveOn()).toBe( 0 );
            expect( intent.isActive()).toBe( true );
        });

    });

    // setActiveOff

    describe('Funktion setActiveOff', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( intent.setActiveOff()).toBe( 0 );
            expect( intent.isActive()).toBe( false );
        });
        
    });

    // isErrorOutput

    describe('Funktion isErrorOutput', () => {

        it('sollte true zurueckgeben, wenn ErrorOutput eingeschaltet wurde', () => {
            intent.setErrorOutputOn();
            expect( intent.isErrorOutput()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn ErrorOutput ausgeschaltet wurde', () => {
            intent.setErrorOutputOff();
            expect( intent.isErrorOutput()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn ErrorOutput aus- und eingeschaltet wurde', () => {
            intent.setErrorOutputOff();
            expect( intent.isErrorOutput()).toBe( false );
            intent.setErrorOutputOn();
            expect( intent.isErrorOutput()).toBe( true );
        });

    });

    // addInitEvent

    describe('Funktion addInitEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( intent.addInitEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( intent.addInitEvent( TEST_INTENT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( intent.addInitEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( intent.addInitEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addInitEvent( TEST_INTENT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addStartEvent

    describe('Funktion addStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( intent.addStartEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( intent.addStartEvent( TEST_INTENT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( intent.addStartEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( intent.addStartEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addStartEvent( TEST_INTENT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addStopEvent

    describe('Funktion addStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( intent.addStopEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( intent.addStopEvent( TEST_INTENT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( intent.addStopEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( intent.addStopEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addStopEvent( TEST_INTENT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addErrorEvent

    describe('Funktion addErrorEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( intent.addErrorEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( intent.addErrorEvent( TEST_INTENT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( intent.addErrorEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( intent.addErrorEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addErrorEvent( TEST_INTENT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addListenResultEvent

    describe('Funktion addListenResultEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( intent.addListenResultEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( intent.addListenResultEvent( TEST_INTENT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( intent.addListenResultEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( intent.addListenResultEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addListenResultEvent( TEST_INTENT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addIntentResultEvent

    describe('Funktion addIntentResultEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( intent.addIntentResultEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( intent.addIntentResultEvent( TEST_INTENT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( intent.addIntentResultEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( intent.addIntentResultEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addIntentResultEvent( TEST_INTENT_NAME, () => 0 )).toBe( -1 );
        });

    });
    
    // removeInitEvent

    describe('Funktion removeInitEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( intent.removeInitEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( intent.removeInitEvent( TEST_INTENT_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( intent.addInitEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.removeInitEvent( TEST_INTENT_NAME )).toBe( 0 );
        });

    });

    // removeStartEvent

    describe('Funktion removeStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( intent.removeStartEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( intent.removeStartEvent( TEST_INTENT_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( intent.addStartEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.removeStartEvent( TEST_INTENT_NAME )).toBe( 0 );
        });

    });

    // removeStopEvent

    describe('Funktion removeStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( intent.removeStopEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( intent.removeStopEvent( TEST_INTENT_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( intent.addStopEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.removeStopEvent( TEST_INTENT_NAME )).toBe( 0 );
        });

    });

    // removeErrorEvent

    describe('Funktion removeErrorEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( intent.removeErrorEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( intent.removeErrorEvent( TEST_INTENT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( intent.addErrorEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.removeErrorEvent( TEST_INTENT_NAME )).toBe( 0 );
        });

    });

    // removeListenResultEvent

    describe('Funktion removeListenResultEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( intent.removeListenResultEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( intent.removeListenResultEvent( TEST_INTENT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( intent.addListenResultEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.removeListenResultEvent( TEST_INTENT_NAME )).toBe( 0 );
        });

    });

    // removeIntentResultEvent

    describe('Funktion removeIntentResultEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( intent.removeIntentResultEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( intent.removeIntentResultEvent( TEST_INTENT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( intent.addIntentResultEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.removeIntentResultEvent( TEST_INTENT_NAME )).toBe( 0 );
        });

    });

    // removeAllEvent

    describe('Funktion removeAllEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( intent.removeAllEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event eingetragen wurde', () => {
            expect( intent.removeAllEvent( TEST_INTENT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenm Events eingefuegt wurden', () => {
            expect( intent.addInitEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addStartEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addStopEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addErrorEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addListenResultEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addIntentResultEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.removeAllEvent( TEST_INTENT_NAME )).toBe( 0 );
            expect( intent.addInitEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addStartEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addStopEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addErrorEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addListenResultEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
            expect( intent.addIntentResultEvent( TEST_INTENT_NAME, () => 0 )).toBe( 0 );
        });

    });

    // isRunning

    describe('Funktion isRunning', () => {

        it('sollte false zurueckgeben', () => {
            expect( intent.isRunning()).toBe( false );
        });

    });

    // start(NLU)

    describe('Funktion start(NLU)', () => {

        it('sollte intent zum Text zurueckgeben', () => {
            expect( intent.addStartEvent( TEST_INTENT_NAME, () => {
                // console.log('===> Intent-E2E start: startEvent');
                return 0;
            })).toBe( 0 );
            let data = null;
            expect( intent.addIntentResultEvent( TEST_INTENT_NAME, (aIntentData) => {
                // console.log('===> Intent-E2E start: IntentResultEvent', aIntentData);
                data = aIntentData;
                return 0;
            })).toBe( 0 );
            expect( intent.setIntentText( 'Dies ist ein erster TestText' )).toBe( 0 );
            expect( intent.start()).toBe( 0 );
            expect( intent.getIntentText()).toBe( '' );
            expect( data.literal ).toBe( 'Dies ist ein erster TestText' );
            expect( data.intent ).toBe( 'TestIntent' );
            if ( nuanceFlag ) {
                expect( data.confidence ).toBe( 1.0 );
            } else if ( googleFlag ) {
                expect( data.confidence ).toBe( 1.0 );
                expect( data.speech ).toBe( 'TestSpeech' );
            } else if ( rasaFlag ) {
                expect( data.confidence ).toBe( 1.0 );
            }
            expect( data.error ).toBe( '' );
            // console.log('Test 1 Ende');
        });

    });

    // stop

    describe('Funktion stop(NLU)', () => {

        it('sollte 0 zurueckgeben, wenn intent nicht gestartet wurde', () => {
            expect( intent.stop()).toBe( 0 );
        });
        
    });

    // isNLU

    describe('Funktion isNLU', () => {

        it('sollte true zurueckgeben', () => {
            expect( intent.isNLU()).toBe( true );
        });

    });

    // setNLU

    describe('Funktion setNLU', () => {

        it('sollte -1 zurueckgeben, bei leerem NLU Namen', () => {
            let errorText = '';
            expect( intent.addErrorEvent( TEST_INTENT_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Intent-E2E setNLU ErrorEvent:', errorText);                
            })).toBe( 0 );
            expect( intent.setNLU( '' )).toBe( -1 );
            expect( errorText ).toBe( 'NLUGroup.setNLU: Keine NLU vorhanden' );
        });

        it('sollte -1 zurueckgeben, bei falschem NLU Namen', () => {
            let errorText = '';
            expect( intent.addErrorEvent( TEST_INTENT_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Intent-E2E setNLU ErrorEvent:', errorText);                
            })).toBe( 0 );
            expect( intent.setNLU( 'NoNLU' )).toBe( -1 );
            expect( errorText ).toBe( 'NLUGroup.setNLU: Keine NLU vorhanden' );
        });

        it('sollte 0 zurueckgeben, bei vorhandener Nuance-NLU', () => {
            if ( nuanceFlag ) {
                // eslint-disable-next-line
                expect( intent.setNLU( speech.INTENT_NUANCE_NLU )).toBe( 0 );
            } else {
                let errorText = '';
                expect( intent.addErrorEvent( TEST_INTENT_NAME, (aError) => {
                    errorText = aError.message;
                    // console.log('===> Intent-E2E setNLU ErrorEvent:', errorText);                
                })).toBe( 0 );
                // eslint-disable-next-line
                expect( intent.setNLU( speech.INTENT_NUANCE_NLU )).toBe( -1 );
                expect( errorText ).toBe( 'NLUGroup.setNLU: Keine NLU vorhanden' ); 
            }
        });

        it('sollte 0 zurueckgeben, bei vorhandener Google-NLU', () => {
            if ( googleFlag ) {
                // eslint-disable-next-line
                expect( intent.setNLU( speech.INTENT_GOOGLE_NLU )).toBe( 0 );
            } else {
                let errorText = '';
                expect( intent.addErrorEvent( TEST_INTENT_NAME, (aError) => {
                    errorText = aError.message;
                    // console.log('===> Intent-E2E setNLU ErrorEvent:', errorText);                
                })).toBe( 0 );
                // eslint-disable-next-line
                expect( intent.setNLU( speech.INTENT_GOOGLE_NLU )).toBe( -1 );
                expect( errorText ).toBe( 'NLUGroup.setNLU: Keine NLU vorhanden' ); 
            }
        });

        it('sollte 0 zurueckgeben, bei Html5 NLU Namen', () => {
            const nluList = intent.getNLUList();
            if ( nluList.length > nluCount ) {
                // eslint-disable-next-line
                expect( intent.setNLU( speech.INTENT_HTML5_NLU )).toBe( 0 );
            } else {
                let errorText = '';
                expect( intent.addErrorEvent( TEST_INTENT_NAME, (aError) => {
                    errorText = aError.message;
                    // console.log('===> Intent-E2E setNLU ErrorEvent:', errorText);                
                })).toBe( 0 );
                // eslint-disable-next-line
                expect( intent.setNLU( speech.INTENT_HTML5E_NLU )).toBe( -1 );
                expect( errorText ).toBe( 'NLUGroup.setNLU: Keine NLU vorhanden' );
            }
        });

    });

    // getNLU

    describe('Funktion getNLU', () => {

        it('sollte Nuance NLU zurueckgeben', () => {
            if ( nuanceFlag ) {
                // eslint-disable-next-line
                expect( intent.setNLU( speech.INTENT_NUANCE_NLU )).toBe( 0 );
                // eslint-disable-next-line
                expect( intent.getNLU()).toBe( speech.INTENT_NUANCE_NLU );
            }
        });

        it('sollte Google NLU zurueckgeben', () => {
            if ( googleFlag ) {
                // eslint-disable-next-line
                expect( intent.setNLU( speech.INTENT_GOOGLE_NLU )).toBe( 0 );
                // eslint-disable-next-line
                expect( intent.getNLU()).toBe( speech.INTENT_GOOGLE_NLU );
            }
        });

    });

    // getNLUList

    describe('Funktion getNLUList', () => {

        it('sollte NLU-Liste zurueckgeben', () => {
            const nluList = intent.getNLUList();
            if ( nuanceFlag ) {
                // eslint-disable-next-line
                expect( nluList[ 0 ]).toBe( speech.INTENT_NUANCE_NLU );
                if ( googleFlag ) {
                    // eslint-disable-next-line
                    expect( nluList[ 1 ]).toBe( speech.INTENT_GOOGLE_NLU );
                }
            } else  if ( googleFlag ) {
                // eslint-disable-next-line
                expect( nluList[ 0 ]).toBe( speech.INTENT_GOOGLE_NLU );
            }
            if ( nluList.length > nluList ) {
                // eslint-disable-next-line
                expect( nluList[ 2 ]).toBe( speech.INTENT_HTML5_NLU );
            }
        });

    });

    // setLanguage

    describe('Funktion setLanguage', () => {

        it('sollte -1 zurueckgeben, wenn keine Sprache eingetragen wird', () => {
            let errorText = '';
            expect( intent.addErrorEvent( TEST_INTENT_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Listen-E2E setLanguage ErrorEvent:', errorText);                
            })).toBe( 0 );
            expect( intent.setLanguage( '' )).toBe( -1 );
            if ( nuanceFlag ) {
                expect( errorText ).toBe( 'NLUNuance.setLanguage: keine gueltige Sprache uebergeben' );
            } else if ( googleFlag ) {
                expect( errorText ).toBe( 'NLUGoogle.setLanguage: keine gueltige Sprache uebergeben' );
            }
        });

        it('sollte -1 zurueckgeben, wenn falsche Sprache eingetragen wird', () => {
            let errorText = '';
            expect( intent.addErrorEvent( TEST_INTENT_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Listen-E2E setLanguage ErrorEvent:', errorText);                
            })).toBe( 0 );
            expect( intent.setLanguage( 'noLanguage' )).toBe( -1 );
            if ( nuanceFlag ) {
                expect( errorText ).toBe( 'NLUNuance.setLanguage: keine gueltige Sprache uebergeben' );
            } else if ( googleFlag ) {
                expect( errorText ).toBe( 'NLUGoogle.setLanguage: keine gueltige Sprache uebergeben' );
            }
        });

        it('sollte 0 zurueckgeben, wenn Deutsch eingetragen wird', () => {
            // eslint-disable-next-line
            expect( intent.setLanguage( speech.INTENT_DE_LANGUAGE )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Englisch eingetragen wird', () => {
            // eslint-disable-next-line
            expect( intent.setLanguage( speech.INTENT_EN_LANGUAGE )).toBe( 0 );
        });

    });

    // getLanguage

    describe('Funktion getLanguage', () => {

        it('sollte Deutsch zurueckgeben, wenn Deutsch eingestellt wurde', () => {
            // eslint-disable-next-line
            expect( intent.setLanguage( speech.INTENT_DE_LANGUAGE )).toBe( 0 );
            // eslint-disable-next-line
            expect( intent.getLanguage()).toBe( speech.INTENT_DE_LANGUAGE );
        });

        it('sollte Englisch zurueckgeben, wenn Englisch eingestellt wurde', () => {
            // eslint-disable-next-line
            expect( intent.setLanguage( speech.INTENT_EN_LANGUAGE )).toBe( 0 );
            // eslint-disable-next-line
            expect( intent.getLanguage()).toBe( speech.INTENT_EN_LANGUAGE );
        });

    });

    // getLanguageList

    describe('Funktion getLanguageList', () => {

        it('sollte Sprachliste zurueckgeben', () => {
            const languageList = intent.getLanguageList();
            // eslint-disable-next-line
            expect( languageList[ 0 ]).toBe( speech.INTENT_DE_LANGUAGE );
            // eslint-disable-next-line
            expect( languageList[ 1 ]).toBe( speech.INTENT_EN_LANGUAGE );
        });

    });
    
    // setIntentText

    describe('Funktion setIntentText', () => {

        it('sollte 0 zurueckgeben, wenn leerer Text uebergeben wurde', () => {
            expect( intent.setIntentText( '' )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Text uebergeben wurde', () => {
            expect( intent.setIntentText( 'TestText' )).toBe( 0 );
        });

    });

    // getIntentText

    describe('Funktion getIntentText', () => {

        it('sollte leeren String zurueckgeben, wenn leerer Text uebergeben wurde', () => {
            expect( intent.setIntentText( '' )).toBe( 0 );
            expect( intent.getIntentText()).toBe( '' );
        });

        it('sollte String zurueckgeben, wenn Text uebergeben wurde', () => {
            expect( intent.setIntentText( 'TestText' )).toBe( 0 );
            expect( intent.getIntentText()).toBe( 'TestText' );
        });

    });

    // abort

    describe('Funktion abort', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( intent.abort()).toBe( 0 );
        });
    });

});
