import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import history from "../../../routes/history";
import CanHo from "../canHo";
import PhiDichVu from "../phiDichVu";
import Resident from "../resident";
import TaiKhoanQuanTri from "../taiKhoanQuanTri";
import ThongBao from "../thongBao";

import "./styles.css";
class Dashboard extends Component {
  logOut = () => {
    localStorage.removeItem("isLogin");
    history.replace("/login");
  };
  render() {
    return (
      <div id="content">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              className="btn btn-dark d-inline-block d-lg-none ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-align-justify" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="abc" data-toggle="dropdown">
                    Settings
                  </a>
                  <div className="dropdown">
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <a className="dropdown-item" href="abc">
                        Profile
                      </a>
                      <a
                        className="dropdown-item"
                        href="/"
                        role="button"
                        onClick={this.logOut}
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/admin/cu-dan/danh-sach-cu-dan">
            <Resident options="1" />
          </Route>
          <Route exact path="/admin/cu-dan/tai-khoan-cu-dan">
            <Resident options="2" />
          </Route>
          <Route exact path="/admin/nha-quan-tri">
            <TaiKhoanQuanTri />
          </Route>
          <Route exact path="/admin/can-ho">
            <CanHo />
          </Route>
          <Route exact path="/admin/thong-bao">
            <ThongBao />
          </Route>
          <Route exact path="/admin/chi-phi/quan-ly">
            <PhiDichVu />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default Dashboard;
