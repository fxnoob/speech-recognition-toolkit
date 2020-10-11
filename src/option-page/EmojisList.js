import React from "react";
import Container from "@material-ui/core/Container";
import MUIDataTable from "mui-datatables";
import i18n from "../services/i18nService";
import emojiService from "../services/emojiService";

export default props => {
  const language = props.language;
  const columns = [
    i18n.getMessage("emoji_name_label"),
    i18n.getMessage("emoji")
  ];
  const options = {
    filterType: "checkbox"
  };
  const emojiJson = emojiService.getEmojiList(language.code);
  const data = Object.keys(emojiJson).map(key => {
    return [key, emojiJson[key].replacement];
  });

  return (
    <Container>
      <MUIDataTable
        title={`${i18n.getMessage("emoji_list_for_lang_label")}: ${
          language.label
        }`}
        data={data}
        columns={columns}
        options={options}
      />
    </Container>
  );
};
