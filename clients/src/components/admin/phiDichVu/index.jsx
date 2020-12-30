import React, { Component } from "react";
import TablePhiDichVu from "../tablePhiDichVu";
import ThemPhiDichVu from "../themPhiDichVu";

class PhiDichVu extends Component {
  render() {
    return (
      <>
        <ThemPhiDichVu />
        <TablePhiDichVu />
      </>
    );
  }
}

export default PhiDichVu;
