import * as types from "../constants/actionType";
const initialState = {
  accountInfo: {},
};

export const accountLoginRecuder = (state = initialState, action) => {
  switch (action.type) {
    case types.ACCOUNT_LOGIN:
      return Object.assign({}, state, (state.accountInfo = action.payload));
    default:
      return state;
  }
};
