/**
 * Log Komponente fuer den Speech-Server
 *
 * @module speech-common
 * @author SB
 */

/**
 *
 *
 * @class SpeechLog
 */

class SpeechLog {

    // Default-Logname, wenn kein anderer Logname angegeben wurde
    logName = 'Speech';
    logFlag = true;

    /**
     * Creates an instance of SpeechLog.
     * @param {string} [aLogName] - optionaler Parameter fuer Log-Name
     * @memberof SpeechLog
     */

    constructor( aLogName?: string ) {
        if ( aLogName ) {
            this.logName = aLogName;
        }
    }

    logOn() {
        this.logFlag = true;
    }

    logOff() {
        this.logFlag = false;
    }

    debug( aDebugText: string, ...optionalParameters: any[] ): void {
        if ( !this.logFlag ) {
            return;
        }
        // tslint:disable-next-line
        console.log(this.logName + ':', aDebugText, ...optionalParameters);
    }

    error( aErrorText: string, ...optionalParameters: any[] ): void {
        // tslint:disable-next-line
        console.error(this.logName + ':', aErrorText, ...optionalParameters);
    }
}
