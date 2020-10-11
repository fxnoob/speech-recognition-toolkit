import translationService from "../translationService";
import emoji from "../emojiService";

export default langId => {
  const commandAlias = translationService.getMessage(langId, "emoji").message;
  return {
    name: commandAlias,
    description: translationService.getMessage(
      langId,
      "command_emoji_description"
    ).message,
    match: "startsWith",
    exec: async (text, options, callback) => {
      const { dom } = options;
      let alertText;
      const emojiText = text.replace(commandAlias, "").trim();
      const emojiContent = emoji.getSomeWhatSimilarEmoji(
        langId,
        emojiText.toLowerCase()
      );
      if (emojiContent) {
        dom.simulateWordTyping(` ${emojiContent.replacement} `);
      }
      alertText = emojiContent
        ? `${commandAlias}:  ${emojiContent.replacement}`
        : translationService.getMessage(langId, "emoji_not_found").message +
          " :" +
          emojiText;
      callback(alertText);
    }
  };
};
