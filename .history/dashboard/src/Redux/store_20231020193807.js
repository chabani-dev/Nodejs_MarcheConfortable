import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
// import {userLoginReducer} from "./Reducers/userReducers";

const rootReducer = combineReducers({
  // userLogin: userLoginReducer,
});

// login
// const userInfotemsFromLocalStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

const initialState = {
  // userLogin: { userInfo: userInfotemsFromLocalStorage },
};

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: middleware,
});

export default store;
