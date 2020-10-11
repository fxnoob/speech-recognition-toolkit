import translationService from "../translationService";

export default langId => {
  const commandAlias = translationService.getMessage(langId, "full_stop_label")
    .message;
  console.log({ commandAlias });
  return {
    name: commandAlias,
    description: translationService.getMessage(
      langId,
      "command_fullstop_description"
    ).message,
    match: "exact",
    exec: async (text, options, callback) => {
      const { dom } = options;
      dom.simulateWordTyping(".");
    }
  };
};
