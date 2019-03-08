import { Client_message } from './client_message'

const clientMessage = new Client_message()
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
    const ele = document.elementFromPoint(e.clientX, e.clientY)
    if (ele != null) {
      if (ele.type == 'text' || ele.type == 'textarea' || ele.type == 'password' || ele.type == 'email') {
        ele.addEventListener('dblclick', (ee) => {
          chrome.runtime.sendMessage({ method: 'getData' }, (response) => {
            console.log('getData', response)
            ele.value = response.data.data.data
            return true
          })
          e.preventDefault()
        }, false)
      }
    }
  }
  cutDomText (e) {
    e.srcElement.innerHTML = e.srcElement.innerHTML.substring(0, e.srcElement.innerHTML.indexOf(document.getSelection().toString())) + e.srcElement.innerHTML.substring(e.srcElement.innerHTML.indexOf(document.getSelection().toString()) + document.getSelection().toString().length)
  }
}
