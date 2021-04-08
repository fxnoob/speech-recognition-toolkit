/* eslint-disable no-unused-vars */
import translationService from "../translationService";
import db from "../db";
export default async langId => {
  const alias0 = await translationService.getMessage(
    langId,
    "4F9E3486_5622_009E_508D_E1CA7FD016F3"
  ); // expand

  const description = await translationService.getMessage(
    langId,
    "9410478E_01B3_3F0A_54B5_F2253DE8CCD5"
  ); // Text expander command. See text expand list in the settings.

  return {
    id: "48D981B9_7E0E_2613_BDC9_384154056D96",
    type: "frontend",
    name: "48D981B9_7E0E_2613_BDC9_384154056D96",
    description: description,
    condition: "startsWith",
    match: [alias0],
    exec: async (text, options, callback) => {
      // write your logic here.
      const { dom, ackId } = options;
      const { textExpanderMap } = await db.get("textExpanderMap");
      const textToType = textExpanderMap[text] ? textExpanderMap[text]: text;
      dom.mode = "speech";
      dom.simulateWordTyping(` ${textToType}`, ackId);
    }
  };
};
