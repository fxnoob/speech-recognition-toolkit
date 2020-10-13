import translationService from "../translationService";
import emoji from "../emojiService";

export default async langId => {
  const commandAlias = await translationService.getMessage(langId, "emoji");
  const description = await translationService.getMessage(
    langId,
    "command_emoji_description"
  );
  return {
    name: commandAlias,
    description: description,
    match: "startsWith",
    exec: async (text, options, callback) => {
      const { dom } = options;
      let alertText;
      const emojiText = text.replace(commandAlias, "").trim();
      const emojiContent = await emoji.getSomeWHatSimilarEmoji(
        langId,
        emojiText.toLowerCase()
      );
      console.log({ emojiContent });
      if (emojiContent) {
        dom.simulateWordTyping(` ${emojiContent.replacement} `);
      }
      alertText = emojiContent
        ? `${commandAlias}:  ${emojiContent.replacement}`
        : (await translationService.getMessage(langId, "emoji_not_found")) +
          " :" +
          emojiText;
      callback(alertText);
    }
  };
};
