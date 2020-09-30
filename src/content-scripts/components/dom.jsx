import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FileCopy from "@material-ui/icons/FileCopy";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import IFrame from "./FrameMUI";
import initialContent from "./initialFrame";
import messagePassing from "../../services/messagePassing";
import simulation from "../../services/simulationService";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});
class Dom extends React.Component {
  queue = [];
  state = {
    open: false,
    messageInfo: {}
  };
  componentDidMount() {
    /** Listening to message sentfrom popup page, option page or background script to content script */
    messagePassing.on("/sr_text", async (req, res, options) => {
      const { text } = req;
      console.log({ text });
      this.speechToTextListener(text);
    });
  }
  speechToTextListener(text) {
    let strArray = text.split("");
    strArray.map(str_char => {
      simulation.keypress([new String(str_char).charCodeAt(0)]);
    });
    /** open snackbar with recognised text */
    this.handleClick(text)();
  }
  handleClick = message => () => {
    console.log(message);
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
          style={{ zIndex: 4444444444444444444 }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{messageInfo.message}</span>}
          action={[
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
                <FileCopy />
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
                <CloseIcon />
              </IconButton>
            </IFrame>
          ]}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Dom);
