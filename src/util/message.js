import { ExtBasicSetting } from './setting'
import Storage from './storage'
export default class Message {
  getData () {
    return new Promise((resolve, reject) => {
      const storage = new Storage()
      storage.getData()
        .then((Res) => {
          resolve(Res)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  setSelectedText (value) {
    if (value === '' || value === null || value === undefined) {
      return
    }
    console.log('setSelectedText', value)
    const storage = new Storage()
    storage.set({ data: value })
    storage.getData()
      .then((data) => {
        console.log(data)
      })
  }
  getSettings () {
    const setting = new ExtBasicSetting()
    return setting.settingvars
  }
  putOnHighlightedInputfield (text) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { method: 'speech_recognition_text', text: text })
    })
  }
}
