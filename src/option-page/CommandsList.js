import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import MUIDataTable from "mui-datatables";
import Checkbox from '@material-ui/core/Checkbox';
import db from "../services/db";
import i18n from "../services/i18nService";
import commandService from "../services/commandsService";

const CommandList = () => {
  const columns = [
    i18n.getMessage("command_name_label"),
    i18n.getMessage("command_description_label"),
    i18n.getMessage("command_enable_disable_label")
  ];
  const [language, setLanguage] = useState("");
  const [data, setData] = useState([]);
  const handleChange = (id, arr) => async () => {
    arr[id] = !arr[id];
    await db.set({ commandsConfig: arr });
    init().catch(() => {});
  };
  useEffect(() => {
    init().catch(() => {});
  }, []);
  const init = async () => {
    const { commandsConfig } = await db.get("commandsConfig") || {};
    const { defaultLanguage } = await db.get("defaultLanguage");
    setLanguage(defaultLanguage.label);
    const commandsJson = await commandService.getCommands(defaultLanguage.code);
    const commandsList = commandsJson.map(command => {
      return [command.name, command.description, <Checkbox key={command.id}
        checked={commandsConfig[command.id]}
        onChange={handleChange(command.id, commandsConfig)}
        inputProps={{ 'aria-label': 'enable/disable command' }}
      />];
    });
    setData(commandsList);
  };
  const options = {
    rowsPerPage: 15,
    customToolbarSelect: () => {},
    selectableRows: false
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
