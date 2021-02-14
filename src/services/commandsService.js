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

class Commands {
  constructor() {
    this.options = {};
    this.commands = {};
  }
  setOptions(options) {
    this.options = options;
  }
  async getCommands(langId) {
    const cmd = [];
    try {
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
      cmd.push(await goToCommand(langId));
      cmd.push(await remindMeCommand(langId));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log({ e });
    }
    this.commands = cmd;
    return cmd;
  }
}
const command = new Commands();
export default command;
