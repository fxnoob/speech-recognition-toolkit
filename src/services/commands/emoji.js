import translationService from "../translationService";
import emoji from "../emojiService";

export default async langId => {
  const commandAlias = await translationService.getMessage(langId, "emoji");
  const description = await translationService.getMessage(
    langId,
    "command_emoji_description"
  );
  return {
    id: '4DBE9DD0-E8A2-225B-6F61-DD00381B528D',
    type: 'frontend',
    name: commandAlias,
    description: description,
    condition: "startsWith",
    match: [commandAlias],
    exec: async (text, options, callback) => {
      const { dom, ackId } = options;
      const emojiContent = await emoji.getSomeWHatSimilarEmoji(
        langId,
        text.toLowerCase()
      );
      if (emojiContent) {
        dom.simulateWordTyping(` ${emojiContent.replacement} `, ackId);
        callback(`closest emoji to string ${text} = ${emojiContent.replacement}`);
      }
    }
  };
};
