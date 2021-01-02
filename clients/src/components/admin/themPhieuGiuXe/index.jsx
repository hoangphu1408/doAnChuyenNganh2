import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/chiPhi";
import * as actionsCH from "../../../redux/actions/canHo";
class ThemPhieuGiuXe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      phieuGiuXe: {
        id_canHo: "",
        xeOto: 0,
        xeMay: 0,
        xeDap: 0,
      },
      errors: {
        xeOto: "",
        xeMay: "",
        xeDap: "",
      },
    };
  }
  _handleSubmit = (e) => {
    e.preventDefault();
  };
  _handlerChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      phieuGiuXe: { ...this.state.phieuGiuXe, [name]: value },
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
    if (name === "xeOto") {
      // eslint-disable-next-line
      const re = /^\d+$/;
      if (!value) {
        errorsMsg = "Số xe ôtô không được bỏ trống";
      } else if (!re.test(value)) {
        errorsMsg = "Số xe ôtô không hợp lệ";
      }
    }
    if (name === "xeMay") {
      // eslint-disable-next-line
      const re = /^\d+$/;
      if (!value) {
        errorsMsg = "Số xe máy không được bỏ trống";
      } else if (!re.test(value)) {
        errorsMsg = "Số xe máy không hợp lệ";
      }
    }
    if (name === "xeDap") {
      // eslint-disable-next-line
      const re = /^\d+$/;
      if (!value) {
        errorsMsg = "Số xe đạp không được bỏ trống";
      } else if (!re.test(value)) {
        errorsMsg = "Số xe đạp không hợp lệ";
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
  renderDanhSachCanHo = () => {
    return this.props.danhSachCanHo?.map((item) => {
      return (
        <option key={item._id} value={item._id}>
          {item.maToaNha}-{item.soTang}-{item.soCanHo}
        </option>
      );
    });
  };
  themPhieuGiuXe = () => {
    this.props.addPhieuGiuXe(this.state.phieuGiuXe);
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
            <h2 className="addingResident__title">Thêm phiếu giữ xe</h2>
            <form onSubmit={this._handleSubmit}>
              <div className="row row-space">
                <div className="col-12">
                  <div className="input-group">
                    <label htmlFor="">Danh sách căn hộ</label>
                    <select
                      name="id_canHo"
                      onChange={this._handlerChange}
                      className="addingResident__input addingResident__input--select"
                    >
                      <option value="">Choose this</option>
                      {this.renderDanhSachCanHo()}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-4">
                  <div className="input-group">
                    <label htmlFor="">Xe ôtô</label>
                    <input
                      type="number"
                      min="0"
                      value={this.state.phieuGiuXe.xeOto}
                      className="addingResident__input"
                      name="xeOto"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                    {this.renderErrors(this.state.errors.xeOto)}
                  </div>
                </div>
                <div className="col-4">
                  <div className="input-group">
                    <label htmlFor="">Xe máy</label>
                    <input
                      type="number"
                      min="0"
                      value={this.state.phieuGiuXe.xeMay}
                      className="addingResident__input"
                      name="xeMay"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                    {this.renderErrors(this.state.errors.xeMay)}
                  </div>
                </div>
                <div className="col-4">
                  <div className="input-group">
                    <label htmlFor="">Xe đạp</label>
                    <input
                      type="number"
                      className="addingResident__input"
                      min="0"
                      value={this.state.phieuGiuXe.xeDap}
                      name="xeDap"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                    {this.renderErrors(this.state.errors.xeDap)}
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  className="btn addingResident__btn"
                  onClick={this.themPhieuGiuXe}
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
          + Thêm phiếu giữ xe
        </button>
        {this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    danhSachCanHo: state.canHoReducer.danhSachCanHo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDanhSachCanHo: () => {
      dispatch(actionsCH.saveListCanHO());
    },
    addPhieuGiuXe: (data) => {
      dispatch(actions.themPhieuGiuXe(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemPhieuGiuXe);
