import React, { Suspense } from "react";
import PrivateRoute from "../components/PrivateRoute";
import "balloon-css";

const Permissions = React.lazy(() => import("./Permissions"));
const NavBar = React.lazy(() => import("./NavBar"));
const Home = React.lazy(() => import("./home"));
const CommandsList = React.lazy(() => import("./CommandsList"));
const EmojiList = React.lazy(() => import("./EmojisList"));
const SymbolList = React.lazy(() => import("./SymbolList"));
const MorseCodePanel = React.lazy(() => import("./MorseCodePanel"));
const TextEpanderView = React.lazy(() => import("./TextExpanderView"));
const TextReplacementView = React.lazy(() => import("./TextReplacementView"));
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
    <Suspense fallback={<div style={{ textAlign: 'center' }}>Loading...</div>}>
      <NavBar />
      <GetView path={path} />
    </Suspense>
  );
}
