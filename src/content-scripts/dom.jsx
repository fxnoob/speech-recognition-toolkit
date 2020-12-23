/* eslint-disable react/prop-types,react/jsx-key */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FileCopy from "@material-ui/icons/FileCopy";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SpeakerIcon from "@material-ui/icons/PlayArrow";
import IFrame from "../components/FrameMUI";
import initialContent from "../components/initialFrame";
import messagePassing from "../services/messagePassing";
import dom from "../services/dom";
import cmd from "../services/commandsService";
import db from "../services/db";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class Dom extends React.Component {
  mountAckId = "";
  queue = [];
  state = {
    open: false,
    messageInfo: {},
    mountAckId: ""
  };
  componentDidMount() {
    // put mountAckId in dom
    this.mountAckDom();
    /** Check for content script mount acknowledgement from background script */
    messagePassing.on("/cs_mounted", async (req, res) => {
      res({ mounted: true });
    });
    /** Listening to message sentfrom popup page, option page or background script to content script */
    messagePassing.on("/sr_text", async req => {
      const { text, langId } = req;
      this.speechToTextListenerCallback(text, langId);
    });
  }
  mountAckDom = () => {
    messagePassing.sendMessage("/get_cs_mountAck", {}, async res => {
      const { mountAckId } = res;
      const div = document.createElement("div");
      div.id = mountAckId;
      document.body.appendChild(div);
      this.mountAckId = mountAckId;
    });
  };
  async speechToTextListenerCallback(text, langId) {
    /** open snackbar with recognised text if any element is not active */
    if (!dom.inIframe()) {
      this.handleClick(text)();
    }
    text = text.toLowerCase();
    const { commandsConfig } = await db.get("commandsConfig") || {};
    const commands = await cmd.getCommands(langId);
    const commandIndex = commands.findIndex(
      p =>
        commandsConfig[p.id] &&
        (p.match == "startsWith" && text.startsWith(p.name) ||
          p.match == "exact" && text == p.name.toLowerCase())
    );
    if (commandIndex != -1) {
      const commandToApply = commands[commandIndex];
      commandToApply.exec(text, { dom, ackId: this.mountAckId }, () => {});
    } else {
      const indentedText = text != "." ? ` ${text}` : text;
      dom.simulateWordTyping(indentedText, this.mountAckId);
    }
  }
  handleClick = message => () => {
    this.queue.push({
      message,
      key: new Date().getTime()
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
    const { messageInfo } = this.state;

    return (
      <div>
        <Snackbar
          key={messageInfo.key}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          style={{ zIndex: 4444444444444444444, width: '200px', height: '3rem' }}
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
      </div>
    );
  }
}
export default withStyles(styles)(Dom);
