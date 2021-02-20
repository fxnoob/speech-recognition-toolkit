/* eslint-disable no-unused-vars,no-console */
import translationService from "../translationService";
import chromeService from "../chromeService";

export default async langId => {
  const commandAlias = await translationService.getMessage(
    langId,
    "command_bookmark_label"
  ); // bookmark
  const commandAlias2 = await translationService.getMessage(
    langId,
    "command_bookmark_label_bookmark_this_page"
  ); // bookmark this page
  const commandAlias3 = await translationService.getMessage(
    langId,
    "command_bookmark_label_remove_bookmark"
  ); // remove bookmark
  const commandAlias4 = await translationService.getMessage(
    langId,
    "command_bookmark_label__remove_this_bookmark"
  ); // remove this bookmark
  const description = await translationService.getMessage(
    langId,
    "command_bookmark_description"
  );
  const addCallbackLabel = await translationService.getMessage(
    langId,
    "command_bookmark_add_callback_label"
  );
  const removeCallbackLabel = await translationService.getMessage(
    langId,
    "command_bookmark_remove_callback_label"
  );
  return {
    id: "448838E8-1E72-75AD-101E-C129E2FD5DF0",
    type: "backend",
    name: commandAlias,
    description: description,
    condition: "exact",
    match: [commandAlias, commandAlias2, commandAlias3, commandAlias4],
    exec: async (text, options, callback) => {
      const { originalText } = options;
      if (originalText == commandAlias || originalText == commandAlias2) {
        await chromeService.bookmark.create();
        callback(addCallbackLabel);
      }
      if (originalText == commandAlias3 || originalText == commandAlias4) {
        await chromeService.bookmark.remove();
        callback(removeCallbackLabel);
      }
    }
  };
};
