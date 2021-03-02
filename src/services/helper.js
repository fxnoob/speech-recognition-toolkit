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
function validURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

export {
  asyncTryCatch,
  getNamespace,
  validURL
};
