import React from 'react'
import ReactDOM from 'react-dom'
import Index from './components/'
import ContentScript from './content_script'

const Element = document.createElement('div')
Element.setAttribute('id', 'dfghbnjmERHJKFGHNMVBNDFHFGDMFBNMbmvvxnbdgf')
document.body.appendChild(Element)
ReactDOM.render(<Index />, document.getElementById('dfghbnjmERHJKFGHNMVBNDFHFGDMFBNMbmvvxnbdgf'))

const ContentScriptController = new ContentScript()
