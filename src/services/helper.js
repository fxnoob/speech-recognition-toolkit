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
  return typeof chrome == "undefined" ? {} : chrome;
}
function validURL(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}
// generate guid
const generateGuid = () => {
  var result, i, j;
  result = "";
  for (j = 0; j < 32; j++) {
    if (j == 8 || j == 12 || j == 16 || j == 20) result = result + "_";
    i = Math.floor(Math.random() * 16)
      .toString(16)
      .toUpperCase();
    result = result + i;
  }
  return result;
};
// get dom elements dimensions
function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

const getElementsDimensions = el => {

  const { clientHeight, clientWidth } = el;
  return {
    width: clientWidth,
    height: clientHeight,
    ...offset(el)
  };
};


//
// URL Matching test - to verify we can talk to this URL
//

const matches = ['http://*/*', 'https://*/*', 'ftp://*/*', 'file://*/*'],
  noMatches = [/^https?:\/\/chrome.google.com\/.*$/];

function isUrlAllowed(url) {
  // couldn't find a better way to tell if executeScript
  // wouldn't work -- so just testing against known urls
  // for now...
  var r, i;
  for (i = noMatches.length - 1; i >= 0; i--) {
    if (noMatches[i].test(url)) {
      return false;
    }
  }
  for (i = matches.length - 1; i >= 0; i--) {
    r = new RegExp('^' + matches[i].replace(/\*/g, '.*') + '$');
    if (r.test(url)) {
      return true;
    }
  }
  return false;
}
/**
 * Get scroll value of the page.
 * */
function getScroll() {
  if (window.pageYOffset != undefined) {
    return [pageXOffset, pageYOffset];
  } else {
    var sx, sy, d = document,
      r = d.documentElement,
      b = d.body;
    sx = r.scrollLeft || b.scrollLeft || 0;
    sy = r.scrollTop || b.scrollTop || 0;
    return [sx, sy];
  }
}
export {
  asyncTryCatch,
  getNamespace,
  validURL,
  generateGuid,
  offset,
  getElementsDimensions,
  isUrlAllowed,
  getScroll
};