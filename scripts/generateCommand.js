/* eslint-disable no-console */
import arg from "arg";
import inquirer from "inquirer";
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import guid from "../src/services/guid";
import { translateLocales } from "./translate_locales";
var execSh = require("exec-sh").promise;
const jsonfile = require("jsonfile");

function generateIdNamesMatchDescription(options) {
  const id = guid.generateGuid();
  if (!options.multilingual) {
    let i = 0;
    const match = [];
    const commandAliasStatements = options.names.split(',').map(name => name.toLowerCase().trim()).map(name =>{
      const al = ` alias${i++}`;
      match.push(al);
      return `
      const ${al} = "${name}"; // ${name}
      `;
    });
    const commandDescriptionStatement = `
const description = "${options.description}"; // ${options.description}
    `;
    return {
      id: id,
      name: id,
      commandAliasStatement: commandAliasStatements.join('\n'),
      commandDescriptionStatement: commandDescriptionStatement,
      match: match,
      description: 'description',
      locales: null
    };
  } else {
    const locales = [];
    let i = 0;
    const match = [];
    const commandAliasStatements = options.names.split(',').map(name => name.toLowerCase().trim()).map(name =>{
      const al = ` alias${i++}`;
      const localeKey = guid.generateGuid();
      locales.push({
        key : localeKey,
        message: name,
        description: `command ${name} alias`
      });
      match.push(al);
      return ` const ${al} = await translationService.getMessage(langId, "${localeKey}"); // ${name}
      `;
    });
    const cmdDescLocaleKey = guid.generateGuid();
    const commandDescriptionStatement = `
const description = await translationService.getMessage(langId, "${cmdDescLocaleKey}"); // ${options.description}
    `;
    locales.push({
      key: cmdDescLocaleKey,
      message: options.description,
      description: `command ${options.description} alias`
    });
    return {
      id: id,
      name: id,
      commandAliasStatement: commandAliasStatements.join('\n'),
      commandDescriptionStatement: commandDescriptionStatement,
      match: match,
      description: 'description',
      locales: locales
    };
  }
}
async function prettifyCodeInFiles() {
  const result = await execSh('npm run fix:prettier', true);
  return result;
}
function updateCommandsConfig(commandId, commandStatus) {
  const filePath = path.join(__dirname,"../commandsConfig.json");
  const commandsConfigJson = jsonfile.readFileSync(filePath);
  commandsConfigJson[commandId] = commandStatus;
  jsonfile.writeFileSync(filePath, commandsConfigJson, { flag: "w" });
}
function registerCommandInFile(filename, callback) {
  const name = filename.split('.')[0];
  const _registryFilePath = path.join(__dirname, "../src/services/commands/_registry.js");
  const importStatement = `export { default as ${name}Command } from "./${name}";`;
  fs.readFile(_registryFilePath, { encoding: 'utf8' }, (err, code) => {
    const newCode = code + importStatement + '\n';
    fs.writeFile(_registryFilePath, newCode, 'utf8', callback);
  });
}
async function updateLocales(locales) {
  /** first read locale file json and then update */
  const localeFilePath = path.join(__dirname, "locale_en.json");
  const localesJson = jsonfile.readFileSync(localeFilePath);
  locales.map(locale => {
    localesJson[locale.key] = {
      message: locale.message,
      description: locale.description
    };
  });
  jsonfile.writeFileSync(localeFilePath, localesJson, { flag: "w" });
  /** translate locales*/
  await translateLocales();
}
const getCommandTemplate = options => {
  const stuff = generateIdNamesMatchDescription(options);
  const translationImportStatement = options.multilingual ? `import translationService from "../translationService";`: '';
  return {
    template: `
  /* eslint-disable no-unused-vars */
${translationImportStatement}
export default async langId => {
  ${stuff.commandAliasStatement}
  ${stuff.commandDescriptionStatement}
  return {
    id: "${stuff.id}",
    type: "${options.type}",
    name: "${stuff.id}",
    description: ${stuff.description},
    condition: "${options.condition}",
    match: [${stuff.match}],
    exec: async (text, options, callback) => {
      // write your logic here.
      
    }
  };
};
  `,
    props: stuff
  };
};

function parseArgsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--filename": String,
      "--multilingual": Boolean,
      "--install": Boolean,
      "--names": String,
      "--enabled": Boolean,
      "--description": String,
      "--condition": String,
      "--type": String
    },
    {
      argv: rawArgs.slice(2)
    }
  );
  return {
    filename: args["--filename"] || null,
    names: args["--names"] || null,
    multilingual: args["--multilingual"] || null,
    enabled: args["--enabled"] || null,
    description: args["--description"] || null,
    condition: args["--condition"] || null,
    type: args["--type"] || null,
    install: args["--install"] || null,
  };
}
function isNull(val) {
  return val == null;
}
async function promptForMissingOptions(options) {
  const questions = [];
  if (isNull(options.filename)) {
    questions.push({
      type: "input",
      name: "filename",
      message: "Please type filename for command:"
    });
  }
  if (isNull(options.names)) {
    questions.push({
      type: "input",
      name: "names",
      message: "type name(s) for command(separated by ,):"
    });
  }
  if (isNull(options.condition)) {
    questions.push({
      type: "list",
      name: "condition",
      default: "exact",
      choices: ['startsWith', 'exact'],
      message: "Select Match condition for command?"
    });
  }
  if (isNull(options.multilingual)) {
    questions.push({
      type: "confirm",
      name: "multilingual",
      default: false,
      message: "Is this command available for all the languages ?"
    });
  }
  if (isNull(options.enabled)) {
    questions.push({
      type: "confirm",
      name: "enabled",
      default: false,
      message: "Should it be enabled by default?"
    });
  }
  if (isNull(options.description)) {
    questions.push({
      type: "input",
      name: "description",
      message: "Type description of the command:"
    });
  }
  if (isNull(options.type)) {
    questions.push({
      type: "list",
      name: "type",
      default: "background",
      choices: ['frontend', 'backend'],
      message: "Select type of the command?"
    });
  }
  if (isNull(options.install)) {
    questions.push({
      type: "confirm",
      name: "install",
      default: false,
      message: "do you really want to create this command?"
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    filename: options.filename || answers.filename,
    multilingual: options.multilingual || answers.multilingual,
    names: options.names || answers.names,
    enabled: options.enabled || answers.enabled,
    description: options.description || answers.description,
    condition: options.condition || answers.condition,
    type: options.type || answers.type,
    install: options.install || answers.install
  };
}
export async function cli(args) {
  let options = parseArgsIntoOptions(args);
  options = await promptForMissingOptions(options);
  if (!options.install) return;
  const { props, template } = getCommandTemplate(options);
  /** save template in the file */
  const commandFilePath = path.join(__dirname, `../src/services/commands/${options.filename}`);
  fs.writeFileSync(commandFilePath, template);
  await prettifyCodeInFiles();
  /** update commandsConfig.json with new command's id and status */
  updateCommandsConfig(props.id, options.enabled);
  if (options.multilingual) {
    /** update locales */
    await updateLocales(props.locales);
  }
  /** update command in registry */
  registerCommandInFile(options.filename, ()=>{
    console.log(chalk.cyan(`your command template has been created here: ${commandFilePath}`));
  });
}
