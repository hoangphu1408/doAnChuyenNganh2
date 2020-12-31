import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/chiPhi";
import * as actionsCH from "../../../redux/actions/canHo";
class ThemPhieuNuoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      phieuNuoc: {
        id_canHo: "",
        chiSoCu: "",
        chiSoMoi: "",
      },
      errors: {
        chiSoCu: "",
        chiSoMoi: "",
      },
    };
  }
  _handleSubmit = (e) => {
    e.preventDefault();
  };
  _handlerChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      phieuNuoc: { ...this.state.phieuNuoc, [name]: value },
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
    if (name === "chiSoCu") {
      // eslint-disable-next-line
      const re = /^\d+$/;
      if (!value) {
        errorsMsg = "Chỉ số cũ không được bỏ trống";
      } else if (!re.test(value)) {
        errorsMsg = "Chỉ số cũ không hợp lệ";
      }
    }
    if (name === "chiSoMoi") {
      // eslint-disable-next-line
      const re = /^\d+$/;
      if (!value) {
        errorsMsg = "Chỉ số mới không được bỏ trống";
      } else if (!re.test(value)) {
        errorsMsg = "Chỉ số mới không hợp lệ";
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
  themPhieuNuoc = () => {
    this.props.addPhieuNuoc(this.state.phieuNuoc);
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
            <h2 className="addingResident__title">Thêm phiếu nước</h2>
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
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Chỉ số mới</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="chiSoMoi"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                    {this.renderErrors(this.state.errors.chiSoMoi)}
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Chỉ số cũ</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="chiSoCu"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                    {this.renderErrors(this.state.errors.chiSoMoi)}
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  className="btn addingResident__btn"
                  onClick={this.themPhieuNuoc}
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
          + Thêm phiếu nước
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
    addPhieuNuoc: (data) => {
      dispatch(actions.themPhieuNuoc(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemPhieuNuoc);
