import  { Client_message } from "./client_message";

const clientMessage = new Client_message();
export class Dom {
    setSelectedText(event) {
        const data = document.getSelection().toString() ;
        if(data !=='' && data.length !== 0) {
                console.log(data);
                clientMessage.setSelectedText(data);
        }
    }
    fillByPreviouslySelectedText(e) {
        const ele = document.elementFromPoint(e.clientX,e.clientY);
        if(ele!=null) {
            if(ele.type=='text'||ele.type=='textarea'||ele.type=='password'||ele.type=='email') {
                ele.addEventListener('dblclick',(ee) => {
                    chrome.runtime.sendMessage({method: "getData"}, (response) => {
                        console.log("getData" , response);
                        ele.value = response.data.data.data;
                        return true;
                    });
                    e.preventDefault();
                },false);
            }
        }
    }
}
