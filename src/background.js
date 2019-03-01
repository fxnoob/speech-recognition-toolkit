import "@babel/polyfill";
import Message from "./util/message";
const message = new Message();

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
