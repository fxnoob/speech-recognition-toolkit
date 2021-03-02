/* eslint-disable no-unused-vars */
import Mark from 'mark.js';
import translationService from "../translationService";
export default async langId => {
  const alias0 = await translationService.getMessage(
    langId,
    "DB8D43DB_E16D_B358_B6B1_D9B232BC693A"
  ); // find

  const alias1 = await translationService.getMessage(
    langId,
    "72A35434_E102_6F83_1013_BE40DB1DCC3D"
  ); // highlight

  const alias2 = await translationService.getMessage(
    langId,
    "E811504D_2032_556A_7FAE_DE6BB6E28DAB"
  ); // unhighlight

  const description = await translationService.getMessage(
    langId,
    "166739BA_DD4A_0FAC_8635_877B90A755FC"
  ); // Say 'highlight keyword' to highlight the keyword on current page and vice-verca

  return {
    id: "6BC1CE1B_C4CE_654D_C882_CCA798AF3BB8",
    type: "frontend",
    name: "6BC1CE1B_C4CE_654D_C882_CCA798AF3BB8",
    description: description,
    condition: "startsWith",
    match: [alias0, alias1, alias2],
    exec: async (text, options, callback) => {
      // write your logic here.
      const { originalText } = options;
      const context = document.body;
      const markInstance = new Mark(context);
      if (originalText.startsWith(alias0) || originalText.startsWith(alias1)) {
        markInstance.mark(text);
      } else if (originalText.startsWith(alias2)) {
        markInstance.unmark();
      }
    }
  };
};
