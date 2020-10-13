import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import MUIDataTable from "mui-datatables";
import i18n from "../services/i18nService";
import emojiService from "../services/emojiService";
import db from "../services/db";

export default props => {
  const [data, seData] = useState([]);
  const [language, setLanguage] = useState("");
  useEffect(() => {
    init().catch(e => {});
  }, []);
  const init = async code => {
    const { defaultLanguage } = await db.get("defaultLanguage");
    setLanguage(defaultLanguage.label);
    const res = await emojiService.getEmojiList(defaultLanguage.code);
    seData(res);
  };
  const columns = [
    i18n.getMessage("emoji_name_label"),
    i18n.getMessage("emoji")
  ];
  const options = {
    filterType: "checkbox"
  };

  return (
    <Container>
      <MUIDataTable
        title={`${i18n.getMessage("emoji_list_for_lang_label")}: ${language}`}
        data={data}
        columns={columns}
        options={options}
      />
    </Container>
  );
};
