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
    this.props.addThongBao(this.props.accountLogin.email, this.state.content);
  };
  renderForm = () => {
    if (this.state.opened === false) return "";
    else
      return (
        <form onSubmit={this._handleSubmit}>
          <Editor
            apiKey="wth8ysk9upmzjhc92k67c7eirewbqlebj0n2cg5fhq1dv4kw"
            initialValue="<p>This is the initial content of the editor</p>"
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
          <button
            className="btn addingResident__btn"
            onClick={this.themThongBao}
          >
            Thêm
          </button>
        </form>
      );
  };
  componentDidMount = () => {
    this.setState(
      {
        email: this.props.accountLogin.email,
      },
      () => {
        console.log("email", this.state.email);
      }
    );
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
    addThongBao: (email, data) => {
      dispatch(actions.themThongBao(email, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemThongBao);
