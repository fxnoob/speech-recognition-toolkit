import translationService from "../translationService";

export default async langId => {
  const commandAlias = await translationService.getMessage(
    langId,
    "new_line_label"
  );
  const description = await translationService.getMessage(
    langId,
    "command_newline_description_new"
  );
  return {
    name: commandAlias,
    description: description,
    match: "exact",
    exec: async (text, options, callback) => {
      const { dom } = options;
      dom.simulateWordTyping("\n\r");
      callback();
    }
  };
};
