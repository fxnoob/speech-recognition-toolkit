import { Dom } from '../src/util/dom'
const dom = new Dom()

export default class contentScript {
  constructor () {
    /**  Run contentScript helper */
    chrome.runtime.sendMessage({ method: 'getSettings' }, (response) => {
      console.log(response)
      if (response.data.isExtAllowed) {
        /** fast copy */
        document.addEventListener('mouseup', dom.setSelectedText, false)
        /** fast paste */
        document.addEventListener('dblclick', dom.fillByPreviouslySelectedText, false)
        /** cutting the text from document */
        document.addEventListener('cut', Dom.cutDomText, false)
        /** search selected text on double click */
        // document.addEventListener("dblclick" , searchOnDblClick);
     }
    })
  }
}
