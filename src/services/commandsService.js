import emojiCommand from "./commands/emoji";
import undoCommand from "./commands/undo";
import redoCommand from "./commands/redo";
import newLineCommand from "./commands/newline";
import pressEnterCommand from "./commands/press_enter";

class Commands {
  constructor() {
    this.options = {};
    this.commands = {};
  }
  setOptions(options) {
    this.options = options;
  }
  getCommands(langId) {
    const Commands = [];
    Commands.push(emojiCommand(langId));
    Commands.push(undoCommand(langId));
    Commands.push(redoCommand(langId));
    Commands.push(newLineCommand(langId));
    Commands.push(pressEnterCommand(langId));
    this.commands = Commands;
    return Commands;
  }
}
const command = new Commands();
export default command;
