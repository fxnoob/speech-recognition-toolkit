import db from "./services/db";
import MessagePassing from "./services/messagePassing";

const Routes = async (voice, contextMenus) => {
  voice.addCommand({
    "*text": text => {
      MessagePassing.sendMessageToActiveTab("/sr_text", { text }, () => {});
    }
  });
  // save selected text in storage instead writing it to clipboard
  MessagePassing.on("/set_selected_text", async (req, res, options) => {
    const { data } = req;
    await db.set({ data: data });
  });
  //retrieve stored data
  MessagePassing.on("/get_data", async (req, res, options) => {
    const data = await db.get("data");
    res(data);
  });
  //send speech recognition data
  MessagePassing.on("/start_speech_recognition", async (req, res, options) => {
    const { state } = await voice.permissionGranted();
    if (state == "granted") {
      const { defaultLanguage } = await db.get("defaultLanguage");
      voice.setLanguage(defaultLanguage.code);
      voice.start();
    } else {
      // send to help page
    }
  });
  //stop speech recognition
  MessagePassing.on("/stop_speech_recognition", async (req, res, options) => {
    voice.stop();
  });
  //toggle speech recognition
  MessagePassing.on("/toggle_sr", async (req, res, options) => {
    let contextMenuTitle = "";
    const { startStopSRContextMenu } = contextMenus;
    console.log({ startStopSRContextMenu });
    const { isMicListening } = await db.get("isMicListening");
    if (isMicListening) {
      voice.stop();
      contextMenuTitle = "Start Speech Recognition tool";
    } else {
      const { defaultLanguage } = await db.get("defaultLanguage");
      voice.setLanguage(defaultLanguage.code);
      voice.start();
      contextMenuTitle = "Stop Speech Recognition tool";
    }
    await db.set({ isMicListening: !isMicListening });
    chrome.contextMenus.update(
      startStopSRContextMenu,
      {
        title: contextMenuTitle
      },
      () => {}
    );
    res({ isMicListening: !isMicListening });
  });
  //restart speech recognition
  MessagePassing.on("/restart_sr", async (req, res, options) => {
    const { defaultLanguage, isMicListening } = await db.get(
      "defaultLanguage",
      "isMicListening"
    );
    if (isMicListening) {
      voice.stop();
      voice.setLanguage(defaultLanguage.code);
      voice.start();
    }
  });
};

export default Routes;
