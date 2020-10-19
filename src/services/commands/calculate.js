/* eslint-disable no-unused-vars */
import * as math from "mathjs";
export default async langId => {
  const commandAlias = "calculate";
  const description = "say `calculate five times 15` to calculate 5 * 15";
  return {
    name: commandAlias,
    description: description,
    match: "startsWith",
    exec: async (text, options, callback) => {
      const symbols = {
        x: "*",
        multiplies: "*",
        multiply: "*",
        times: "*",
        plus: "+",
        minus: "-",
        divides: "/",
        divide: "/",
        "divides by": "/",
        "divide by": "/"
      };
      let commandContent = text
        .replace(commandAlias, "")
        .toLowerCase()
        .trim();
      Object.keys(symbols).map(key => {
        commandContent = commandContent.replace(key, symbols[key]);
      });
      const { dom } = options;
      try {
        const res = math.evaluate(commandContent);
        dom.simulateWordTyping(` ${res}`);
      } catch (e) {
        dom.simulateWordTyping(text);
      }
    }
  };
};
