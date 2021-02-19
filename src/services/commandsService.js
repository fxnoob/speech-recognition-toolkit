import db from "./db";
import emojiCommand from "./commands/emoji";
import undoCommand from "./commands/undo";
import redoCommand from "./commands/redo";
import newLineCommand from "./commands/newline";
import pressEnterCommand from "./commands/press_enter";
import calculateCommand from "./commands/calculate";
import mathSymbolCommand from "./commands/math_symbol";
import mindfulnessCommand from "./commands/mindfulness";
import scrollDownCommand from "./commands/scroll_down";
import scrollUpCommand from "./commands/scroll_up";
import tabNavigationNextCommand from "./commands/tab_navigation_next";
import tabNavigationPreviousCommand from "./commands/tab_navigation_previous";
import undoAllCommand from "./commands/undo_all";
import arrowCommand from "./commands/arrow";
import goToCommand from "./commands/go_to";
import remindMeCommand from "./commands/remind_me";
import searchGoogleCommand from "./commands/search";

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
      startsWith: (alias, text) => text.startsWith(alias.toLowerCase()),
      exact: (alias, text) => text == alias.toLowerCase()
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
      if (type == "frontend") {
        cmd.push(await emojiCommand(langId));
        cmd.push(await undoCommand(langId));
        cmd.push(await redoCommand(langId));
        cmd.push(await newLineCommand(langId));
        cmd.push(await pressEnterCommand(langId));
        cmd.push(await calculateCommand(langId));
        cmd.push(await mathSymbolCommand(langId));
        cmd.push(await mindfulnessCommand(langId));
        cmd.push(await scrollDownCommand(langId));
        cmd.push(await scrollUpCommand(langId));
        cmd.push(await tabNavigationNextCommand(langId));
        cmd.push(await tabNavigationPreviousCommand(langId));
        cmd.push(await undoAllCommand(langId));
        cmd.push(await arrowCommand(langId));
      } else if (type == "backend") {
        cmd.push(await goToCommand(langId));
        cmd.push(await remindMeCommand(langId));
        cmd.push(await searchGoogleCommand(langId));
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
  async getMatchingCommand(commands, text, callback) {
    const { commandsConfig } = await db.get("commandsConfig") || {};
    const commandIndex = commands.findIndex(
      cmd =>
        commandsConfig[cmd.id] &&
        cmd.match.findIndex(al => this.conditions[cmd.condition](al, text)) !==
          -1
    );
    if (commandIndex != -1) {
      const commandToApply = commands[commandIndex];
      const aliasIndex = commandToApply.match.findIndex(al =>
        this.conditions[commandToApply.condition](al, text)
      );
      const alias = commandToApply.match[aliasIndex];
      const commandContent = text
        .replace(alias, "")
        .toLowerCase()
        .trim();
      callback(commandToApply, commandContent);
    } else {
      callback();
    }
  }
}
const command = new Commands();
export default command;
