/* eslint-disable no-unused-vars */
import symbols from "../math_symbol_files/en";
export default async langId => {
  const commandAlias = "math symbol";
  const description = "say 'math symbol square root' to type √a (math symbol). checkout whole list of symbols from link given on homepage";
  return {
    id: '3EC8A2EA-07B2-2612-A677-3FB0F5298D1D',
    type: 'frontend',
    name: commandAlias,
    description: description,
    condition: "startsWith",
    match: [commandAlias],
    exec: async (text, options, callback) => {
      const { dom, ackId } = options;
      const symbolRes = symbols[text];
      if (symbolRes) {
        dom.simulateWordTyping(` ${symbolRes}`, ackId);
      } else {
        dom.simulateWordTyping(` ${commandAlias} ${text}`, ackId);
      }
    }
  };
};
