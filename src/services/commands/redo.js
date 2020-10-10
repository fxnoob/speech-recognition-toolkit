import translationService from "../translationService";

export default langId => {
  const commandAlias = translationService.getMessage(langId, "label_redo")
    .message;
  console.log({ commandAlias });
  return {
    name: commandAlias,
    match: "exact",
    exec: async (text, options, callback) => {
      const { dom } = options;
      const { lastFocusedElementDocument } = dom;
      try {
        if (lastFocusedElementDocument) {
          lastFocusedElementDocument.execCommand("redo", false, null);
        } else {
          console.log("nothing was typed recently");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
};
