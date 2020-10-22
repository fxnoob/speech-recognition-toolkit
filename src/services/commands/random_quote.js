/* eslint-disable no-unused-vars,no-console */
import quoteService from '../quoteService';
export default async langId => {
  const commandAlias = 'random quote';
  const description = "Say 'Random quote' to type a random quote in highlighted text box on webpage";
  return {
    name: commandAlias,
    description: description,
    match: "exact",
    exec: async (text, options, callback) => {
      const quote = await quoteService.getQuote();
      const { dom } = options;
      try {
        dom.simulateWordTyping(quote);
      } catch (e) {
        console.log(e);
      }
      callback();
    }
  };
};
