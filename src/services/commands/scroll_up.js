import translationService from "../translationService";
export default async langId => {
  const commandAlias = await translationService.getMessage(langId, "scroll_up_label");
  const description = await translationService.getMessage(
    langId,
    "command_scroll_up_description"
  );
  return {
    id: '689E0658-F5CB-10CF-A4AA-D43D144DB98D',
    type: 'frontend',
    name: commandAlias,
    description: description,
    condition: "exact",
    match: [commandAlias],
    exec: async () => {
      window.scrollBy(0, -100);
    }
  };
};
