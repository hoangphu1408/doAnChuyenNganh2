import {IS_LOGIN} from "../constants/actionType";
let isLogin = false;

export const RegisterReducer = (state = isLogin, action) => {
    switch(action.type){
        case IS_LOGIN: 
            let updateState = action.payload;
            return updateState;
        default: return state
    }
}