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
            <a href="/admin/nha-quan-tri">Nhà quản trị</a>
          </li>
          <li>
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
            <a href="/admin/can-ho">Căn hộ</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Sidebar;
