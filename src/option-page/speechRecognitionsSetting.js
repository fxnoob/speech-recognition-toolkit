import React, { useState, useEffect } from "react";
import db from "../services/db";
import voice from "../services/voiceService";
import messagePassing from "../services/messagePassing";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import i18nService from "../services/i18nService";
const useStyles = makeStyles(() => ({
  root: {
    width: "100%"
  }
}));
export default function SRS() {
  const [onBootStart, setOnBootStart] = useState(false);
  const [languageSelectOptionOpen, setLanguageSelectOptionOpen] = useState(
    false
  );

  const [lang, setLang] = useState("");
  useEffect(() => {
    init();
  });
  const init = async () => {
    const { defaultLanguage, alwaysOpen } = await db.get(
      "defaultLanguage",
      "alwaysOpen"
    );
    setLang(defaultLanguage.label);
    setOnBootStart(alwaysOpen);
  };
  const classes = useStyles();
  const closeLanguageSelectOption = () => {
    setLanguageSelectOptionOpen(false);
  };
  const changeLanguage = async event => {
    setLang(event.target.value);
    await db.set({
      defaultLanguage: {
        code: voice.supportedLanguages[event.target.value],
        label: event.target.value
      }
    });
    messagePassing.sendMessage("/restart_sr", {}, () => {});
  };
  const toggleOnBootSetting = async () => {
    const alwaysOpen = !onBootStart;
    setOnBootStart(!onBootStart);
    await db.set({ alwaysOpen });
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>
                <FormControl variant="outlined" style={{ maxWidth: "205px" }}>
                  <Select
                    open={languageSelectOptionOpen}
                    onClose={closeLanguageSelectOption}
                    onOpen={() => {
                      setLanguageSelectOptionOpen(true);
                    }}
                    value={lang}
                    onChange={changeLanguage}
                    inputProps={{
                      name: "name",
                      id: "open-select"
                    }}
                  >
                    {Object.keys(voice.supportedLanguages).map(name =>
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell align="left">
                {i18nService.getMessage(
                  "option_default_lang_change_setting_str"
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{
                  paddding: "1rem",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <Checkbox
                  edge="start"
                  checked={onBootStart}
                  tabIndex={-1}
                  onChange={toggleOnBootSetting}
                  inputProps={{ "aria-labelledby": "aria" }}
                />
              </TableCell>
              <TableCell align="left">
                {i18nService.getMessage("option_onstart_setting_str")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{
                  paddding: "1rem",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <span>{i18nService.getMessage("imoji_list_label_new")}</span>
              </TableCell>
              <TableCell align="left">
                <a
                  style={{ color: "#551a8b", textDecoration: "underline" }}
                  href="/option.html?path=emojis"
                >
                  {i18nService.getMessage("check_here_label")}
                </a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{
                  paddding: "1rem",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <span>{i18nService.getMessage("command_list_label")}</span>
              </TableCell>
              <TableCell align="left">
                <a
                  style={{ color: "#551a8b", textDecoration: "underline" }}
                  href="/option.html?path=commands"
                >
                  {i18nService.getMessage("check_here_label")}
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
