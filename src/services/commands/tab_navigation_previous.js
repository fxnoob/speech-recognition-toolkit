import translationService from "../translationService";
import tabNavigation from '../tabNavigationService';

export default async langId => {
  const commandAlias = await translationService.getMessage(
    langId,
    "label_previous"
  );
  const description = await translationService.getMessage(
    langId,
    "command_previous_description"
  );
  return {
    id: 'DF6E48B2-3372-3A06-C801-E964B7F73AD3',
    type: 'frontend',
    name: commandAlias,
    description: description,
    condition: "exact",
    match: [commandAlias],
    exec: async () => {
      tabNavigation.navigate('Left');
    }
  };
};
