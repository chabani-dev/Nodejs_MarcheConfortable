import {
  ORDERS_DELIVERED_FAIL,
  ORDERS_DELIVERED_REQUEST,
  ORDERS_DELIVERED_SUCCESS,
  ORDERS_DETAILS_FAIL,
  ORDERS_DETAILS_REQUEST,
  ORDERS_DETAILS_SUCCESS,
  ORDERS_LIST_FAIL,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
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

// ORDER  DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDERS_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({ type: ORDERS_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDERS_DETAILS_FAIL,
      payload: message,
    });
  }
};

// ORDER  DELIVER
export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/delivered`,
      {},
      config
    );

    dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload: message,
    });
  }
};
