import { combineReducers } from "redux";
import { GioHangReducer } from "./GioHangReducer";
import { RegisterReducer } from "./isRegister";
import { ErrorMsgReducer } from "./errorsMsg";
import { residentReducer } from "./residentReducer";

export const rootReducer = combineReducers({
  RegisterReducer,
  ErrorMsgReducer,
  GioHangReducer,
  residentReducer,
});
