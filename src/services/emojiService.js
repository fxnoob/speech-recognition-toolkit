import MessagePassing from "./messagePassing";
class Emoji {
  constructor() {
    this.languages = {};
  }
  getEmoji(langId, emojiName) {
    const locale = langId.split("-");
    return this.languages[locale[0]][emojiName];
  }
  async getEmojiList(langId) {
    return new Promise((resolve, reject) => {
      MessagePassing.sendMessage("/get_emoji_list", { langId }, res => {
        resolve(res);
      });
    });
  }
  async getSomeWHatSimilarEmoji(langId, emojiName) {
    return new Promise((resolve, reject) => {
      MessagePassing.sendMessage("/get_emoji", { langId, emojiName }, res => {
        resolve(res);
      });
    });
  }
}
const emoji = new Emoji();
export default emoji;
