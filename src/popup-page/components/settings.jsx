import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
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
    data: ""
  };
  componentDidMount() {
    this.init();
  }
  init = async () => {
    const { state } = await voice.permissionGranted();
    const { isMicListening } = await db.get("isMicListening");
    console.log({ isMicListening });
    this.setState({
      permissionGranted: state == "granted",
      loaded: true,
      isMicListening
    });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    db.set({ [name]: event.target.checked });
  };
  openOptionPage() {
    chromeService.openHelpPage("");
  }
  openOptionPermissionsPage() {
    chromeService.openHelpPage("/#/permissions");
  }
  sendMessageToActivateVoiceRecognition = async () => {
    messagePassing.sendMessage(
      "/toggle_sr",
      {
        action: "toggle_sr"
      },
      res => {
        console.log({ res });
        this.setState({ isMicListening: res.isMicListening });
      }
    );
  };
  render() {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Basic Settings</FormLabel>
        <FormGroup style={{ flexDirection: "row" }}>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.isExtAllowed}
                onChange={this.handleChange("isExtAllowed")}
                value="Enable/Disable Extension"
              />
            }
            label="Enable/Disable Extension"
          />
          {this.state.isExtAllowed &&
            this.state.loaded &&
            (this.state.permissionGranted ? (
              <div style={{ marginLeft: "1.5rem" }}>
                <FormControlLabel
                  control={
                    <Fab
                      style={{
                        background: this.state.isMicListening ? "#f50057" : ""
                      }}
                      variant="extended"
                      aria-label="Mic Icon"
                      onClick={this.sendMessageToActivateVoiceRecognition}
                    >
                      <KeyboardVoiceIcon />
                    </Fab>
                  }
                  label=""
                />
                <FormControlLabel
                  style={{ marginLeft: "0.5rem" }}
                  control={
                    <Fab
                      variant="extended"
                      aria-label="Gear Icon"
                      onClick={this.openOptionPage}
                    >
                      <GearIcon />
                    </Fab>
                  }
                  label=""
                />
              </div>
            ) : (
              <FormControlLabel
                style={{ marginTop: "0.5rem" }}
                control={
                  <Fab
                    variant="extended"
                    aria-label="Gear Icon"
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
