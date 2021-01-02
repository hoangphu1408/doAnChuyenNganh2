import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { orderBy } from "lodash";
import Popup from "reactjs-popup";
import ReactDatatable from "@ashvin27/react-datatable";
import * as actions from "../../../redux/actions/chiPhi";
class TablePhieuGiuXe extends Component {
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
                    infoPhieuGiuXe: {
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
          return record.tongTien + " vnđ";
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
      records: {},
      opened: false,
      indexEdit: "",
      infoPhieuGiuXe: {
        _id: "",
        noiDung: "",
        tinhTrang: "",
        tongTien: "",
        _canHo: "",
        ngayLapPhieu: "",
      },
      giaTienXe: {
        xeOto: 0,
        xeMay: 0,
        xeDap: 0,
      },
    };
  }

  editRecord = (record, index, value) => {
    console.log("edit record", index, record);
    if (index !== this.state.indexEdit && value === this.state.opened) {
      return this.setState({
        indexEdit: index,
        opened: value,
        infoPhieuGiuXe: {
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
        infoPhieuGiuXe: {
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
        infoPhieuGiuXe: {
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
    const { infoPhieuGiuXe, giaTienXe } = this.state;
    return (close) => (
      <div className="modalBill">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Chi tiết phiếu thu tiền giữ xe
            </h5>
          </div>
          <div className="modal-body">
            <b>Căn hộ: {infoPhieuGiuXe._canHo}</b>
            <br />
            <b>Ngày lập phiếu: {infoPhieuGiuXe.ngayLapPhieu} </b>
            <table className="table_chiPhi mt-2">
              <thead>
                <tr>
                  <th>Loại xe</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Xe ôtô</td>
                  <td>{infoPhieuGiuXe.noiDung.oto}</td>
                  <td>{giaTienXe.xeOto}</td>
                  <td>{infoPhieuGiuXe.noiDung.tienOto} vnđ</td>
                </tr>
                <tr>
                  <td>Xe máy</td>
                  <td>{infoPhieuGiuXe.noiDung.xeMay}</td>
                  <td>{giaTienXe.xeMay}</td>
                  <td>{infoPhieuGiuXe.noiDung.tienXeMay} vnđ</td>
                </tr>
                <tr>
                  <td>Xe đạp</td>
                  <td>{infoPhieuGiuXe.noiDung.xeDap}</td>
                  <td>{giaTienXe.xeOto}</td>
                  <td>{infoPhieuGiuXe.noiDung.tienXeDap} vnđ</td>
                </tr>
                <tr>
                  <td colSpan="3" style={{ textAlign: "left" }}>
                    <b>Tổng tiền</b>
                  </td>
                  <td colSpan="1">
                    <b>{infoPhieuGiuXe.tongTien} vnđ</b>
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
    this.props.deletePhieuGiuXe(record._id);
  };
  checkTT = (record, index) => {
    const dt = {
      _id: record._id,
      tinhTrang: record.tinhTrang,
    };
    this.props.checkPhieuGiuXe(dt);
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
      infoPhieuGiuXe: {
        ...this.state.infoPhieuGiuXe,
        noiDung: { ...this.state.infoPhieuGiuXe.noiDung, [name]: value },
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
    this.props.getListPhieuGiuXe();
    this.props.getListChiPhi();
  };
  chinhSuaPhieuGiuXe = () => {
    const { infoPhieuGiuXe } = this.state;
    const dt = {
      _id: infoPhieuGiuXe._id,
      id_canHo: infoPhieuGiuXe.id_canHo,
      xeOto: infoPhieuGiuXe.noiDung.oto,
      xeMay: infoPhieuGiuXe.noiDung.xeMay,
      xeDap: infoPhieuGiuXe.noiDung.xeDap,
    };
    this.props.editPhieuGiuXe(dt);
  };
  renderEdit = () => {
    let { infoPhieuGiuXe } = this.state;
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
                      value={infoPhieuGiuXe.id_canHo}
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
                      value={infoPhieuGiuXe.noiDung.oto}
                      className="addingResident__input"
                      name="xeOto"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="input-group">
                    <label htmlFor="">Xe máy</label>
                    <input
                      type="number"
                      min="0"
                      value={infoPhieuGiuXe.noiDung.xeMay}
                      className="addingResident__input"
                      name="xeMay"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="input-group">
                    <label htmlFor="">Xe đạp</label>
                    <input
                      type="number"
                      className="addingResident__input"
                      min="0"
                      value={infoPhieuGiuXe.noiDung.xeDap}
                      name="xeDap"
                      onChange={this._handlerChange}
                      onBlur={this._handleBlur}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <button
                  className="btn addingResident__btn"
                  onClick={this.chinhSuaPhieuGiuXe}
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
    let { danhSachPhieuGiuXe } = this.props;
    return (
      <div>
        {this.renderEdit()}
        <ReactDatatable
          config={this.config}
          records={danhSachPhieuGiuXe}
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
    danhSachPhieuGiuXe: state.chiPhiReducer.phieuGiuXe,
    danhSachCanHo: state.canHoReducer.danhSachCanHo,
    danhSachChiPhi: state.chiPhiReducer.chiPhi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListChiPhi: () => {
      dispatch(actions.getDanhSachChiPhi());
    },
    getListPhieuGiuXe: () => {
      dispatch(actions.getDanhSachPhieuGiuXe());
    },
    editPhieuGiuXe: (data) => {
      dispatch(actions.suaPhieuGiuXe(data));
    },
    deletePhieuGiuXe: (data) => {
      dispatch(actions.xoaPhieuGiuXe(data));
    },
    checkPhieuGiuXe: (data) => {
      dispatch(actions.checkThanhToanPGX(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TablePhieuGiuXe);
