import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/chiPhi";
import * as actionsCH from "../../../redux/actions/canHo";
class ThemPhieuQuanLy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      phieuQuanLy: {
        id_canHo: "",
      },
    };
  }
  _handleSubmit = (e) => {
    e.preventDefault();
  };
  _handlerChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      phieuQuanLy: { ...this.state.phieuQuanLy, [name]: value },
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
    this.props.addPhieuNuoc(this.state.phieuQuanLy);
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
            <h2 className="addingResident__title">Thêm phiếu quản lý</h2>
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
          + Thêm phiếu quản lý
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
      dispatch(actions.themPhieuQuanLy(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemPhieuQuanLy);
