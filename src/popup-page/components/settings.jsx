import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Fab from "@material-ui/core/Fab";
import GearIcon from "@material-ui/icons/Settings";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import messagePassing from "../../services/messagePassing";
import chromeService from "../../services/chromeService";
import voice from "../../services/voiceService";
import db from "../../services/db";

class Settings extends React.Component {
  state = {
    loaded: false,
    permissionGranted: false,
    isMicListening: false,
    isExtAllowed: true,
    timeStamp: +new Date(),
    data: "",
    language: ""
  };
  componentDidMount() {
    this.init();
  }
  init = async () => {
    const { state } = await voice.permissionGranted();
    const { isMicListening, defaultLanguage } = await db.get(
      "isMicListening",
      "defaultLanguage"
    );
    this.setState({
      permissionGranted: state == "granted",
      loaded: true,
      isMicListening,
      language: defaultLanguage.label
    });
    await db.set({ permissionGranted: state == "granted" });
  };
  openOptionPage() {
    chromeService.openHelpPage("");
  }
  openOptionPermissionsPage() {
    chromeService.openHelpPage();
  }
  sendMessageToActivateVoiceRecognition = async () => {
    messagePassing.sendMessage(
      "/toggle_sr",
      {
        action: "toggle_sr"
      },
      res => {
        this.setState({ isMicListening: res.isMicListening });
      }
    );
  };
  render() {
    return (
      <FormControl component="fieldset" style={{ marginTop: "1rem" }}>
        <FormGroup style={{ flexDirection: "row" }}>
          {this.state.permissionGranted && (
            <div>
              <FormLabel component="legend">Default Language</FormLabel>
              <div style={{ marginTop: "0.5rem" }}>
                <a
                  aria-label="Click to change default language"
                  data-balloon-pos="down"
                  href={chrome.runtime.getURL("option.html") + "/#"}
                  target="_blank"
                >
                  <b>{this.state.language}</b>
                </a>
              </div>
            </div>
          )}
          {this.state.loaded &&
            (this.state.permissionGranted ? (
              <div style={{ marginLeft: "2rem" }}>
                <FormControlLabel
                  aria-label="click here to turn on/off speech recognition"
                  data-balloon-pos="down"
                  control={
                    <Fab
                      style={{
                        background: this.state.isMicListening ? "#f50057" : ""
                      }}
                      variant="extended"
                      onClick={this.sendMessageToActivateVoiceRecognition}
                    >
                      <KeyboardVoiceIcon />
                      {this.state.isMicListening ? "Listening" : ""}
                    </Fab>
                  }
                />
                <FormControlLabel
                  aria-label="open settings"
                  data-balloon-pos="down"
                  style={{ marginLeft: "0.5rem" }}
                  control={
                    <Fab variant="extended" onClick={this.openOptionPage}>
                      <GearIcon />
                    </Fab>
                  }
                  label=""
                />
              </div>
            ) : (
              <FormControlLabel
                aria-label="click here to Allow Audio Permission"
                data-balloon-pos="down"
                style={{ marginTop: "0.5rem" }}
                control={
                  <Fab
                    variant="extended"
                    onClick={this.openOptionPermissionsPage}
                  >
                    <GearIcon />
                    Allow Audio Permission
                  </Fab>
                }
                label=""
              />
            ))}
        </FormGroup>
      </FormControl>
    );
  }
}

export default Settings;
