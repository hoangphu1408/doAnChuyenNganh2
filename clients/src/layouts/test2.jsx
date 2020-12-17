import React, { Component } from 'react';
// import io from "socket.io-client";
// const socket = io('http://localhost:5000/');
class Test2 extends Component {
    componentDidMount= () => {
        console.log(this.props.match.params.id);
    }
    render() {
        return (
            <div>
                <p>hehe</p>
            </div>
        );
    }
}

export default Test2;