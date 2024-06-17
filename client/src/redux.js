import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer";

const reduxStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk)); //lam middleware
  const persistor = persistStore(store);

  return { store, persistor };
};
export default reduxStore;
