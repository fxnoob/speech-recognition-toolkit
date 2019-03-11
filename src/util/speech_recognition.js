import Message from './message';
import * as SpeechRecognitionLib from 'annyang';

const message = new Message();

export class speechRecognition {
    constructor() {
        this.SpeechRecognition = SpeechRecognitionLib;
    }
    addCommand(commands) {
        this.SpeechRecognition.addCommands(commands);
    }
    start() {
        this.SpeechRecognition.start();
    }
    /** send recognised speech to highlighted input element */
    sendTextToDom(text) {
        message.putOnHighlightedInputfield(text);
    }
}
