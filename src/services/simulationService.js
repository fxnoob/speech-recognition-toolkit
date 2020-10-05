import dom from "./dom";

export class Simulaiton {
  constructor() {}
  keypressInject(keyCode) {
    var el = document.activeElement;
    // Event method
    var eventObj = document.createEvent("Events");
    eventObj.initEvent("keydown", true, true); // bubble, cancelable
    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;
    el.dispatchEvent(eventObj);
    eventObj = document.createEvent("Events");
    eventObj.initEvent("keypress", true, true);
    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;
    el.dispatchEvent(eventObj);
    eventObj = document.createEvent("Events");
    eventObj.initEvent("keyup", true, true);
    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;
    el.dispatchEvent(eventObj);
    var keyboardEvent = document.createEvent("KeyboardEvent");
    var initMethod =
      typeof keyboardEvent.initKeyboardEvent !== "undefined"
        ? "initKeyboardEvent"
        : "initKeyEvent";
    keyboardEvent[initMethod](
      "keypress",
      true, // bubbles oOooOOo0
      true, // cancelable
      null, // view
      false, // ctrlKeyArg
      false, // altKeyArg
      false, // shiftKeyArg
      false, // metaKeyArg
      keyCode,
      keyCode // charCode
    );
    // Force Chrome to not return keyCode 0 when fired
    Object.defineProperty(keyboardEvent, "keyCode", {
      get: () => {
        return keyCode;
      }
    });

    Object.defineProperty(keyboardEvent, "which", {
      get: () => {
        return keyCode;
      }
    });
    Object.defineProperty(keyboardEvent, "keyIdentifier", {
      get: () => {
        return "Enter";
      }
    });
    Object.defineProperty(keyboardEvent, "shiftKey", {
      get: () => {
        return false;
      }
    });
    el.dispatchEvent(keyboardEvent);
  }
  static isTextInput(el) {
    /* if element is a form input element or textarea element
      and not type radio, checkbox, submit, button, color, hidden and
      not readOnly or disabled */
    if (
      el.nodeName == "TEXTAREA" ||
      (el.nodeName == "INPUT" &&
        !el.type.match(
          /^(radio|checkbox|submit|reset|button|color|hidden|image)$/i
        ))
    )
      if (el.disabled != true)
        // used to have el.readOnly != true &&
        return true;
      else return false;
  }
  isActiveElementInput(el = document.activeElement) {
    return Simulaiton.isTextInput(el);
  }
  keypress(array, el) {
    // Simulate a keypress
    var keyCode,
      ctrl,
      alt,
      shift,
      no_insertText = false;

    // array is an array: [keyCode, ctrl, alt, shift]
    if (Array.isArray(array)) {
      keyCode = array[0];
      ctrl =
        typeof array[1] != "undefined" &&
        array[1] != "0" &&
        array[1] != "false" &&
        array[1] != false
          ? true
          : false;
      alt =
        typeof array[2] != "undefined" &&
        array[2] != "0" &&
        array[2] != "false" &&
        array[2] != false
          ? true
          : false;
      shift =
        typeof array[3] != "undefined" &&
        array[3] != "0" &&
        array[3] != "false" &&
        array[3] != false
          ? true
          : false;
      no_insertText =
        typeof array[4] != "undefined" &&
        array[4] != "0" &&
        array[4] != "false" &&
        array[4] != false
          ? true
          : false;
    } else keyCode = array;
    if (isNaN(keyCode)) {
      // if keyCode is not a number
      keyCode = keyCode.charCodeAt(0); // Convert string character into charCode
    } // Version 0.99.7
    keyCode = Number(keyCode);
    var keyCodeLowerCase = keyCode;
    var key = String.fromCharCode(keyCode);
    var code = "Key" + key.toUpperCase();
    // keydown and keyup change a-z (97-122) to A-Z (65-90); keypress leaves it as lowercase
    if (keyCode >= 97 && keyCode <= 122) keyCodeLowerCase = keyCode - 32;
    var keyObj = {
      key: key,
      which: keyCodeLowerCase,
      keyCode: keyCodeLowerCase,
      charCode: 0,
      bubbles: true,
      cancelable: true,
      code: code,
      composed: true,
      isTrusted: true,
      ctrlKey: ctrl,
      altKey: alt,
      shiftKey: shift
    };
    var keypressObj = {
      key: key,
      which: keyCode,
      keyCode: keyCode,
      charCode: keyCode,
      bubbles: true,
      cancelable: true,
      code: code,
      composed: true,
      isTrusted: true,
      ctrlKey: ctrl,
      altKey: alt,
      shiftKey: shift
    };
    if (ctrl)
      el.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Control",
          code: "ControlLeft",
          keyCode: 17,
          ctrlKey: ctrl,
          altKey: alt,
          shiftKey: shift
        })
      );
    if (alt)
      el.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Alt",
          code: "AltLeft",
          keyCode: 18,
          ctrlKey: ctrl,
          altKey: alt,
          shiftKey: shift
        })
      );
    if (shift)
      el.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Shift",
          code: "ShiftLeft",
          keyCode: 16,
          ctrlKey: ctrl,
          altKey: alt,
          shiftKey: shift
        })
      );

    el.dispatchEvent(new KeyboardEvent("keydown", keyObj));
    el.dispatchEvent(new KeyboardEvent("keypress", keypressObj));
    //el.dispatchEvent(new InputEvent('input',{'data':key, inputType:'insertText' }));
    if (
      (el.isContentEditable || Simulaiton.isTextInput(el)) &&
      no_insertText == false &&
      !ctrl &&
      !alt
    ) {
      var textEvent = document.createEvent("TextEvent");
      textEvent.initTextEvent("textInput", true, true, null, key, 9, "en-US");
      el.dispatchEvent(textEvent); // Version 1.0.4 - Needed for messenger.com to display first character. Not needed for enter(13) in messenger or google hangouts
      document.execCommand("InsertText", false, key); // Messes up messenger.com and facebook.com chat box
    }
    el.dispatchEvent(new KeyboardEvent("keyup", keyObj));
    if (ctrl)
      el.dispatchEvent(
        new KeyboardEvent("keyup", {
          key: "Control",
          code: "ControlLeft",
          keyCode: 17,
          ctrlKey: false,
          altKey: alt,
          shiftKey: shift
        })
      );
    if (alt)
      el.dispatchEvent(
        new KeyboardEvent("keyup", {
          key: "Alt",
          code: "AltLeft",
          keyCode: 18,
          ctrlKey: ctrl,
          altKey: alt,
          shiftKey: shift
        })
      );
    if (shift)
      el.dispatchEvent(
        new KeyboardEvent("keyup", {
          key: "Shift",
          code: "ShiftLeft",
          keyCode: 16,
          ctrlKey: ctrl,
          altKey: alt,
          shiftKey: shift
        })
      );
  }
  simulateKeyPress(array, el = document.activeElement) {
    console.log({ el });
    // window.document
    this.keypress(array, el);
  }
}

const simulaiton = new Simulaiton();
export default simulaiton;
