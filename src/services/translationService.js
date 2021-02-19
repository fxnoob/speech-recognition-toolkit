import chromeService from "./chromeService";
import TranslationWorker from "./translation.worker";
import guid from "./guid";

class Translation {
  constructor() {}
  getMessage(langId, key) {
    return new Promise(resolve => {
      if (chromeService.getScriptContext() == "background") {
        const translationWorker = new TranslationWorker();
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
            resolve(message.message);
          }
        });
      } else {
        chromeService.sendMessage(
          "/get_translated_message",
          { langId, key },
          res => {
            resolve(res.message);
          }
        );
      }
    });
  }
}
const translationService = new Translation();
export default translationService;
