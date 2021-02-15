/* eslint-disable no-unused-vars */
import MessagePassing from "../messagePassing";
const { DateTime } = require("luxon");
const parseHumanRelativeTime = require("parse-human-relative-time")(DateTime);

export default async langId => {
  const commandAlias = "remind me";
  const description =
    "Say 'remind me in 9 minutes' to set a reminder for 9 minutes.";
  return {
    id: "CB056517-63D9-B551-8511-11E80088C8EF",
    name: commandAlias,
    description: description,
    match: "startsWith",
    exec: async (text, options, callback) => {
      // handle reminder logic.
      let message;
      let commandContent = text
        .replace(commandAlias, "")
        .toLowerCase()
        .trim();
      commandContent = commandContent.replace("after", "in");
      const dt = DateTime.now();
      try {
        const timeStamp = parseHumanRelativeTime(commandContent, dt).ts;
        MessagePassing.sendMessage("/set_alarm", { timeStamp: timeStamp });
        message = "Timer has been set!";
      } catch (e) {
        message = "Can't set timer!";
      }
      callback(message);
    }
  };
};
