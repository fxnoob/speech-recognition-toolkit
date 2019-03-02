import { Dom }  from "../src/util/dom";
const dom = new Dom();

export default class contentScript {
    constructor() {
        /**  Run contentScript helper */
        chrome.runtime.sendMessage({method: "getSettings"}, (response) => {
            console.log(response);
            if (response.data.isExtAllowed) {
                /** fast copy */
                document.addEventListener("mouseup", dom.setSelectedText,false);
                /** fast paste */
                document.addEventListener("mousemove", dom.fillByPreviouslySelectedText,false);
                /** cutting the text from document */
                document.addEventListener("cut" , dom.cutDomText ,false);
                /** search selected text on double click*/
                // document.addEventListener("dblclick" , searchOnDblClick);
            }
        });
        /** Listening to message sentfrom popup page, option page or background script on content script*/
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.method == "speech_recognition_text") {
                    this.speechToTextListener(request.text);
            }
        });
    }
    speechToTextListener(text) {
        const ele = document.activeElement;
        if( ele.type=='text'||ele.type=='textarea'||ele.type=='password'||ele.type=='email') {
            ele.value+= ' ' + text;
        }
    }
}
