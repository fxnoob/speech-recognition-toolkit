import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import db from "../services/db";
import messagePassing from "../services/messagePassing";
const queryString = require("query-string");
const parsed = queryString.parse(location.search);
const textRep = decodeURIComponent(parsed.text ? parsed.text : "");
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%"
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    textAlign: "center",
    margin: theme.spacing(4, 0, 2)
  }
}));
function TextExpansionDialog(props) {
  // eslint-disable-next-line react/prop-types
  const { open, setOpen, save, textVal, textExpVal, handleChange } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = async () => {
    save();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create Text Expansion</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          onChange={handleChange("text")}
          id="outlined-multiline-static"
          label="Text"
          type="text"
          value={textVal}
          variant="outlined"
          fullWidth
        />
        <br />
        <br />
        <TextField
          fullWidth
          onChange={handleChange("textExp")}
          id="outlined-multiline-static"
          label="Text Expansion"
          value={textExpVal}
          multiline
          rows={4}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function TextReplacementView() {
  const classes = useStyles();
  const [text, setText] = useState(textRep);
  const [textExp, setTextExp] = useState("");
  const [open, setOpen] = useState(textRep != "");
  const [textReplacementMapObj, setTextReplacementMapObj] = React.useState({});
  React.useEffect(() => {
    init().catch(() => {});
  }, []);
  const init = async () => {
    const { textReplacementMap } = await db.get("textReplacementMap");
    setTextReplacementMapObj(textReplacementMap);
  };
  const AddTextExp = () => {
    setOpen(true);
  };
  const handleSave = async () => {
    if (text == "" || textExp == "") return;
    const { textReplacementMap } = await db.get("textReplacementMap");
    textReplacementMap[text] = textExp;
    await db.set({ textReplacementMap: textReplacementMap });
    setTextReplacementMapObj(textReplacementMap);
    setOpen(false);
    setText("");
    setTextExp("");
    messagePassing.sendMessage('/update_text_replacement_obj', {}, ()=>{});
  };
  const handleExpansionEdit = key => () => {
    setText(key);
    setTextExp(textReplacementMapObj[key]);
    setOpen(true);
  };
  const handleExpansionDelete = key => async () => {
    let textReplacementMap = Object.assign({}, textReplacementMapObj);
    delete textReplacementMap[key];
    await db.set({ textReplacementMap: textReplacementMap });
    setTextReplacementMapObj(textReplacementMap);
    messagePassing.sendMessage('/update_text_replacement_obj', {}, ()=>{});
  };
  const handleChange = key => event => {
    if (key == "text") {
      setText(event.target.value);
    } else if (key == "textExp") {
      setTextExp(event.target.value);
    }
  };
  const generate = textReplacementMap => {
    return Object.keys(textReplacementMap).map(key => 
      <TableRow key={key}>
        <TableCell style={{ textAlign: "center" }}>{key}</TableCell>
        <TableCell style={{ textAlign: "center" }}>
          {textReplacementMap[key]}
        </TableCell>
        <TableCell style={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            color="primary"
            aria-label="Edit text expansion"
            onClick={handleExpansionEdit(key)}
            component="span"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="Delete text expansion"
            onClick={handleExpansionDelete(key)}
            component="span"
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };
  return (
    <>
      <TextExpansionDialog
        open={open}
        setOpen={setOpen}
        save={handleSave}
        textVal={text}
        textExpVal={textExp}
        handleChange={handleChange}
      />
      <TableContainer
        component={Paper}
        style={{ width: "50%", margin: "auto" }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>
                <a
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                    fontWeight: "bold"
                  }}
                  href="/option.html?path=home"
                >
                  Go Back
                </a>
              </TableCell>
              <TableCell style={{ textAlign: "center" }}></TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="default"
                  disableElevation
                  onClick={AddTextExp}
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
            <TableRow style={{ background: "black" }}>
              <TableCell style={{ textAlign: "center", color: "white" }}>
                Text
              </TableCell>
              <TableCell style={{ textAlign: "center", color: "white" }}>
                Replacement
              </TableCell>
              <TableCell style={{ textAlign: "center", color: "white" }}>
                Action
              </TableCell>
            </TableRow>
            {generate(textReplacementMapObj)}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        Creator @ <a href="mailto:fxnoob71@gmail.com">Hitesh Saini</a>
      </div>
    </>
  );
}
