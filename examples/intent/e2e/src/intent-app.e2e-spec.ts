/**
 * E2E-Tests fuer Intent-App Example
 */

import { browser, element, by } from 'protractor';

const jasmineTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;


describe('Intent-App', () => {

    beforeAll((done) => {
        console.log('Intent-E2E Test');
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

    it('sollte startClick druecken und Sprachanalyse starten', (done) => {
        let startButton = element( by.id('startClick'));
        startButton.click();
        setTimeout( done, 4000);
    });

    it('sollte errorClick druecken und Fehlerausgabe abschalten', async () => {
        let errorButton = element( by.id('errorClick'));
        expect( await errorButton.getText()).toBe( 'Fehler aus' );
        errorButton.click();
        expect( await errorButton.getText()).toBe( 'Fehler ein' );
    });

});
