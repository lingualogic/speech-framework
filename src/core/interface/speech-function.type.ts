/** @packageDocumentation
 * Funktionstype
 *
 * @module speech
 * @author SB
 */


export type OnSpeechInitFunc = (aPluginName: string) => number;
export type OnSpeechActionFunc = (aAction: any) => number;
export type OnSpeechEventFunc = (aEvent: any) => number;
export type OnSpeechErrorFunc = (aError: any) => number;


export type SpeechErrorFunc = (aErrorText: string) => void;

