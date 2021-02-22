/* eslint-disable no-unused-vars */
import translationService from "../translationService";
import chromeService from "../chromeService";
export default async langId => {
  const alias0 = await translationService.getMessage(
    langId,
    "BC085CF0_5805_AC81_A875_F0D3A06A82A3"
  ); // new tab

  const description = await translationService.getMessage(
    langId,
    "17C96AED_4D9D_8CD3_371B_E73BFBC686FD"
  ); // Say 'new tab' to open new tab.

  return {
    id: "22F8DAEE_6B47_1B74_58F0_FF3CC4A1D668",
    type: "backend",
    name: "22F8DAEE_6B47_1B74_58F0_FF3CC4A1D668",
    description: description,
    condition: "exact",
    match: [alias0],
    exec: async (text, options, callback) => {
      // write your logic here.
      chromeService.openUrl("about:newtab/");
    }
  };
};
