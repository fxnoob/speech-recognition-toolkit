import MessagePassing from "./messagePassing";
class Emoji {
  constructor() {
    this.languages = {};
  }
  async getEmojiList(langId) {
    return new Promise((resolve) => {
      MessagePassing.sendMessage("/get_emoji_list", { langId }, res => {
        resolve(res);
      });
    });
  }
  async getSomeWHatSimilarEmoji(langId, emojiName) {
    return new Promise((resolve) => {
      MessagePassing.sendMessage("/get_emoji", { langId, emojiName }, res => {
        resolve(res);
      });
    });
  }
}
const emoji = new Emoji();
export default emoji;
