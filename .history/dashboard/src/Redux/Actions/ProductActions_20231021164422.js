import {
  PRODUCT_LIST_REQUEST,
  PPRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../Constants/ProductConstants";
import axios from "axios";
import { logout } from "./userActions";

// GET ALL PRODUCTS ADMIN
export const listProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/products/all`, config);

    dispatch({ type: PPRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: message,
    });
  }
};
