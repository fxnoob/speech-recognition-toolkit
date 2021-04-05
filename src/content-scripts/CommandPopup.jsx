/* eslint-disable react/prop-types */
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IFrame from "../components/FrameMUI";
import initialContent from "../components/initialFrame";
import constants from "../../constants";
import AutoComplete from "./AutoComplete";

export default function CommandPopup(props) {
  const { open, togglePopupWindow } = props;
  const handleClose = () => {
    togglePopupWindow();
  };
  return (
    <Dialog
      style={{ zIndex: 2147483640 }}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <IFrame
        initialContent={initialContent()}
        className=""
        style={{ width: "480px", height: "410px", border: "none" }}
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          {constants.appConfig.appName}
        </DialogTitle>
        <DialogContent>
          <AutoComplete togglePopupWindow={togglePopupWindow}/>
        </DialogContent>
      </IFrame>
    </Dialog>
  );
}
