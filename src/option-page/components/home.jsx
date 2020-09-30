import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Grid from "@material-ui/core/Grid";
import SpeechRecognitionSettings from "./SpeechRecognitionSettings";

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1,
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Home extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid
          container
          spacing={24}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <SpeechRecognitionSettings />
        </Grid>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          Creator @ <a href="mailto:fxnoob71@gmail.com">Hitesh Saini</a>
        </div>
        <Fab className={classes.fab} color="#222222">
          <KeyboardVoiceIcon />
        </Fab>
      </div>
    );
  }
}
export default withStyles(styles)(Home);
