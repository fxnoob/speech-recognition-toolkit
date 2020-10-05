class Dom {
  /**
   * If the focus is in an iframe with a different origin, then attempting to
   * access focusedElem.contentDocument will fail with a `SecurityError`:
   * Failed to read the 'contentDocument' property from 'HTMLIFrameElement':
   *  - Blocked a frame with origin "http://jsbin.io" from accessing a cross-origin frame."
   * Rather than spam the console with exceptions, we'll treat this as an
   * unrenderable situation (which it is).
   * More info:
   *  - https://github.com/adam-p/markdown-here/issues/173
   *  - https://github.com/adam-p/markdown-here/issues/435
   * @param {*} focusedElem
   * @return {boolean}
   */
  iframeAccessOkay(focusedElem) {
    try {
      // eslint-disable-next-line no-unused-vars
      const _ = focusedElem.contentDocument;
    } catch (e) {
      // TODO: Check that this is actually a SecurityError
      // and re-throw if it's not?
      return false;
    }

    return true;
  }
  /**
   * @param {*} document
   * @return {*}
   */
  findFocusedElem(document, mountAckId) {
    let focusedElem = document.activeElement;

    // Tests if it's possible to access the iframe contentDocument without
    // throwing an exception.
    if (!this.iframeAccessOkay(focusedElem)) {
      return null;
    }

    // If the focus is within an iframe, we'll have to drill down to get to the
    // actual element.
    while (focusedElem && focusedElem.contentDocument) {
      const contentDoc = focusedElem.contentDocument;
      if (contentDoc.getElementById("mountAckId")) {
        return focusedElem;
      }
      focusedElem = focusedElem.contentDocument.activeElement;
      if (!this.iframeAccessOkay(focusedElem)) {
        return null;
      }
    }

    // There's a bug in Firefox/Thunderbird that we need to work around. For
    // details see https://github.com/adam-p/markdown-here/issues/31
    // In short: Sometimes we'll get the <html> element instead of <body>.
    if (focusedElem instanceof document.defaultView.HTMLHtmlElement) {
      focusedElem = focusedElem.ownerDocument.body;
    }
    return focusedElem;
  }
  /**
   * check whether a frame has focus
   * recursively check if iframe has focus then its parent would not have focus
   * @return boolean
   */
  hasFocus() {
    return document.activeElement.tagName != "IFRAME";
  }
  /**
   * check if current page is in iframe.
   * @return {*}
   */
  inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }
}
const dom = new Dom();
export default dom;
