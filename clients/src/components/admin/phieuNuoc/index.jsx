import React, { Component } from "react";
import TablePhieuNuoc from "../tablePhieuNuoc";
import ThemPhieuNuoc from "../themPhieuNuoc";

class PhieuNuoc extends Component {
  render() {
    return (
      <>
        <ThemPhieuNuoc />
        <TablePhieuNuoc />
      </>
    );
  }
}

export default PhieuNuoc;
