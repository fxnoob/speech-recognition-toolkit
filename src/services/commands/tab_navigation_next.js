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
    id: 'F109FA3D-F491-B974-7830-0E8BD62CC65B',
    type: 'frontend',
    name: commandAlias,
    description: description,
    condition: "exact",
    match: [commandAlias],
    exec: async () => {
      tabNavigation.navigate('Right');
    }
  };
};
