/* eslint-disable no-unused-vars */
import translationService from "../translationService";
import WebsiteNames from "../popular_websites_files/en";
import chromeService from "../chromeService";
import { validURL } from "../helper";
export default async langId => {
  const commandAlias = await translationService.getMessage(
    langId,
    "command_go_to_label"
  ); // go to
  const commandAlias2 = await translationService.getMessage(
    langId,
    "command_go_to_label2"
  ); // visit
  const commandAlias3 = await translationService.getMessage(
    langId,
    "command_go_to_label3"
  ); // open
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
    match: [commandAlias, commandAlias2, commandAlias3],
    exec: async (text, options, callback) => {
      let url;
      if (text == 'new tab') {
        url = 'about:newtab/';
      }
      else if (validURL(text)) {
        url = `https://${text}`;
      } else {
        url = WebsiteNames[text]
          ? `https://${WebsiteNames[text]}`
          : `https://www.google.com/search?q=${text}`;
      }
      chromeService.openUrl(url);
      callback();
    }
  };
};
