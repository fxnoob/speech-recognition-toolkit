import voice from "./voiceService";

const permissionGranted = async () => {
  const { state } = await voice.permissionGranted();
  return state == "granted";
};

export { permissionGranted };
