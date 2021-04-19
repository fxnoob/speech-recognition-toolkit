import React from "react";
import PrivateRoute from "../components/PrivateRoute";
import "balloon-css";
import Permissions from "./Permissions";
import NavBar from "./NavBar";
import Home from "./home";
import CommandsList from "./CommandsList";
import EmojiList from "./EmojisList";
import SymbolList from "./SymbolList";
import MorseCodePanel from "./MorseCodePanel";
import TextEpanderView from "./TextExpanderView";
import TextReplacementView from "./TextReplacementView";

const queryString = require("query-string");
const parsed = queryString.parse(location.search);
const path = decodeURIComponent(parsed.path ? parsed.path : "home");

const GetView = ({ path }) => {
  let view;
  switch (path) {
  case "home":
    view = 
        <PrivateRoute component={Home} permissionComponent={Permissions} />
    ;
    break;
  case "commands":
    view = <CommandsList />;
    break;
  case "emojis":
    view = <EmojiList />;
    break;
  case "symbols":
    view = <SymbolList />;
    break;
  case "mcode":
    view = <MorseCodePanel />;
    break;
  case "textExpander":
    view = <TextEpanderView />;
    break;
  case "textReplacer":
    view = <TextReplacementView />;
    break;
  default:
    view = 
        <PrivateRoute component={Home} permissionComponent={Permissions} />
    ;
  }
  return view;
};

export default function App() {
  return (
    <>
      <NavBar />
      <GetView path={path} />
    </>
  );
}
