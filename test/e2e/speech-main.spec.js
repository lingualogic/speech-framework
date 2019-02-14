/**
 * E2E-Tests fuer SppechMain API
 * 
 * Letzte Aenderung: 12.02.19
 *
 * @module main
 * @author SB
 */


// Tests

describe('SpeechMain', () => {

    const jasmineActionTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

    beforeAll(() => {
        // eslint-disable-next-line
        console.log('SpeechMain E2E-Tests gestartet...');
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });


    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmineActionTimeout;
    });


    afterEach(() => {
        // eslint-disable-next-line
        speech.SpeechMain.done();
    });


    // init

    describe('Funktion init', () => {

        it('sollte 0 zurueckgeben', () => {
            // eslint-disable-next-line
            expect( speech.SpeechMain.init()).toBe( 0 );
        });

        it('sollte 0 zurueckgeben, wenn mehrmals aufgerufen wurde', () => {
            // eslint-disable-next-line
            expect( speech.SpeechMain.isInit()).toBe( false );
            // eslint-disable-next-line
            expect( speech.SpeechMain.init()).toBe( 0 );
            // eslint-disable-next-line
            expect( speech.SpeechMain.isInit()).toBe( true );
            // eslint-disable-next-line
            expect( speech.SpeechMain.init()).toBe( 0 );
            // eslint-disable-next-line
            expect( speech.SpeechMain.isInit()).toBe( true );
        });

    });

    // done

    describe('Funktion done', () => {

        it('sollte 0 zurueckgeben', () => {
            // eslint-disable-next-line
            expect( speech.SpeechMain.isInit()).toBe( false );
            // eslint-disable-next-line
            expect( speech.SpeechMain.done()).toBe( 0 );
            // eslint-disable-next-line
            expect( speech.SpeechMain.isInit()).toBe( false );
        });

        it('sollte 0 zurueckgeben, wenn mehrmals aufgerufen wurde', () => {
            // eslint-disable-next-line
            expect( speech.SpeechMain.isInit()).toBe( false );
            // eslint-disable-next-line
            expect( speech.SpeechMain.done()).toBe( 0 );
            // eslint-disable-next-line
            expect( speech.SpeechMain.done()).toBe( 0 );
            // eslint-disable-next-line
            expect( speech.SpeechMain.isInit()).toBe( false );
        });

        it('sollte 0 zurueckgeben, wenn vorhher init aufgerufen wurde', () => {
            // eslint-disable-next-line
            expect( speech.SpeechMain.isInit()).toBe( false );
            // eslint-disable-next-line
            expect( speech.SpeechMain.init()).toBe( 0 );
            // eslint-disable-next-line
            expect( speech.SpeechMain.isInit()).toBe( true );
            // eslint-disable-next-line
            expect( speech.SpeechMain.done()).toBe( 0 );
            // eslint-disable-next-line
            expect( speech.SpeechMain.isInit()).toBe( false );
        });

    });

});
