/* eslint-disable no-unused-vars */
import translationService from "../translationService";
export default async langId => {
  const alias0 = await translationService.getMessage(
    langId,
    "F95EEFFE_A9EC_A42B_ED51_3B5947C00947"
  ); // undo

  const alias1 = await translationService.getMessage(
    langId,
    "72997E36_0DC6_71D1_8336_47562155ED79"
  ); // redo

  const alias2 = await translationService.getMessage(
    langId,
    "56287642_9B4E_5616_ACCF_1B0E03F6A2EB"
  ); // undo all

  const description = await translationService.getMessage(
    langId,
    "F16BC2BB_AD3E_749E_683B_560DF6F914E5"
  ); // Say undo/redo/undo all to do undo/redo/undo all.

  return {
    id: "2B16E45E_BEFD_C1FC_3173_CB814F949E1C",
    type: "frontend",
    name: "2B16E45E_BEFD_C1FC_3173_CB814F949E1C",
    description: description,
    condition: "exact",
    match: [alias0, alias1, alias2],
    exec: async (text, options, callback) => {
      // write your logic here.
      const { originalText, dom } = options;
      const { lastFocusedElementDocument } = dom;
      try {
        if (lastFocusedElementDocument) {
          if (originalText == alias0) {
            // undo
            lastFocusedElementDocument.execCommand("undo", false, null);
          } else if (originalText == alias1) {
            // redo
            lastFocusedElementDocument.execCommand("redo", false, null);
          } else if (originalText == alias2) {
            // undo all
            for (let i = 0; i < 20; i++) {
              lastFocusedElementDocument.execCommand("undo", false, null);
            }
          }
        }
        callback();
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    }
  };
};
