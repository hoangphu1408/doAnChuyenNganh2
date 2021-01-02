import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { orderBy } from "lodash";
import Popup from "reactjs-popup";
import ReactDatatable from "@ashvin27/react-datatable";
import * as actions from "../../../redux/actions/chiPhi";
class TablePhieuQuanLy extends Component {
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
              <Popup
                onOpen={() => {
                  this.setState({
                    infoPhieuQuanLy: {
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
      infoPhieuQuanLy: {
        _id: "",
        noiDung: "",
        tinhTrang: "",
        tongTien: "",
        _canHo: "",
        ngayLapPhieu: "",
      },
      giaTien: "7000",
    };
  }

  renderDetail = () => {
    const { infoPhieuQuanLy } = this.state;
    return (close) => (
      <div className="modalBill">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Chi tiết phí quản lý căn hộ
            </h5>
          </div>
          <div className="modal-body">
            <b>Căn hộ: {infoPhieuQuanLy._canHo}</b>
            <br />
            <b>Ngày lập phiếu: {infoPhieuQuanLy.ngayLapPhieu} </b>
            <table className="table_chiPhi mt-2">
              <thead>
                <tr>
                  <th>Diện tích</th>
                  <th>DVT</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{infoPhieuQuanLy.noiDung.dienTich}</td>
                  <td>m2</td>
                  <td>{this.state.giaTien} vnđ</td>
                  <td>{infoPhieuQuanLy.tongTien} vnđ</td>
                </tr>
                <tr>
                  <td colSpan="3" style={{ textAlign: "left" }}>
                    <b>Tổng tiền</b>
                  </td>
                  <td colSpan="1">
                    <b>{infoPhieuQuanLy.tongTien} vnđ</b>
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
  componentDidMount = () => {
    this.props.getListPhieuQuanLy();
    this.props.getListChiPhi();
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 5000);
  };
  render() {
    let { danhSachPhieuQuanly } = this.props;
    return (
      <div>
        <ReactDatatable
          config={this.config}
          records={danhSachPhieuQuanly}
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
    danhSachPhieuQuanly: state.chiPhiReducer.phieuQuanLy,
    danhSachCanHo: state.canHoReducer.danhSachCanHo,
    danhSachChiPhi: state.chiPhiReducer.chiPhi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListChiPhi: () => {
      dispatch(actions.getDanhSachChiPhi());
    },
    getListPhieuQuanLy: () => {
      dispatch(actions.getDanhSachPhieuQuanLy());
    },
    deletePhieuNuoc: (data) => {
      dispatch(actions.xoaPhieuQuanLy(data));
    },
    checkPhieuNuoc: (data) => {
      dispatch(actions.checkThanhToanPQL(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TablePhieuQuanLy);
