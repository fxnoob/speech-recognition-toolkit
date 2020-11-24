import translationService from "../translationService";
import MindFulnessThoughtsContent from '../mindfulness_thought_files/tips';
const { tips } = MindFulnessThoughtsContent;
export default async langId => {
  const commandAlias = await translationService.getMessage(langId, "mindfulness_label");
  const description = await translationService.getMessage(
    langId,
    "command_mindfulness_description"
  );
  return {
    name: commandAlias,
    description: description,
    match: "exact",
    exec: async (text, options) => {
      const { dom } = options;
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      dom.simulateWordTyping(` ${randomTip}`);
    }
  };
};
