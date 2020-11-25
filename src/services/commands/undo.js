import translationService from "../translationService";

export default async langId => {
  const commandAlias = await translationService.getMessage(
    langId,
    "label_undo"
  );
  const description = await translationService.getMessage(
    langId,
    "command_undo_description"
  );
  return {
    name: commandAlias,
    description: description,
    match: "exact",
    exec: async (text, options, callback) => {
      const { dom } = options;
      const { lastFocusedElementDocument } = dom;
      try {
        if (lastFocusedElementDocument) {
          lastFocusedElementDocument.execCommand("undo", false, null);
        }
        callback();
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    }
  };
};