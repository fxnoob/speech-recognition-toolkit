import translationService from "../translationService";
import tabNavigation from '../tabNavigationService';

export default async langId => {
  const commandAlias = await translationService.getMessage(
    langId,
    "label_next"
  );
  const description = await translationService.getMessage(
    langId,
    "command_next_description"
  );
  return {
    name: commandAlias,
    description: description,
    match: "exact",
    exec: async () => {
      tabNavigation.navigate('Right');
    }
  };
};
