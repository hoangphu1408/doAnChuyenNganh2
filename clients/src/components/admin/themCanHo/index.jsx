import React, { Component } from "react";
import { connect } from "react-redux";
//import * as actions from "../../../redux/actions/account";
class ThemCanHo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: true,
      taiKhoanCuDan: {
        email: "",
        password: "",
        _idCuDan: "",
      },
      errors: {
        email: "",
        password: "",
      },
    };
  }
  _handleSubmit = (e) => {
    e.preventDefault();
  };
  _handlerChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      taiKhoanCuDan: { ...this.state.taiKhoanCuDan, [name]: value },
    });
  };
  _handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = this.validateInput(name, value);
    this.setState({ errors: { ...this.state.errors, [name]: errorMsg } });
  };
  openForm = (value) => {
    if (value === this.state.opened)
      return this.setState({
        opened: !value,
      });
    else
      return this.setState({
        opened: value,
      });
  };

  // validation
  validateInput = (name, value) => {
    let errorsMsg = "";
    if (name === "email") {
      // eslint-disable-next-line
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!value) {
        errorsMsg = "Email không được bỏ trống";
      } else if (!re.test(value)) {
        errorsMsg = "Email không hợp lệ";
      }
    }
    if (name === "password") {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
      if (!value) {
        errorsMsg = "Password không được bỏ trống";
      } else if (!re.test(value)) {
        errorsMsg = "Password không hợp lệ";
      }
    }
    return errorsMsg;
  };
  renderErrors = (errorsMsg) => {
    if (errorsMsg !== "") {
      return <p className="form-alert">{errorsMsg}</p>;
    } else {
      return "";
    }
  };
  renderDanhSachCuDan = () => {
    return this.props.danhSachCuDan?.map((item) => {
      if (item.daCoTaiKhoan === false)
        return (
          <option key={item._id} value={item._id}>
            {item.hoVaTenDem} {item.ten}
          </option>
        );
      else return "";
    });
  };
  themTaiKhoanCuDanToSV = () => {
    this.props.saveAccount(this.state.taiKhoanCuDan);
  };
  renderForm = () => {
    if (this.state.opened === false) return "";
    else
      return (
        <div className="addingResident card m-auto">
          <div className="card-body">
            <h2 className="addingResident__title">Thêm tài khoản cư dân</h2>
            <form onSubmit={this._handleSubmit}>
              <div className="row row-space">
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Email</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="email"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                    {this.renderErrors(this.state.errors.email)}
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Password</label>
                    <input
                      type="password"
                      className="addingResident__input"
                      name="password"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                    {this.renderErrors(this.state.errors.password)}
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-12">
                  <div className="input-group">
                    <label htmlFor="">Danh sách cư dân</label>
                    <select
                      name="_idCuDan"
                      onChange={this._handlerChange}
                      className="addingResident__input addingResident__input--select"
                    >
                      <option value="">Choose this</option>
                      {this.renderDanhSachCuDan()}
                    </select>
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <button
                  className="btn addingResident__btn"
                  onClick={this.themTaiKhoanCuDanToSV}
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      );
  };
  render() {
    return (
      <div className="pb-3">
        <button
          className="btn btn-primary"
          onClick={() => this.openForm("true")}
        >
          + Thêm tài khoản cư dân
        </button>
        {this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //   return {
  //     danhSachCuDan: state.residentReducer.danhSachCuDan,
  //   };
};

const mapDispatchToProps = (dispatch) => {
  //   return {
  //     saveAccount: (data) => {
  //       dispatch(actions.themTKCuDan(data));
  //     },
  //   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemCanHo);
