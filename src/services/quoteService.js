import MessagePassing from "./messagePassing";

class QuotesService {
  constructor() {}
  getQuote() {
    return new Promise(resolve => {
      MessagePassing.sendMessage(
        "/get_quote",
        {},
        res => {
          resolve(res.quote);
        }
      );
    });
  }
}
const quotes = new QuotesService();
export default quotes;
