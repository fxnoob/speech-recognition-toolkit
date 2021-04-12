/* eslint-disable no-unused-vars,no-console */
import translationService from "../translationService";
import gridService from "../gridService";
export default async langId => {
  const alias0 = await translationService.getMessage(
    langId,
    "E0DBCD01_2CC6_07AD_B43C_9F4DC9E448E7"
  ); // show

  const description = await translationService.getMessage(
    langId,
    "3E34E89A_ED4E_3248_ACF1_FA162FA7C24E"
  ); // Say 'show numbers' to show links highlighted on page.
  const number_label = await translationService.getMessage(
    langId,
    "number_label"
  );
  const numbers_label = await translationService.getMessage(
    langId,
    "numbers_label"
  );
  const grid_label = await translationService.getMessage(langId, "grid_label");
  const grids_label = await translationService.getMessage(
    langId,
    "grids_label"
  );

  return {
    id: "31A07A05_7866_22E6_45B6_762E239F464C",
    type: "frontend",
    name: "31A07A05_7866_22E6_45B6_762E239F464C",
    description: description,
    condition: "startsWith",
    match: [alias0],
    exec: async (text, options, callback) => {
      // write your logic here.
      if (text == number_label || text == numbers_label) {
        // show number on links
      } else if (text.startsWith(grid_label) || text.startsWith(grids_label)) {
        // show grid on page
        const arg = text
          .replace(grid_label, "")
          .replace(grids_label, "")
          .trim();
        if (arg == "") {
          gridService.initiailizeGrid();
          gridService.createGrid(4, 4);
        } else {
          const n = parseInt(arg);
          if (Number.isInteger(n) && n > 0 && n < 17) {
            const el = document.getElementById("gridview");
            gridService.createGrid(4, 4, n);
          }
        }
      }
    }
  };
};