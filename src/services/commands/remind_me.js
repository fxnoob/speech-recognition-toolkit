/* eslint-disable no-unused-vars */
export default async langId => {
  const commandAlias = "remind me";
  const description =
    "Say remind me in 9 minutes to set a reminder for 9 minutes.";
  return {
    id: "CB056517-63D9-B551-8511-11E80088C8EF",
    name: commandAlias,
    description: description,
    match: "startsWith",
    exec: async (text, options, callback) => {
      // handle reminder logic.
    }
  };
};
