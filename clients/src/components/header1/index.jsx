import React, { Component } from "react";
import "./index.css";

import logo from "../../assets/img/logo.png";

class Header extends Component {
  render() {
    return (
      <div className="header01">
        <nav className="container navbar navbar-expand-lg bg-transparent">
          <a className="navbar-brand" href="abc">
            <img src={logo} alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </nav>
      </div>
    );
  }
}

export default Header;
