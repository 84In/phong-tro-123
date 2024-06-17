import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";

const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};
const authConfig = {
  ...commonConfig,
  key: "auth",
  whilelist: ["isLoggedIn", "token"],
};
const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  user: userReducer,
  post: postReducer,
  app: appReducer,
});

export default rootReducer;
