import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import MUIDataTable from "mui-datatables";
import db from "../services/db";
import i18n from "../services/i18nService";
import commandService from "../services/commandsService";

const CommandList = () => {
  const columns = [
    i18n.getMessage("command_name_label"),
    i18n.getMessage("command_description_label")
  ];
  const [language, setLanguage] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    init().catch(() => {});
  }, []);
  const init = async () => {
    const { defaultLanguage } = await db.get("defaultLanguage");
    setLanguage(defaultLanguage.label);
    const commandsJson = await commandService.getCommands(defaultLanguage.code);
    const commandsList = commandsJson.map(command => {
      return [command.name, command.description];
    });
    setData(commandsList);
  };
  const options = {
    filterType: "checkbox",
    rowsPerPage: 12,
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
export default CommandList;
