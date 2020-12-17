import * as types from "../constants/actionType";
const axios = require('axios').default;

export const saveStatus = (status) => {
    return (dispatch) =>{     
            dispatch(actRegister(status))          
    }
} 

export const registerAccount = (data) =>{
    const dt = {
        email: data.email,
        code: data.code,
        password: data.password
    }
    return (dispatch) => {
        axios.post('http://localhost:5000/admin/register',{
            data: dt
        })
        .then(res =>{
            if(res.data.error_register !== undefined){
                dispatch(addErrMsg(res.data));
            }else{
                dispatch(actRegister(res.data.isRegister));
                dispatch(reset());
            }
        }).catch(err =>{
            console.log(err)
        })
    }
}

export const getALL = () => {
    return{
        type: types.GET_ALL,  
    }
}

export const reset = () => {
    return{
        type: types.RESET
    }
}

export const addErrMsg = (errors) =>{
    return {
        type: types.ADD_ERR_MSG,
        errors
    }
}
 

export const actRegister = (RegisterStatus) => {
    return {
        type: types.IS_REGISTER,
        payload: RegisterStatus
    }
}