import React, { Component } from "react";
import AddingResident from "../addingResident";
import TableResident from "../tableResident";
import TableTaiKhoanCuDan from "../tableTaiKhoanCuDan";
import ThemTaiKhoanCuDan from "../themTaiKhoanCuDan";

class Resident extends Component {
  renderTest = () => {
    if (this.props.options === "1") {
      return (
        <>
          <AddingResident />
          <TableResident />
        </>
      );
    } else
      return (
        <>
          <ThemTaiKhoanCuDan />
          <TableTaiKhoanCuDan />
        </>
      );
  };
  render() {
    return <div>{this.renderTest()}</div>;
  }
}

export default Resident;
