import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { userListReducer, userLoginReducer } from "./Reducers/userReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  orderDetailsReducer,
  orderListReducer,
} from "./Reducers/OrderReducres";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
});

// login
const userInfotemsFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfotemsFromLocalStorage },
};

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: middleware,
});

export default store;
