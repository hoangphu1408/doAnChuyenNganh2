import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/chiPhi";
class ThemPhiDichVu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      infoChiPhi: {
        maChiPhi: "",
        tenLoaiChiPhi: "",
        giaTien: "",
      },
    };
  }
  _handleSubmit = (e) => {
    e.preventDefault();
  };
  _handlerChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      infoChiPhi: { ...this.state.infoChiPhi, [name]: value },
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
  themChiPhi = () => {
    this.props.addChiPhi(this.state.infoChiPhi);
  };
  renderForm = () => {
    if (this.state.opened === false) return "";
    else
      return (
        <div className="addingResident card m-auto">
          <div className="card-body">
            <h2 className="addingResident__title">Thêm phí dịch vụ</h2>
            <form onSubmit={this._handleSubmit}>
              <div className="row row-space">
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Mã phí dịch vụ</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="maChiPhi"
                      onChange={this._handlerChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Tên chi phí</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="tenLoaiChiPhi"
                      onChange={this._handlerChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-12">
                  <div className="input-group">
                    <label htmlFor="">Giá tiền</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="giaTien"
                      onChange={this._handlerChange}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  className="btn addingResident__btn"
                  onClick={this.themChiPhi}
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
          + Thêm chi phí
        </button>
        {this.renderForm()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addChiPhi: (data) => {
      dispatch(actions.themChiPhi(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(ThemPhiDichVu);
