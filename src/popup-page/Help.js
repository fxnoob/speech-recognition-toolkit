import React from "react";
import i18nService from "../services/i18nService";
import constants from "../../constants";

export default () => {
  return (
    <div>
      <div
        style={{
          lineHeight: "normal"
        }}
      >
        {i18nService.getMessage("popup_help_heading_str")}{" "}
      </div>
      <div style={{ marginTop: "0.3rem" }}>
        <a target="_blank" href={constants.support.howtoVideoLink}>
          {i18nService.getMessage("popup_help_how_to_use_str")}{" "}
        </a>
      </div>
      <div>
        {i18nService.getMessage("popup_help_desc_str")}{" "}
        <a target="_blank" href={constants.support.googleFormLink}>
          {i18nService.getMessage("here")}.
        </a>
      </div>
    </div>
  );
};
