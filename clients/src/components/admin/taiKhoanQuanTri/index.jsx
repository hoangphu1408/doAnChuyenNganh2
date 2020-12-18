import React, { Component } from "react";
import TableTaiKhoanQuanTri from "../tableTaiKhoanQuanTri";
import ThemTaiKhoanQuanTri from "../themTaiKhoanQuanTri";

class TaiKhoanQuanTri extends Component {
  render() {
    return (
      <>
        <ThemTaiKhoanQuanTri />
        <TableTaiKhoanQuanTri />
      </>
    );
  }
}

export default TaiKhoanQuanTri;
