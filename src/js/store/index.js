import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";

import { getName, getListingsAsync } from "../actions/index";

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
);

store.dispatch(getName());
store.dispatch(getListingsAsync());


window.store = store;

export default store;
