import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divder from '@material-ui/core/Divider';

import MessageLib from "../../../src/util/message";
import {Pages as PageLib} from "../../../src/util/pages";
import SettingLib  from "../../../src/util/setting";

const page = new PageLib();
const Setting = new SettingLib();
class Settings extends React.Component {
    state = {
        isExtAllowed: true ,
        timeStamp: +new Date ,
        data: "" ,
        isOverridable: false
    };
    componentDidMount() {
        const message = new MessageLib();
        Setting.get()
            .then(res => {
                console.log("componentDidMount",res);
                this.setState(res.settings);
            });
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        Setting.set({[name]: event.target.checked });
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
                                checked={this.state.isExtAllowed}
                                onChange={this.handleChange('isExtAllowed')}
                                value="Start 'Speech Recognition' when Chrome starts"
                            />
                        }
                        label="Start 'Speech Recognition' when Chrome starts"
                    />
                    <Divder/>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.isOverridable}
                                onChange={this.handleChange('isOverridable')}
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
