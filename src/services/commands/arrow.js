import translationService from "../translationService";
/* eslint-disable no-unused-vars */
export default async langId => {
  const commandAlias = await translationService.getMessage(langId, "command_arrow_label");
  const description = await translationService.getMessage(
    langId,
    "command_arrow_description"
  );
  const strLeft = await translationService.getMessage(langId, 'left_label');
  const strRight = await translationService.getMessage(langId, 'right_label');
  const strUp = await translationService.getMessage(langId, 'up_label');
  const strDown = await translationService.getMessage(langId, 'down_label');
  return {
    id: "D7F4AFA8-8EA1-BC0F-6E19-D608FEBFAE6F",
    name: commandAlias,
    description: description,
    match: "startsWith",
    exec: async (text, options, callback) => {
      const { dom, ackId } = options;
      let commandContent = text
        .replace(commandAlias, "")
        .toLowerCase()
        .trim();
      const keyMapping = {
        [strLeft]: 37,
        [strRight]: 39,
        [strUp]: 38,
        [strDown]: 40
      };
      if (keyMapping[commandContent]) {
        dom.simulateKeyPress(
          [keyMapping[commandContent], false, false, false],
          ackId
        );
      }
      callback();
    }
  };
};
