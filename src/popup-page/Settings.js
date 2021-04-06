import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Fab from "@material-ui/core/Fab";
import GearIcon from "@material-ui/icons/Settings";
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import messagePassing from "../services/messagePassing";
import chromeService from "../services/chromeService";
import voice from "../services/voiceService";
import db from "../services/db";
import i18nService from "../services/i18nService";
import "./Settings.css";

class Settings extends React.Component {
  state = {
    loaded: false,
    permissionGranted: false,
    isMicListening: false,
    isExtAllowed: true,
    timeStamp: +new Date(),
    data: "",
    language: "",
    commandWindowShortCut: ""
  };
  componentDidMount() {
    this.init();
    this.getShortCutCommands();
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
  gotoCommandsViewer = async () => {
    chromeService.openHelpPage("commands");
  };
  getShortCutCommands = async () => {
    const shortCut = await chromeService.commands.getCommand(
      "toggle-command-popup"
    );
    this.setState({ commandWindowShortCut: `(${shortCut})` });
  };
  openCommandWindow = async () => {
    messagePassing.sendMessageToActiveTab(
      "/toggle_command_popup",
      {},
      () => {}
    );
  };
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
      <>
        {this.state.permissionGranted && 
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="language-label">
              {i18nService.getMessage("popup_default_language_label_str")}:
            </div>
            <div style={{ marginLeft: "0.5rem" }}>
              <a
                aria-label={i18nService.getMessage(
                  "popup_default_language_tooltip_str"
                )}
                data-balloon-pos="down"
                href={chrome.runtime.getURL("option.html")}
                rel="noreferrer"
                target="_blank"
              >
                <b>{this.state.language}</b>
              </a>
            </div>
          </div>
        }
        {this.state.loaded &&
          (this.state.permissionGranted ? 
            <div style={{ marginTop: "1rem" }}>
              <FormControlLabel
                aria-label={i18nService.getMessage("popup_mic_btn_tooltip_str")}
                data-balloon-pos="right"
                control={
                  <Fab
                    style={{
                      marginLeft: "0.5rem",
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
                aria-label={i18nService.getMessage(
                  "popup_gear_btn_tooltip_str"
                )}
                data-balloon-pos="down"
                style={{ marginLeft: "0.5rem" }}
                control={
                  <Fab variant="extended" onClick={this.openOptionPage}>
                    <GearIcon />
                  </Fab>
                }
                label=""
              />
              <button
                aria-label={i18nService.getMessage(
                  "popup_show_commands_tooltip_str"
                )}
                data-balloon-pos="down"
                style={{
                  cursor: "pointer",
                  color: "#551a8b",
                  textDecoration: "underline"
                }}
                onClick={this.gotoCommandsViewer}
              >
                <b>{i18nService.getMessage("popup_show_commands_label")}</b>
              </button>
              <FormControlLabel
                aria-label={`Open Command Window ${this.state.commandWindowShortCut}`}
                data-balloon-pos="up"
                style={{ marginTop: "1rem" }}
                control={
                  <Fab variant="extended" onClick={this.openCommandWindow}>
                    <DesktopWindowsIcon />
                    Open command Window
                  </Fab>
                }
                label=""
              />
            </div>
            : 
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
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
              <p style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>OR</p>
              <FormControlLabel
                aria-label={`Open Command Window ${this.state.commandWindowShortCut}`}
                data-balloon-pos="up"
                style={{ marginTop: "0.5rem" }}
                control={
                  <Fab variant="extended" onClick={this.openCommandWindow}>
                    <DesktopWindowsIcon />
                    Open command Window
                  </Fab>
                }
                label=""
              />
            </div>
          )}
        {this.state.loaded && this.state.isMicListening && 
          <div>
            <p>{i18nService.getMessage("popup_mic_listening_note")}</p>
          </div>
        }
      </>
    );
  }
}

export default Settings;
