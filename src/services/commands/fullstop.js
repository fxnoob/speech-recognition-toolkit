import translationService from "../translationService";

export default async langId => {
  const commandAlias = await translationService.getMessage(
    langId,
    "full_stop_label"
  );
  const description = await translationService.getMessage(
    langId,
    "command_fullstop_description"
  );
  return {
    name: commandAlias,
    description: description,
    match: "exact",
    exec: async (text, options, callback) => {
      const { dom } = options;
      dom.simulateWordTyping(".");
      callback();
    }
  };
};
