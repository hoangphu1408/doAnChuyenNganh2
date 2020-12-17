import {GET_CORSE_LIST} from "../constants/actionType";

let stateGioHang = [];

export const GioHangReducer = (state = stateGioHang, action) => {
    switch(action.type){
        case GET_CORSE_LIST: 
            let updateSate = [...action.payload];
            return updateSate;
        default: return {...state}
    }
}
