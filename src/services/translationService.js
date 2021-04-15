import chromeService from "./chromeService";
import TranslationWorker from "./translation.worker";
import guid from "./guid";

class Translation {
  constructor() {
    this.translations = {};
    this.translationWorker = null;
  }
  getMessage(langId, key) {
    return new Promise(resolve => {
      const mapKey = `${langId}_${key}`;
      if (this.translations[mapKey]) {
        resolve(this.translations[mapKey]);
      } else if (chromeService.getScriptContext() == "background") {
        if (!this.translationWorker) {
          this.translationWorker = new TranslationWorker();
        }
        const translationWorker = this.translationWorker;
        const uid = guid.generateGuid();
        translationWorker.postMessage({
          langId,
          key,
          uid,
          action: "getMessage"
        });
        translationWorker.addEventListener("message", emojiRes => {
          const { message, uid: resUid } = emojiRes.data;
          if (uid == resUid) {
            this.translations[mapKey] = message.message;
            resolve(message.message);
          }
        });
      } else {
        chromeService.sendMessage(
          "/get_translated_message",
          { langId, key },
          res => {
            this.translations[mapKey] = res.message;
            resolve(res.message);
          }
        );
      }
    });
  }
}
const translationService = new Translation();
export default translationService;
