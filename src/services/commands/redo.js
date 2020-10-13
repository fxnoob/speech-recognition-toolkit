import translationService from "../translationService";

export default async langId => {
  const commandAlias = await translationService.getMessage(
    langId,
    "label_redo"
  );
  const description = await translationService.getMessage(
    langId,
    "command_redo_description"
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
          lastFocusedElementDocument.execCommand("redo", false, null);
        }
        callback();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
  };
};
