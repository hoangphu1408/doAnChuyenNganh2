import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "../../components/admin/dashboard";
import Sidebar from "../../components/admin/sidebar";
import "./styles.css";
class Admin extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Sidebar />
          <Dashboard />
        </div>
      </Router>
    );
  }
}

export default Admin;
