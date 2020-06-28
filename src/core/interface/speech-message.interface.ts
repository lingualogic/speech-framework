/** @packageDocumentation
 * Nachrichten Interface
 *
 * @module speech
 * @author SB
 */


export type SpeechSendMessageFunc = ( aMessage: SpeechMessageInterface ) => number;


export interface SpeechMessageInterface {
    event: string;
    features?: any;
    version?: string;
    id?: string;
    type?: string;
    text?: string;
    timeout?: number;
    intent?: any;
    state?: string;
    dialog?: string;
    dialogData?: string;
    action?: string;
    errorCode?: number;
    errorText?: string;
    context?: any;
}


