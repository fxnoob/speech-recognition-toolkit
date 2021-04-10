import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import MUIDataTable from "mui-datatables";
import i18n from "../services/i18nService";
import emojiService from "../services/emojiService";
import db from "../services/db";

const EmojiList = () => {
  const [data, seData] = useState([]);
  const [language, setLanguage] = useState("");
  useEffect(() => {
    init().catch(() => {});
  }, []);
  const init = async () => {
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
      <div>
        <Paper style={{ padding: '1rem' }}>
          <a
            style={{
              textDecoration: "underline",
              color: "blue",
              fontWeight: "bold"
            }}
            href="chrome-extension://dhchliggbldmkpkechbiplegjnhjjomi/option.html?path=home"
          >
          Go Back
          </a>
        </Paper>
      </div>
      <MUIDataTable
        title={`${i18n.getMessage("emoji_list_for_lang_label")}: ${language}`}
        data={data}
        columns={columns}
        options={options}
      />
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        Creator @ <a href="mailto:fxnoob71@gmail.com">Hitesh Saini</a>
      </div>
    </Container>
  );
};
export default EmojiList;
