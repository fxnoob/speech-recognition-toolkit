import "@babel/polyfill";
import db, { schema } from "./services/db";
import voice from "./services/voiceService";
import chromeService from "./services/chromeService";
import Routes from "./routes";

class Main {
  constructor() {
    this.startStopSRContextMenu = null;
    this.init();
  }
  /**
   * init method
   *
   * @method
   * @memberof Main
   */
  init = async () => {
    await this.initDb();
    this.mountCSOnActiveTabOnlyOnce();
    this.onTabChangeInit();
    await this.initContextMenu();
    await Routes(voice, {
      startStopSRContextMenu: this.startStopSRContextMenu
    });
    this.startUpInit({
      startStopSRContextMenu: this.startStopSRContextMenu
    });
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
      await db.set({ loaded: true, ...schema.data });
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
   * mount content script on active tab
   *
   * @method
   * @memberof Main
   */
  mountCSOnActiveTabIfNotMountedAlready = async () => {
    /***
     * load content script if not laoded already
     */
    chromeService.sendMessageToActiveTab({ path: "/cs_mounted" }, async res => {
      if (!(res && res.mounted)) {
        const activeTab = await chromeService.getActiveTab();
        chrome.tabs.executeScript(activeTab.id, {
          file: "content_script.bundle.js"
        });
      }
    });
  };
  /**
   * mount content script on active tab only once
   *
   * @method
   * @memberof Main
   */
  mountCSOnActiveTabOnlyOnce = async () => {
    const { mountedCSOnActiveTabOnlyOnce } = await db.get(
      "mountedCSOnActiveTabOnlyOnce"
    );
    if (!mountedCSOnActiveTabOnlyOnce) {
      this.mountCSOnActiveTabIfNotMountedAlready();
      await db.set({ mountedCSOnActiveTabOnlyOnce: true });
    }
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
          const { state } = await voice.permissionGranted();
          if (state != "granted") {
            chromeService.openHelpPage();
          } else {
            let contextMenuTitle = "";
            const { isMicListening } = await db.get("isMicListening");
            if (isMicListening) {
              await this.stopSR();
              contextMenuTitle = "Start Speech Recognition Toolkit";
            } else {
              await this.startSR();
              contextMenuTitle = "Stop Speech Recognition Toolkit";
            }
            chrome.contextMenus.update(
              this.startStopSRContextMenu,
              {
                title: contextMenuTitle
              },
              () => {}
            );
          }
        }
      });
    }
  };
  /**
   * Listens for tab change
   * helpful for checking if content script was mounted or not
   * mount content script if not mounted already
   *
   * @method
   * @memberof Main
   */
  onTabChangeInit = () => {
    chrome.tabs.onActivated.addListener(activeInfo => {
      this.mountCSOnActiveTabIfNotMountedAlready();
    });
  };
  /**
   * Chrome startup initializations
   *
   * @method
   * @memberof Main
   */
  startUpInit(contextMenus) {
    /** event fires when chrome starts */
    chrome.runtime.onStartup.addListener(async () => {
      console.log("onStartup called");
      /** open option page to listen to speech commands if option is enabled */
      const { alwaysOpen } = await db.get("alwaysOpen");
      if (alwaysOpen) {
        await this.startSR();
      } else {
        chromeService.setBadgeOnActionIcon("");
      }
    });
    chrome.windows.onCreated.addListener(async () => {
      chrome.windows.getAll(async windows => {
        if (windows.length == 1) {
          const { alwaysOpen, isMicListening } = await db.get(
            "alwaysOpen",
            "isMicListening"
          );
          console.log(alwaysOpen, isMicListening);
          if (alwaysOpen) {
            await this.startSR();
            const { startStopSRContextMenu } = contextMenus;
            const contextMenuTitle = alwaysOpen
              ? "Stop Speech Recognition tool"
              : "Start Speech Recognition tool";
            chrome.contextMenus.update(
              startStopSRContextMenu,
              {
                title: contextMenuTitle
              },
              () => {}
            );
          } else if (!isMicListening) {
            chromeService.setBadgeOnActionIcon("");
          }
        }
      });
    });
  }
}

new Main();
