import { Client_message } from './client_message'
import { Simulaiton } from './simulation';

const clientMessage = new Client_message()
const simulation = new Simulaiton();

export class Dom {
  setSelectedText (event) {
    const data = document.getSelection().toString()
    if (data !== '' && data.length !== 0) {
      chrome.runtime.sendMessage({ method: 'getData' }, (response) => {
        const currentTimeStamp = +new Date()
        const diffTimestamp = currentTimeStamp - response.data.timeStamp
        if (true) {
          clientMessage.setSelectedText(data)
        }
        return true
      })
    }
    event.preventDefault()
  }
  fillByPreviouslySelectedText (e) {
    chrome.runtime.sendMessage({ method: 'getData' }, (response) => {
      console.log('getData', response)
      let strArray = response.data.data.data.split('');
      strArray.map((str_char) => {
        simulation.keypress([new String(str_char).charCodeAt(0)]);
      });
      return true
    })
    e.preventDefault();
  }
  static cutDomText (e) {
    e.srcElement.innerHTML = e.srcElement.innerHTML.substring(0, e.srcElement.innerHTML.indexOf(document.getSelection().toString())) + e.srcElement.innerHTML.substring(e.srcElement.innerHTML.indexOf(document.getSelection().toString()) + document.getSelection().toString().length)
  }
}
