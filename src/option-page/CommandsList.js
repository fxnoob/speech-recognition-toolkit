import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import MUIDataTable from "mui-datatables";
import db from "../services/db";
import i18n from "../services/i18nService";
import commandService from "../services/commandsService";

export default () => {
  const columns = [
    i18n.getMessage("command_name_label"),
    i18n.getMessage("command_description_label")
  ];
  const [language, setLanguage] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    init().catch(e => {
      console.log(e);
    });
  }, []);
  const init = async () => {
    const { defaultLanguage } = await db.get("defaultLanguage");
    setLanguage(defaultLanguage.label);
    const commandsList = commandService
      .getCommands(defaultLanguage.code)
      .map(command => {
        return [command.name, command.description];
      });
    console.log({ defaultLanguage, commandsList });

    setData(commandsList);
  };
  const options = {
    filterType: "checkbox"
  };
  return (
    <Container>
      <MUIDataTable
        title={`${i18n.getMessage("commands_list_label")}: ${language}`}
        data={data}
        columns={columns}
        options={options}
      />
    </Container>
  );
};
