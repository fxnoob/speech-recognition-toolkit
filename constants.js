const guid = require("./src/services/guid");
const commandsConfig = require("./commandsConfig");
const constants = {
  appConfig: {
    appName: "Speech Recognition Toolkit",
    // put extension key here if required which would only be used in development mode
    "key ":
      "-----BEGIN PUBLIC KEY-----\n" +
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3VymTQvpTgWpVbYeveQV\n" +
      "I2ZuyKZtHtzDqIWu4Og/ZjOEbu6eXPzvX57BmMv0sX79Y0EDRHkbQAgtWjgilCTE\n" +
      "uWqxCOLpLpkYs9Dz/iXymqbIaM6IbLZEp513uKMSTknU9V5eWFuNeOU8Ps/6rr35\n" +
      "chBpbVxeWawy5jLak03n5jFRCnOtkzoU9gkbbTQRykV2dfp+KP0UYn7Vox/17fCH\n" +
      "CHPG5oA/DvH60iokIhoUXe+5SCIFcdsJE/a7gvH7YGbDkC6+ENpmUK0dEIEJSHAh\n" +
      "vyLwCl4pmiIC/crpbLxlV5SPfAN+P3tiAUlS0M5U2f0Nf6AFayvazJslHKTarU3K\n" +
      "qQIDAQAB\n" +
      "-----END PUBLIC KEY-----\n"
  },
  commands: commandsConfig,
  contentScript: {
    mountAckId: guid.generateGuid(), // <div id='${mountAckId}'/> for checking if content script is mounted in the frame
    mountId: guid.generateGuid()
  },
  populate: {
    textReplacementMap: {
      'plus': '+',
      'asterisk': '*',
      'at': '@',
      'division': '÷',
      'semicolon': ';',
      'forward slash': '/',
      'underscore': '_',
      'dash': '-',
      'comma': ',',
      'greater than': '>',
      'multiplication': 'x',
      'less than': '<',
      'dollar sign': '$',
      'colon': ':',
      'question mark': '?',
      'backslash': '\\',
      'hyphen': '–',
      'percent': '%',
      'equal': '=',
      'copyright': '©',
      'full stop': '.',
      'euro sign': '€',
      'minus': '-',
      'center dot': '·',
      'exclamation mark': '!',
      'exclamation point': '!',
      'hashtag': '#',
      'ampersand': '&',
      'degree': '°',
      'vertical bar': '|',
      'ellipsis': '…',
    },
    textExpanderMap: {
      form: `Hello user,

Just wanted to follow up and see if you still need any help regarding your promotional tile images.

If so, please reply back even if it is just to say you are still working on this, or if the issue is solved.

If you do not respond, I'll be closing this case.

Don't worry though, if you do respond, the case will reopen and we can pick up our conversation where we left off.

Regards,`
    }
  },
  support: {
    googleFormLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSdTB0tFZHTnRe5_L64lYCbJvQm4XD5zGoSubYYYqBEOYXkIGA/viewform?usp=sf_link",
    uninstallFormLink:
      "https://docs.google.com/forms/d/e/1FAIpQLScyR2hhU-o9cFGI7UuoIiSDdaKqVkXU0ElEDU96Ldp3YlqVFQ/viewform?usp=sf_link",
    howtoVideoLink: "https://www.youtube.com/watch?v=YdESohE6ESQ"
  }
};

module.exports = constants;
