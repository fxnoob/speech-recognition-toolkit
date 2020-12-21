import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import morseCodeService from '../services/morseCodeService';
import messagePassing from '../services/messagePassing';
const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "32ch"
    }
  },
  btn: {
    width: "30ch"
  }
}));

export default function MorseCodePanel() {
  const audioElement = React.useRef(null);
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const handleChange = event => {
    setValue(event.target.value);
  };
  messagePassing.on("/sr_text", async (req) => {
    const { text } = req;
    setValue(text);
  });
  const handleClick = async () => {
    if (value) {
      morseCodeService.playString(value);
    }
  };
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <TextField
          id="outlined-multiline-static"
          label="Type your message here"
          multiline
          rows={6}
          value={value}
          onChange={handleChange}
          variant="outlined"
        />
        <Button
          onClick={handleClick}
          className={classes.btn}
          variant="contained"
          color="primary"
          disableElevation
        >
          Covert to Morse Code
        </Button>
        <audio ref={audioElement} crossOrigin="anonymous"/>
      </div>
    </form>
  );
}
