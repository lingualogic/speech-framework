/**
 * E2E-Tests fuer Action API
 * 
 * Letzte Aenderung: 12.02.19
 * Status: gruen
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
 * @module action
 * @author SB
 */


// Variablen

const TEST_ACTION_NAME = 'TestAction';
const ERROR_ACTION_OUTPUT = false;


// Tests

describe('Action', () => {

    const jasmineActionTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    let action = null;

    beforeAll(() => {
        // eslint-disable-next-line
        console.log('Action E2E-Tests gestartet...');
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        // eslint-disable-next-line
        speech.SpeechMain.init();
        // eslint-disable-next-line
        action = speech.ActionFactory.create( '', { errorOutputFlag: ERROR_ACTION_OUTPUT });
        expect( action ).toBeTruthy();
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmineActionTimeout;
        // eslint-disable-next-line
        speech.SpeechMain.done();
    });

    afterEach(() => {
        expect( action.removeAllEvent( TEST_ACTION_NAME )).toBe( 0 );
        expect( action.reset()).toBe( 0 );
        if( ERROR_ACTION_OUTPUT ) {
            action.setErrorOutputOn();
        } else {
            action.setErrorOutputOff();
        }
    });

    // reset

    describe('Funktion reset', () => {

        it('sollte 0 zurueckgeben, wenn keine Optionen uebergeben werden', () => {
            expect( action.reset()).toBe( 0 );
        });

    });

    // getType

    describe('Funktion getType', () => {

        it('sollte den Typ zurueckgeben', () => {
            // eslint-disable-next-line
            expect( action.getType()).toBe( speech.ACTION_TYPE_NAME );
        });
    });

    // getName

    describe('Funktion getName', () => {

        it('sollte den Komponentennamen zurueckgeben', () => {
            // eslint-disable-next-line
            expect( action.getName()).toBe( speech.ACTION_COMPONENT_NAME );
        });

    });

    // getVersion

    describe('Funktion getVersion', () => {
        it('sollte SPEECH_API_VERSION zurueckgeben', () => {
            // eslint-disable-next-line
            expect( action.getVersion()).toBe( speech.SPEECH_API_VERSION );
        });
    });

    // getServerVersion

    describe('Funktion getServerVersion', () => {

        it('sollte leeren String zurueckgeben', () => {
            expect( action.getServerVersion()).toBe( '' );
        });
    
    });

    // isActive

    describe('Funktion isActive', () => {

        it('sollte true zurueckgeben', () => {
            expect( action.isActive()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn Active abgeschaltet wurde', () => {
            expect( action.setActiveOff()).toBe( 0 );
            expect( action.isActive()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn Active angeschaltet wurde', () => {
            expect( action.setActiveOff()).toBe( 0 );
            expect( action.isActive()).toBe( false );
            expect( action.setActiveOn()).toBe( 0 );
            expect( action.isActive()).toBe( true );
        });

    });

    // setActiveOn

    describe('Funktion setActiveOn', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( action.setActiveOn()).toBe( 0 );
            expect( action.isActive()).toBe( true );
        });

    });

    // setActiveOff

    describe('Funktion setActiveOff', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( action.isActive()).toBe( true );
            expect( action.setActiveOff()).toBe( 0 );
            expect( action.isActive()).toBe( false );
        });
        
    });

    // isErrorOutput

    describe('Funktion isErrorOutput', () => {

        it('sollte true zurueckgeben, wenn ErrorOutput eingeschaltet wurde', () => {
            action.setErrorOutputOn();
            expect( action.isErrorOutput()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn ErrorOutput ausgeschaltet wurde', () => {
            action.setErrorOutputOff();
            expect( action.isErrorOutput()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn ErrorOutput aus- und eingeschaltet wurde', () => {
            action.setErrorOutputOff();
            expect( action.isErrorOutput()).toBe( false );
            action.setErrorOutputOn();
            expect( action.isErrorOutput()).toBe( true );
        });

    });

    // addInitEvent

    describe('Funktion addInitEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( action.addInitEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( action.addInitEvent( TEST_ACTION_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( action.addInitEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( action.addInitEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
            expect( action.addInitEvent( TEST_ACTION_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addStartEvent

    describe('Funktion addStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( action.addStartEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( action.addStartEvent( TEST_ACTION_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( action.addStartEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( action.addStartEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
            expect( action.addStartEvent( TEST_ACTION_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addStopEvent

    describe('Funktion addStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( action.addStopEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( action.addStopEvent( TEST_ACTION_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( action.addStopEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( action.addStopEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
            expect( action.addStopEvent( TEST_ACTION_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addErrorEvent

    describe('Funktion addErrorEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( action.addErrorEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( action.addErrorEvent( TEST_ACTION_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( action.addErrorEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( action.addErrorEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
            expect( action.addErrorEvent( TEST_ACTION_NAME, () => 0 )).toBe( -1 );
        });

    });

    // removeInitEvent

    describe('Funktion removeInitEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( action.removeInitEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( action.removeInitEvent( TEST_ACTION_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( action.addInitEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
            expect( action.removeInitEvent( TEST_ACTION_NAME )).toBe( 0 );
        });

    });

    // removeStartEvent

    describe('Funktion removeStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( action.removeStartEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( action.removeStartEvent( TEST_ACTION_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( action.addStartEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
            expect( action.removeStartEvent( TEST_ACTION_NAME )).toBe( 0 );
        });

    });

    // removeStopEvent

    describe('Funktion removeStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( action.removeStopEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( action.removeStopEvent( TEST_ACTION_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( action.addStopEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
            expect( action.removeStopEvent( TEST_ACTION_NAME )).toBe( 0 );
        });

    });

    // removeErrorEvent

    describe('Funktion removeErrorEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( action.removeErrorEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( action.removeErrorEvent( TEST_ACTION_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( action.addErrorEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
            expect( action.removeErrorEvent( TEST_ACTION_NAME )).toBe( 0 );
        });

    });

    // removeAllEvent

    describe('Funktion removeAllEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( action.removeAllEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event eingetragen wurde', () => {
            expect( action.removeAllEvent( TEST_ACTION_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenm Events eingefuegt wurden', () => {
            expect( action.addInitEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
            expect( action.addStartEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
            expect( action.addStopEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
            expect( action.addErrorEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
            expect( action.removeAllEvent( TEST_ACTION_NAME )).toBe( 0 );
            expect( action.addInitEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
            expect( action.addStartEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
            expect( action.addStopEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
            expect( action.addErrorEvent( TEST_ACTION_NAME, () => 0 )).toBe( 0 );
        });

    });

    // isRunning

    describe('Funktion isRunning', () => {

        it('sollte false zurueckgeben', () => {
            expect( action.isRunning()).toBe( false );
        });

    });

    // start

    describe('Funktion start', () => {

        it('sollte -1 zurueckgeben, wenn kein action name uebergeben wurde', () => {
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
            })).toBe( 0 );
            expect( action.start()).toBe( -1 );
            expect( errorText ).toBe( 'ActionComponent.startAction: kein Aktionsname vorhanden' );
        });

        it('sollte -1 zurueckgeben, wenn kein element name uebergeben wurde', () => {
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
            })).toBe( 0 );
            expect( action.setActionName( 'TestAction' )).toBe( 0 );
            expect( action.start()).toBe( -1 );
            expect( errorText ).toBe( 'ActionComponent.startAction: kein Elementname vorhanden' );
        });

        it('sollte 0 zurueckgeben, wenn keine function oder element hinzugefuegt wurden', () => {
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;
            })).toBe( 0 );
            expect( action.setActionName( 'TestAction' )).toBe( 0 );
            expect( action.setElementName( 'TestElement' )).toBe( 0 );
            expect( action.start()).toBe( 0 );
            expect( errorText ).toBe( '' );
        });

        it('sollte 0 zurueckgeben, wenn eine function hinzugefuegt wurde', () => {
            const actionData = {
                action: 'TestAction',
                type: 'TestType',
                id: 'TestId'
            };
            let resultActionData = null;
            const startFunc = (aActionData) => {
                resultActionData = aActionData;
                return 0;
            };
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;
            })).toBe( 0 );
            let callStart = false;
            expect( action.addStartEvent( TEST_ACTION_NAME, () => {
                callStart = true;
                return 0;
            })).toBe( 0 );
            expect( action.setActionName( actionData.action )).toBe( 0 );
            expect( action.setElementType( actionData.type )).toBe( 0 );
            expect( action.setElementName( actionData.id )).toBe( 0 );
            expect( action.addFunction( 'TestAction', startFunc, () => 0 )).toBe( 0 );
            expect( action.start()).toBe( 0 );
            expect( action.removeFunction( 'TestAction' )).toBe( 0 );
            expect( resultActionData ).toEqual( actionData );
            expect( errorText ).toBe( '' );
            expect( callStart ).toBe( true );
        });

        it('sollte 0 zurueckgeben, wenn ein element hinzugefuegt wurde', () => {
            const actionData = {
                action: 'TestAction',
                type: 'TestType',
                id: 'TestId'
            };
            let resultActionData = null;
            const startFunc = (aActionData) => {
                resultActionData = aActionData;
                return 0;
            };
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
            })).toBe( 0 );
            let callStart = false;
            expect( action.addStartEvent( TEST_ACTION_NAME, () => {
                callStart = true;
                return 0;
            })).toBe( 0 );
            expect( action.setActionName( actionData.action )).toBe( 0 );
            expect( action.setElementType( actionData.type )).toBe( 0 );
            expect( action.setElementName( actionData.id )).toBe( 0 );
            expect( action.addElement( 'TestId', startFunc, () => 0 )).toBe( 0 );
            expect( action.start()).toBe( 0 );
            expect( action.removeElement( 'TestId' )).toBe( 0 );
            expect( resultActionData).toEqual( actionData );
            expect( errorText).toBe( '' );
            expect( callStart ).toBe( true );
        });

    });

    // stop

    describe('Funktion stop', () => {

        it('sollte 0 zurueckgeben, wenn keine function oder element hinzugefuegt wurde', () => {
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
            })).toBe( 0 );
            expect( action.stop()).toBe( 0 );
            expect( errorText ).toBe( '' );
        });

        it('sollte 0 zurueckgeben, wenn action function hinzugefuegt wurde', () => {
            const actionData = {
                action: 'TestAction',
                type: 'TestType',
                id: 'TestId'
            };
            let callFlag = false;
            const stopFunc = () => {
                callFlag = true;
                return 0;
            };
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
            })).toBe( 0 );
            let callStart = false;
            expect( action.addStartEvent( TEST_ACTION_NAME, () => {
                callStart = true;
                return 0;
            })).toBe( 0 );
            let callStop = false;
            expect( action.addStopEvent( TEST_ACTION_NAME, () => {
                callStop = true;
                return 0;
            })).toBe( 0 );
            expect( action.setActionName( actionData.action )).toBe( 0 );
            expect( action.setElementType( actionData.type )).toBe( 0 );
            expect( action.setElementName( actionData.id )).toBe( 0 );
            expect( action.addFunction( 'TestAction', () => 0, stopFunc )).toBe( 0 );
            expect( action.start()).toBe( 0 );
            expect( action.stop()).toBe( 0 );
            expect( action.removeFunction( 'TestAction' )).toBe( 0 );
            expect( callFlag ).toBe( true );
            expect( errorText ).toBe( '' );
            expect( callStart ).toBe( true );
            expect( callStop ).toBe( true );
        });

        it('sollte 0 zurueckgeben, wenn action Startfunction hinzugefuegt wurde und keine Stopfunktion', () => {
            const actionData = {
                action: 'TestAction',
                type: 'TestType',
                id: 'TestId'
            };
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
            })).toBe( 0 );
            expect( action.setActionName( actionData.action )).toBe( 0 );
            expect( action.setElementType( actionData.type )).toBe( 0 );
            expect( action.setElementName( actionData.id )).toBe( 0 );
            expect( action.addFunction( 'TestAction', () => 0 )).toBe( 0 );
            expect( action.start()).toBe( 0 );
            expect( action.stop()).toBe( 0 );
            expect( action.removeFunction( 'TestAction' )).toBe( 0 );
            expect( errorText ).toBe( '' );
        });

        it('sollte 0 zurueckgeben, wenn action und element hinzugefuegt wurden', () => {
            const actionData = {
                action: 'TestAction',
                type: 'TestType',
                id: 'TestId'
            };
            let callFlag = false;
            const stopFunc = () => {
                callFlag = true;
                return 0;
            };
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
            })).toBe( 0 );
            let callStart = false;
            expect( action.addStartEvent( TEST_ACTION_NAME, () => {
                callStart = true;
                return 0;
            })).toBe( 0 );
            let callStop = false;
            expect( action.addStopEvent( TEST_ACTION_NAME, () => {
                callStop = true;
                return 0;
            })).toBe( 0 );
            expect( action.setActionName( actionData.action )).toBe( 0 );
            expect( action.setElementType( actionData.type )).toBe( 0 );
            expect( action.setElementName( actionData.id )).toBe( 0 );
            expect( action.addElement( 'TestId', () => 0, stopFunc )).toBe( 0 );
            expect( action.start( actionData )).toBe( 0 );
            expect( action.stop()).toBe( 0 );
            expect( action.removeElement( 'TestId' )).toBe( 0 );
            expect( callFlag ).toBe( true );
            expect( errorText ).toEqual( '' );
            expect( callStart ).toBe( true );
            expect( callStop ).toBe( true );
        });

    });

    // set/getActionName
    
    describe('Funktion set/getActionName', () => {

        it('sollte 0 zurueckgeben, wenn kein Name uebergeben wurde', () => {
            expect( action.setActionName( '' )).toBe( 0 );
            expect( action.getActionName()).toBe( '' );
        });

        it('sollte 0 zurueckgeben, wenn Name uebergeben wurde', () => {
            expect( action.setActionName( 'TestAction' )).toBe( 0 );
            expect( action.getActionName()).toBe( 'TestAction' );
        });

    });

    // set/getElementType
    
    describe('Funktion set/getElementType', () => {

        it('sollte 0 zurueckgeben, wenn kein Typ uebergeben wurde', () => {
            expect( action.setElementType( '' )).toBe( 0 );
            expect( action.getElementType()).toBe( '' );
        });

        it('sollte 0 zurueckgeben, wenn Typ uebergeben wurde', () => {
            expect( action.setElementType( 'TestType' )).toBe( 0 );
            expect( action.getElementType()).toBe( 'TestType' );
        });

    });

    // set/getElementName
    
    describe('Funktion set/getElementName', () => {

        it('sollte 0 zurueckgeben, wenn kein Name uebergeben wurde', () => {
            expect( action.setElementName( '' )).toBe( 0 );
            expect( action.getElementName()).toBe( '' );
        });

        it('sollte 0 zurueckgeben, wenn Name uebergeben wurde', () => {
            expect( action.setElementName( 'TestElement' )).toBe( 0 );
            expect( action.getElementName()).toBe( 'TestElement' );
        });

    });

    // addFunction

    describe('Funktion addFunction', () => {

        it('sollte -1 zurueckgeben, wenn kein function name uebergeben wurde', () => {
            let errorText = '';
            expect(action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;                
            })).toBe( 0 );
            expect( action.addFunction( '', () => 0, () => 0 )).toBe( -1 );
            expect( errorText ).toBe( 'ActionFunctionList.insert: kein Action-Funktionsname uebergeben' );
        });

        it('sollte -1 zurueckgeben, wenn keine start function uebergeben wurde', () => {
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;                
            })).toBe( 0 );
            expect( action.addFunction( 'TestAction', null, () => 0 )).toBe( -1 );
            expect( errorText ).toBe( 'ActionFunctionList.insert: keine StartAction-Funktion uebergeben' );
        });

        it('sollte 0 zurueckgeben, wenn keine stop function uebergeben wurde', () => {
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;
            })).toBe( 0 );
            expect( action.addFunction( 'TestAction', () => 0 )).toBe( 0 );
            expect( action.removeFunction( 'TestAction' )).toBe( 0 );
            expect( errorText ).toBe( '' );
        });

        it('sollte 0 zurueckgeben, wenn function hinzugefuegt wurde', () => {
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;
            })).toBe( 0 );
            expect( action.addFunction( 'TestAction', () => 0, () => 0 )).toBe( 0 );
            expect( action.removeFunction( 'TestAction' )).toBe( 0 );
            expect( errorText ).toBe( '' );
        });

        it('sollte -1 zurueckgeben, wenn function doppelt hinzugefuegt wurde', () => {
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;
            })).toBe(0);
            expect( action.addFunction( 'TestAction', () => 0, () => 0 )).toBe( 0 );
            expect( action.addFunction( 'TestAction', () => 0, () => 0 )).toBe( -1 );
            expect( action.removeFunction( 'TestAction' )).toBe( 0 );
            expect( errorText ).toBe( 'ActionFunctionList.insert: Actionsfunktion bereits eingetragen' );
        });

    });

    // removeFunction

    describe('Funktion removeFunction', () => {

        it('sollte -1 zurueckgeben, wenn kein function name uebergeben wurde', () => {
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;
            })).toBe( 0 );
            expect( action.removeFunction( '' )).toBe( -1 );
            expect( errorText ).toBe( 'ActionFunctionList.remove: kein Action-Funktionsname uebergeben' );
        });

        it('sollte 0 zureckgeben, wenn keine function hinzugefuegt wurde', () => {
            let errorText = '';
            expect(action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;
            })).toBe( 0 );
            expect( action.removeFunction( 'TestAction' )).toBe( 0 );
            expect( errorText ).toBe( '' );
        });

    });

    // addElement

    describe('Funktion addElement', () => {

        it('sollte -1 zurueckgeben, wenn kein element name uebergeben wurde', () => {
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;                
            })).toBe( 0 );
            expect( action.addElement( '', () => 0, () => 0 )).toBe( -1 );
            expect( errorText ).toBe( 'ActionElementList.insert: kein Elementname uebergeben' );
        });

        it('sollte -1 zurueckgeben, wenn keine start function uebergeben wurde', () => {
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;                
            })).toBe( 0 );
            expect( action.addElement( 'TestElement', null, () => 0 )).toBe( -1 );
            expect( errorText ).toBe( 'ActionElementList.insert: keine ActionStart-Funktion uebergeben' );
        });

        it('sollte -1 zureuckgeben, wenn keine stop function uebergeben wurde', () => {
            let errorText = '';
            expect(action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;                
            })).toBe( 0 );
            expect( action.addElement( 'TestElement', () => 0, null )).toBe( -1 );
            expect( errorText ).toBe( 'ActionElementList.insert: keine ActionStop-Funktion uebergeben' );
        });

        it('sollte 0 zurueckgeben, wenn element hinzugefuegt wurde', () => {
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;                
            })).toBe( 0 );
            expect( action.addElement( 'TestElement', () => 0, () => 0 )).toBe( 0 );
            expect( action.removeElement( 'TestElement' )).toBe( 0 );
            expect( errorText ).toBe( '' );
        });

        it('sollte -1 zurueckgeben, wenn element doppelt hinzugefuegt wurde', () => {
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;
            })).toBe( 0 );
            expect( action.addElement( 'TestElement', () => 0, () => 0 )).toBe( 0 );
            expect( action.addElement( 'TestElement', () => 0, () => 0 )).toBe( -1 );
            expect( action.removeElement( 'TestElement' )).toBe( 0 );
            expect( errorText ).toBe( 'ActionElementList.insert: Element bereits eingetragen' );
        });

    });

    // removeElement

    describe('Funktion removeElement', () => {

        it('sollte -1 zurueckgeben, wenn kein element name uebergeben wurde', () => {
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;
            })).toBe( 0 );
            expect( action.removeElement( '' )).toBe( -1 );
            expect( errorText ).toBe( 'ActionElementList.remove: kein Action-Elementname uebergeben' );
        });

        it('sollte 0 zurueckgeben, wenn kein element hinzugefuegt wurde', () => {
            let errorText = '';
            expect( action.addErrorEvent( TEST_ACTION_NAME, (aError) => {
                errorText = aError.message;
                return 0;
            })).toBe( 0 );
            expect( action.removeElement( 'TestElement' )).toBe( 0 );
            expect( errorText ).toBe( '' );
        });

    });

});


