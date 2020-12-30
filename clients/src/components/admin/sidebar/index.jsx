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
            <Link to="/admin/nha-quan-tri">Nhà quản trị</Link>
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
            <Link to="/admin/can-ho">Căn hộ</Link>
          </li>

          <li>
            <a
              href="#chiPhi"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              Chi phí
            </a>
            <ul className="collapse list-unstyled" id="chiPhi">
              <li>
                <Link to="/admin/chi-phi/quan-ly">Quản lý phí dịch vụ</Link>
              </li>
              <li>
                <a
                  href="#thongBaoChiPhi"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  Thông báo phí dịch vụ
                </a>
                <ul className="collapse list-unstyled" id="thongBaoChiPhi">
                  <li>
                    <Link to="/admin/chi-phi/tien-nuoc">Tiền nước</Link>
                  </li>
                  <li>
                    <Link to="/admin/chi-phi/tien-quan-ly">Tiền quản lý</Link>
                  </li>
                  <li>
                    <Link to="/admin/chi-phi/tien-giu-xe">Tiền giữ xe</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Sidebar;
