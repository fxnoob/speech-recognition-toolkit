import db from "./services/db";
import MessagePassing from "./services/messagePassing";

const Routes = async (voice, contextMenus) => {
  voice.addCommand({
    "*text": async text => {
      const { defaultLanguage } = await db.get("defaultLanguage");
      const payload = {
        text,
        langId: defaultLanguage.code
      };
      MessagePassing.sendMessageToActiveTab("/sr_text", payload, () => {});
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
      contextMenuTitle = "Start Speech Recognition Toolkit";
    } else {
      const { defaultLanguage } = await db.get("defaultLanguage");
      voice.setLanguage(defaultLanguage.code);
      voice.start();
      contextMenuTitle = "Stop Speech Recognition Toolkit";
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
  //speak sr sound
  MessagePassing.on("/speak_sr", async (req, res, options) => {
    const { text } = req;
    const { defaultLanguage } = await db.get("defaultLanguage");
    voice.speak(text, { lang: defaultLanguage.code });
  });
  // get mountAckId
  MessagePassing.on("/get_cs_mountAck", async (req, res, options) => {
    const { mountAckId } = await db.get("mountAckId");
    res({ mountAckId });
  });
};

export default Routes;
