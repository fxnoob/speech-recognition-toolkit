/* eslint-disable no-unused-vars */
import translationService from "../translationService";
import chromeService from "../chromeService";
export default async langId => {
  const commandAlias = await translationService.getMessage(
    langId,
    "command_search_label"
  ); // search
  const commandAlias2 = await translationService.getMessage(
    langId,
    "command_search_label2"
  ); // google
  const description = await translationService.getMessage(
    langId,
    "command_search_description"
  );
  return {
    id: "59A7532E-805F-8882-A6F1-6BF822E96612",
    type: "backend",
    name: commandAlias,
    description: description,
    condition: "startsWith",
    match: [commandAlias, commandAlias2],
    exec: async (text, options, callback) => {
      chromeService.openUrl(`https://www.google.com/search?q=${text}`);
      callback();
    }
  };
};
