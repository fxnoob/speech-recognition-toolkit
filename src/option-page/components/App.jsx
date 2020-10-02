import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import "balloon-css";
import Permissions from "./Permissions";
import NavBar from "./NavBar";
import Home from "./home";

export default () => {
  return (
    <>
      <NavBar />
      <PrivateRoute component={Home} permissionComponent={Permissions} />
    </>
  );
};
