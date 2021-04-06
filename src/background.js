import "@babel/polyfill";
import db, { schema } from "./services/db";
import voice from "./services/voiceService";
import chromeService from "./services/chromeService";
import messagePassing from "./services/messagePassing";
import Routes from "./routes";
import constants from "../constants";

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
    this.onInstallListener();
    await this.initDb();
    this.mountCSOnPreviouslyOpenedTabsOnlyOnce();
    await this.initContextMenu();
    this.setUpAlarmsListener();
    await Routes(voice, {
      startStopSRContextMenu: this.startStopSRContextMenu
    });
    this.startUpInit({
      startStopSRContextMenu: this.startStopSRContextMenu
    });
    this.shortcutKeysInit();
  };
  /**
   * initialize db settings
   *
   * @method
   * @memberof Main
   */
  initDb = async () => {
    const res = await db.get("__________loaded");
    if (!res.hasOwnProperty("__________loaded")) {
      await db.set({ __________loaded: true, ...schema.data });
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
   * mount content script on previously opened tabs
   *
   * @method
   * @memberof Main
   */
  mountCSOnPreviouslyOpenedTabsOnlyOnce = async () => {
    /***
     * load content script if not laoded already
     */
    const { mountedCsOnPreviouslyOpenedTabs } = await db.get(
      " mountedCsOnPreviouslyOpenedTabs"
    );

    if (mountedCsOnPreviouslyOpenedTabs) {
      chrome.tabs.query({}, result => {
        result.map(tabInfo => {
          messagePassing.sendMessageToTab(
            "/cs_mounted",
            tabInfo.id,
            {},
            async res => {
              if (!res) {
                chrome.tabs.executeScript(tabInfo.id, {
                  file: "content_script.bundle.js"
                });
              }
            }
          );
        });
      });
      db.set({ mountedCsOnPreviouslyOpenedTabs: true });
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
        onclick: async () => {
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
   * Chrome startup initializations
   *
   * @method
   * @memberof Main
   */
  startUpInit(contextMenus) {
    /** event fires when chrome starts */
    chrome.runtime.onStartup.addListener(async () => {
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
          if (alwaysOpen) {
            await this.startSR();
            const { startStopSRContextMenu } = contextMenus;
            const contextMenuTitle = alwaysOpen
              ? "Stop Speech Recognition toolkit"
              : "Start Speech Recognition toolkit";
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
  /**
   * Setup Alarms listener
   *
   * @method
   * @memberof Main
   */
  setUpAlarmsListener() {
    chrome.alarms.onAlarm.addListener(alarm => {
      chrome.notifications.create(
        alarm.name,
        {
          type: "basic",
          iconUrl: "images/icon.png",
          title: "Timer from Speech Recognition Toolkit",
          message: "Time up"
        },
        function() {}
      );
    });
  }
  /**
   * Initialize shortcut keys listener
   *
   *@method
   *@memberOf Main
   * */
  shortcutKeysInit = () => {
    chrome.commands.onCommand.addListener(command => {
      // eslint-disable-next-line no-console
      console.log({ command });
      if (command == "toggle-command-popup") {
        messagePassing.sendMessageToActiveTab(
          "/toggle_command_popup",
          {},
          () => {}
        );
      }
    });
  };
  /**
   *On install extension event
   *
   * @method
   * @memberOf Main
   * */
  onInstallListener = () => {
    chrome.runtime.onInstalled.addListener(() => {
      // details.reason for install method
      chromeService.openHelpPage("home");
      this.setFeedbackFormUrl();
    });
  };
  /**
   *set feedback form url shown while uninstalling
   *
   * @method
   * @memberOf Main
   * */
  setFeedbackFormUrl = () => {
    chrome.runtime.setUninstallURL(constants.support.googleFormLink);
  };
}

new Main();
