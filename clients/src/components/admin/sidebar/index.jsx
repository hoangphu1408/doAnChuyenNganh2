import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
class Sidebar extends Component {
  render() {
    return (
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Thu Thiem Garden</h3>
        </div>
        <ul className="list-unstyled components">
          <p>Hello Admin!</p>
          <li className="active">
            <a
              href="#homeSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              Cư dân
            </a>
            <ul className="collapse list-unstyled" id="homeSubmenu">
              <li>
                <Link to="/admin/cu-dan/danh-sach-cu-dan">
                  Danh sách cư dân
                </Link>
              </li>
              <li>
                <Link to="/admin/cu-dan/tai-khoan-cu-dan">
                  Tài khoản cư dân
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a href="abc">About</a>
            <a
              href="#pageSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              Pages
            </a>
            <ul className="collapse list-unstyled" id="pageSubmenu">
              <li>
                <a href="abc">Page 1</a>
              </li>
              <li>
                <a href="abc">Page 2</a>
              </li>
              <li>
                <a href="abc">Page 3</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="abc">Portfolio</a>
          </li>
          <li>
            <a href="abc">Contact</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Sidebar;
