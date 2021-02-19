/* eslint-disable no-unused-vars */
import translationService from "../translationService";
import WebsiteNames from "../popular_websites_files/en";
import chromeService from "../chromeService";
const parseDomain = require("parse-domain");
export default async langId => {
  const commandAlias = await translationService.getMessage(
    langId,
    "command_go_to_label"
  );
  const description = await translationService.getMessage(
    langId,
    "command_go_to_description"
  );
  return {
    id: "59A7532E-805F-8882-A6F1-6BF822E96612",
    type: "backend",
    name: commandAlias,
    description: description,
    condition: "startsWith",
    match: [commandAlias, "visit", "open"],
    exec: async (text, options, callback) => {
      let url;
      const key = parseDomain(text, {
        customTlds: ["local", ".local"]
      });
      if (key) {
        url = text;
      } else {
        url = WebsiteNames[text]
          ? WebsiteNames[text]
          : `https://www.google.com/search?q=${text}`;
      }
      chromeService.openUrl(url);
      callback();
    }
  };
};
