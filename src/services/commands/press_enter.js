import translationService from "../translationService";

export default async langId => {
  const commandAlias = "Press Enter";
  const description = await translationService.getMessage(
    langId,
    "command_press_enter_description"
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
