import { combineReducers } from "redux";
import { RegisterReducer } from "./isRegister";
import { ErrorMsgReducer } from "./errorsMsg";
import { residentReducer } from "./residentReducer";
import { accountReducer } from "./accountReducer";
import { canHoReducer } from "./canHoReducer";
import { accountLoginRecuder } from "./accountLogin";
import { thongBaoReducer } from "./thongBao";
export const rootReducer = combineReducers({
  accountLoginRecuder,
  RegisterReducer,
  ErrorMsgReducer,
  residentReducer,
  accountReducer,
  canHoReducer,
  thongBaoReducer,
});
