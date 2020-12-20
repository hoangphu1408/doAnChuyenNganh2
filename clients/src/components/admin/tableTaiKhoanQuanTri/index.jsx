import React, { Component, Fragment } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { connect } from "react-redux";
import { orderBy } from "lodash";
import * as actions from "../../../redux/actions/account";
import "./styles.css";
class TableTaiKhoanQuanTri extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key: "email",
        text: "Email",
        sortable: true,
      },
      {
        key: "role",
        text: "Quyền",
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
                style={{ marginRight: "5px" }}
              >
                Xóa
              </button>
              <button
                className="btn btn-info btn-sm"
                onClick={this.editPasswordRecord.bind(
                  this,
                  record,
                  index,
                  true
                )}
                style={{ marginRight: "5px" }}
              >
                Đổi mật khẩu
              </button>
              <button
                className="btn btn-info btn-sm"
                onClick={this.editEmailRecord.bind(this, record, index, true)}
              >
                Đổi email
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
      openedPW: false,
      openedEmail: false,
      indexEdit: "",
      chiTietTaiKhoan: {
        _id: "",
        role: "",
        email: "",
        edit_email: "",
        email_verify: "",
        password: "",
        date: "",
        status: "",
      },
      error: {
        password: "",
      },
    };
  }
  editSetState = (record, index, value, type) => {
    if (index !== this.state.indexEdit && value === this.state[type]) {
      return this.setState({
        indexEdit: index,
        [type]: value,
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
    } else if (value === this.state[type] && index === this.state.indexEdit)
      return this.setState({
        [type]: !value,
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
        [type]: value,
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
  editRecord = (record, index, value) => {
    return this.editSetState(record, index, value, "opened");
  };

  editPasswordRecord = (record, index, value) => {
    return this.editSetState(record, index, value, "openedPW");
  };
  editEmailRecord = (record, index, value) => {
    return this.editSetState(record, index, value, "openedEmail");
  };
  deleteRecord = (record, index) => {
    this.props.deleteAccount(record._id);
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
  _handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = this.validateInput(name, value);
    this.setState({ error: { ...this.state.errors, [name]: errorMsg } });
  };

  validateInput = (name, value) => {
    let errorsMsg = "";
    if (name === "edit_email") {
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

  handleChange = (date) => {
    this.setState({
      chiTietTaiKhoan: { ...this.state.chiTietTaiKhoan, date: date },
    });
  };
  componentDidMount = () => {
    this.props.saveListAccount();
  };
  editTaiKhoan = () => {
    this.props.editAccount(this.state.chiTietTaiKhoan);
    this.setState({
      opened: false,
    });
  };
  editPW = () => {
    this.props.editPassword(this.state.chiTietTaiKhoan);
    this.setState({
      openedPW: false,
    });
  };
  editEmail = () => {
    this.props.editEmail(this.state.chiTietTaiKhoan);
    this.setState({
      openedEmail: false,
    });
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
                    <label htmlFor="">ID</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="id"
                      onChange={this._handlerChange}
                      value={chiTietTaiKhoan._id}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Email</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="email"
                      onChange={this._handlerChange}
                      value={chiTietTaiKhoan.email}
                    />
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Xác thực email</label>
                    <select
                      name="email_verify"
                      onChange={this._handlerChange}
                      className="addingResident__input addingResident__input--select"
                      value={chiTietTaiKhoan.email_verify}
                    >
                      <option value="true">Đã kích hoạt</option>
                      <option value="false">Chưa kích hoạt</option>
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Trạng thái tài khoản</label>
                    <select
                      name="status"
                      onChange={this._handlerChange}
                      className="addingResident__input addingResident__input--select"
                      value={chiTietTaiKhoan.status}
                    >
                      <option value="true">Đang hoạt động</option>
                      <option value="false">Tạm dừng hoạt động</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <button
                  className="btn addingResident__btn"
                  onClick={this.editTaiKhoan}
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
  renderEditPW = () => {
    let { chiTietTaiKhoan } = this.state;
    if (this.state.openedPW === true) {
      return (
        <div className="addingResident card m-auto">
          <div className="card-body">
            <h2 className="addingResident__title">Thay đổi mật khẩu</h2>
            <form onSubmit={this._handleSubmit}>
              <div className="row row-space">
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Email</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="email"
                      value={chiTietTaiKhoan.email}
                      disabled
                    />
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
                    {this.renderErrors(this.state.error.password)}
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <button
                  className="btn addingResident__btn"
                  onClick={this.editPW}
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
  renderEditEmail = () => {
    let { chiTietTaiKhoan } = this.state;
    if (this.state.openedEmail === true) {
      return (
        <div className="addingResident card m-auto">
          <div className="card-body">
            <h2 className="addingResident__title">Thay đổi email</h2>
            <form onSubmit={this._handleSubmit}>
              <div className="row row-space">
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Email hiện tại</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="email_current"
                      value={chiTietTaiKhoan.email}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Email thay đổi</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="edit_email"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                    {this.renderErrors(this.state.error.email)}
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <button
                  className="btn addingResident__btn"
                  onClick={this.editEmail}
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
    let { danhSachTaiKhoan } = this.props;
    return (
      <div>
        {this.renderEdit()}
        {this.renderEditPW()}
        {this.renderEditEmail()}
        <ReactDatatable
          config={this.config}
          records={danhSachTaiKhoan}
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
    danhSachTaiKhoan: state.accountReducer.danhSachTaiKhoan,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveListAccount: () => {
      dispatch(actions.layDanhSachTaiKhoan());
    },
    editAccount: (data) => {
      dispatch(actions.chinhSuaTaiKhoan(data));
    },
    editPassword: (data) => {
      dispatch(actions.thayDoiMatKhau(data));
    },
    editEmail: (data) => {
      dispatch(actions.thayDoiEmail(data));
    },
    deleteAccount: (data) => {
      dispatch(actions.xoaTaiKhoan(data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableTaiKhoanQuanTri);
