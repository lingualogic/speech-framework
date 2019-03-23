/**
 * E2E-Tests fuer Listen-App Example
 */

import { browser, element, by } from 'protractor';

const jasmineTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;


describe('Listen-App', () => {

    beforeAll((done) => {
        console.log('Listen-E2E Test');
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
        let errorButton = element( by.id( 'errorClick' ));
        expect( errorButton.getText()).toBe( 'Fehler aus' );
        errorButton.click();
        expect( errorButton.getText()).toBe( 'Fehler ein' );
    });

});
