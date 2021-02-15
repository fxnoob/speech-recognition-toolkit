/* eslint-disable no-unused-vars */
import translationService from "../translationService";
import MessagePassing from "../messagePassing";
import WebsiteNames from "../popular_websites_files/en";
export default async langId => {
  const commandAlias = await translationService.getMessage(langId, "command_go_to_label");
  const description = await translationService.getMessage(
    langId,
    "command_go_to_description"
  );
  return {
    id: "59A7532E-805F-8882-A6F1-6BF822E96612",
    name: commandAlias,
    description: description,
    match: "startsWith",
    exec: async (text, options, callback) => {
      let commandContent = text
        .replace(commandAlias, "")
        .toLowerCase()
        .trim();
      const url = WebsiteNames[commandContent] ? WebsiteNames[commandContent] : commandContent;
      MessagePassing.sendMessage("/go_to", { url });
      callback();
    }
  };
};
