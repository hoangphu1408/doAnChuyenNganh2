import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions/isRegister"

import './index.css';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                email: '',
                password: '',
                code: '',
            },
            errors: {
                email: '',
                password: '',
                code: '',
            },
        }
    }
    renderErrors = (errorsMsg) => {
        if(errorsMsg !== ''){
        return <p className="form-alert">{errorsMsg}</p>
        }else{
            return '';
        }
    }

    handleChange = (e) =>{
        const {name, value} = e.target;
        this.setState({values: {...this.state.values, [name]: value}})
    }

    handleBlur = (e) =>{
        const {name, value} = e.target;
        const errorsMsg = this.validateInput(name, value);
        this.setState({errors: {...this.state.errors, [name]: errorsMsg}})
    }

    validateInput = (name, value) => {
        let errorsMsg = '';
        if(name === "email"){
            // eslint-disable-next-line
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!value){
                errorsMsg = 'Email không được bỏ trống';
            }else if(!re.test(value)){
                errorsMsg = 'Email không hợp lệ';
            }
        }
        if(name === "password"){
            const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
            if(!value){
                errorsMsg = 'Password không được bỏ trống';
            }else if(!re.test(value)){
                errorsMsg = "Password không hợp lệ";
            }
        }
        if(name === "code"){
            if(!value){
                errorsMsg = 'Code không được bỏ trống';
            }else if(value !== "1234"){
                errorsMsg = 'Code không hợp lệ';
            }
        }
        return errorsMsg;
    }
    updateStatus =  (status) =>{
        this.props.onSaveDS(status);     
    }
    registerAccount = () =>{
        this.props.saveAccount(this.state.values);
        this.props.getError();
    }
    renderError =(x) => {
        if(x.length === 0){
            return '';
        }else{
        
         return <p className="alert alert-danger">
             {this.props.ErrorMsgReducer.error_register}
         </p>
        }
    }
    render() {
        let { ErrorMsgReducer } = this.props;
        return (
            <div className="register-form_wrapper">
                <form>
                   
                    <div className="form-group">
                    <div className="row">
                       <div className="col-12">
                            <h2 className="register-title text-center pb-2">Register</h2>
                             {this.renderError(ErrorMsgReducer)}
                       </div>
                    </div>
                    <div className="register-form">
                        <div className="user-name">
                            <span className="icon iconify" data-icon="uil-user" data-inline="false"></span>
                            <input name="email" type="text"  
                            onChange={this.handleChange} 
                            onBlur={this.handleBlur} 
                            className="email" placeholder="Email or username" required/>
                            {this.renderErrors(this.state.errors.email)}
                        </div>
                        <div className="password">
                            <span className="icon iconify" data-icon="uil:key-skeleton" data-inline="false"></span>
                            <input name="password" type="password" className="password" placeholder="Password" onChange={this.handleChange} onBlur={this.handleBlur} required />

                            {this.renderErrors(this.state.errors.password)}
                        </div>
                        <div className="code">
                            <span className="icon iconify" data-icon="ic:baseline-fiber-pin" data-inline="false"></span>
                            <input name="code" type="password" className="password" placeholder="Security code"  
                            onChange={this.handleChange} 
                            onBlur={this.handleBlur}
                            required />
                            {this.renderErrors(this.state.errors.code)}
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-12 register-button">
                            <button className="register-arrow_btn" onClick={() => this.updateStatus(false)}>
                                 <span className="icon-btn iconify" data-icon="ant-design:arrow-left-outlined" data-inline="false" ></span>
                            </button>              
                            <button className="register-btn" type="button" onClick={() => this.registerAccount()}>Create your account</button>
                        </div>                        
                    </div>
                </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { RegisterReducer: state.RegisterReducer,
             ErrorMsgReducer: state.ErrorMsgReducer
            }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getError: () => {
            dispatch(actions.getALL())
        },
        onSaveDS: (status) => {
            dispatch(actions.saveStatus(status))
        },
        saveAccount: (data) => {
            dispatch(actions.registerAccount(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);