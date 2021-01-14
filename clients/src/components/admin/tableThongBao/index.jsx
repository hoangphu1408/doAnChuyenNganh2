import React, { Component, Fragment } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { connect } from "react-redux";
import { orderBy } from "lodash";
import * as actions from "../../../redux/actions/thongBao";
import { Editor } from "@tinymce/tinymce-react";
class TableThongBao extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key: "email",
        text: "Người đăng",
        sortable: true,
      },
      {
        key: "theLoai",
        text: "Thể loại",
        sortable: true,
      },
      {
        key: "ngayDang",
        text: "Ngày đăng",
        sortable: true,
      },
      {
        key: "tinhTrang",
        text: "Trạng thái",
        sortable: true,
        cell: (record) => {
          if (record.tinhTrang === true) {
            return <p className="table__success">Hiện</p>;
          } else {
            return <p className="table__warning">Ẩn</p>;
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
                onClick={this.checkRecord.bind(this, record, index)}
              >
                <i className="fa fa-eye"></i>
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
      baiDang: {
        _id: "",
        id_taiKhoan: "",
        email: "",
        noiDung: "",
        hinhAnh: "",
        ngayDang: "",
        theLoai: "",
        tinhTrang: "",
      },
    };
  }

  editRecord = (record, index, value) => {
    console.log("edit record", index, record);
    if (index !== this.state.indexEdit && value === this.state.opened) {
      return this.setState({
        indexEdit: index,
        opened: value,
        baiDang: {
          _id: record._id,
          id_taiKhoan: record.id_taiKhoan,
          email: record.email,
          noiDung: record.noiDung,
          hinhAnh: record.hinhAnh,
          ngayDang: record.ngayDang,
          theLoai: record.theLoai,
          tinhTrang: record.tinhTrang,
        },
      });
    } else if (value === this.state.opened && index === this.state.indexEdit)
      return this.setState({
        opened: !value,
        baiDang: {
          _id: "",
          id_taiKhoan: "",
          email: "",
          noiDung: "",
          hinhAnh: "",
          ngayDang: "",
          theLoai: "",
          tinhTrang: "",
        },
      });
    else
      return this.setState({
        opened: value,
        baiDang: {
          _id: record._id,
          id_taiKhoan: record.id_taiKhoan,
          email: record.email,
          noiDung: record.noiDung,
          hinhAnh: record.hinhAnh,
          ngayDang: record.ngayDang,
          theLoai: record.theLoai,
          tinhTrang: record.tinhTrang,
        },
      });
  };

  deleteRecord = (record, index) => {
    this.props.deleteThongBao(record._id);
  };

  checkRecord = (record, index) => {
    this.props.onThongBao(record);
  };
  onSort = (column, records, sortOrder) => {
    return orderBy(records, [column], [sortOrder]);
  };
  _handleSubmit = (e) => {
    e.preventDefault();
  };
  _handlerChange = (content, editor) => {
    // const { name, value } = e.target;
    this.setState({
      baiDang: { ...this.state.baiDang, noiDung: content },
    });
  };
  _handleImg = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ttgarden");
    const res = await fetch(
      "http://api.cloudinary.com/v1_1/ttgarden/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    this.setState({
      baiDang: { ...this.state.baiDang, hinhAnh: file.url },
    });
  };
  componentDidMount = () => {
    this.props.getListDanhSachThongBao();
  };
  suaThongBaoz = () => {
    const { baiDang } = this.state;
    this.props.editThongBao(baiDang);
  };
  renderEdit = () => {
    let { baiDang } = this.state;
    if (this.state.opened === true) {
      return (
        <form onSubmit={this._handleSubmit}>
          <Editor
            apiKey="wth8ysk9upmzjhc92k67c7eirewbqlebj0n2cg5fhq1dv4kw"
            initialValue={baiDang.noiDung}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
                "image imagetools",
              ],

              toolbar:
                // eslint-disable-next-line
                "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help | media| insertdatetime | code| image| preview",
            }}
            onEditorChange={this._handlerChange}
          />
          <img
            src={baiDang.hinhAnh}
            style={{ width: "10%", display: "block" }}
            alt=""
          />
          <input type="file" onChange={this._handleImg} />
          <button
            className="btn addingResident__btn d-block"
            onClick={this.suaThongBaoz}
          >
            Chỉnh sửa
          </button>
        </form>
      );
    }
  };

  render() {
    let { danhSachThongBao } = this.props;
    return (
      <div>
        {this.renderEdit()}
        <ReactDatatable
          config={this.config}
          records={danhSachThongBao}
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
    danhSachThongBao: state.thongBaoReducer.danhSachThongBao,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getListDanhSachThongBao: () => {
      dispatch(actions.layDanhSachThongBao());
    },
    editThongBao: (data) => {
      dispatch(actions.suaThongBao(data));
    },
    onThongBao: (data) => {
      dispatch(actions.checkThongBao(data));
    },
    deleteThongBao: (data) => {
      dispatch(actions.xoaThongBao(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableThongBao);
