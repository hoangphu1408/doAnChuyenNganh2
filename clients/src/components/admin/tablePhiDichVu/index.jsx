import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { orderBy } from "lodash";
import ReactDatatable from "@ashvin27/react-datatable";
import * as actions from "../../../redux/actions/chiPhi";
class TablePhiDichVu extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key: "maChiPhi",
        text: "Mã chi phí",
        sortable: true,
      },
      {
        key: "tenLoaiChiPhi",
        text: "Tên loại chi phí",
        sortable: true,
      },
      {
        key: "giaTien",
        text: "Giá tiền",
        sortable: true,
        cell: (record, index) => {
          return record.giaTien.toLocaleString() + " vnđ";
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
      infoChiPhi: {
        _id: "",
        maChiPhi: "",
        tenLoaiChiPhi: "",
        giaTien: "",
      },
    };
  }

  editRecord = (record, index, value) => {
    console.log("edit record", index, record);
    if (index !== this.state.indexEdit && value === this.state.opened) {
      return this.setState({
        indexEdit: index,
        opened: value,
        infoChiPhi: {
          _id: record._id,
          maChiPhi: record.maChiPhi,
          tenLoaiChiPhi: record.tenLoaiChiPhi,
          giaTien: record.giaTien,
        },
      });
    } else if (value === this.state.opened && index === this.state.indexEdit)
      return this.setState({
        opened: !value,
        infoChiPhi: {
          _id: "",
          maChiPhi: "",
          tenLoaiChiPhi: "",
          giaTien: "",
        },
      });
    else
      return this.setState({
        opened: value,
        infoChiPhi: {
          _id: record._id,
          maChiPhi: record.maChiPhi,
          tenLoaiChiPhi: record.tenLoaiChiPhi,
          giaTien: record.giaTien,
        },
      });
  };

  deleteRecord = (record, index) => {
    this.props.deleteChiPhi(record._id);
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
      infoChiPhi: { ...this.state.infoChiPhi, [name]: value },
    });
  };
  _handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = this.validateInput(name, value);
    this.setState({ errors: { ...this.state.errors, [name]: errorMsg } });
  };
  componentDidMount = () => {
    this.props.getListChiPhi();
  };
  chinhSuaChiPhi = () => {
    this.props.editChiPhi(this.state.infoChiPhi);
  };
  renderEdit = () => {
    let { infoChiPhi } = this.state;
    if (this.state.opened === true) {
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
                      value={infoChiPhi.maChiPhi}
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
                      value={infoChiPhi.tenLoaiChiPhi}
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
                      value={infoChiPhi.giaTien}
                      onChange={this._handlerChange}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  className="btn addingResident__btn"
                  onClick={this.chinhSuaChiPhi}
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
    let { danhSachChiPhi } = this.props;
    console.log(danhSachChiPhi);
    return (
      <div>
        {this.renderEdit()}
        <ReactDatatable
          config={this.config}
          records={danhSachChiPhi}
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
    danhSachChiPhi: state.chiPhiReducer.chiPhi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListChiPhi: () => {
      dispatch(actions.getDanhSachChiPhi());
    },
    editChiPhi: (data) => {
      dispatch(actions.suaChiPhi(data));
    },
    deleteChiPhi: (data) => {
      dispatch(actions.xoaChiPhi(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TablePhiDichVu);
