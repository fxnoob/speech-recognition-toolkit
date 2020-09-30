import "@babel/polyfill";
import db, { schema } from "./services/db";
import voice from "./services/voiceService";
import chromeService from "./services/chromeService";
import Routes from "./routes";

class Main {
  constructor() {
    this.startStopSRContextMenu = null;
    this.fastPasteContextMenu = null;
    this.init();
  }
  init = async () => {
    await this.initDb();
    await this.initContextMenu();
    await Routes(voice, {
      startStopSRContextMenu: this.startStopSRContextMenu
    });
    this.startUpInit();
  };
  /**
   * initialize db settings
   *
   * @method
   * @memberof Main
   */
  initDb = async () => {
    const res = await db.get("loaded");
    if (!res.hasOwnProperty("loaded")) {
      await db.set(schema.data);
    }
  };
  /**
   * Start speech recognition with default language
   *
   * @method
   * @memberof Main
   */
  startSR = async () => {
    const { defaultLanguage } = await db.get("defaultLanguage");
    voice.setLanguage(defaultLanguage.key);
    voice.start();
    await db.set({ isMicListening: true });
  };
  /**
   * Stop speech recognition
   *
   * @method
   * @memberof Main
   */
  stopSR = async () => {
    voice.stop();
    await db.set({ isMicListening: false });
  };
  /**
   * Context menu option initialization
   *
   * @method
   * @memberof Main
   */
  initContextMenu = async () => {
    const { isMicListening } = await db.get("isMicListening");
    const contextMenuTitle = isMicListening
      ? "Stop Speech Recognition tool"
      : "Start Speech Recognition tool";
    if (!this.startStopSRContextMenu) {
      this.startStopSRContextMenu = chromeService.createContextMenu({
        title: contextMenuTitle,
        contexts: ["all"],
        onclick: async (info, tab) => {
          let contextMenuTitle = "";
          const { isMicListening } = await db.get("isMicListening");
          if (isMicListening) {
            await this.stopSR();
            contextMenuTitle = "Start Speech Recognition tool";
          } else {
            await this.startSR();
            contextMenuTitle = "Stop Speech Recognition tool";
          }
          chrome.contextMenus.update(
            this.startStopSRContextMenu,
            {
              title: contextMenuTitle
            },
            () => {}
          );
        }
      });
    }
    if (!this.fastPasteContextMenu) {
      this.fastPasteContextMenu = chromeService.createContextMenu({
        title: contextMenuTitle,
        contexts: ["all"],
        onclick: async (info, tab) => {
          let contextMenuTitle = "";
          const { isMicListening } = await db.get("isMicListening");
          if (isMicListening) {
            await this.stopSR();
            contextMenuTitle = "Start Speech Recognition tool";
          } else {
            await this.startSR();
            contextMenuTitle = "Stop Speech Recognition tool";
          }
          chrome.contextMenus.update(
            this.startStopSRContextMenu,
            {
              title: contextMenuTitle
            },
            () => {}
          );
        }
      });
    }
  };
  /**
   * Chrome startup initializations
   *
   * @method
   * @memberof Main
   */
  startUpInit() {
    /** event fires when chrome starts */
    chrome.runtime.onStartup.addListener(async () => {
      /** open option page to listen to speech commands if option is enabled */
      const { alwaysOpen } = await db.get("alwaysOpen");
      if (alwaysOpen) {
        await this.startSR();
      }
    });
  }
}

new Main();
