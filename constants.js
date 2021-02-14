const guid = require("./src/services/guid");

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
  commands: {
    "20850A52-2A46-42A2-BED5-35F9E9B55344": true,// calculate
    "4DBE9DD0-E8A2-225B-6F61-DD00381B528D": true,// emoji
    "BAC548F8-69DB-07DE-2AA6-E687AEF889CC": true,// fullstop
    "3EC8A2EA-07B2-2612-A677-3FB0F5298D1D": true,// math_symbol
    "EFFFCB45-86C9-AABC-CF9B-DF6490AC0462": true,// mindfulness
    "C52EC66E-9A89-29A8-42B3-4CC7B7132E6C": true,// newline
    "2C813AB6-109C-7BBE-50A5-B54CE1C30BD8": true,// press_enter
    "35702128-F219-F734-0867-1364887AF2B2": true,// redo
    "0C52F324-0B39-8EC0-178E-7A2A16F6A629": true,// scroll_down
    "689E0658-F5CB-10CF-A4AA-D43D144DB98D": true,// scroll_up
    "F109FA3D-F491-B974-7830-0E8BD62CC65B": false,// tab_navigation_next
    "DF6E48B2-3372-3A06-C801-E964B7F73AD3": false,// tab_navigation_previous
    "9703B37A-11D7-BAB8-3FE9-E70D637BB49A": true,// undo
    "4D743502-F987-405E-D163-E57E8DD201AE": false, // undo_all
    "D7F4AFA8-8EA1-BC0F-6E19-D608FEBFAE6F": true, // arrow - up | down | left | right
    "59A7532E-805F-8882-A6F1-6BF822E96612": false, // go_to url
    "CB056517-63D9-B551-8511-11E80088C8EF": false, // remind_me
  },
  contentScript: {
    mountAckId: guid.generateGuid(), // <div id='${mountAckId}'/> for checking if content script is mounted in the frame
    mountId: guid.generateGuid()
  },
  support: {
    googleFormLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSdTB0tFZHTnRe5_L64lYCbJvQm4XD5zGoSubYYYqBEOYXkIGA/viewform?usp=sf_link",
    howtoVideoLink:
      "https://www.youtube.com/watch?v=YdESohE6ESQ"
  }
};

module.exports = constants;
