import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import MUIDataTable from "mui-datatables";
import symbols from "../services/math_symbol_files/en";

const EmojiList = () => {
  const [data, seData] = useState([]);
  useEffect(() => {
    init().catch(() => {});
  }, []);
  const init = async () => {
    const res = Object.keys(symbols).map(key => {
      return [key, symbols[key]];
    });
    seData(res);
  };
  const columns = ["Symbol name", "Symbol value"];
  const options = {
    filterType: "checkbox"
  };

  return (
    <Container>
      <MUIDataTable
        title={`Symbols list`}
        data={data}
        columns={columns}
        options={options}
      />
    </Container>
  );
};
export default EmojiList;
