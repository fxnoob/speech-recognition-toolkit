import translationService from "../translationService";

export default langId => {
  const commandAlias = "Press Enter";
  console.log({ commandAlias });
  return {
    name: commandAlias,
    description: translationService.getMessage(
      langId,
      "command_press_enter_description"
    ).message,
    match: "exact",
    exec: async (text, options, callback) => {
      const { dom } = options;
      dom.simulateWordTyping("\n\r");
    }
  };
};
