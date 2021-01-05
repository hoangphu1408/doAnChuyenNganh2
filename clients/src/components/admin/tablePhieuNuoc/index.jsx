import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { orderBy } from "lodash";
import Popup from "reactjs-popup";
import ReactDatatable from "@ashvin27/react-datatable";
import * as actions from "../../../redux/actions/chiPhi";
import "./styles.css";
class TablePhieuNuoc extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key: "_canHo",
        text: "Căn hộ",
        sortable: true,
      },
      {
        key: "noiDung",
        text: "Nội dung",
        sortable: true,
        cell: (record, index) => {
          return (
            <Fragment>
              {/* <button
                className="btn btn-primary btn-sm"
                onClick={this.showDetail.bind(this, record, index, true)}
                style={{ marginRight: "5px" }}
              >
                Xem chi tiết
              </button> */}
              <Popup
                onOpen={() => {
                  this.setState({
                    infoPhieuNuoc: {
                      _id: record._id,
                      noiDung: record.noiDung,
                      tinhTrang: record.tinhTrang,
                      tongTien: record.tongTien,
                      _canHo: record._canHo,
                      id_canHo: record.id_canHo,
                      ngayLapPhieu: record.ngayLapPhieu,
                    },
                  });
                }}
                trigger={
                  <button className="btn btn-primary"> Xem chi tiết </button>
                }
                modal
              >
                {this.renderDetail()}
              </Popup>
            </Fragment>
          );
        },
      },
      {
        key: "tongTien",
        text: "Tổng tiền",
        sortable: true,
        cell: (record, index) => {
          return record.tongTien.toLocaleString() + " vnđ";
        },
      },
      {
        key: "ngayLapPhieu",
        text: "Ngày lập phiếu",
        sortable: true,
      },
      {
        key: "tinhTrang",
        text: "Tình trạng thanh toán",
        sortable: true,
        cell: (record, index) => {
          if (record.tinhTrang === true) {
            return <p className="table__success">Đã thanh toán</p>;
          } else {
            return <p className="table__warning">Chưa thanh toán</p>;
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
                className="btn btn-success btn-sm"
                onClick={this.checkTT.bind(this, record, index)}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-check"></i>
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
      filename: "DanhSachChiPhi",
      key_column: "_id",
      button: {
        excel: true,
        csv: true,
        print: true,
      },
    };
    this.state = {
      loading: true,
      records: {},
      opened: false,
      indexEdit: "",
      infoPhieuNuoc: {
        _id: "",
        noiDung: "",
        tinhTrang: "",
        tongTien: "",
        _canHo: "",
        ngayLapPhieu: "",
      },
      giaTriDM: {
        dinhMuc1: 0,
        dinhMuc2: 0,
        dinhMuc3: 0,
      },
    };
  }

  editRecord = (record, index, value) => {
    console.log("edit record", index, record);
    if (index !== this.state.indexEdit && value === this.state.opened) {
      return this.setState({
        indexEdit: index,
        opened: value,
        infoPhieuNuoc: {
          _id: record._id,
          noiDung: record.noiDung,
          tinhTrang: record.tinhTrang,
          tongTien: record.tongTien,
          id_canHo: record.id_canHo,
          _canHo: record._canHo,
          ngayLapPhieu: record.ngayLapPhieu,
        },
      });
    } else if (value === this.state.opened && index === this.state.indexEdit)
      return this.setState({
        opened: !value,
        infoPhieuNuoc: {
          _id: "",
          noiDung: "",
          tinhTrang: "",
          tongTien: "",
          _canHo: "",
          id_canHo: "",
          ngayLapPhieu: "",
        },
      });
    else
      return this.setState({
        opened: value,
        infoPhieuNuoc: {
          _id: record._id,
          noiDung: record.noiDung,
          tinhTrang: record.tinhTrang,
          tongTien: record.tongTien,
          id_canHo: record.id_canHo,
          _canHo: record._canHo,
          ngayLapPhieu: record.ngayLapPhieu,
        },
      });
  };
  renderDetail = () => {
    const { infoPhieuNuoc } = this.state;
    return (close) => (
      <div className="modalBill">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Chi tiết phiếu thu tiền nước
            </h5>
          </div>
          <div className="modal-body">
            <b>Căn hộ: {infoPhieuNuoc._canHo}</b>
            <br />
            <b>Ngày lập phiếu: {infoPhieuNuoc.ngayLapPhieu} </b>
            <table className="table_chiPhi mt-2">
              <thead>
                <tr>
                  <th>Chỉ số mới</th>
                  <th>Chỉ số cũ</th>
                  <th colSpan="2">Tiêu thụ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{infoPhieuNuoc.noiDung.chiSoMoi}</td>
                  <td>{infoPhieuNuoc.noiDung.chiSoCu}</td>
                  <td colSpan="2">{infoPhieuNuoc.noiDung.tieuThu}</td>
                </tr>
                <tr>
                  <td>Định mức 1</td>
                  <td>{infoPhieuNuoc.noiDung.dinhMuc1}</td>
                  <td rowSpan="1">1</td>
                  <td rowSpan="1">{infoPhieuNuoc.noiDung.tienDinhMuc1} vnđ</td>
                </tr>
                <tr>
                  <td>Định mức 2</td>
                  <td>{infoPhieuNuoc.noiDung.dinhMuc2}</td>
                  <td rowSpan="1">1</td>
                  <td rowSpan="1">{infoPhieuNuoc.noiDung.tienDinhMuc2} vnđ</td>
                </tr>
                <tr>
                  <td>Định mức 3</td>
                  <td>{infoPhieuNuoc.noiDung.dinhMuc3}</td>
                  <td rowSpan="1">1</td>
                  <td rowSpan="1">{infoPhieuNuoc.noiDung.tienDinhMuc3} vnđ</td>
                </tr>
                <tr>
                  <td colSpan="3" style={{ textAlign: "left" }}>
                    <b>Tổng tiền</b>
                  </td>
                  <td colSpan="1">
                    <b>{infoPhieuNuoc.tongTien} vnđ</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                close();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  deleteRecord = (record, index) => {
    this.props.deletePhieuNuoc(record._id);
  };
  checkTT = (record, index) => {
    const dt = {
      _id: record._id,
      tinhTrang: record.tinhTrang,
    };
    console.log(dt);
    this.props.checkPhieuNuoc(dt);
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
      infoPhieuNuoc: {
        ...this.state.infoPhieuNuoc,
        noiDung: { ...this.state.infoPhieuNuoc.noiDung, [name]: value },
      },
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
  componentDidMount = () => {
    this.props.getListPhieuNuoc();
    this.props.getListChiPhi();
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 5000);
  };
  chinhSuaPhieuNuoc = () => {
    const { infoPhieuNuoc } = this.state;
    const dt = {
      _id: infoPhieuNuoc._id,
      id_canHo: infoPhieuNuoc.id_canHo,
      chiSoCu: infoPhieuNuoc.noiDung.chiSoCu,
      chiSoMoi: infoPhieuNuoc.noiDung.chiSoMoi,
    };
    this.props.editPhieuNuoc(dt);
  };
  renderEdit = () => {
    let { infoPhieuNuoc } = this.state;
    if (this.state.opened === true) {
      return (
        <div className="addingResident card m-auto">
          <div className="card-body">
            <h2 className="addingResident__title">Sửa phiếu nước</h2>
            <form onSubmit={this._handleSubmit}>
              <div className="row row-space">
                <div className="col-12">
                  <div className="input-group">
                    <label htmlFor="">Danh sách căn hộ</label>
                    <select
                      name="id_canHo"
                      onChange={this._handlerChange}
                      value={infoPhieuNuoc.id_canHo}
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
                      value={infoPhieuNuoc.noiDung.chiSoMoi}
                      onChange={this._handlerChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <label htmlFor="">Chỉ số cũ</label>
                    <input
                      type="text"
                      className="addingResident__input"
                      name="chiSoCu"
                      value={infoPhieuNuoc.noiDung.chiSoCu}
                      onChange={this._handlerChange}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <button
                  className="btn addingResident__btn"
                  onClick={this.chinhSuaPhieuNuoc}
                >
                  Sửa phiếu
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  };

  render() {
    let { danhSachPhieuNuoc } = this.props;
    console.log(this.props.danhSachChiPhi);
    console.log(danhSachPhieuNuoc);
    return (
      <div>
        {this.renderEdit()}
        <ReactDatatable
          config={this.config}
          records={danhSachPhieuNuoc}
          columns={this.columns}
          onSort={this.onSort}
          loading={this.state.loading}
          key
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    danhSachPhieuNuoc: state.chiPhiReducer.phieuNuoc,
    danhSachCanHo: state.canHoReducer.danhSachCanHo,
    danhSachChiPhi: state.chiPhiReducer.chiPhi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListChiPhi: () => {
      dispatch(actions.getDanhSachChiPhi());
    },
    getListPhieuNuoc: () => {
      dispatch(actions.getDanhSachPhieuNuoc());
    },
    editPhieuNuoc: (data) => {
      dispatch(actions.suaPhieuNuoc(data));
    },
    deletePhieuNuoc: (data) => {
      dispatch(actions.xoaPhieuNuoc(data));
    },
    checkPhieuNuoc: (data) => {
      dispatch(actions.checkThanhToanPN(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TablePhieuNuoc);
