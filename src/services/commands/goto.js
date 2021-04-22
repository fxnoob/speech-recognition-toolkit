/* eslint-disable no-unused-vars,no-console */
import translationService from "../translationService";
import chromeService from "../chromeService";
import { validURL } from "../helper";
export default async langId => {
  const alias0 = await translationService.getMessage(
    langId,
    "397795DD_FAE6_7240_5F33_9CD70BB4CB60"
  ); // go to

  const alias1 = await translationService.getMessage(
    langId,
    "1387F5BE_4725_EF5C_41CF_E3953ED349B3"
  ); // visit

  const alias2 = await translationService.getMessage(
    langId,
    "D4FC52CF_441B_0D7C_6DCF_631CDB617102"
  ); // open

  const description = await translationService.getMessage(
    langId,
    "271F0428_E067_4BEB_90D6_8117EF8E7E29"
  ); // Say 'go to facebook.com' to open facebook.com in new tab. Say 'go to bookmark bookmark_name' to open bookmark url.

  const bookmarkLabel = await translationService.getMessage(
    langId,
    "bookmark_label"
  ); // bookmark
  return {
    id: "84EDED19_4A31_A778_5C2C_BFBF8F5D3FA1",
    type: "backend",
    name: "84EDED19_4A31_A778_5C2C_BFBF8F5D3FA1",
    description: description,
    condition: "startsWith",
    match: [alias0, alias1, alias2],
    exec: async (text, options, callback) => {
      // write your logic here.
      let url;
      if (text.startsWith(bookmarkLabel)) {
        // search in bookmarks to find a match
        const bookmarkSearchTerm = text.replace(bookmarkLabel, "");
        chromeService.bookmark.search(bookmarkSearchTerm, results => {
          let firstUrl;
          for (let res of results) {
            if (res['url']) {
              firstUrl = res.url;
              break;
            }
          }
          if (firstUrl) {
            chromeService.openUrl(firstUrl);
          }
        });
      } else if (text == "new tab") {
        url = "about:newtab/";
      } else if (validURL(text)) {
        url = `https://${text}`;
      } else {
        url = `https://www.google.com/search?q=${text}`;
      }
      chromeService.openUrl(url);
      callback();
    }
  };
};
