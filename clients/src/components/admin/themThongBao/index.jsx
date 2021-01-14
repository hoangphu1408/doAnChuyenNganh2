import React, { Component } from "react";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import * as actions from "../../../redux/actions/thongBao";
class ThemThongBao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      content: "",
      email: "",
      img: "",
    };
  }
  _handleSubmit = (e) => {
    e.preventDefault();
  };
  _handlerChange = (content, editor) => {
    this.setState({
      content: content,
    });
  };
  _handleChange = async (e) => {
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
      img: file.url,
    });
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
  themThongBao = () => {
    const { content, img } = this.state;
    this.props.addThongBao(this.props.accountLogin.email, content, img);
    this.setState({
      img: "",
    });
  };
  renderForm = () => {
    if (this.state.opened === false) return "";
    else
      return (
        <form onSubmit={this._handleSubmit}>
          <Editor
            apiKey="wth8ysk9upmzjhc92k67c7eirewbqlebj0n2cg5fhq1dv4kw"
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
             bullist numlist outdent indent | removeformat | help | media| insertdatetime | code| preview",
            }}
            onEditorChange={this._handlerChange}
          />
          <img
            src={this.state.img}
            style={{ width: "10%", display: "block" }}
            alt=""
          />
          <input type="file" onChange={this._handleChange} />

          <button
            className="btn addingResident__btn d-block"
            onClick={this.themThongBao}
          >
            Thêm
          </button>
        </form>
      );
  };
  componentDidMount = () => {
    this.setState({
      email: this.props.accountLogin.email,
    });
  };
  render() {
    return (
      <div className="pb-3">
        <button
          className="btn btn-primary"
          onClick={() => this.openForm("true")}
        >
          + Thêm thông báo
        </button>
        {this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accountLogin: state.accountLoginRecuder.accountInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addThongBao: (email, data, img) => {
      dispatch(actions.themThongBao(email, data, img));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemThongBao);
