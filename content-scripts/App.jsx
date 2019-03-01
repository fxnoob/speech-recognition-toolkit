import React from 'react'
import ReactDOM from 'react-dom'
import Index from './components/'
import { Dom }  from "../src/util/dom";
const dom = new Dom();
const Element = document.createElement("div");
Element.setAttribute("id" , "dfghbnjmERHJKFGHNMVBNDFHFGDMFBNMbmvvxnbdgf");
document.body.appendChild(Element);
ReactDOM.render(<Index />, document.getElementById("dfghbnjmERHJKFGHNMVBNDFHFGDMFBNMbmvvxnbdgf"));
/**
*
 * Run contentScript helper
 *
 * */

chrome.runtime.sendMessage({method: "getSettings"}, (response) => {
     console.log(response);
    if (response.data.isExtAllowed) {
        /** fast copy */
        document.addEventListener("mouseup", dom.setSelectedText,false);
        /** fast paste */
        document.addEventListener("mousemove", dom.fillByPreviouslySelectedText,false);
        // //cutting the text from document
        // document.addEventListener("cut",cff,false);
        // //search on double click
        // document.addEventListener("dblclick" , searchOnDblClick);
    }
});
