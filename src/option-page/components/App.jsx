import React from "react";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import "balloon-css";
import NavBar from "./NavBar";
import Home from "./home";
import Permissions from "./Permissions";

export default () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/permissions" component={Permissions} />
      </Switch>
    </Router>
  );
};
