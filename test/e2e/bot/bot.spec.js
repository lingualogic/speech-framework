/**
 * E2E-Tests fuer Bot
 * 
 * Letzte Aenderung: 21.02.2019
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
 * @module bot
 * @author SB
 */


const dialogData = `# TestDialog
# Version 1.0
# Datum 21.08.2018

DIALOG main

	STATE root
        SPEAK 4, Hallo! Ich helfe Ihnen bei der Bedienung.
        ACTION setFocus, ButtonOnly, help

    STATE testState
        SPEAK 4, Hallo! Ich helfe Ihnen bei der Bedienung.
        ACTION setFocus, ButtonOnly, help


DIALOG TestDialog

        STATE root
            SPEAK 4, Hallo! Ich helfe Ihnen bei der Bedienung.
            ACTION setFocus, ButtonOnly, help
    
        STATE testState
            SPEAK 4, Hallo! Ich helfe Ihnen bei der Bedienung.
            ACTION setFocus, ButtonOnly, help
    
`;


// Variablen

const TEST_BOT_NAME = 'TestBot';
const ERROR_BOT_OUTPUT = false;

const jasmineBotTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;


// Konstanten fuer Verzeichnisse und Dateien

const TEST_BOTASSETS_PATH = 'assets/';
const TEST_BOTSPEECH_PATH = TEST_BOTASSETS_PATH + 'speech/';
const TEST_BOTSPEECH_FILE = 'speech.def';

// Tests

describe('Bot', () => {

    let bot = null;

    beforeAll(() => {
        // eslint-disable-next-line
        console.log('Bot E2E-Tests gestartet...');
        // eslint-disable-next-line
        speech.SpeechMain.init();
        const options = {
            rootState: 'home',
            dialogPath: TEST_BOTASSETS_PATH,
            errorOutputFlag: ERROR_BOT_OUTPUT
        };
        // eslint-disable-next-line
        bot = speech.BotFactory.create( speech.BOT_COMPONENT_NAME, options );
        expect(bot).toBeTruthy();
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmineBotTimeout;
        // eslint-disable-next-line
        speech.SpeechMain.done();
    });

    afterEach(() => {
        bot.removeAllEvent( TEST_BOT_NAME );
        expect( bot.reset()).toBe( 0 );
        if( ERROR_BOT_OUTPUT ) {
            bot.setErrorOutputOn();
        } else {
            bot.setErrorOutputOff();
        }
    });

    // reset

    describe('Funktion reset', () => {

        it('sollte 0 zurueckgeben, wenn keine Optionen uebergeben werden', () => {
            expect( bot.reset()).toBe( 0 );
        });

    });

    // getType

    describe('Funktion getType', () => {

        it('sollte den Typ zurueckgeben', () => {
            // eslint-disable-next-line
            expect( bot.getType()).toBe( speech.BOT_TYPE_NAME );
        });
    });

    // getName

    describe('Funktion getName', () => {

        it('sollte den Komponentennamen zurueckgeben', () => {
            // eslint-disable-next-line
            expect( bot.getName()).toBe( speech.BOT_COMPONENT_NAME );
        });

    });

    // getVersion

    describe('Funktion getVersion', () => {
        it('sollte SPEECH_API_VERSION zurueckgeben', () => {
            // eslint-disable-next-line
            expect( bot.getVersion()).toBe( speech.SPEECH_API_VERSION );
        });
    });

    // getServerVersion

    describe('Funktion getServerVersion', () => {

        it('sollte leeren String zurueckgeben', () => {
            expect( bot.getServerVersion()).toBe( '' );
        });
    
    });

    // isActive

    describe('Funktion isActive', () => {

        it('sollte true zurueckgeben', () => {
            expect( bot.isActive()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn Active abgeschaltet wurde', () => {
            expect( bot.setActiveOff()).toBe( 0 );
            expect( bot.isActive()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn Active angeschaltet wurde', () => {
            expect( bot.setActiveOff()).toBe( 0 );
            expect( bot.isActive()).toBe( false );
            expect( bot.setActiveOn()).toBe( 0 );
            expect( bot.isActive()).toBe( true );
        });

    });

    // setActiveOn

    describe('Funktion setActiveOn', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( bot.setActiveOn()).toBe( 0 );
            expect( bot.isActive()).toBe( true );
        });

    });

    // setActiveOff

    describe('Funktion setActiveOff', () => {

        it('sollte 0 zurueckgeben', () => {
            expect( bot.setActiveOff()).toBe( 0 );
            expect( bot.isActive()).toBe( false );
        });
        
    });

    // isErrorOutput

    describe('Funktion isErrorOutput', () => {

        it('sollte true zurueckgeben, wenn ErrorOutput eingeschaltet wurde', () => {
            bot.setErrorOutputOn();
            expect( bot.isErrorOutput()).toBe( true );
        });

        it('sollte false zurueckgeben, wenn ErrorOutput ausgeschaltet wurde', () => {
            bot.setErrorOutputOff();
            expect( bot.isErrorOutput()).toBe( false );
        });

        it('sollte true zurueckgeben, wenn ErrorOutput aus- und eingeschaltet wurde', () => {
            bot.setErrorOutputOff();
            expect( bot.isErrorOutput()).toBe( false );
            bot.setErrorOutputOn();
            expect( bot.isErrorOutput()).toBe( true );
        });

    });

    // addInitEvent

    describe('Funktion addInitEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( bot.addInitEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( bot.addInitEvent( TEST_BOT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( bot.addInitEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( bot.addInitEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addInitEvent( TEST_BOT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addStartEvent

    describe('Funktion addStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( bot.addStartEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( bot.addStartEvent( TEST_BOT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( bot.addStartEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( bot.addStartEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addStartEvent( TEST_BOT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addStopEvent

    describe('Funktion addStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( bot.addStopEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( bot.addStopEvent( TEST_BOT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( bot.addStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eingetragen', () => {
            expect( bot.addStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addStopEvent( TEST_BOT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addErrorEvent

    describe('Funktion addErrorEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( bot.addErrorEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( bot.addErrorEvent( TEST_BOT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( bot.addErrorEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( bot.addErrorEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addErrorEvent( TEST_BOT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogParseEvent

    describe('Funktion addDialogParseEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( bot.addDialogParseEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( bot.addDialogParseEvent( TEST_BOT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( bot.addDialogParseEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( bot.addDialogParseEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogParseEvent( TEST_BOT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogSetEventEvent

    describe('Funktion addDialogSetEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( bot.addDialogSetEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( bot.addDialogSetEvent( TEST_BOT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( bot.addDialogSetEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( bot.addDialogSetEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogSetEvent( TEST_BOT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogStartEvent

    describe('Funktion addDialogStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( bot.addDialogStartEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( bot.addDialogStartEvent( TEST_BOT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( bot.addDialogStartEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( bot.addDialogStartEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogStartEvent( TEST_BOT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogStopEvent

    describe('Funktion addDialogStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( bot.addDialogStopEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( bot.addDialogStopEvent( TEST_BOT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( bot.addDialogStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( bot.addDialogStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogStopEvent( TEST_BOT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogStateSetEvent

    describe('Funktion addDialogStateSetEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( bot.addDialogStateSetEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( bot.addDialogStateSetEvent( TEST_BOT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( bot.addDialogStateSetEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( bot.addDialogStateSetEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogStateSetEvent( TEST_BOT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogActionEvent

    describe('Funktion addDialogActionEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( bot.addDialogActionEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( bot.addDialogActionEvent( TEST_BOT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( bot.addDialogActionEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( bot.addDialogActionEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogActionEvent( TEST_BOT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogActionStopEvent

    describe('Funktion addDialogActionStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( bot.addDialogActionStopEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( bot.addDialogActionStopEvent( TEST_BOT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( bot.addDialogActionStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( bot.addDialogActionStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogActionStopEvent( TEST_BOT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogSpeakEvent

    describe('Funktion addDialogSpeakEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( bot.addDialogSpeakEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( bot.addDialogSpeakEvent( TEST_BOT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( bot.addDialogSpeakEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( bot.addDialogSpeakEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogSpeakEvent( TEST_BOT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogSpeakStartEvent

    describe('Funktion addDialogSpeakStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( bot.addDialogSpeakStartEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( bot.addDialogSpeakStartEvent( TEST_BOT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( bot.addDialogSpeakStartEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( bot.addDialogSpeakStartEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogSpeakStartEvent( TEST_BOT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // addDialogSpeakStopEvent

    describe('Funktion addDialogSpeakStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin uebergeben wurde', () => {
            expect( bot.addDialogSpeakStopEvent( '', () => 0 )).toBe( -1 );
        });

        it('sollte -1 zurueckgeben, wenn keine funktion uebergeben wurde', () => {
            expect( bot.addDialogSpeakStopEvent( TEST_BOT_NAME, null )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben', () => {
            expect( bot.addDialogSpeakStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
        });

        it('sollte -1 zurueckgeben, wenn zweimal eigetragen', () => {
            expect( bot.addDialogSpeakStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogSpeakStopEvent( TEST_BOT_NAME, () => 0 )).toBe( -1 );
        });

    });

    // removeInitEvent

    describe('Funktion removeInitEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( bot.removeInitEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( bot.removeInitEvent( TEST_BOT_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( bot.addInitEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.removeInitEvent( TEST_BOT_NAME )).toBe( 0 );
        });

    });

    // removeStartEvent

    describe('Funktion removeStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( bot.removeStartEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( bot.removeStartEvent( TEST_BOT_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( bot.addStartEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.removeStartEvent( TEST_BOT_NAME )).toBe( 0 );
        });

    });

    // removeStopEvent

    describe('Funktion removeStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( bot.removeStopEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( bot.removeStopEvent( TEST_BOT_NAME )).toBe( 0 );
        });

        it('solllte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( bot.addStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.removeStopEvent( TEST_BOT_NAME )).toBe( 0 );
        });

    });

    // removeErrorEvent

    describe('Funktion removeErrorEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( bot.removeErrorEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( bot.removeErrorEvent( TEST_BOT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( bot.addErrorEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.removeErrorEvent( TEST_BOT_NAME )).toBe( 0 );
        });

    });

    // removeDialogParseEvent

    describe('Funktion removeDialogParseEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( bot.removeDialogParseEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( bot.removeDialogParseEvent( TEST_BOT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( bot.addDialogParseEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.removeDialogParseEvent( TEST_BOT_NAME )).toBe( 0 );
        });

    });

    // removeDialogSetEvent

    describe('Funktion removeDialogSetEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( bot.removeDialogSetEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( bot.removeDialogSetEvent( TEST_BOT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( bot.addDialogSetEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.removeDialogSetEvent( TEST_BOT_NAME )).toBe( 0 );
        });

    });

    // removeDialogStartEvent

    describe('Funktion removeDialogStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( bot.removeDialogStartEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( bot.removeDialogStartEvent( TEST_BOT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( bot.addDialogStartEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.removeDialogStartEvent( TEST_BOT_NAME )).toBe( 0 );
        });

    });

    // removeDialogStopEvent

    describe('Funktion removeDialogStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( bot.removeDialogStopEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( bot.removeDialogStopEvent( TEST_BOT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( bot.addDialogStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.removeDialogStopEvent( TEST_BOT_NAME )).toBe( 0 );
        });

    });

    // removeDialogStateSetEvent

    describe('Funktion removeDialogStateSetEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( bot.removeDialogStateSetEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( bot.removeDialogStateSetEvent( TEST_BOT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( bot.addDialogStateSetEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.removeDialogStateSetEvent( TEST_BOT_NAME )).toBe( 0 );
        });

    });

    // removeDialogActionEvent

    describe('Funktion removeDialogActionEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( bot.removeDialogActionEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( bot.removeDialogActionEvent( TEST_BOT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( bot.addDialogActionEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.removeDialogActionEvent( TEST_BOT_NAME )).toBe( 0 );
        });

    });

    // removeDialogActionStopEvent

    describe('Funktion removeDialogActionStopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( bot.removeDialogActionStopEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( bot.removeDialogActionStopEvent( TEST_BOT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( bot.addDialogActionStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.removeDialogActionStopEvent( TEST_BOT_NAME )).toBe( 0 );
        });

    });

    // removeDialogSpeakEvent

    describe('Funktion removeDialogSpeakEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( bot.removeDialogSpeakEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( bot.removeDialogSpeakEvent( TEST_BOT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( bot.addDialogSpeakEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.removeDialogSpeakEvent( TEST_BOT_NAME )).toBe( 0 );
        });

    });

    // removeDialogSpeakStartEvent

    describe('Funktion removeDialogSpeakStartEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( bot.removeDialogSpeakStartEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( bot.removeDialogSpeakStartEvent( TEST_BOT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( bot.addDialogSpeakStartEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.removeDialogSpeakStartEvent( TEST_BOT_NAME )).toBe( 0 );
        });

    });

    // removeDialogSpeakStopEvent

    describe('Funktion removeDialogSpeaktopEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( bot.removeDialogSpeakStopEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event hinzugefuegt wurde', () => {
            expect( bot.removeDialogSpeakStopEvent( TEST_BOT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Event hinzugefuegt wurde', () => {
            expect( bot.addDialogSpeakStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.removeDialogSpeakStopEvent( TEST_BOT_NAME )).toBe( 0 );
        });

    });

    // removeAllEvent

    describe('Funktion removeAllEvent', () => {

        it('sollte -1 zurueckgeben, wenn kein plugin name uebergeben wurde', () => {
            expect( bot.removeAllEvent( '' )).toBe( -1 );
        });

        it('sollte 0 zurueckgeben, wenn kein Event eingetragen wurde', () => {
            expect( bot.removeAllEvent( TEST_BOT_NAME )).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn Events eingefuegt wurden', () => {
            expect( bot.addInitEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addStartEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addErrorEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogParseEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogSetEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogStartEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogStateSetEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogActionEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogActionStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogSpeakEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogSpeakStartEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogSpeakStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.removeAllEvent( TEST_BOT_NAME )).toBe( 0 );
            expect( bot.addInitEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addStartEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addErrorEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogParseEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogSetEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogStartEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogStateSetEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogActionEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogActionStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogSpeakEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogSpeakStartEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
            expect( bot.addDialogSpeakStopEvent( TEST_BOT_NAME, () => 0 )).toBe( 0 );
        });

    });

    // parseSpeechDefFile

    describe('Funktion parseSpeechDefFile', () => {

        it('should return -1, if no valid dialog file', (done) => {
            // console.log('Test 1.1 Start');
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done.fail('should not call');
            })).toBe(0);
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                expect(aError.message).toEqual('ParserPlugin.parseSpeechDefFile: nicht implementiert');
                done();
                return 0;
            })).toBe(0);
            expect(bot.parseSpeechDefFile( 'invalidFile' )).toBe(0);
            // console.log('Test 1.1 Ende');
        });

        it('should return -1, if no dialog file', (done) => {
            // console.log('Test 1.2 Start');
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done.fail('should not call');
                return 0;
            })).toBe(0);
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                expect(aError.message).toEqual('ParserPlugin.parseSpeechDefFile: kein Dateiname uebergeben');
                done();
                return 0;
            })).toBe(0);
            expect(bot.setDialogFilePath( TEST_BOTSPEECH_PATH )).toBe( 0 );
            expect(bot.parseSpeechDefFile( '' )).toBe(-1);
            // console.log('Test 1.2 Ende');
        });

        it('should return 0, if valid dialog file', (done) => {
            // console.log('Test 1.3 Start');
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done.fail('should not call');
                return 0;
            })).toBe(0);
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                expect(aError.message).toEqual('ParserPlugin.parseSpeechDefFile: nicht implementiert');
                done();
                return 0;
            })).toBe(0);
            expect(bot.setDialogFilePath( TEST_BOTSPEECH_PATH )).toBe( 0 );
            expect(bot.parseSpeechDefFile( TEST_BOTSPEECH_FILE )).toBe( 0 );
            // console.log('Test 1.3 Ende');
        });

    });

    // parseSpeechDefDate

    describe('call parseSpeechDefData', () => {

        it('should return -1, if no data', (done) => {
            // console.log('Test 2.1 Start');
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done.fail('Test 3 should not call');
            })).toBe(0);
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                expect(aError.message).toEqual('ParserPlugin.parseSpeechDefData: keine Def-Daten uebergeben');
                done();
                return 0;
            })).toBe(0);
            expect(bot.parseSpeechDefData('')).toBe(-1);
            // console.log('Test 2.1 Ende');
        });

        it('should return -1, if invalid data', (done) => {
            // console.log('Test 2.2 Start');
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done.fail('Test 4 should not call');
            })).toBe(0);
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                expect(aError.message).toEqual('ParserPlugin.parseSpeechDefData: ParserFehler');
                done();
                return 0;
            })).toBe(0);
            expect(bot.parseSpeechDefData('ParserError')).toBe(-1);
            // console.log('Test 2.2 Ende');
        });

        it('should return 0, if valid data', (done) => {
            // console.log('Test 2.3 Start');
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done();
                return 0;
            })).toBe(0);
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                done.fail('Test 5 Error: ' + aError.message);
            })).toBe(0);
            expect(bot.parseSpeechDefData('DIALOG TestDialog')).toBe(0);
            // console.log('Test 2.3 Ende');
        });

        it('should return 0, if big valid data', (done) => {
            // console.log('Test 2.4 Start');
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done();
                return 0;
            })).toBe(0);
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                done.fail('Test 6 Error: ' + aError.message);
            })).toBe(0);
            expect(bot.parseSpeechDefData( dialogData )).toBe( 0 );
            // console.log('Test 2.4 Ende');
        });

    });

    // clearDialog

    describe('call clearDialog', () => {

        beforeEach((done) => {
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done();
                return 0;
            })).toBe(0);
            expect(bot.parseSpeechDefData( dialogData )).toBe(0);
        });

        it('should return 0, if clear dialog', () => {
            expect(bot.clearDialog()).toBe(0);
   
            expect(bot.clearDialog()).toBe(0);
            let errorText = '';
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                errorText = aError.message;
                return 0;
            }));
            expect(bot.start()).toBe(-1);
            expect(errorText).toEqual('InterpreterPlugin.startDialog: kein DialogState vorhanden');
        });
        
    });

    // setDialogFileXXX

    describe('call setDialogFileXXX', () => {

        it('should return 0, if valid path and file', (done) => {
            let errorText = '';
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> setDialogFileXXX: errorEvent', aError.message);
                done();
                return 0;
            }));
            expect(bot.setDialogFilePath( TEST_BOTSPEECH_PATH )).toBe(0);
            expect(bot.getDialogFilePath()).toEqual( TEST_BOTSPEECH_PATH );
            expect(bot.setDialogFileName( TEST_BOTSPEECH_FILE )).toBe(0);
            expect(bot.getDialogFileName()).toEqual( TEST_BOTSPEECH_FILE );
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done();
                return 0;
            })).toBe(0);
            expect(bot.loadDialogFile()).toBe(0);
        });
    
    });

    // loadDialogFile

    describe('call loadDialogFile', () => {

        it('should return 0, if no valid dialog file', (done) => {
            // console.log('Test 1 Start');
            expect( bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done.fail('should not call');
            })).toBe( 0 );
            expect( bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                // console.log('===> Bot.loadDialogFile:', aError);
                expect(aError.message).toEqual('FileHtml5Reader._onLoad: Error 404');
                done();
                return 0;
            })).toBe( 0 );
            expect( bot.loadDialogFile('invalidFile')).toBe( 0 );
            // console.log('Test 1 Ende');
        });

        it('should return 0, if valid dialog file', (done) => {
            // console.log('Test 2 Start');
            expect( bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done();
                return 0;
            })).toBe( 0 );
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                // console.log('===> Bot.loadDialogFile2:', aError);
                done.fail('Test 2 Error: ' + aError.message);
                return 0;
            })).toBe(0);
            expect( bot.setDialogFilePath( TEST_BOTSPEECH_PATH )).toBe(0);
            // console.log('===> getDialogFilePath:', bot.getDialogFilePath());
            // console.log('===> getDialogFileName:', bot.getDialogFileName());
            expect( bot.loadDialogFile()).toBe( 0 );
            // console.log('Test 2 Ende');
        });

    });

    // writeDialogDate

    describe('call writeDialogData', () => {

        it('should return -1, if no data', (done) => {
            // console.log('Test 3 Start');
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done.fail('Test 3 should not call');
            })).toBe(0);
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                expect(aError.message).toEqual('ParserPlugin.parseSpeechDefData: keine Def-Daten uebergeben');
                done();
                return 0;
            })).toBe(0);
            expect(bot.writeDialogData('')).toBe(-1);
            // console.log('Test 3 Ende');
        });

        it('should return -1, if invalid data', (done) => {
            // console.log('Test 4 Start');
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done.fail('Test 4 should not call');
            })).toBe(0);
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                expect(aError.message).toEqual('ParserPlugin.parseSpeechDefData: ParserFehler');
                done();
                return 0;
            })).toBe(0);
            expect(bot.writeDialogData('ParserError')).toBe(-1);
            // console.log('Test 4 Ende');
        });

        it('should return 0, if valid data', (done) => {
            // console.log('Test 5 Start');
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done();
                return 0;
            })).toBe(0);
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                done.fail('Test 5 Error: ' + aError.message);
            })).toBe(0);
            expect(bot.writeDialogData('DIALOG TestDialog')).toBe(0);
            // console.log('Test 5 Ende');
        });

        it('should return 0, if big valid data', (done) => {
            // console.log('Test 6 Start');
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done();
                return 0;
            })).toBe(0);
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                done.fail('Test 6 Error: ' + aError.message);
            })).toBe(0);
            expect(bot.writeDialogData( dialogData )).toBe(0);
            // console.log('Test 6 Ende');
        });

    });

    // set/getDialog

    describe('call set/getDialog', () => {

        beforeEach((done) => {
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done();
                return 0;
            })).toBe(0);
            expect(bot.writeDialogData( dialogData )).toBe(0);
        });

        it('should return -1, if invalid dialog name', (done) => {
            // console.log('Test 7 Start');
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                expect(aError.message).toEqual('InterpreterPlugin.setDialog: kein Dialogname uebergeben');
                done();
                return 0;
            }));
            expect(bot.addDialogSetEvent( TEST_BOT_NAME, () => {
                done.fail('Test 7 should not call');
                return 0;
            }));
            expect(bot.setDialog('')).toBe(-1);
            // eslint-disable-next-line
            expect(bot.getDialog()).toEqual( speech.DIALOG_MAIN_NAME );
            // console.log('Test 7 Ende');
        });

        it('should return 0, if valid dialog name', (done) => {
            // console.log('Test 8 Start');
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                done.fail('Test 8 Error: ' + aError.message);
                return 0;
            }));
            expect(bot.addDialogSetEvent( TEST_BOT_NAME, (aDialogName) => {
                expect(aDialogName).toEqual('TestDialog');
                done();
                return 0;
            }));
            expect(bot.setDialog('TestDialog')).toBe(0);
            expect(bot.getDialog()).toEqual('TestDialog');
            // console.log('Test 8 Ende');
        });

        it('should return 0, if valid dialog name and start dialog', (done) => {
            // console.log('===> Bot-E2E setDialog: Start');
            let errorText = '';
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Bot-E2E setDialog: ErrorEvent', errorText);
                bot.stop();
                return 0;
            }));
            expect(bot.addDialogStopEvent( TEST_BOT_NAME, () => {
                // console.log('===> Bot-E2E setDialog: StopEvent');
                done();
                return 0;
            }));
            expect(bot.setDialog('TestDialog')).toBe(0);
            expect(bot.start()).toBe(0);
            expect(bot.isRunning()).toBe(true);
            // console.log('===> Bot-E2E setDialog: Ende');
        });

        it('should return 0, if start dialog and set dialog name', (done) => {
            // console.log('Test 8 Start');
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                done.fail('Test 8 Error: ' + aError.message);
                return 0;
            }));
            expect(bot.addDialogSetEvent( TEST_BOT_NAME, (aDialogName) => {
                expect(aDialogName).toEqual('TestDialog');
                done();
                return 0;
            }));
            expect(bot.start()).toBe(0);
            expect(bot.isRunning()).toBe(true);
            expect(bot.setDialog('TestDialog')).toBe(0);
            expect(bot.isRunning()).toBe(false);
            // console.log('Test 8 Ende');
        });

    });

    // toggleDialog

    describe('call toggleDialog', () => {

        beforeEach((done) => {
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done();
                return 0;
            })).toBe(0);
            expect(bot.writeDialogData( dialogData )).toBe(0);
        });

        it('should return 0, if tts dialog start', (done) => {
            // console.log('===> Bot-E2E toggleDialog: Start');
            let errorText = '';
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Bot-E2E toggleDialog: ErrorEvent', errorText);
                bot.stop();
                return 0;
            }));
            expect(bot.addDialogStopEvent( TEST_BOT_NAME, () => {
                // console.log('===> Bot-E2E toggleDialog: StopEvent');
                done();
                return 0;
            }));
            expect(bot.toggleDialog()).toBe(0);
            expect(bot.isRunning()).toBe(true);
            // console.log('===> Bot-E2E toggleDialog: Ende');
        });

        it('should return 0, if tts dialog start/stop', (done) => {
            // console.log('Test 10 Start');
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                done.fail('Test 10 Error: ' + aError.message);
                return 0;
            }));
            expect(bot.addDialogStopEvent( TEST_BOT_NAME, () => {
                done();
                return 0;
            }));
            expect(bot.toggleDialog()).toBe(0);
            expect(bot.isRunning()).toBe(true);
            expect(bot.toggleDialog()).toBe(0);
            expect(bot.isRunning()).toBe(false);
            // console.log('Test 10 Ende');
        });

        it('should return 0, if audio dialog start', (done) => {
            // console.log('===> Bot-E2E toggleDialog: Start');
            let errorText = '';
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Bot-E2E toggleDialog: ErrorEvent', errorText);
                bot.stop();
                return 0;
            }));
            expect(bot.addDialogStopEvent( TEST_BOT_NAME, () => {
                // console.log('===> Bot-E2E toggleDialog: stopEvent');
                done();
                return 0;
            }));
            const speak = bot.getSpeak();
            expect(speak.setAudioOn()).toBe(0);
            expect(speak.setAudioFilePath( TEST_BOTASSETS_PATH )).toBe(0);
            expect(bot.toggleDialog()).toBe(0);
            expect(bot.isRunning()).toBe(true);
            // console.log('===> Bot-E2E toggleDialog: Ende');
        });

        it('should return 0, if tts dialog start/stop', (done) => {
            // console.log('Test 12 Start');
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                done.fail('Test 12 Error: ' + aError.message);
                return 0;
            }));
            expect(bot.addDialogStopEvent( TEST_BOT_NAME, () => {
                done();
                return 0;
            }));
            const speak = bot.getSpeak();
            expect(speak.setAudioOn()).toBe(0);
            expect(speak.setAudioFilePath( TEST_BOTASSETS_PATH )).toBe(0);
            expect(bot.toggleDialog()).toBe(0);
            expect(bot.isRunning()).toBe(true);
            expect(bot.toggleDialog()).toBe(0);
            expect(bot.isRunning()).toBe(false);
            // console.log('Test 12 Ende');
        });

    });

    // startDialog 

    describe('call startDialog', () => {

        beforeEach((done) => {
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done();
                return 0;
            })).toBe(0);
            expect(bot.writeDialogData( dialogData )).toBe(0);
        });

        it('should return 0, if dialog start', (done) => {
            // console.log('===> Bot-E2E startDialog: Start');
            let errorText = '';
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Bot-E2E startDialog: ErrorEvent', errorText);
                bot.stop();
                return 0;
            }));
            expect(bot.addDialogStopEvent( TEST_BOT_NAME, () => {
                // console.log('===> Bot-E2E setDialog: StopEvent');
                done();
                return 0;
            }));
            expect(bot.start()).toBe(0);
            expect(bot.isRunning()).toBe(true);
            // console.log('===> Bot-E2E startDialog: Ende');
        });

        it('should return 0, if dialog start/stop', (done) => {
            // console.log('Test 14 Start');
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                done.fail('Test 14 Error: ' + aError.message);
                return 0;
            }));
            expect(bot.addDialogStopEvent( TEST_BOT_NAME, () => {
                done();
                return 0;
            }));
            expect(bot.start()).toBe(0);
            expect(bot.isRunning()).toBe(true);
            expect(bot.stop()).toBe(0);
            expect(bot.isRunning()).toBe(false);
            // console.log('Test 14 Ende');
        });

    });

    // stopDialog

    describe('call stopDialog', () => {

        beforeEach((done) => {
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done();
                return 0;
            })).toBe(0);
            expect(bot.writeDialogData( dialogData )).toBe(0);
        });

        it('should return 0, if dialog start', () => {
            // console.log('Test 15 Start');
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                fail('Test 15 Error: ' + aError.message);
                return 0;
            }));
            expect(bot.addDialogStopEvent( TEST_BOT_NAME, () => {
                fail('Test 15 should not call');
                return 0;
            }));
            expect(bot.stop()).toBe(0);
            // console.log('Test 15 Ende');
        });

    });

    // set/getDialogState

    describe('call set/getDialogState', () => {

        beforeEach((done) => {
            expect(bot.addDialogParseEvent( TEST_BOT_NAME, () => {
                done();
                return 0;
            })).toBe(0);
            expect(bot.writeDialogData( dialogData )).toBe(0);
        });

        it('should return -1, if empty state', () => {
            let errorText = '';
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                errorText = aError.message;
                return 0;
            }));
            expect(bot.setDialogState('')).toBe(-1);
            // eslint-disable-next-line
            expect(bot.getDialogState()).toEqual(speech.DIALOG_ROOTSTATE_NAME);
            expect(errorText).toEqual('InterpreterPlugin.setState: kein StateName uebergeben');
        });

        it('should return 0, if valid state', () => {
            expect(bot.addDialogStateSetEvent( TEST_BOT_NAME, (aStateName) => {
                expect(aStateName).toEqual('TestState');
                return 0;
            }));
            expect(bot.setDialogState('TestState')).toBe(0);
            expect(bot.getDialogState()).toEqual('TestState');
        });

        it('should return 0, if valid state name and start dialog', (done) => {
            // console.log('===> Bot-E2E setDialogState: Start');
            let errorText = '';
            expect( bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Bot-E2E setDialogState: ErrorEvent', errorText);
                bot.stop();
                return 0;
            }));
            expect( bot.addDialogStopEvent( TEST_BOT_NAME, () => {
                // console.log('===> Bot-E2E setDialogState: StopEvent');
                done();
                return 0;
            }));
            expect( bot.setDialogState( 'testState' )).toBe( 0 );
            expect( bot.start()).toBe( 0 );
            expect( bot.isRunning()).toBe( true );
            // console.log('===> Bot-E2E setDialogState: Ende');
        });

        it('should return 0, if start dialog and set state name', (done) => {
            // console.log('===> Bot-E2E setDialogState: Start');
            let errorText = '';
            expect(bot.addErrorEvent( TEST_BOT_NAME, (aError) => {
                errorText = aError.message;
                // console.log('===> Bot-E2E setDialogState: ErrorEvent', errorText);
                bot.stop();
                return 0;
            }));
            expect(bot.addDialogStateSetEvent( TEST_BOT_NAME, (aDialogName) => {
                expect(aDialogName).toEqual('testState');
                done();
                return 0;
            }));
            expect(bot.start()).toBe(0);
            expect(bot.isRunning()).toBe( true );
            expect(bot.setDialogState( 'testState' )).toBe( 0 );
            expect(bot.isRunning()).toBe( false );
            // console.log('===> Bot-E2E setDialogState: Ende');
        });
        
    });

});


