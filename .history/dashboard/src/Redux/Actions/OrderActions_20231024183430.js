import {
  ORDERS_LIST_FAIL,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_SUCCESS,
} from "../Constants/OrderConstants";
import { logout } from "./userActions";
import axios from "axios";

// GET ALL ORDERS ADMIN
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDERS_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/all`, config);

    dispatch({ type: ORDERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDERS_LIST_FAIL,
      payload: message,
    });
  }
};
