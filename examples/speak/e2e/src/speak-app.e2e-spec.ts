/**
 * E2E-Tests fuer Speak-App Example
 */

import { browser, element, by } from 'protractor';

const jasmineTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;


describe('Speak-App', () => {

    beforeAll((done) => {
        console.log('Speak-E2E Test');
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
        browser.get('');
        setTimeout( done, 2000 );
    });

    afterAll(() => {
        browser.ignoreSynchronization = false;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmineTimeout;
    });

    beforeEach(() => {
    });

    it('sollte errorClick druecken und Fehlerausgabe abschalten', () => {
        let errorButton = element( by.id('errorClick'));
        expect( errorButton.getText()).toBe( 'Fehler aus' );
        errorButton.click();
        expect( errorButton.getText()).toBe( 'Fehler ein' );
    });

    it('sollte startClick druecken und Sprachausgabe mit erster Stimme starten', (done) => {
        let voiceButton = element( by.id('voice1Click'));
        let startButton = element( by.id('startClick'));
        voiceButton.getCssValue("display").then(display => {
            if ( display !== 'none' ) {
                voiceButton.click();
                startButton.click();
                setTimeout( done, 4000);
            } else {
                done();
            }
        });
    });

    it('sollte startClick druecken und Sprachausgabe mit zweiter Stimme starten', (done) => {
        let voiceButton = element( by.id('voice2Click'));
        let startButton = element( by.id('startClick'));
        voiceButton.getCssValue("display").then(display => {
            if ( display !== 'none' ) {
                voiceButton.click();
                startButton.click();
                setTimeout( done, 4000);
            } else {
                done();
            }
        });
    });

    it('sollte startClick druecken und Sprachausgabe mit dritter Stimme starten', (done) => {
        let voiceButton = element( by.id('voice3Click'));
        let startButton = element( by.id('startClick'));
        voiceButton.getCssValue("display").then(display => {
            if ( display !== 'none' ) {
                voiceButton.click();
                startButton.click();
                setTimeout( done, 4000);
            } else {
                done();
            }
        });
    });

    it('sollte startClick druecken und Sprachausgabe mit vierter Stimme starten', (done) => {
        let voiceButton = element( by.id('voice4Click'));
        let startButton = element( by.id('startClick'));
        voiceButton.getCssValue("display").then(display => {
            if ( display !== 'none' ) {
                voiceButton.click();
                startButton.click();
                setTimeout( done, 4000);
            } else {
                done();
            }
        });
    });

    it('sollte startClick druecken und Sprachausgabe mit fuenfter Stimme starten', (done) => {
        let voiceButton = element( by.id('voice5Click'));
        let startButton = element( by.id('startClick'));
        voiceButton.getCssValue("display").then(display => { 
            if ( display !== 'none' ) {
                voiceButton.click();
                startButton.click();
                setTimeout( done, 4000);
            } else {
                done();
            }
        });
    });

    it('sollte startClick und gleich wieder stopClick druecken', (done) => {
        let startButton = element( by.id('startClick'));
        expect( startButton ).toBeTruthy();
        startButton.click();
        let stopButton = element( by.id('stopClick'));
        expect( stopButton ).toBeTruthy();
        stopButton.click();
        setTimeout( done, 1000);
    });

});
