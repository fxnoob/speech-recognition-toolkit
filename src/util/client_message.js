
export class Client_message {
    setSelectedText(data) {
        chrome.runtime.sendMessage({method: "setSelectedText",data:data});
    }
}
