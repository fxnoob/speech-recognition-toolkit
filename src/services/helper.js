async function asyncTryCatch(func, ...args) {
  let data = null;
  try {
    data = await func(...args);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log({ e });
  }
  return data;
}
function getNamespace() {
  return typeof chrome == 'undefined'? {} : chrome;
}
export {
  asyncTryCatch,
  getNamespace
};
