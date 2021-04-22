/* eslint-disable no-unused-vars */
import translationService from "../translationService";
import tabNavigation from "../tabNavigationService";
import gridService from "../gridService";
export default async langId => {
  const alias0 = await translationService.getMessage(
    langId,
    "2316EF3E_4A28_D331_8160_BB9B0678008D"
  ); // next

  const alias1 = await translationService.getMessage(
    langId,
    "4B3ABD84_BEA9_77F6_9833_2B73DAEAE87E"
  ); // previous

  const description = await translationService.getMessage(
    langId,
    "837C899B_2695_0944_4AB9_3F18657DAF86"
  ); // Navigate to input elements by saying next and previous

  return {
    id: "170CF1E7_E7B8_0A81_7F1E_3448512C7196",
    type: "frontend",
    name: "170CF1E7_E7B8_0A81_7F1E_3448512C7196",
    description: description,
    condition: "exact",
    match: [alias0, alias1],
    exec: async (text, options, callback) => {
      // write your logic here.
      const { originalText } = options;
      if (originalText == alias0) {
        // next
        tabNavigation.navigate("Right");
      } else if (originalText == alias1) {
        // previous
        tabNavigation.navigate("Left");
      }
    }
  };
};
