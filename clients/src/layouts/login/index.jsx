import React, { Component } from 'react';
import Header from '../../components/header1';
import LoginForm from "../../components/loginForm";
import "./index.css";
import { connect } from 'react-redux';
import RegisterForm from '../../components/registerForm';
import { Route, Switch } from 'react-router-dom';


const axios = require('axios').default;

class Login extends Component {
    state = {
        confirm: false
    }
    componentDidMount= () => {
        const { id } = this.props.match.params;
        if(id !== undefined){
            console.log("id", this.props.match.params.id);
            const url = "http://localhost:5000/admin/verify-mail/"+ id;
            console.log(url)
            axios.get(url)
                .then(res => {
                    console.log(res.data)
                    this.setState(
                    { confirm: true}
                    )
                }).catch(err => {
                    console.log(err)
                })
        }
    }
    renderConfirm = () => {
       if(this.state.confirm === false){
           return '';
       }else{
           return <p className="alert alert-success w-50 m-auto">Verification successful! Please login</p>
       }
    }
    renderOptions = () =>{
        if(this.props.RegisterReducer === false){
            return <LoginForm />
        }else{
            return <RegisterForm />
        }
    }
    render() {
        console.log(this.props.RegisterReducer);
        return (
            <div className="login">
                <div className="login-overplay" />
                    <Header />
                    {this.renderConfirm()}
                    {this.renderOptions()}
            </div>                
        );
    }
}

const mapStateToProps = (state) => {
    return { RegisterReducer: state.RegisterReducer}
}


export default connect(mapStateToProps, null)(Login);