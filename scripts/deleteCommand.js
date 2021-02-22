/* eslint-disable no-console */
import arg from "arg";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import isVarName from "is-var-name";
import mockery from "mockery";
import fakeTranslationService from "./fakeTranslationService";
import { deleteLocales } from "./delete_locales";

const jsonfile = require("jsonfile");
function parseArgsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--filename": String,
      "--uninstall": Boolean
    },
    {
      argv: rawArgs.slice(2)
    }
  );
  return {
    filename: args["--filename"] || null,
    uninstall: args["--uninstall"] || null
  };
}
function isNull(val) {
  return val == null;
}
async function promptForMissingOptions(options) {
  const validateInput = propName => value => {
    if (value == "") return `${propName} can't be Empty!`;
    if (propName == "filename") {
      return new Promise((resolve, reject) => {
        if (!isVarName(value) || value == '_registry') {
          reject("File name is not Allowed");
        } else {
          const commandFilePath = path.join(
            __dirname,
            `../src/services/commands/${value}.js`
          );
          fs.existsSync(commandFilePath)
            ? resolve(true)
            : reject("Command file does not exist!");
        }
      });
    } else {
      return true;
    }
  };
  const questions = [];
  if (isNull(options.filename)) {
    questions.push({
      type: "input",
      name: "filename",
      validate: validateInput("filename"),
      message: "Please type Command file name (without extension):"
    });
  }
  if (isNull(options.uninstall)) {
    questions.push({
      type: "confirm",
      name: "uninstall",
      default: false,
      message: "do you really want to delete this command file?"
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    filename: options.filename || answers.filename,
    uninstall: options.uninstall || answers.uninstall
  };
}
async function getCommandContent(options) {
  const fakeTranslationFilePath = path.join(
    __dirname,
    "./fakeTranslationService"
  );
  const commandFilePath = path.join(
    __dirname,
    `../src/services/commands/${options.filename}.js`
  );
  mockery.registerAllowable(commandFilePath);
  // Register our mock for 'fake_module', using the path that 'intermediary'
  // will use to 'require' it. This tells mockery to provide our mock any
  // time this path is passed to 'require'.
  mockery.registerSubstitute(
    "../translationService",
    `${fakeTranslationFilePath}`
  );
  mockery.registerSubstitute("./chromeService", `${fakeTranslationFilePath}`);
  //mockery.registerSubstitute('./helper', `${fakeTranslationFilePath}`);

  mockery.registerMock(`../translationService`, fakeTranslationService);
  mockery.registerMock(`chromeService`, {});
  mockery.registerMock(`translation.worker`, {});
  mockery.registerMock(`./helper`, { asyncTryCatch: () => {} });
  mockery.registerMock("chrome", {
    chrome: {}
  });
  // Enable mockery and tell it to use a clean cache. By using a clean cache,
  // Node will reload 'intermediary', causing it in turn to re-require its
  // 'fake_module' dependency, at which point mockery will provide our mock.
  // Without the clean cache, 'intermediary' will not be reloaded, because
  // Node knows it is already loaded (and cached). This means that mockery
  // has no opportunity to provide the mock, since 'fake_module' was already
  // loaded by 'intermediary' and will not be re-required.
  mockery.enable({
    useCleanCache: true,
    warnOnReplace: false,
    warnOnUnregistered: false
  });
  const intermediary = require(commandFilePath).default;
  const result = await intermediary("en");
  // Now that we're done with our test, we need to disable mockery so that it
  // doesn't continue intercepting 'require' calls from, for example, a test
  // framework.
  mockery.disable();
  // Finally, we clean up by deregistering the mock and allowable that we
  // registered at the beginning of the test.
  mockery.deregisterAll();
  return {
    cmd: result,
    locales: fakeTranslationService.locales
  };
}
function deleteCommandsConfig(commandId) {
  const filePath = path.join(__dirname, "../commandsConfig.json");
  const commandsConfigJson = jsonfile.readFileSync(filePath);
  delete commandsConfigJson[commandId];
  jsonfile.writeFileSync(filePath, commandsConfigJson, { flag: "w" });
}
function updateBaseLocaleEnJsonFile(locales) {
  const BaseLocaleEnJsonFilePath = path.join(__dirname, 'locale_en.json');
  const baseLocaleJson = jsonfile.readFileSync(BaseLocaleEnJsonFilePath);
  for (const loc of locales) {
    delete baseLocaleJson[loc.key];
  }
  jsonfile.writeFileSync(BaseLocaleEnJsonFilePath, baseLocaleJson, { flag: "w" });
}
async function deleteCommand(options) {
  const { locales, cmd } = await getCommandContent(options);
  /** now delete command entry from commandsConfig.json */
  await deleteCommandsConfig(cmd.id);
  /** now delete locales if available */
  if (locales.length > 0) {
    console.log(locales, cmd);
    updateBaseLocaleEnJsonFile(locales); // update locale_en.json file
    deleteLocales(locales); // update other locale json files in app/_locales dir
  }
}
export async function cli(args) {
  let options = parseArgsIntoOptions(args);
  options = await promptForMissingOptions(options);
  if (options.uninstall) {
    await deleteCommand(options);
  }
}
