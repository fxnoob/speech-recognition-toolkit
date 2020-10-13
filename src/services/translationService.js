import MessagePassing from "./messagePassing";

class Translation {
  constructor() {}
  getMessage(langId, key) {
    return new Promise((resolve, reject) => {
      MessagePassing.sendMessage(
        "/get_translated_message",
        { langId, key },
        res => {
          resolve(res.message);
        }
      );
    });
  }
}
const translationService = new Translation();
export default translationService;
