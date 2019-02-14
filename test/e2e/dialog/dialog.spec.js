/**
 * E2E-Tests fuer DialogService
 * 
 * Letzte Aenderung: 14.02.2019
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
 * @module dialog
 * @author SB
 */


// Konstanten

const TEST_DIALOG_NAME = 'TestDialog';
const ERROR_DIALOG_OUTPUT = false;

const jasmineDialogTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

// Tests

describe('Dialog', () => {

    let dialog = null;

    beforeAll(() => {
        // eslint-disable-next-line
        console.log('Dialog E2E-Tests gestartet...');
        // eslint-disable-next-line
        speech.SpeechMain.init();
        const options = {
            rootState: 'home',
            dialogPath: 'assets/',
            errorOutputFlag: ERROR_DIALOG_OUTPUT
        };
        // eslint-disable-next-line
        dialog = speech.DialogFactory.create( speech.DIALOG_COMPONENT_NAME, options );
        expect(dialog).toBeTruthy();
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmineDialogTimeout;
        // eslint-disable-next-line
        speech.SpeechMain.done();
    });

    afterEach(() => {
        expect( dialog.removeAllEvent( TEST_DIALOG_NAME )).toBe( 0 );
        expect( dialog.reset()).toBe( 0 );
        if( ERROR_DIALOG_OUTPUT ) {
            dialog.setErrorOutputOn();
        } else {
            dialog.setErrorOutputOff();
        }
    });

    // reset

    describe('Funktion reset', () => {

        it('sollte 0 zurueckgeben, wenn keine Optionen uebergeben werden', () => {
            expect( dialog.reset()).toBe( 0 );
        });

    });

    // getType

    describe('Funktion getType', () => {

        it('sollte den Typ zurueckgeben', () => {
            // eslint-disable-next-line
            expect( dialog.getType()).toBe( speech.DIALOG_TYPE_NAME );
        });
    });

    // getName

    describe('Funktion getName', () => {

        it('sollte den Komponentennamen zurueckgeben', () => {
            // eslint-disable-next-line
            expect( dialog.getName()).toBe( speech.DIALOG_COMPONENT_NAME );
        });

    });

    // getVersion

    describe('Funktion getVersion', () => {
        it('sollte SPEECH_API_VERSION zurueckgeben', () => {
            // eslint-disable-next-line
            expect( dialog.getVersion()).toBe( speech.SPEECH_API_VERSION );
        });
    });

    // getServerVersion

    describe('Funktion getServerVersion', () => {

        it('sollte leeren String zurueckgeben', () => {
            expect( dialog.getServerVersion()).toBe( '' );
        });
    
    });

    // isActive

    describe('Funktion isActive', () => {

        it('sollte true zurueckgeben', () => {
            expect( dialog.isActive()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn Active abgeschaltet wurde', () => {
            expect( dialog.setActiveOff()).toBe( 0 );
            expect( dialog.isActive()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn Active angeschaltet wurde', () => {
            expect( dialog.setActiveOff()).toBe( 0 );
            expect( dialog.isActive()).toBe( false );
            expect( dialog.setActiveOn()).toBe( 0 );
            expect( dialog.isActive()).toBe( true );
        });

    });

    // setActiveOn

    describe('Funktion setActiveOn', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.setActiveOn()).toBe( 0 );
            expect( dialog.isActive()).toBe( true );
        });

    });

    // setActiveOff

    describe('Funktion setActiveOff', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.setActiveOff()).toBe( 0 );
            expect( dialog.isActive()).toBe( false );
        });
        
    });

    // isErrorOutput

    describe('Funktion isErrorOutput', () => {

        it('sollte true zurueckgeben, wenn ErrorOutput eingeschaltet wurde', () => {
            dialog.setErrorOutputOn();
            expect( dialog.isErrorOutput()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn ErrorOutput ausgeschaltet wurde', () => {
            dialog.setErrorOutputOff();
            expect( dialog.isErrorOutput()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn ErrorOutput aus- und eingeschaltet wurde', () => {
            dialog.setErrorOutputOff();
            expect( dialog.isErrorOutput()).toBe( false );
            dialog.setErrorOutputOn();
            expect( dialog.isErrorOutput()).toBe( true );
        });

    });

    // addInitEvent

    describe('Funktion addInitEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( dialog.addInitEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( dialog.addInitEvent( TEST_DIALOG_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.addInitEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( dialog.addInitEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addInitEvent( TEST_DIALOG_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addStartEvent

    describe('Funktion addStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( dialog.addStartEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( dialog.addStartEvent( TEST_DIALOG_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.addStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( dialog.addStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addStopEvent

    describe('Funktion addStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( dialog.addStopEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( dialog.addStopEvent( TEST_DIALOG_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.addStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( dialog.addStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addErrorEvent

    describe('Funktion addErrorEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( dialog.addErrorEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( dialog.addErrorEvent( TEST_DIALOG_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.addErrorEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( dialog.addErrorEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addErrorEvent( TEST_DIALOG_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogParseEvent

    describe('Funktion addDialogParseEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( dialog.addDialogParseEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( dialog.addDialogParseEvent( TEST_DIALOG_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.addDialogParseEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( dialog.addDialogParseEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogParseEvent( TEST_DIALOG_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogSetEventEvent

    describe('Funktion addDialogSetEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( dialog.addDialogSetEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( dialog.addDialogSetEvent( TEST_DIALOG_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.addDialogSetEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( dialog.addDialogSetEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogSetEvent( TEST_DIALOG_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogStartEvent

    describe('Funktion addDialogStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( dialog.addDialogStartEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( dialog.addDialogStartEvent( TEST_DIALOG_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.addDialogStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( dialog.addDialogStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogStopEvent

    describe('Funktion addDialogStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( dialog.addDialogStopEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( dialog.addDialogStopEvent( TEST_DIALOG_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.addDialogStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( dialog.addDialogStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogStateSetEvent

    describe('Funktion addDialogStateSetEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( dialog.addDialogStateSetEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( dialog.addDialogStateSetEvent( TEST_DIALOG_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.addDialogStateSetEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( dialog.addDialogStateSetEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogStateSetEvent( TEST_DIALOG_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogActionEvent

    describe('Funktion addDialogActionEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( dialog.addDialogActionEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( dialog.addDialogActionEvent( TEST_DIALOG_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.addDialogActionEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( dialog.addDialogActionEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogActionEvent( TEST_DIALOG_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogActionStopEvent

    describe('Funktion addDialogActionStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( dialog.addDialogActionStopEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( dialog.addDialogActionStopEvent( TEST_DIALOG_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.addDialogActionStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( dialog.addDialogActionStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogActionStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogSpeakEvent

    describe('Funktion addDialogSpeakEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( dialog.addDialogSpeakEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( dialog.addDialogSpeakEvent( TEST_DIALOG_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.addDialogSpeakEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( dialog.addDialogSpeakEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogSpeakEvent( TEST_DIALOG_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogSpeakStartEvent

    describe('Funktion addDialogSpeakStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( dialog.addDialogSpeakStartEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( dialog.addDialogSpeakStartEvent( TEST_DIALOG_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.addDialogSpeakStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( dialog.addDialogSpeakStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogSpeakStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogSpeakStopEvent

    describe('Funktion addDialogSpeakStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( dialog.addDialogSpeakStopEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( dialog.addDialogSpeakStopEvent( TEST_DIALOG_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( dialog.addDialogSpeakStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( dialog.addDialogSpeakStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogSpeakStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( -1 );
        });

    });

    // removeInitEvent

    describe('Funktion removeInitEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( dialog.removeInitEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( dialog.removeInitEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( dialog.addInitEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.removeInitEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

    });

    // removeStartEvent

    describe('Funktion removeStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( dialog.removeStartEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( dialog.removeStartEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( dialog.addStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.removeStartEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

    });

    // removeStopEvent

    describe('Funktion removeStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( dialog.removeStopEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( dialog.removeStopEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( dialog.addStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.removeStopEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

    });

    // removeErrorEvent

    describe('Funktion removeErrorEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( dialog.removeErrorEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( dialog.removeErrorEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( dialog.addErrorEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.removeErrorEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

    });

    // removeDialogParseEvent

    describe('Funktion removeDialogParseEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( dialog.removeDialogParseEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( dialog.removeDialogParseEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( dialog.addDialogParseEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.removeDialogParseEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

    });

    // removeDialogSetEvent

    describe('Funktion removeDialogSetEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( dialog.removeDialogSetEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( dialog.removeDialogSetEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( dialog.addDialogSetEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.removeDialogSetEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

    });

    // removeDialogStartEvent

    describe('Funktion removeDialogStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( dialog.removeDialogStartEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( dialog.removeDialogStartEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( dialog.addDialogStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.removeDialogStartEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

    });

    // removeDialogStopEvent

    describe('Funktion removeDialogStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( dialog.removeDialogStopEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( dialog.removeDialogStopEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( dialog.addDialogStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.removeDialogStopEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

    });

    // removeDialogStateSetEvent

    describe('Funktion removeDialogStateSetEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( dialog.removeDialogStateSetEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( dialog.removeDialogStateSetEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( dialog.addDialogStateSetEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.removeDialogStateSetEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

    });

    // removeDialogActionEvent

    describe('Funktion removeDialogActionEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( dialog.removeDialogActionEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( dialog.removeDialogActionEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( dialog.addDialogActionEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.removeDialogActionEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

    });

    // removeDialogActionStopEvent

    describe('Funktion removeDialogActionStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( dialog.removeDialogActionStopEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( dialog.removeDialogActionStopEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( dialog.addDialogActionStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.removeDialogActionStopEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

    });

    // removeDialogSpeakEvent

    describe('Funktion removeDialogSpeakEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( dialog.removeDialogSpeakEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( dialog.removeDialogSpeakEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( dialog.addDialogSpeakEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.removeDialogSpeakEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

    });

    // removeDialogSpeakStartEvent

    describe('Funktion removeDialogSpeakStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( dialog.removeDialogSpeakStartEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( dialog.removeDialogSpeakStartEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( dialog.addDialogSpeakStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.removeDialogSpeakStartEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

    });

    // removeDialogSpeakStopEvent

    describe('Funktion removeDialogSpeaktopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( dialog.removeDialogSpeakStopEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( dialog.removeDialogSpeakStopEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( dialog.addDialogSpeakStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.removeDialogSpeakStopEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

    });

    // removeAllEvent

    describe('Funktion removeAllEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( dialog.removeAllEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event eingetragen wurde', () => {
            expect( dialog.removeAllEvent( TEST_DIALOG_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenm Events eingefuegt wurden', () => {
            expect( dialog.addInitEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addErrorEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogParseEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogSetEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogStateSetEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogActionEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogActionStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogSpeakEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogSpeakStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogSpeakStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.removeAllEvent( TEST_DIALOG_NAME )).toBe( 0 );
            expect( dialog.addInitEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addErrorEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogParseEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogSetEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogStateSetEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogActionEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogActionStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogSpeakEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogSpeakStartEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
            expect( dialog.addDialogSpeakStopEvent( TEST_DIALOG_NAME, () => 0 )).toBe( 0 );
        });

    });

    // parseSpeechDefFile

    describe('Funktion parseSpeechDefFile', () => {

    });

    // parseSpeechDefData

    describe('Funktion parseSpeechDefData', () => {

    });

});



