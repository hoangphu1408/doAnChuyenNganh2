import React, { Component } from "react";
import ThemThongBao from "../themThongBao";
import TableThongBao from "../tableThongBao";

class ThongBao extends Component {
  handleEditorChange = (content, editor) => {};

  render() {
    return (
      <>
        <ThemThongBao />
        <TableThongBao />
      </>
    );
  }
}

export default ThongBao;
