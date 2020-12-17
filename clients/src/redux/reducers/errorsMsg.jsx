import * as types from "../constants/actionType";
let errorsMsg = [];

export const ErrorMsgReducer = (state = errorsMsg, action) => {
    switch(action.type){
        case types.ADD_ERR_MSG: 
            let updateState = {...action.errors};
            return updateState;
        case types.GET_ALL:
            return state;
        case types.RESET:
            return errorsMsg;
        default: return state;
    }
}