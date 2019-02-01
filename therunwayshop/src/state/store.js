import rootReducer from "./CombineReducres";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const enhancer = compose(applyMiddleware(thunk, promise()));

const persistConfig = {
  key: "root",
  stateReconciler: autoMergeLevel2,
  timeout: null,
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//let store = createStore(rootReducer, enhancer);
export let store = createStore(persistedReducer, enhancer);

store.subscribe(() => console.log(store.getState()));

export let persistor = persistStore(store);
