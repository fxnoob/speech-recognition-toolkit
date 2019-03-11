import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divder from '@material-ui/core/Divider';

import {Pages as PageLib} from "../../../src/util/pages";
import { ExtBasicSetting , ExtSpeechRecognitionSetting }  from "../../../src/util/setting";

const page = new PageLib();
const Setting = new ExtBasicSetting();
const SpeechRecognitionSetting = new ExtSpeechRecognitionSetting();

class Settings extends React.Component {
    state = {
        isExtAllowed: true ,
        timeStamp: +new Date ,
        data: "" ,
        isOverridable: false ,
        alwaysOpenWithChromeStart: false ,
        submitSearchField: false ,
    };
    componentDidMount() {
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
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        SpeechRecognitionSetting.set({[name]: event.target.checked });
    };
    openOptionPage() {
        page.openPage("option.html");
    }
    render() {
        return (
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
                    <Divder/>
                </FormGroup>
            </FormControl>
        );
    }
}

export default Settings;
