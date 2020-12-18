import React, { Component, Fragment } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { orderBy } from "lodash";
import * as actions from "../../../redux/actions/resident";
import "./styles.css";
class TableTaiKhoanQuanTri extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key: "role",
        text: "Quyền",
        className: "firstName",
        sortable: true,
      },
      {
        key: "email",
        text: "Email",
        sortable: true,
      },
      {
        key: "email_verify",
        text: "Xác thực email",
        sortable: true,
        cell: (record, index) => {
          if (record.email_verify === true) {
            return <p className="table__success">Đã xác thực</p>;
          } else {
            return <p className="table__warning">Chưa xác thực</p>;
          }
        },
      },
      {
        key: "date",
        text: "Ngày tạo",
        sortable: true,
      },
      {
        key: "status",
        text: "Trạng thái",
        sortable: true,
        cell: (record, index) => {
          if (record.status === true) {
            return <p className="table__success">Đang hoạt động</p>;
          } else {
            return <p className="table__warning">Tạm ngưng hoạt động</p>;
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
      filename: "DanhSachTaiKhoanQuanTri",
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
      chiTietTaiKhoan: {
        _id: "",
        role: "",
        email: "",
        email_verify: "",
        password: "",
        date: "",
        status: "",
      },
    };
  }

  editRecord = (record, index, value) => {
    console.log("edit record", index, record);
    if (index !== this.state.indexEdit && value === this.state.opened) {
      return this.setState({
        indexEdit: index,
        opened: value,
        chiTietTaiKhoan: {
          _id: record._id,
          role: record.role,
          email: record.email,
          date: new Date(record.date),
          email_verify: record.email_verify,
          password: record.password,
          status: record.status,
        },
      });
    } else if (value === this.state.opened && index === this.state.indexEdit)
      return this.setState({
        opened: !value,
        chiTietTaiKhoan: {
          _id: "",
          role: "",
          email: "",
          email_verify: "",
          password: "",
          date: "",
          status: "",
        },
      });
    else
      return this.setState({
        opened: value,
        chiTietTaiKhoan: {
          _id: record._id,
          role: record.role,
          email: record.email,
          date: new Date(record.date),
          email_verify: record.email_verify,
          password: record.password,
          status: record.status,
        },
      });
  };

  deleteRecord = (record, index) => {
    // this.props.xoaCuDan(record._id);
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
      chiTietTaiKhoan: { ...this.state.chiTietTaiKhoan, [name]: value },
    });
  };
  handleChange = (date) => {
    this.setState({
      chiTietTaiKhoan: { ...this.state.chiTietTaiKhoan, date: date },
    });
  };
  componentDidMount = () => {
    this.props.saveListResident();
  };
  editResident = () => {
    this.props.editResident(this.state.chiTietTaiKhoan);
  };
  renderEdit = () => {
    let { chiTietTaiKhoan } = this.state;
    if (this.state.opened === true) {
      return (
        <div className="addingResident card m-auto">
          <div className="card-body">
            <h2 className="addingResident__title">Chi tiết tài khoản</h2>
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
                      value={chiTietTaiKhoan.ten}
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
                      value={chiTietTaiKhoan.hoVaTenDem}
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
                      selected={this.state.chiTietTaiKhoan.namSinh}
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
                      value={chiTietTaiKhoan.gioiTinh}
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
                      value={chiTietTaiKhoan.canCuocCongDan}
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
                      value={chiTietTaiKhoan.hoKhau}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableTaiKhoanQuanTri);
