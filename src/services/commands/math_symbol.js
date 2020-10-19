/* eslint-disable no-unused-vars */
import symbols from "../math_symbol_files/en";
export default async langId => {
  const commandAlias = "math symbol";
  const description = "say 'math symbol square root' to type √a (math symbol). checkout whole list of symbols from link given on homepage";
  return {
    name: commandAlias,
    description: description,
    match: "startsWith",
    exec: async (text, options, callback) => {
      let commandContent = text
        .replace(commandAlias, "")
        .toLowerCase()
        .trim();
      const { dom } = options;
      const symbolRes = symbols[commandContent];
      if (symbolRes) {
        dom.simulateWordTyping(` ${symbolRes}`);
      } else {
        dom.simulateWordTyping(text);
      }
    }
  };
};
