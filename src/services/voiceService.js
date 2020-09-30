import * as SR from "annyang";
import chromeService from "./chromeService";
import languages from "./languages";
class Voice {
  constructor() {
    this.supportedLanguages = languages;
    this.SR = SR;
  }
  addCommand(commands) {
    this.SR.addCommands(commands);
  }
  start() {
    chromeService.setBadgeOnActionIcon("◉");
    chromeService.setBadgeColorOnActionIcon("#f50057");
    this.SR.start();
  }
  stop() {
    chromeService.setBadgeOnActionIcon("");
    this.SR.abort();
  }
  setLanguage(langKey = "en-AU") {
    this.SR.setLanguage(langKey);
  }
  permissionGranted() {
    return navigator.permissions.query({ name: "microphone" });
  }
}

const voice = new Voice();
export default voice;
