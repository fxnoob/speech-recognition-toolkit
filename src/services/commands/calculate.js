/* eslint-disable no-unused-vars */
import * as math from "mathjs";
const parse = content => {
  const parser = math.parser();
  parser.set('pow', (numStr, powerStr) => {
    const power = parseInt(powerStr);
    const num = parseInt(numStr);
    return Math.pow(num, power);
  });
  parser.set('hcos', (numStr) => {
    const num = parseInt(numStr);
    return Math.cosh(num);
  });
  parser.set('hsin', (numStr) => {
    const num = parseInt(numStr);
    return Math.sinh(num);
  });
  parser.set('percentOf', (numStr, percentStr) => {
    const num = parseInt(numStr);
    const percent = parseInt(percentStr);
    return num * percent / 100;
  });
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
    "divide by": "/",
    inches: "inch",
    centimeter: "cm",
    centimeters: "cm",
    degree: "deg",
    pie: Math.PI,
    pi: Math.PI
  };
  Object.keys(symbols).map(key => {
    content = content.replace(key, symbols[key]);
  });
  const regexes = [
    { match: /(\w+) percent of (\w+)/, replacement: "percentOf($2, $1)" },
    { match: /hyperbolic cosine of (\w+)/, replacement: "hcos($1)" },
    { match: /hyperbolic sine of (\w+)/, replacement: "hsin($1)" },
    { match: /inverse cosine of (\w+)/, replacement: "acos($1)" },
    { match: /inverse sine of (\w+)/, replacement: "asin($1)" },
    { match: /cosine of (\w+)/, replacement: "cos($1)" },
    { match: /sine of (\w+)/, replacement: "sin($1)" },
    { match: /sign of (\w+)/, replacement: "sin($1)" },
    { match: /log of (\w+)/, replacement: "log($1)" },
    { match: /logarithm of (\w+)/, replacement: "log($1)" },
    { match: /absolute of (\w+)/, replacement: "abs($1)" },
    { match: /square of (\w+)/, replacement: "$1 * $1" },
    { match: /square root of (\w+)/, replacement: "sqrt($1)" },
    { match: /cube of (\w+)/, replacement: "$1 * $1 * $1" },
    { match: /cube root of (\w+)/, replacement: "pow($1, 1/3)" },
    { match: /(\w+)% of (\w+)/, replacement: "percentOf($2, $1)" },
  ];
  regexes.map(regex => {
    content = content.replace(regex.match, regex.replacement);
  });
  return parser.evaluate(content);
};
export default async langId => {
  const commandAlias = "calculate";
  const description = "say `calculate five times 15` to calculate 5 * 15";
  return {
    id: '20850A52-2A46-42A2-BED5-35F9E9B55344',
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
        "divide by": "/",
        inches: "inch",
        centimeter: "cm",
        centimeters: "cm",
        degree: "deg"
      };
      let commandContent = text
        .replace(commandAlias, "")
        .toLowerCase()
        .trim();
      Object.keys(symbols).map(key => {
        commandContent = commandContent.replace(key, symbols[key]);
      });
      const { dom, ackId } = options;
      try {
        const res = parse(commandContent);
        dom.simulateWordTyping(` ${res}`, ackId);
        const responseText = `${commandContent} = ${res}`;
        callback(responseText);
      } catch (e) {
        dom.simulateWordTyping(` ${text}`, ackId);
      }
    }
  };
};
