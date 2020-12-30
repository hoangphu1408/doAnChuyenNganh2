import React, { Component, Fragment } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { connect } from "react-redux";
import { orderBy } from "lodash";
import * as actions from "../../../redux/actions/canHo";
class TableCanHo extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key: "soCanHo",
        text: "Số căn hộ",
        sortable: true,
      },
      {
        key: "soTang",
        text: "Số tầng",
        sortable: true,
      },
      {
        key: "maToaNha",
        text: "Mã tòa nhà",
        sortable: true,
      },
      {
        key: "_chuSoHuu",
        text: "Chủ sở hữu",
        sortable: true,
      },
      {
        key: "chieuDai",
        text: "Chiều dài",
        sortable: true,
        cell: (record) => {
          return record.chieuDai + " m2";
        },
      },
      {
        key: "chieuRong",
        text: "Chiều rộng",
        sortable: true,
        cell: (record) => {
          return record.chieuRong + " m2";
        },
      },
      {
        key: "dienTich",
        text: "Tổng diện tích",
        sortable: true,
        cell: (record) => {
          return record.dienTich + " m2";
        },
      },
      {
        key: "tinhTrang",
        text: "Tình trạng",
        sortable: true,
        cell: (record, index) => {
          if (record.tinhTrang === true) {
            return <p className="table__success">Đã có chủ sở hữu</p>;
          } else {
            return <p className="table__warning">Trống</p>;
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
      canHo: {
        _id: "",
        soCanHo: "",
        soTang: "",
        maToaNha: "",
        _idChuSoHuu: "",
        chuSoHuu: "",
        chieuDai: "",
        chieuRong: "",
        dienTich: "",
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

  editRecord = (record, index, value) => {
    console.log("edit record", index, record);
    if (record.chuSoHuu === undefined) record.chuSoHuu = "";
    if (index !== this.state.indexEdit && value === this.state.opened) {
      return this.setState({
        indexEdit: index,
        opened: value,
        canHo: {
          _id: record._id,
          soCanHo: record.soCanHo,
          soTang: record.soTang,
          maToaNha: record.maToaNha,
          _idChuSoHuu: record.chuSoHuu,
          chuSoHuu: record._chuSoHuu,
          chieuDai: record.chieuDai,
          chieuRong: record.chieuRong,
          dienTich: record.dienTich,
        },
      });
    } else if (value === this.state.opened && index === this.state.indexEdit)
      return this.setState({
        opened: !value,
        canHo: {
          _id: "",
          soCanHo: "",
          soTang: "",
          maToaNha: "",
          _idChuSoHuu: "",
          chuSoHuu: "",
          chieuDai: "",
          chieuRong: "",
          dienTich: "",
        },
      });
    else
      return this.setState({
        opened: value,
        canHo: {
          _id: record._id,
          soCanHo: record.soCanHo,
          soTang: record.soTang,
          maToaNha: record.maToaNha,
          _idChuSoHuu: record.chuSoHuu,
          chuSoHuu: record._chuSoHuu,
          chieuDai: record.chieuDai,
          chieuRong: record.chieuRong,
          dienTich: record.dienTich,
        },
      });
  };

  deleteRecord = (record, index) => {
    this.props.deleteCanHo(record._id);
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
      canHo: { ...this.state.canHo, [name]: value },
    });
  };
  _handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = this.validateInput(name, value);
    this.setState({ errors: { ...this.state.errors, [name]: errorMsg } });
  };
  componentDidMount = () => {
    this.props.getListCanHo();
  };
  chinhSuaCanHo = () => {
    this.props.editCanHo(this.state.canHo);
    console.log("State can ho", this.state.canHo);
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
  renderEdit = () => {
    let { canHo } = this.state;
    if (this.state.opened === true) {
      return (
        <div className="addingResident card m-auto">
          <div className="card-body">
            <h2 className="addingResident__title">Thêm tài khoản cư dân</h2>
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
                      value={canHo.soCanHo}
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
                      value={canHo.soTang}
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
                      value={canHo.maToaNha}
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
                      name="_idChuSoHuu"
                      onChange={this._handlerChange}
                      className="addingResident__input addingResident__input--select"
                      value={canHo._idChuSoHuu}
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
                      value={canHo.chieuDai}
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
                      value={canHo.chieuRong}
                    />
                    {this.renderErrors(this.state.errors.chieuRong)}
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <button
                  className="btn addingResident__btn"
                  onClick={this.chinhSuaCanHo}
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
    let { danhSachCanHo } = this.props;
    return (
      <div>
        {this.renderEdit()}
        <ReactDatatable
          config={this.config}
          records={danhSachCanHo}
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
    danhSachCanHo: state.canHoReducer.danhSachCanHo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getListCanHo: () => {
      dispatch(actions.saveListCanHO());
    },
    editCanHo: (data) => {
      dispatch(actions.chinhSuaCanHo(data));
    },
    deleteCanHo: (data) => {
      dispatch(actions.xoaCanHo(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableCanHo);
