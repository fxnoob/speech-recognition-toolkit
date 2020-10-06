import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Fab from "@material-ui/core/Fab";
import GearIcon from "@material-ui/icons/Settings";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import messagePassing from "../services/messagePassing";
import chromeService from "../services/chromeService";
import voice from "../services/voiceService";
import db from "../services/db";
import i18nService from "../services/i18nService";

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
              <FormLabel component="legend">
                {i18nService.getMessage("popup_default_language_label_str")}
              </FormLabel>
              <div style={{ marginTop: "0.5rem" }}>
                <a
                  aria-label={i18nService.getMessage(
                    "popup_default_language_tooltip_str"
                  )}
                  data-balloon-pos="down"
                  href={chrome.runtime.getURL("option.html")}
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
                  aria-label={i18nService.getMessage(
                    "popup_mic_btn_tooltip_str"
                  )}
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
                aria-label={i18nService.getMessage(
                  "popup_allow_permission_btn_tooltip_str"
                )}
                data-balloon-pos="down"
                style={{ marginTop: "0.5rem" }}
                control={
                  <Fab
                    variant="extended"
                    onClick={this.openOptionPermissionsPage}
                  >
                    <GearIcon />
                    {i18nService.getMessage("popup_allow_permission_btn_str")}
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
