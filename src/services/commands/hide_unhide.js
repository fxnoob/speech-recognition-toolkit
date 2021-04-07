/* eslint-disable no-unused-vars */
import translationService from "../translationService";
import guid from "../guid";
export default async langId => {
  const alias0 = await translationService.getMessage(
    langId,
    "0203B448_5D65_8AE1_9BFA_D3F091C828C6"
  ); // hide this page

  const alias1 = await translationService.getMessage(
    langId,
    "7ACA0A58_8545_ABEF_19DB_476202AA1B34"
  ); // unhide this page

  const description = await translationService.getMessage(
    langId,
    "79A538B2_EC72_DB1F_02AC_5A35F75E550D"
  ); // Hide/Unhide the current page

  let element = {
    id: guid.generateGuid(),
    state: ""
  };
  return {
    id: "81187579_69E1_B8F9_53E1_E02984DE492D",
    type: "frontend",
    name: "81187579_69E1_B8F9_53E1_E02984DE492D",
    description: description,
    condition: "exact",
    match: [alias0, alias1],
    exec: async (text, options, callback) => {
      // write your logic here.
      const { originalText } = options;
      const addElement = () => {
        if (element.state != "added") {
          const body = document.body;
          const html = document.documentElement;
          const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
          );
          const el = document.createElement("div");
          el.id = element.id;
          el.style = `top: 0px; left: 0px; width: 100%;height: ${height}px; z-index: 543454; position: absolute; background: white;`;
          document.body.appendChild(el);
          element.state = "added";
        }
      };
      const removeElement = () => {
        if (element.state == "added") {
          document.getElementById(element.id).remove();
          element.state = "removed";
        }
      };
      if (originalText == alias0) {
        addElement();
      } else if (originalText == alias1) {
        removeElement();
      }
    }
  };
};
