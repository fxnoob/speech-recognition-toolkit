import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import MUIDataTable from "mui-datatables";
import symbols from "../services/math_symbol_files/en";
import Paper from "@material-ui/core/Paper";

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
        title={`Symbols list`}
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
