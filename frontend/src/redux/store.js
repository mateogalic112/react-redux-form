import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import {
  userCreateReducer,
  userDeleteReducer,
  userListReducer,
} from "../redux/reducers/userReducers";

const reducer = combineReducers({
  userList: userListReducer,
  userCreate: userCreateReducer,
  userDelete: userDeleteReducer,
});

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
