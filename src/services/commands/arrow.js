/* eslint-disable no-unused-vars */
export default async langId => {
  const commandAlias = "arrow";
  const description =
    "Say Arrow left to press arrow left key. possible commands -> arrow left , arrow right, arrow up, arrow down";
  return {
    id: "D7F4AFA8-8EA1-BC0F-6E19-D608FEBFAE6F",
    name: commandAlias,
    description: description,
    match: "startsWith",
    exec: async (text, options, callback) => {
      const { dom, ackId } = options;
      let commandContent = text
        .replace(commandAlias, "")
        .toLowerCase()
        .trim();
      const keyMapping = {
        left: 37,
        right: 39,
        up: 38,
        down: 40
      };
      if (keyMapping[commandContent]) {
        dom.simulateKeyPress(
          [keyMapping[commandContent], false, false, false],
          ackId
        );
      }
      callback();
    }
  };
};
