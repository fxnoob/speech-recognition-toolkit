/* eslint-disable no-unused-vars */
import translationService from "../translationService";
import gridService from "../gridService";
export default async langId => {
  const alias0 = await translationService.getMessage(
    langId,
    "DA867FCF_F606_DE11_B3E0_6B24EBD80FF0"
  ); // hide

  const description = await translationService.getMessage(
    langId,
    "F4DA5D43_FA43_D572_8469_A959A0DE66CE"
  ); // Say 'hide numbers' to hide numbers from links on page.
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
    id: "F06E7B80_682A_E6E5_8094_2457D1328B9D",
    type: "frontend",
    name: "F06E7B80_682A_E6E5_8094_2457D1328B9D",
    description: description,
    condition: "startsWith",
    match: [alias0],
    exec: async (text, options, callback) => {
      // write your logic here.
      if (text == number_label || text == numbers_label) {
        // hide number from links.
        // hide gird from page.
        if (gridService.isGridOn) {
          gridService.deleteGrid();
        }
      } else if (text == grid_label || text == grids_label) {
        // hide gird from page.
        if (gridService.isGridOn) {
          gridService.deleteGrid();
        }
      } else {
        callback(`Say ${alias0} ${number_label} or ${alias0} ${grid_label}`);
      }
    }
  };
};
