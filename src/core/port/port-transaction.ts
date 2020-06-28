/** @packageDocumentation
 * Event-Klasse fuer alle Port-Transaktionen
 *
 * Letzte Aenderung: 30.05.2020
 * Status: rot
 *
 * @module core/port
 * @author SB
 */


export class PortTransaction {
    private static mTransactionCounter = 0;

    transactionId = 0;
    plugin = '';
    type = '';
    result: any = null;
    error: any = null;

    constructor( aPluginName = '', aType = '' ) {
        this.plugin = aPluginName;
        this.type = aType;
        // automatische Transaktions-ID Erzeugung
        PortTransaction.mTransactionCounter += 1;
        this.transactionId = PortTransaction.mTransactionCounter;
    }

}
