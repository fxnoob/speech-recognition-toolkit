import React from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import "balloon-css";
import Settings from "./settings";
import Faq from "./faq";

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
            <Tab label="Settings" />
            <Tab label="Help" />
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
            <Faq />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default FullWidthTabs;
