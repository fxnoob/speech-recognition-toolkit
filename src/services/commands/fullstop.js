import translationService from "../translationService";

export default langId => {
  const commandAlias = translationService.getMessage(langId, "full_stop_label")
    .message;
  console.log({ commandAlias });
  return {
    name: commandAlias,
    match: "exact",
    exec: async (text, options, callback) => {
      const { dom } = options;
      dom.sim;
    }
  };
};
