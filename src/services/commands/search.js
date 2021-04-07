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
  const alias3 = await translationService.getMessage(langId, "youtube_label"); // youtube
  const description = await translationService.getMessage(
    langId,
    "command_search_description"
  );
  return {
    id: "2B6A9F64-1300-3A56-69AE-7BA38AFA06A8",
    type: "backend",
    name: commandAlias,
    description: description,
    condition: "startsWith",
    match: [commandAlias, commandAlias2, alias3],
    exec: async (text, options, callback) => {
      const { originalText } = options;
      // starts with youtube
      if (originalText.startsWith(alias3)) {
        chromeService.openUrl(
          `https://www.youtube.com/results?search_query=${text}`
        );
      } else {
        const activeTab = await chromeService.tryGetActiveTab();
        const url = activeTab ? activeTab.url : null;
        if (url.match(/.*\.youtube\.com/)) {
          chrome.tabs.update({
            url: `https://www.youtube.com/results?search_query=${text}`
          });
        } else if (url.match(/.*\.wikipedia\.com/)) {
          chrome.tabs.update({
            url: `https://wikipedia.org/w/index.php?search==${text}`
          });
        } else {
          chromeService.openUrl(`https://www.google.com/search?q=${text}`);
        }
      }
      callback();
    }
  };
};
