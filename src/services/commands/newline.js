import translationService from "../translationService";

export default langId => {
  const commandAlias = translationService.getMessage(langId, "new_line_label")
    .message;
  console.log({ commandAlias });
  return {
    name: commandAlias,
    description: translationService.getMessage(
      langId,
      "command_newline_description_new"
    ).message,
    match: "exact",
    exec: async (text, options, callback) => {
      const { dom } = options;
      dom.simulateWordTyping("\n\r");
    }
  };
};
