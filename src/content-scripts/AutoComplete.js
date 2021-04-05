/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import CustomInput from "../components/CustomInput";
import messagePassing from "../services/messagePassing";
import commandService from "../services/commandsService";
import db from "../services/db";

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;
  return (
    <CustomInput
      InputProps={{
        disableUnderline: true,
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.name}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.name}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

function getSuggestions(commands, value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : commands.filter(command => {
      let keep;
      if (command.condition == "exact") {
        keep =
            count < 5 &&
            command.name.slice(0, inputLength).toLowerCase() === inputValue;
      } else if (command.condition == "startsWith") {
        keep =
            count < 5 &&
            command.name
              .slice(0, inputLength)
              .toLowerCase()
              .startsWith(inputValue);
      }
      if (keep) {
        count += 1;
      }

      return keep;
    });
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "auto",
    flexGrow: 1
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

function AutoComplete(props) {
  const { togglePopupWindow } = props;
  const [term, setTerm] = useState("");
  const [commands, setCommands] = useState([]);
  const { classes } = props;
  useEffect(() => {
    const init = async () => {
      const { defaultLanguage } = await db.get("defaultLanguage");
      const cmds = [];
      const fetchedCommandsAarrayMulti = await commandService.getAllCommands(
        defaultLanguage.code
      );
      fetchedCommandsAarrayMulti.map(commandsArray => {
        commandsArray.match.map(name => {
          cmds.push({
            condition: commandsArray.condition,
            name: name
          });
        });
      });
      setCommands(cmds);
    };
    init();
  }, []);
  const OpenSettingPage = () => {
    messagePassing.sendMessage("/navigation_req", { path: "commands" });
  };
  const onSubmit = e => {
    e.preventDefault();
    messagePassing.sendMessage("/process_input", { text: term });
    togglePopupWindow();
  };
  const onChange = newValue => {
    setTerm(newValue);
  };
  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <Downshift id="downshift-simple" onInputValueChange={onChange}>
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem
        }) => 
          <div className={classes.container}>
            {renderInput({
              openSettingPage: OpenSettingPage,
              onSubmit: () => {
                onSubmit(inputValue);
              },
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                placeholder: "Type command or Text"
              })
            })}
            <div {...getMenuProps()}>
              {isOpen ? 
                <Paper className={classes.paper} square>
                  {getSuggestions(commands, inputValue).map(
                    (suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.name }),
                        highlightedIndex,
                        selectedItem
                      })
                  )}
                </Paper>
                : null}
            </div>
          </div>
        }
      </Downshift>
      <div className={classes.divider} />
    </form>
  );
}

AutoComplete.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AutoComplete);
