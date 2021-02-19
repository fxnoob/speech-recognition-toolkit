/* eslint-disable no-unused-vars */
import guid from "../guid";
const { DateTime } = require("luxon");
const parseHumanRelativeTime = require("parse-human-relative-time")(DateTime);

export default async langId => {
  const commandAlias = "remind me";
  const description =
    "Say 'remind me in 9 minutes' to set a reminder for 9 minutes.";
  return {
    id: "CB056517-63D9-B551-8511-11E80088C8EF",
    type: 'backend',
    name: commandAlias,
    description: description,
    condition: "startsWith",
    match:[commandAlias],
    exec: async (text, options, callback) => {
      let message;
      text = text.replace("after", "in");
      const dt = DateTime.now();
      try {
        const timeStamp = parseHumanRelativeTime(text, dt).ts;
        const alarmName = guid.generateGuid();
        chrome.alarms.create(alarmName, {
          when: timeStamp
        });
        message = "Timer has been set!";
      } catch (e) {
        message = "Can't set timer!";
      }
      callback(message);
    }
  };
};
