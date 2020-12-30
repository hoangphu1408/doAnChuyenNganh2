import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/canHo";
class ThemCanHo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      canHo: {
        soCanHo: "",
        soTang: "",
        maToaNha: "",
        chuSoHuu: "",
        chieuDai: "",
        chieuRong: "",
      },
      errors: {
        soCanHo: "",
        soTang: "",
        maToaNha: "",
        chuSoHuu: "",
        chieuDai: "",
        chieuRong: "",
      },
    };
  }
  _handleSubmit = (e) => {
    e.preventDefault();
  };
  _handlerChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      canHo: { ...this.state.canHo, [name]: value },
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
    if (name === "soCanHo") {
      // eslint-disable-next-line
      const re = /^\d+$/;
      if (!value) {
        errorsMsg = "Số căn hộ không được bỏ trống";
      } else if (!re.test(value)) {
        errorsMsg = "Số căn hộ không hợp lệ";
      }
    }
    if (name === "soTang") {
      // eslint-disable-next-line
      const re = /^\d+$/;
      if (!value) {
        errorsMsg = "Số tầng không được bỏ trống";
      } else if (!re.test(value)) {
        errorsMsg = "Số tầng không hợp lệ";
      }
    }
    if (name === "maToaNha") {
      // eslint-disable-next-line
      if (!value) errorsMsg = "Mã tòa nhà không được bỏ trống";
    }
    if (name === "chieuDai") {
      // eslint-disable-next-line
      const re = /^\d+$/;
      if (!value) {
        errorsMsg = "Chiều dài không được bỏ trống";
      } else if (!re.test(value)) {
        errorsMsg = "Chiều dài không hợp lệ";
      }
    }
    if (name === "chieuRong") {
      // eslint-disable-next-line
      const re = /^\d+$/;
      if (!value) {
        errorsMsg = "Chiều rộng không được bỏ trống";
      } else if (!re.test(value)) {
        errorsMsg = "Chiều rộng không hợp lệ";
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
      return (
        <option key={item._id} value={item._id}>
          {item.hoVaTenDem} {item.ten}
        </option>
      );
    });
  };
  themCanHoToSV = () => {
    this.props.themCanHo(this.state.canHo);
    console.log(this.state.canHo);
  };
  componentDidMount = () => {
    this.props.getDanhSachCanHo();
  };
  renderForm = () => {
    if (this.state.opened === false) return "";
    else
      return (
        <div className="addingResident card m-auto">
          <div className="card-body">
            <h2 className="addingResident__title">Thêm căn hộ</h2>
            <form onSubmit={this._handleSubmit}>
              <div className="row row-space">
                <div className="col-4">
                  <div className="input-group">
                    <label htmlFor="">Số căn hộ</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="soCanHo"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                    {this.renderErrors(this.state.errors.soCanHo)}
                  </div>
                </div>
                <div className="col-4">
                  <div className="input-group">
                    <label htmlFor="">Số tầng</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="soTang"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                    {this.renderErrors(this.state.errors.soTang)}
                  </div>
                </div>
                <div className="col-4">
                  <div className="input-group">
                    <label htmlFor="">Mã tòa nhà</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="maToaNha"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                    {this.renderErrors(this.state.errors.maToaNha)}
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-12">
                  <div className="input-group">
                    <label htmlFor="">Danh sách cư dân</label>
                    <select
                      name="chuSoHuu"
                      onChange={this._handlerChange}
                      className="addingResident__input addingResident__input--select"
                    >
                      <option value="">Choose this</option>
                      {this.renderDanhSachCuDan()}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Chiều dài</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="chieuDai"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                    {this.renderErrors(this.state.errors.chieuDai)}
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Chiều rộng</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="chieuRong"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                    {this.renderErrors(this.state.errors.chieuRong)}
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <button
                  className="btn addingResident__btn"
                  onClick={this.themCanHoToSV}
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
          + Thêm căn hộ
        </button>
        {this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    danhSachCuDan: state.residentReducer.danhSachCuDan,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDanhSachCanHo: () => {
      dispatch(actions.saveListCanHO());
    },
    themCanHo: (data) => {
      dispatch(actions.themCanHo(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemCanHo);
