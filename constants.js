const guid = require("./src/services/guid");

const constants = {
  appConfig: {
    appName: "Speech Recognition Toolkit",
    // put extension key here if required which would only be used development mode
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
  contentScript: {
    mountAckId: guid.generateGuid(), // <div id='${mountAckId}'/> for checking if content script is mounted in the frame
    mountId: guid.generateGuid()
  },
  support: {
    googleFormLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSdTB0tFZHTnRe5_L64lYCbJvQm4XD5zGoSubYYYqBEOYXkIGA/viewform?usp=sf_link",
    howtoVideoLink:
      "https://www.youtube.com/watch?v=YdESohE6ESQ&ab_channel=fxnoob"
  }
};

module.exports = constants;
