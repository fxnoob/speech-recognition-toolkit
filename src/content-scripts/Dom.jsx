/* eslint-disable react/prop-types */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FileCopy from "@material-ui/icons/FileCopy";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SpeakerIcon from "@material-ui/icons/PlayArrow";
import IFrame from "../components/FrameMUI";
import initialContent from "../components/initialFrame";
import CommandPopup from "./CommandPopup";
import messagePassing from "../services/messagePassing";
import dom from "../services/dom";
import commandService from "../services/commandsService";
import db from "../services/db";
import guid from "../services/guid";

const styles = theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
});

class Dom extends React.Component {
  mountAckId = "";
  queue = [];
  state = {
    open: false,
    messageInfo: {},
    mountAckId: "",
    commandPopupOpened: false,
  };

  componentDidMount() {
    this.init();
  }
  init = async () => {
    // fetch commands for default language
    const { defaultLanguage } = await db.get("defaultLanguage");
    this.commands = await commandService.getCommands(defaultLanguage.code);
    this.langId = defaultLanguage.code;
    // put mountAckId in dom
    this.mountAckDom();
    /** Check for content script mount acknowledgement from background script */
    messagePassing.on("/cs_mounted", async (req, res) => {
      res({ mounted: true });
    });
    /** Listening to message sentfrom popup page, option page or background script to content script */
    messagePassing.on("/sr_text", async req => {
      const { text, langId, mode } = req;
      this.speechToTextListenerCallback(text, langId, { mode });
    });
    /** listen to any backend command message */
    messagePassing.on("/message", async req => {
      const { message } = req;
      this.handleClick(message)();
    });
    /** Listen for command search popup shortcut keys callback */
    messagePassing.on("/toggle_command_popup", async () => {
      if (!dom.inIframe()) {
        this.setState({ commandPopupOpened: !this.state.commandPopupOpened });
      }
    });
  };
  togglePopupWindow = () => {
    this.setState({ commandPopupOpened: !this.state.commandPopupOpened });
  };
  mountAckDom = () => {
    messagePassing.sendMessage("/get_cs_mountAck", {}, async res => {
      const { mountAckId } = res;
      const div = document.createElement("div");
      div.id = mountAckId;
      document.body.appendChild(div);
      this.mountAckId = mountAckId;
    });
  };
  async speechToTextListenerCallback(text, langId, options) {
    /** open snackbar with recognised text if any element is not active */
    this.handleClick(text)();
    text = text.toLowerCase();
    if (langId != this.langId) {
      this.langId = langId;
      this.commands = await commandService.getCommands(this.langId);
      this.setState({ commands: this.commands });
    }
    await commandService.getMatchingCommand(
      this.commands,
      text,
      options,
      (command, args) => {
        if (command) {
          const { originalText, commandContent } = args;
          command.exec(
            commandContent,
            { dom, ackId: this.mountAckId, originalText },
            message => {
              if (message) {
                this.handleClick(message)();
              }
            }
          );
        } else {
          if (options.mode == "speech") {
            const indentedText = text != "." ? ` ${text}` : text;
            dom.simulateWordTyping(indentedText, this.mountAckId);
          }
        }
      }
    );
  }
  handleClick = message => () => {
    if (dom.inIframe()) return;
    this.queue.push({
      message,
      key: guid.generateGuid()
    });
    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };
  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true
      });
    }
  };
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };
  handleCopy(message) {
    this.copyText(message);
    messagePassing.sendMessage(
      "/set_selected_text",
      { data: message },
      () => {}
    );
    this.setState({ open: false });
  }
  handleSpeak(text) {
    messagePassing.sendMessage("/speak_sr", { text });
  }
  handleExited = () => {
    this.processQueue();
  };
  copyText = text => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  };
  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    const { messageInfo, commandPopupOpened } = this.state;

    return (
      <div>
        <Snackbar
          key={messageInfo.key}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          style={{
            zIndex: 4444444444444444444,
            width: "200px",
            height: "3rem"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{messageInfo.message}</span>}
          action={[
            // eslint-disable-next-line react/jsx-key
            <IFrame
              initialContent={initialContent()}
              className="default-iframe"
              style={{ border: "none", height: "50px", width: "50px" }}
            >
              <IconButton
                key="copyclose"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={() => {
                  this.handleCopy(messageInfo.message);
                }}
              >
                <FileCopy style={{ color: "white" }} />
              </IconButton>
            </IFrame>,
            <IFrame
              key="iframe-1"
              initialContent={initialContent()}
              className="default-iframe"
              style={{ border: "none", height: "50px", width: "50px" }}
            >
              <IconButton
                key="speakText"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={() => {
                  this.handleSpeak(messageInfo.message);
                }}
              >
                <SpeakerIcon style={{ color: "white" }} />
              </IconButton>
            </IFrame>,
            <IFrame
              key="iframe-2"
              initialContent={initialContent()}
              className="default-iframe"
              style={{ border: "none", height: "50px", width: "50px" }}
            >
              <IconButton
                key="closeclose"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon style={{ color: "white" }} />
              </IconButton>
            </IFrame>
          ]}
        />
        {commandPopupOpened && <CommandPopup open={commandPopupOpened} togglePopupWindow={this.togglePopupWindow} />}
      </div>
    );
  }
}
export default withStyles(styles)(Dom);
