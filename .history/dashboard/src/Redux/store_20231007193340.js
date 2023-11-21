import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  productCreateReviewReducer,
  productDetailsReducer,
  productListReducer,
} from "./Reducers/ProductReducers";
import { cartReducer } from "./Reducers/CartReducers";
import {
  userDeatilsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./Reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderPayReducer,
} from "./Reducers/OrderReducres";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDeatilsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// login
const userInfotemsFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// shippigAddress
const shippingAddressFromLocalStorage = localStorage.getItem("shippigAddress")
  ? JSON.parse(localStorage.getItem("shippigAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
  },
  userLogin: { userInfo: userInfotemsFromLocalStorage },
};

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: initialState,
});
export default store;
