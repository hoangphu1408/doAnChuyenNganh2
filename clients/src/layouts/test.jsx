import React, { Component } from "react";
import { connect } from "react-redux";
import { actGetCorseList, saveList } from "../redux/actions/getCourse";
import history from "../routes/history";
import socket from "../routes/socket";
const axios = require("axios").default;

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      online: 0,
    };
  }
  componentDidMount = () => {
    this.props.onSaveDS();
  };
  renderDetail = (x) => {
    if (x.length !== undefined) {
      return x.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.email}</p>
          </div>
        );
      });
    }
  };
  logOut = () => {
    //    socket.emit("logout", 1);
    localStorage.removeItem("isLogin");
    history.replace("/login");
  };
  // checkOnline = () => {
  //     socket.on("check-online", (data)=>{
  //         this.setState({
  //             online:data
  //         })
  //     });
  // }
  // renderOnline = () => {
  // return <p>{this.state.online}</p>
  // }
  render() {
    let { GioHangReducer } = this.props;
    console.log("Danh sach", this.props.GioHangReducer);
    return (
      <div>
        {this.renderDetail(GioHangReducer)}
        {/* {this.checkOnline()}
              {this.renderOnline()} */}
        {/* <button onClick={this.checkOnline}>Check</button> */}
        <button onClick={this.logOut}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GioHangReducer: state.GioHangReducer,
    residentReducer: state.residentReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveDS: () => {
      dispatch(saveList());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Test);
