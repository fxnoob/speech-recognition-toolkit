import React from "react";
import PrivateRoute from "../components/PrivateRoute";
import "balloon-css";
import Permissions from "./Permissions";
import NavBar from "./NavBar";
import Home from "./home";
import CommandsList from "./CommandsList";

const queryString = require("query-string");
const parsed = queryString.parse(location.search);
const path = decodeURIComponent(parsed.path ? parsed.path : "home");

const GetView = ({ path }) => {
  let view;
  switch (path) {
    case "home":
      view = (
        <PrivateRoute component={Home} permissionComponent={Permissions} />
      );
      break;
    case "commands":
      view = <CommandsList />;
      break;
    default:
      view = (
        <PrivateRoute component={Home} permissionComponent={Permissions} />
      );
  }
  return view;
};

export default () => {
  return (
    <>
      <NavBar />
      <GetView path={path} />
    </>
  );
};
