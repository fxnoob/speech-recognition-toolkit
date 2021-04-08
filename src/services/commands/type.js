/* eslint-disable no-unused-vars */
import translationService from "../translationService";
export default async langId => {
  const alias0 = await translationService.getMessage(
    langId,
    "1E82AE17_8A18_A90C_B743_84D1341A18DE"
  ); // type

  const description = await translationService.getMessage(
    langId,
    "8DF1225E_6D10_2F85_2550_0CCACAC586BF"
  ); // Say 'type your_text' to type your text.

  return {
    id: "EE31AD58_6FAF_A017_2E6F_74F50C307831",
    type: "frontend",
    name: "EE31AD58_6FAF_A017_2E6F_74F50C307831",
    description: description,
    condition: "startsWith",
    match: [alias0],
    exec: async (text, options, callback) => {
      // write your logic here.
      const { dom, ackId } = options;
      dom.mode = "speech";
      dom.simulateWordTyping(` ${text} `, ackId);
    }
  };
};
