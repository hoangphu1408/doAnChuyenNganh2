import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/resident";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
class AddingResident extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      cuDan: {
        ten: "",
        hoVaTenDem: "",
        namSinh: "",
        gioiTinh: "Nam",
        canCuocCongDan: "",
        hoKhau: "Chưa bổ sung",
      },
    };
  }
  _handleSubmit = (e) => {
    e.preventDefault();
  };
  handleChange = (date) => {
    this.setState(
      {
        cuDan: { ...this.state.cuDan, namSinh: date },
      },
      () => {
        console.log(this.state.cuDan);
      }
    );
  };
  _handlerChange = (e) => {
    const { name, value } = e.target;
    this.setState({ cuDan: { ...this.state.cuDan, [name]: value } });
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
  addResidentToSV = () => {
    this.props.saveResident(this.state.cuDan);
  };
  renderForm = () => {
    if (this.state.opened === false) return "";
    else
      return (
        <div className="addingResident card m-auto">
          <div className="card-body">
            <h2 className="addingResident__title">Thêm cư dân</h2>
            <form onSubmit={this._handleSubmit}>
              <div className="row row-space">
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Tên</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="ten"
                      onChange={this._handlerChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Họ và tên đệm</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="hoVaTenDem"
                      onChange={this._handlerChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="" className="w-100">
                      Ngày sinh
                    </label>
                    <DatePicker
                      className="addingResident__input"
                      dateFormat="dd/MM/yyyy"
                      selected={this.state.cuDan.namSinh}
                      onChange={(date) => this.handleChange(date)}
                      name="namSinh"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    ></DatePicker>
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Giới tính</label>
                    <select
                      name="gioiTinh"
                      onChange={this._handlerChange}
                      className="addingResident__input addingResident__input--select"
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-6">
                  <div className="input-group">
                    <label>Căn cước công dân</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="canCuocCongDan"
                      onChange={this._handlerChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Hộ khẩu</label>
                    <select
                      name="hoKhau"
                      onChange={this._handlerChange}
                      className="addingResident__input addingResident__input--select"
                    >
                      <option value="Chưa bổ sung">Chưa nộp</option>
                      <option value="Đã nộp">Đã nộp</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <button
                  className="btn addingResident__btn"
                  onClick={this.addResidentToSV}
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
          + Add
        </button>
        {this.renderForm()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveResident: (data) => {
      dispatch(actions.themCuDan(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddingResident);
