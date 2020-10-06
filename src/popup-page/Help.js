import React from "react";
import i18nService from "../services/i18nService";

export default () => {
  return (
    <div>
      <h3>{i18nService.getMessage("popup_help_heading_str")}</h3>
      <div>
        {i18nService.getMessage("popup_help_desc_str")}{" "}
        <a
          target="_blank"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdTB0tFZHTnRe5_L64lYCbJvQm4XD5zGoSubYYYqBEOYXkIGA/viewform?usp=sf_link"
        >
          {i18nService.getMessage("here")}
        </a>
        .
      </div>
    </div>
  );
};
