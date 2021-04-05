/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import messagePassing from "../services/messagePassing";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    "&:hover:not($disabled):before": {
      underline: "none",
      borderBottom: "none",
      height: 1
    },
    flexWrap: "wrap",
    width: "auto",
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    borderBottom: "none",
    underline: "none"
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));
export default function CustomizedInputBase(props) {
  const classes = useStyles();
  const OpenSettingPage = () => {
    messagePassing.sendMessage("/navigation_req", { path: "commands" });
  };
  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <TextField
        autoFocus
        disableUnderline={true}
        className={classes.input}
        placeholder="Type Command"
        InputProps={{
          disableUnderline: true
        }}
        {...props}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        onClick={OpenSettingPage}
        className={classes.iconButton}
        aria-label="settings"
      >
        <SettingsIcon />
      </IconButton>
    </Paper>
  );
}
