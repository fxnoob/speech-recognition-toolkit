import chromeService from "./chromeService";

class MessagePassing {
  constructor() {
    this.routes = {};
    this.options = {};
    this.listenerMode = true;
    this.addListener();
  }
  setListenerMode(mode) {
    this.listenerMode = mode;
  }
  setOptions(options) {
    this.options = options;
  }
  on(path, callback) {
    this.routes[path] = callback;
  }
  addListener() {
    chrome.runtime.onMessage.addListener((req, sender, res) => {
      if (!this.listenerMode) return;
      try {
        this.routes[req.path](req, res, this.options);
      } catch (e) {
        /* eslint-disable no-console */
        console.log(e);
        console.log({ path: req.path });
        /* eslint-enable no-console */
      }
      return true;
    });
  }
  sendMessage(path, payload, callback) {
    const data = payload;
    data.path = path;
    chrome.runtime.sendMessage(data, callback);
  }
  async sendMessageToActiveTab(path, payload, callback) {
    const data = payload;
    data.path = path;
    await chromeService.sendMessageToActiveTab(data, callback);
  }
  async sendMessageToTab(path, id, payload, callback) {
    const data = payload;
    data.path = path;
    await chromeService.sendMessageToTab(id, data, callback);
  }
}

const mp = new MessagePassing();

export default mp;
