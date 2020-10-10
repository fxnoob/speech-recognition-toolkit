export default langId => {
  const commandAlias = "Press Enter".message;
  console.log({ commandAlias });
  return {
    name: commandAlias,
    match: "exact",
    exec: async (text, options, callback) => {
      const { dom } = options;
      dom.simulateWordTyping("\n\r");
    }
  };
};
