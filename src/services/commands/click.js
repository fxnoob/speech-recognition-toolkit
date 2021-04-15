/* eslint-disable no-unused-vars */
import translationService from "../translationService";
import gridService from "../gridService";
import { getElementsDimensions } from "../helper";
export default async langId => {
  const alias0 = await translationService.getMessage(
    langId,
    "17A6393F_D2FC_D061_858D_123BE7451231"
  ); // click

  const description = await translationService.getMessage(
    langId,
    "E5FB3426_AEE3_D96A_DC5E_96E0EEF66E9F"
  ); // Say 'click #number' to to click on grid number.

  return {
    id: "0BC631CF_B429_27D2_C1FB_659AECBCE2C2",
    type: "frontend",
    name: "0BC631CF_B429_27D2_C1FB_659AECBCE2C2",
    description: description,
    condition: "startsWith",
    match: [alias0],
    exec: async (text, options, callback) => {
      // write your logic here.
      const { dom, ackId } = options;
      if (gridService.isGridOn) {
        const n = parseInt(text.trim());
        if (n > 0 && n < 17) {
          const el = document.getElementById(gridService.grids[n - 1]);
          const { left, top, width, height } = getElementsDimensions(el);
          const locY = Math.floor(top + height / 2);
          const locX = Math.floor(left + width / 2);
          gridService.mountEl.style.display = "none";
          gridService.deleteGrid();
          setTimeout(() => {
            const el = document.elementFromPoint(locX, locY);
            el?.click();
            el?.focus();
            setTimeout(() => {
              dom.simulateWordTyping("\n\r", ackId);
              dom.simulateWordTyping("\n", ackId);
              const activeElement = dom.findFocusedElem(document, ackId);
              dom.keypress([13, false, false, false], activeElement);
              const ke = new KeyboardEvent("keydown", {
                bubbles: true,
                cancelable: true,
                keyCode: 13
              });
              activeElement.dispatchEvent(ke);
            }, 0);
          }, 20);
        }
      }
    }
  };
};
