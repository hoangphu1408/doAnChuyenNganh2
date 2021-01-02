import React, { Component } from "react";
import TablePhieuQuanLy from "../tablePhieuQuanLy";
import ThemPhieuQuanLy from "../themPhieuQuanLy";
class PhieuQuanLy extends Component {
  render() {
    return (
      <>
        <ThemPhieuQuanLy />
        <TablePhieuQuanLy />
      </>
    );
  }
}

export default PhieuQuanLy;
