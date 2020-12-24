import React, { Component } from "react";
import TableCanHo from "../tableCanHo";
import ThemCanHo from "../themCanHo";

class CanHo extends Component {
  render() {
    return (
      <>
        <ThemCanHo />
        <TableCanHo />
      </>
    );
  }
}

export default CanHo;
