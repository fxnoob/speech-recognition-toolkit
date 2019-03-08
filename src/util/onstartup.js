import objectdetect from '../libs/ml/object_detection/objectdetect'
import { ExtSpeechRecognitionSetting } from './setting'
import { Pages } from './pages'

const SpeechRecognitionSetting = new ExtSpeechRecognitionSetting()
const pages = new Pages()

export class onStartUp {
  constructor () {
    try {
      console.log('JsObjectDetect', objectdetect)
    } catch (e) {
      console.log('JsObjectDetect', e)
    }
  }
  EnableSpeechRecognitionIfSet () {
    SpeechRecognitionSetting.get()
      .then(res => {
        if (res.ExtSpeechRecognitionSetting.alwaysOpenWithChromeStart == true) {
          pages.openPinnedOptionPage()
        }
      })
  }
}
