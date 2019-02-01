import { combineReducers } from "redux";
import DrawerReducer from "./reducers/drawerReducer";
import authReducer from "./reducers/auth"

const reducers = combineReducers({
  DrawerReducer,
  auth: authReducer
});

export default reducers;
