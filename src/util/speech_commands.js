import { speechRecognition } from "./speech_recognition";

const speechRecognitionController = new speechRecognition();

export default class SpeechCommands {
    constructor(callback) {

        /** Input text in highlighted input box */
        speechRecognitionController.addCommand({'search *text': (text) => {
                if ("goto tab ")
                callback(text);
            }
        });
        /** Go to tab $n */
        speechRecognitionController.addCommand("go to tab *num", this.goToTab);
        speechRecognitionController.start();
    }
    exec() {

    }
    /** Go to tab $n */
    goToTab(numTab) {
        console.log("called", numTab);
        const tab_num = numTab-1;
        chrome.tabs.query({}, (tabs) => {
            if(tab_num<tabs.length) {
                chrome.tabs.highlight({'tabs': tab_num}, () => {});
            }
        });
    }
}
