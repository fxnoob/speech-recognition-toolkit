/* eslint-disable no-unused-vars */
import translationService from "../translationService";
class Media {
  constructor(document) {
    this.document = document;
    this.muted = [];
  }
  muteElement = elem => {
    if (!elem.muted) {
      elem.muted = true;
      elem.pause();
      this.muted.push(elem);
    }
  };
  mutePage = () => {
    const elems = this.document.querySelectorAll("video, audio");
    [].forEach.call(elems, elem => {
      this.muteElement(elem);
    });
  };
  unmutePage = () => {
    this.muted.map(elem => {
      elem.muted = false;
      elem.play();
    });
    this.muted = [];
  };
}
const doc = typeof document != "undefined" ? document: {};
const media = new Media(doc);
export default async langId => {
  const alias0 = await translationService.getMessage(
    langId,
    "108BD80B_47F6_96D2_CAE2_43739E644500"
  ); // play

  const alias1 = await translationService.getMessage(
    langId,
    "57BB71A6_90C4_5E51_FE73_455E384FCF3D"
  ); // pause

  const alias2 = await translationService.getMessage(
    langId,
    "49CA7B9A_8C37_5814_AC6E_A60DC98E518B"
  ); // mute

  const alias3 = await translationService.getMessage(
    langId,
    "9A0E1997_65B1_2B3E_1415_B6F083DBC426"
  ); // unmute

  const description = await translationService.getMessage(
    langId,
    "239D85D7_8DB9_6DD6_2F9E_ED0E5D6511B9"
  ); // control media (audio and video) on the page.

  return {
    id: "FFF2CBFF_9D2D_7747_2E51_09F529136F9F",
    type: "frontend",
    name: "FFF2CBFF_9D2D_7747_2E51_09F529136F9F",
    description: description,
    condition: "exact",
    match: [alias0, alias1, alias2, alias3],
    exec: async (text, options, callback) => {
      // write your logic here.
      const { originalText } = options;
      if (originalText == alias0 || originalText == alias3) {
        // play or unmute
        media.unmutePage();
      } else if (originalText == alias1 || originalText == alias2) {
        // pause or mute
        media.mutePage();
      }
    }
  };
};
