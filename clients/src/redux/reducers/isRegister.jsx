import {IS_REGISTER} from "../constants/actionType";
let isRegister = false;

export const RegisterReducer = (state = isRegister, action) => {
    switch(action.type){
        case IS_REGISTER: 
            let updateState = action.payload;
            return updateState;
        default: return state
    }
}