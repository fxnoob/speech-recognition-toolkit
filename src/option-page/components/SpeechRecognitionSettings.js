import React, { useState, useEffect } from "react";
import db from "../../services/db";
import voice from "../../services/voiceService";
import messagePassing from "../../services/messagePassing";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));
export default function() {
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
    setLang(defaultLanguage.code);
    setOnBootStart(alwaysOpen);
  };
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const closeLanguageSelectOption = () => {
    setLanguageSelectOptionOpen(false);
  };
  const changeLanguage = async event => {
    setLang(event.target.value);
    await db.set({
      defaultLanguage: {
        code: event.target.value,
        label: voice.supportedLanguages[event.target.value]
      }
    });
    messagePassing.sendMessage("/restart_sr", {}, () => {});
  };
  const toggleOnBootSetting = async event => {
    const alwaysOpen = !onBootStart;
    setOnBootStart(!onBootStart);
    await db.set({ alwaysOpen });
  };
  return (
    <List className={classes.root}>
      <ListItem key={1} role={undefined} dense button onClick={handleToggle(2)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={onBootStart}
            tabIndex={-1}
            onChange={toggleOnBootSetting}
            inputProps={{ "aria-labelledby": "aria" }}
          />
        </ListItemIcon>
        <ListItemText
          id={1}
          primary={`Start 'Speech Recognition' when Chrome starts`}
        />
      </ListItem>
      <ListItem key={2} role={undefined} dense button onClick={handleToggle(2)}>
        <ListItemIcon>
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
              id: "demo-controlled-open-select"
            }}
          >
            {Object.keys(voice.supportedLanguages).map(key => (
              <MenuItem key={key} value={key}>
                {voice.supportedLanguages[key]}
              </MenuItem>
            ))}
          </Select>
        </ListItemIcon>
        <ListItemText id={2} primary={`Change Speech Recognition Language`} />
      </ListItem>
    </List>
  );
}
