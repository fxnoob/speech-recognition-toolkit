import React from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import "balloon-css";
import Settings from "./Settings";
import Help from "./Help";
import i18nService from "../services/i18nService";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

class FullWidthTabs extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    return (
      <div
        style={{
          width: "500px"
        }}
      >
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label={i18nService.getMessage("popup_settings_tab_str")} />
            <Tab label={i18nService.getMessage("popup_help_tab_str")} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis="x-reverse"
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir="ltr">
            <Settings />
          </TabContainer>
          <TabContainer dir="ltr">
            <Help />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default FullWidthTabs;
