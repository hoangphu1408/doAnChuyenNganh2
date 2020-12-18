import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/resident";
class ThemTaiKhoanQuanTri extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: true,
      taiKhoanQuanTri: {
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
      taiKhoanQuanTri: { ...this.state.taiKhoanQuanTri, [name]: value },
    });
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
  themTaiKhoanQuanTriToSV = () => {
    this.props.saveAccount(this.state.taiKhoanQuanTri);
  };
  renderForm = () => {
    if (this.state.opened === false) return "";
    else
      return (
        <div className="addingResident card m-auto">
          <div className="card-body">
            <h2 className="addingResident__title">Thêm tài khoản quản trị</h2>
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
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">password</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="password"
                      onChange={this._handlerChange}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <button
                  className="btn addingResident__btn"
                  onClick={this.themTaiKhoanQuanTriToSV}
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
          + Thêm tài khoản quản trị
        </button>
        {this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveAccount: (data) => {
      //dispatch(actions.themTaiKhoanCuDan(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemTaiKhoanQuanTri);
