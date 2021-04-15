/* eslint-disable no-unused-vars */
import translationService from "../translationService";
export default async langId => {
  const alias0 = await translationService.getMessage(
    langId,
    "3B274849_89C8_2A34_4D00_67E924C3F3D7"
  ); // scroll up

  const alias1 = await translationService.getMessage(
    langId,
    "32D6B609_F840_7BBE_60A9_A5A8CF06EBF6"
  ); // scroll down

  const alias2 = await translationService.getMessage(
    langId,
    "32D6B609_F840_7BBE_60A9_A5A8CF06EBF7"
  ); // scroll top

  const description = await translationService.getMessage(
    langId,
    "7025F41F_A247_2606_5EEF_EF009D666B11"
  ); // Say scroll down/ scroll up to scroll the page.

  return {
    id: "88C44197_BCD5_FC28_A79A_9448825359B9",
    type: "frontend",
    name: "88C44197_BCD5_FC28_A79A_9448825359B9",
    description: description,
    condition: "exact",
    match: [alias0, alias1, alias2],
    exec: async (text, options, callback) => {
      // write your logic here.
      const { originalText } = options;
      if (originalText == alias0) {// scroll up
        window.scrollBy(0, -100);
      } else if (originalText == alias1) {// scroll down
        window.scrollBy(0, 100);
      } else if (originalText == alias2) { // scroll top
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    }
  };
};
