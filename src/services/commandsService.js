import db from "./db";
import commandsDefaultConfig from "../../commandsConfig";
import * as cmds from "./commands/_registry";

/**
 *
 * Commands class
 * @class Commands
 * */
class Commands {
  constructor() {
    this.options = {};
    this.commands = {};
    this.conditions = {
      startsWith: (alias, text) =>
        text.toLowerCase().startsWith(alias.toLowerCase()) && alias != text,
      exact: (alias, text) => text.toLowerCase() == alias.toLowerCase()
    };
    this.isCommandEnabled = (commandIDObj, id, mode) => {
      if (mode == "text") return true;
      return commandIDObj.hasOwnProperty(id)
        ? commandIDObj[id]
        : commandsDefaultConfig[id];
    };
  }
  /***
   * set options object, which can be accessible in each command callback
   *
   * @param options an object
   * @method
   * @memberOf Commands
   * */
  setOptions(options) {
    this.options = options;
  }
  /***
   * Get available commands for particular language and command type
   *
   * @param langId language Id
   * @param type type of command - frontend | backend
   * @method
   * @memberOf Commands
   * */
  async getCommands(langId, type = "frontend") {
    const cmd = [];
    try {
      for (const commandName in cmds) {
        const commandInstance = await cmds[commandName](langId);
        if (commandInstance.type == type) {
          cmd.push(commandInstance);
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log({ e });
    }
    return cmd;
  }
  /**
   * Get all commands
   *
   * @param langId language id
   * @memberOf Commands
   * @method
   * */
  async getAllCommands(langId) {
    const frontEndCommands = await this.getCommands(langId, "frontend");
    const backEndCommands = await this.getCommands(langId, "backend");
    return [...frontEndCommands, ...backEndCommands];
  }
  /**
   * Get Matching command
   *
   * @param commands commands array
   * @memberOf Commands
   * @method
   * */
  async getMatchingCommand(commands, text, options, callback) {
    const { mode } = options;
    const { commandsConfig } = await db.get("commandsConfig") || {};
    const commandIndex = commands.findIndex(
      cmd =>
        this.isCommandEnabled(commandsConfig, cmd.id, mode) &&
        cmd.match.findIndex(al => this.conditions[cmd.condition](al, text)) !==
          -1
    );
    if (commandIndex != -1) {
      const commandToApply = commands[commandIndex];
      const aliasIndex = commandToApply.match.findIndex(al =>
        this.conditions[commandToApply.condition](al, text)
      );
      const alias = commandToApply.match[aliasIndex];
      const originalText = text;
      const commandContent = text
        .replace(alias, "")
        .toLowerCase()
        .trim();
      callback(commandToApply, { originalText, commandContent });
    } else {
      callback();
    }
  }
}
const command = new Commands();
export default command;
