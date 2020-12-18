import React, { Component } from "react";
import tableTaiKhoanQuanTri from "../tableTaiKhoanQuanTri";
import themTaiKhoanQuanTri from "../themTaiKhoanQuanTri";

class TaiKhoanQuanTri extends Component {
  render() {
    return (
      <>
        <themTaiKhoanQuanTri />
        <tableTaiKhoanQuanTri />
      </>
    );
  }
}

export default TaiKhoanQuanTri;
