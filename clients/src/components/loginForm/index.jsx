import React, { Component } from "react";
import { connect } from "react-redux";

import { saveStatus, getALL } from "../../redux/actions/isRegister";
import * as actions from "../../redux/actions/isLogin";
import "./index.css";
import history from "../../routes/history";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  updateStatus = (status) => {
    this.props.onSaveDS(status);
  };
  loginAction = () => {
    this.props.isLogin(this.state);
    this.props.getError();
  };
  renderError = (x) => {
    if (x.length === 0) {
      return "";
    } else if (this.props.ErrorMsgReducer.error_login === "") {
      return "";
    } else {
      return (
        <p className="alert alert-danger">
          {this.props.ErrorMsgReducer.error_login}
        </p>
      );
    }
  };
  render() {
    let { ErrorMsgReducer } = this.props;
    return (
      <div className="login-form_wrapper">
        <div className="form-group">
          <form onSubmit={this.handleSubmit}>
            <div className="login-form">
              <div className="row">
                <div className="col-12">
                  <h2 className="login-title text-center pb-2">Login</h2>
                  {this.renderError(ErrorMsgReducer)}
                </div>
              </div>
              <div className="user-name">
                <span
                  className="icon iconify"
                  data-icon="uil-user"
                  data-inline="false"
                ></span>
                <input
                  name="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="email"
                  placeholder="Email or username"
                />
              </div>
              <div className="password">
                <span
                  className="icon iconify"
                  data-icon="uil:key-skeleton"
                  data-inline="false"
                ></span>
                <input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  className="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="remember pt-2 row">
              <div className="col-6">
                <input type="checkbox" id="login_remember" />
                <span> Remember</span>
              </div>
              <div className="col-6">
                <a href="abc">Forgot password?</a>
              </div>
              <div className="col-12 pt-3">
                <button
                  className="login-btn"
                  onClick={() => this.loginAction()}
                >
                  Log into your account
                </button>
              </div>
              <div className="col-12 pt-3">
                <button
                  className="login-btn-signUp"
                  onClick={() => this.updateStatus(true)}
                >
                  Sign up here
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    RegisterReducer: state.RegisterReducer,
    ErrorMsgReducer: state.ErrorMsgReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getError: () => {
      dispatch(getALL());
    },
    onSaveDS: (status) => {
      dispatch(saveStatus(status));
    },
    isLogin: (data) => {
      dispatch(actions.actLogin(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
