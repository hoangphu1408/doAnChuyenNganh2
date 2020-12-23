import React, { Component, Fragment } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { orderBy } from "lodash";
import * as actions from "../../../redux/actions/resident";
import "./styles.css";
class TableResident extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key: "ten",
        text: "Tên",
        className: "firstName",
        sortable: true,
      },
      {
        key: "hoVaTenDem",
        text: "Họ và tên đệm",
        sortable: true,
      },
      {
        key: "daCoTaiKhoan",
        text: "Tài khoàn",
        sortable: true,
        cell: (record, index) => {
          if (record.daCoTaiKhoan === false) {
            return <p className="table__warning">Chưa có tài khoản</p>;
          } else {
            return <p className="table__success">Đã có tài khoản</p>;
          }
        },
      },
      {
        key: "date",
        text: "Năm sinh",
        className: "birthday",
        sortable: true,
      },
      {
        key: "gioiTinh",
        text: "Giới tính",
        className: "gender",
        sortable: true,
      },
      {
        key: "canCuocCongDan",
        text: "Căn Cước Công Dân",
        className: "identificationCard",
        sortable: true,
      },
      {
        key: "hoKhau",
        text: "Hộ Khẩu",
        className: "table__household",
        sortable: true,
        cell: (record, index) => {
          if (record.hoKhau === "Chưa bổ sung") {
            return <p className="table__success">{record.hoKhau}</p>;
          } else {
            return <p className="table__warning">{record.hoKhau}</p>;
          }
        },
      },
      {
        key: "action",
        text: "Action",
        cell: (record, index) => {
          return (
            <Fragment>
              <button
                className="btn btn-primary btn-sm"
                onClick={this.editRecord.bind(this, record, index, true)}
                style={{ marginRight: "5px" }}
              >
                Sửa
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={this.deleteRecord.bind(this, record, index)}
              >
                Xóa
              </button>
            </Fragment>
          );
        },
      },
    ];
    this.config = {
      page_size: 10,
      length_menu: [10, 20, 50],
      show_filter: true,
      show_pagination: true,
      filename: "DanhSachCuDan",
      key_column: "_id",
      button: {
        excel: true,
        csv: true,
        print: true,
      },
    };
    this.state = {
      records: {},
      opened: false,
      indexEdit: "",
      chiTietCuDan: {
        _id: "",
        ten: "",
        hoVaTenDem: "",
        namSinh: "",
        gioiTinh: "",
        canCuocCongDan: "",
        hoKhau: "",
      },
    };
  }

  editRecord = (record, index, value) => {
    console.log("edit record", index, record);
    if (index !== this.state.indexEdit && value === this.state.opened) {
      return this.setState({
        indexEdit: index,
        opened: value,
        chiTietCuDan: {
          _id: record._id,
          ten: record.ten,
          hoVaTenDem: record.hoVaTenDem,
          namSinh: new Date(record.namSinh),
          gioiTinh: record.gioiTinh,
          canCuocCongDan: record.canCuocCongDan,
          hoKhau: record.hoKhau,
        },
      });
    } else if (value === this.state.opened && index === this.state.indexEdit)
      return this.setState({
        opened: !value,
        chiTietCuDan: {
          _id: "",
          firstName: "",
          lastName: "",
          birthday: "",
          gender: "",
          ID: "",
          household: "",
        },
      });
    else
      return this.setState({
        opened: value,
        chiTietCuDan: {
          _id: record._id,
          ten: record.ten,
          hoVaTenDem: record.hoVaTenDem,
          namSinh: new Date(record.namSinh),
          gioiTinh: record.gioiTinh,
          canCuocCongDan: record.canCuocCongDan,
          hoKhau: record.hoKhau,
        },
      });
  };

  deleteRecord = (record, index) => {
    this.props.xoaCuDan(record._id);
  };

  onSort = (column, records, sortOrder) => {
    return orderBy(records, [column], [sortOrder]);
  };
  _handleSubmit = (e) => {
    e.preventDefault();
  };
  _handlerChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      chiTietCuDan: { ...this.state.chiTietCuDan, [name]: value },
    });
  };
  handleChange = (date) => {
    this.setState({
      chiTietCuDan: { ...this.state.chiTietCuDan, namSinh: date },
    });
  };
  componentDidMount = () => {
    this.props.saveListResident();
  };
  editResident = () => {
    this.props.editResident(this.state.chiTietCuDan);
  };
  renderEdit = () => {
    let { chiTietCuDan } = this.state;
    if (this.state.opened === true) {
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
                      value={chiTietCuDan.ten}
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
                      value={chiTietCuDan.hoVaTenDem}
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
                      selected={this.state.chiTietCuDan.namSinh}
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
                      value={chiTietCuDan.gioiTinh}
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
                      value={chiTietCuDan.canCuocCongDan}
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
                      value={chiTietCuDan.hoKhau}
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
                  onClick={this.editResident}
                >
                  Sửa
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  };

  render() {
    let { danhSachCuDan } = this.props;
    return (
      <div>
        {this.renderEdit()}
        <ReactDatatable
          config={this.config}
          records={danhSachCuDan}
          columns={this.columns}
          onSort={this.onSort}
          key
        />
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
    saveListResident: () => {
      dispatch(actions.luuDanhSachCuDan());
    },
    editResident: (data) => {
      dispatch(actions.suaCuDan(data));
    },
    xoaCuDan: (id) => {
      dispatch(actions.xoaCuDan(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableResident);
