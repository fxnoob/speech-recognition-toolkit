import "@babel/polyfill";
import Message from "./util/message";
import { onStartUp } from "./util/onstartup";

const message = new Message();
const onstartup = new onStartUp();

/** event fires when  chrome starts */
chrome.runtime.onStartup.addListener(() => {
    console.log("Chrome start");
    /** open option page to listen to speech commands if option is enabled */
    onstartup.EnableSpeechRecognitionIfSet();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.method == "setSelectedText") {
        console.log(request.data);
        message.setSelectedText(request.data);
    }
    else if (request.method == "getData") {
        console.log(request);
        message.getData()
            .then((data) => {
                sendResponse({data: data});
            })
            .catch(e=> {
                console.log(e);
            })
    }
    else if (request.method == "getSettings") {
        const setting = message.getSettings();
        sendResponse({data: setting});
    }
    return true;
});

