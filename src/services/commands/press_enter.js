import translationService from "../translationService";

export default async langId => {
  const commandAlias = "Press Enter";
  const description = await translationService.getMessage(
    langId,
    "command_press_enter_description"
  );
  return {
    id: '2C813AB6-109C-7BBE-50A5-B54CE1C30BD8',
    type: 'frontend',
    name: commandAlias,
    description: description,
    condition: "exact",
    match: [commandAlias],
    exec: async (text, options, callback) => {
      const { dom, ackId } = options;
      dom.simulateWordTyping("\n\r", ackId);
      callback();
    }
  };
};
