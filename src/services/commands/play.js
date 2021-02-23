/* eslint-disable no-unused-vars,no-console */
import ytSearch from "youtube-search";
import chromeService from "../chromeService";
import translationService from "../translationService";
export default async langId => {
  const alias0 = await translationService.getMessage(
    langId,
    "7044C9F2_FD3B_29AC_E1E4_7D0B18CA93B9"
  ); // play

  const description = await translationService.getMessage(
    langId,
    "05B91A69_8814_3B81_1332_6F72A3862DE3"
  ); // Say 'play song_name', it will play the song from youtube.

  return {
    id: "367D7C2A_149F_4062_F62D_C3825B487F09",
    type: "backend",
    name: "367D7C2A_149F_4062_F62D_C3825B487F09",
    description: description,
    condition: "startsWith",
    match: [alias0],
    exec: async (text, options, callback) => {
      // write your logic here.
      var opts = {
        maxResults: 10,
        key: process.env.youtube_data_api_key // .env stuff
      };
      ytSearch(text, opts, (err, results) => {
        if (err) return console.log(err);
        for (let el of results) {
          if (el.kind === "youtube#video") {
            chromeService.openUrl(el.link);
            break;
          }
        }
      });
    }
  };
};
