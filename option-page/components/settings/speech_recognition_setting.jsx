import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divder from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core";
import {Pages as PageLib} from "../../../src/util/pages";
import { ExtBasicSetting , ExtSpeechRecognitionSetting }  from "../../../src/util/setting";
import { speechRecognition } from "../../../src/util/speech_recognition";

const page = new PageLib();
const Setting = new ExtBasicSetting();
const SpeechRecognitionSetting = new ExtSpeechRecognitionSetting();

const styles = theme => ({
    root: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});
const speechRecognitionController = new speechRecognition();
class Settings extends React.Component {
    state = {
        isExtAllowed: true ,
        timeStamp: +new Date ,
        data: "" ,
        isOverridable: false ,
        alwaysOpenWithChromeStart: false ,
        submitSearchField: false ,
        open: true,
    };
    componentDidMount() {
        speechRecognitionController.addCommand({'*text': (text) => {
                const appendText = " " + text;
                document.getElementById("speech_recognition_input_textarea").value+= appendText ;
                speechRecognitionController.sendTextToDom(text);
            }
        });
        speechRecognitionController.start();
        /** fetching default extension settings*/
        Setting.get()
            .then(res => {
                this.setState(res.settings);
            });
        /** fetching speech recognition settings */
        SpeechRecognitionSetting.get()
            .then(res => {
                this.setState(res.ExtSpeechRecognitionSetting);
            });
    }
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        SpeechRecognitionSetting.set({[name]: event.target.checked });
    };
    openOptionPage() {
        page.openPage("option.html");
    }
    render() {
        const { classes } = this.props;
        return (
                <Grid item xs={6}>
                    <List
                        component="nav"
                        subheader={<ListSubheader component="div">Speech Regconiton settings</ListSubheader>}
                        className={classes.root}
                    >
                        <ListItem button onClick={this.handleClick}>
                            <ListItemIcon>
                                <KeyboardVoiceIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Speech Reconition Settings" />
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <TextField
                                        id="speech_recognition_input_textarea"
                                        label="Speech Text"
                                        placeholder="recognised text"
                                        helperText="recognised text"
                                        multiline
                                        rows="5"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </ListItem>
                                <Divider/>
                                <ListItem button className={classes.nested}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Advanced Settings</FormLabel>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.alwaysOpenWithChromeStart}
                                                        onChange={this.handleChange('alwaysOpenWithChromeStart')}
                                                        value="Start 'Speech Recognition' when Chrome starts"
                                                    />
                                                }
                                                label="Start 'Speech Recognition' when Chrome starts"
                                            />
                                            <Divder/>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.submitSearchField}
                                                        onChange={this.handleChange('submitSearchField')}
                                                        value="Submit search fields automatically"
                                                    />
                                                }
                                                label="Submit search fields automatically"
                                            />
                                            <Divider/>
                                        </FormGroup>
                                    </FormControl>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Grid>
        );
    }
}

export default withStyles(styles)(Settings);
