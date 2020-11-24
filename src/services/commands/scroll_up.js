import translationService from "../translationService";
export default async langId => {
  const commandAlias = await translationService.getMessage(langId, "scroll_up_label");
  const description = await translationService.getMessage(
    langId,
    "command_scroll_up_description"
  );
  return {
    name: commandAlias,
    description: description,
    match: "exact",
    exec: async () => {
      window.scrollBy(0, -100);
    }
  };
};
