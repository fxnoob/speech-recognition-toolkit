/* eslint-disable no-unused-vars */
import en from './quotes_files/en';
const languages = {};
languages['en'] = en;

// currently support only english quotes
function getQuote(langId = 'en') {
  const randomIndex = Math.floor(Math.random() * 5420);
  return languages['en'][randomIndex];
}

// listens for command from quote service
self.addEventListener(
  "message",
  evt => {
    const { uid, action } = evt.data;
    if (action == "getQuote") {
      const quote = getQuote();
      self.postMessage({ uid, action, quote });
    }
  },
  false
);
