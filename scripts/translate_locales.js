const fs = require("fs");
const jsonfile = require("jsonfile");
const path = require("path");
const translateNG = require("node-google-translate-skidz");
const locales = [
  "ar",
  "am",
  "bg",
  "bn",
  " ca",
  " cs",
  " da",
  " de",
  " el",
  " en",
  " en_GB",
  " en_US",
  " es",
  " es_419",
  " et",
  "fa",
  " fi",
  " fil",
  " fr",
  "gu",
  " he",
  " hi",
  " hr",
  " hu",
  " id",
  " it",
  " ja",
  "kn",
  " ko",
  " lt",
  " lv",
  "ml",
  "mr",
  "ms",
  " nl",
  " no",
  " pl",
  " pt_BR",
  " pt_PT",
  " ro",
  " ru",
  " sk",
  " sl",
  " sr",
  " sv",
  "sw",
  "ta",
  "te",
  " th",
  " tr",
  " uk",
  " vi",
  " zh_CN",
  " zh_TW"
].map(locale => locale.trim());

const locale_en = jsonfile.readFileSync(path.join(__dirname, "locale_en.json"));

const target_dir_root = path.join(__dirname, "../src/app/_locales");

function sleep(miliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("");
    }, miliseconds);
  });
}

function createDirIfNotExist(dirname) {
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
}

async function translate(sourceEn, targetEn, text) {
  return new Promise((resolve, reject) => {
    try {
      translateNG(
        {
          text: text,
          source: sourceEn,
          target: targetEn
        },
        res => {
          resolve(res);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}
async function translateLocaleJsonToFile(targetEn, json) {
  console.log(json);
  const jsonObj = {};
  console.log("------translating locales for -> ", targetEn, "------------");
  const keys = Object.keys(json);
  for (let i = 0; i < keys.length; i++) {
    try {
      const message = json[keys[i]].message;
      const result = await translate("en", targetEn, message);
      console.log(
        targetEn,
        " ->  ",
        json[keys[i]].message,
        "   ->  ",
        result.translation
      );
      jsonObj[keys[i]] = {};
      jsonObj[keys[i]].message = result.translation;
      jsonObj[keys[i]].description = json[keys[i]].description;
    } catch (e) {
      console.log(e);
    }
  }
  createDirIfNotExist(path.join(target_dir_root, `/${targetEn}`));
  jsonfile.writeFileSync(
    path.join(target_dir_root, `/${targetEn}/messages.json`),
    jsonObj,
    { flag: "a+" }
  );
}

async function init() {
  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i];
    await translateLocaleJsonToFile(locale, locale_en);
    await sleep(3000);
  }
}
init();
