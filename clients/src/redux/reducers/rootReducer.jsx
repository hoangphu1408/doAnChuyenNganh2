import { combineReducers } from "redux";
import { RegisterReducer } from "./isRegister";
import { ErrorMsgReducer } from "./errorsMsg";
import { residentReducer } from "./residentReducer";
import { accountReducer } from "./accountReducer";
import { canHoReducer } from "./canHoReducer";
import { accountLoginRecuder } from "./accountLogin";
import { thongBaoReducer } from "./thongBao";
import { chiPhiReducer } from "./chiPhiReducer";
import { thongKeReducer } from "./thongKeReducer";
export const rootReducer = combineReducers({
  accountLoginRecuder,
  RegisterReducer,
  ErrorMsgReducer,
  residentReducer,
  accountReducer,
  canHoReducer,
  thongBaoReducer,
  chiPhiReducer,
  thongKeReducer,
});
