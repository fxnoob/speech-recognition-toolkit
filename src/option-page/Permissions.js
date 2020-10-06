import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import db from "../services/db";
import helpImage from "./helpImage.png";

export default () => {
  const SUCCESS_MSG =
    "Now you can close this tab and use this tool to type on any website with your voice!";
  const ERROR_MSG = "Please Allow Permissions in order to use this tool!";
  const [message, setMessage] = useState("");
  const allowPermissions = async () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(async stream => {
        setMessage(SUCCESS_MSG);
        await db.set({ audioAccess: true });
        stream.getTracks().forEach(track => {
          track.stop();
        });
      })
      .catch(async err => {
        await db.set({ audioAccess: false });
        console.log(err);
        setMessage(ERROR_MSG);
      });
  };

  const GetMessage = ({ message }) => {
    let component = "";
    if (message == SUCCESS_MSG) {
      component = <Alert>{message}</Alert>;
    } else if (message == ERROR_MSG) {
      component = <Alert severity="error">{message}</Alert>;
    }
    return component;
  };

  return (
    <div>
      <div className="bg-white align-center" style={{ textAlign: "center" }}>
        <div className="max-w-screen-xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            Please Click on the button below
            <br />
            to allow audio permissions
            <br />
            in order to use this tool.
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="ml-3 inline-flex">
              <button
                aria-label="click here to allow audio permissions"
                data-balloon-pos="down"
                onClick={allowPermissions}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline focus:border-indigo-300 transition duration-150 ease-in-out btn"
              >
                Allow Permissions
              </button>
            </div>
          </div>
          <p
            className="mt-8 text-2xl"
            style={{
              paddingLeft: "30%",
              paddingRight: "30%"
            }}
          >
            <GetMessage message={message} />
          </p>
          <p className="mt-8 text-2xl">
            <hr />
            <br />
            <b>Note: </b> If you have accidentally disallowed permissions,
            <br />
            then you can allow them from clicking top left
            <br />
            corner of search bar of this tab
          </p>
          {message == ERROR_MSG && (
            <p
              style={{
                marginTop: "0.5rem",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <img src={helpImage} />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
