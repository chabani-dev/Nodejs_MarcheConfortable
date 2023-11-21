import {
  CATEGORIE_CREATE_FAIL,
  CATEGORIE_CREATE_REQUEST,
  CATEGORIE_CREATE_SUCCESS,
  CATEGORIE_EDIT_FAIL,
  CATEGORIE_EDIT_REQUEST,
  CATEGORIE_EDIT_SUCCESS,
  CATEGORIE_LIST_FAIL,
  CATEGORIE_LIST_REQUEST,
  CATEGORIE_LIST_SUCCESS,
  CATEGORIE_UPDATE_FAIL,
  CATEGORIE_UPDATE_REQUEST,
  CATEGORIE_UPDATE_SUCCESS,
} from "../Constants/CategorieConstants";
import axios from "axios";
import { logout } from "./userActions";

// GET ALL CATEGORIES ADMIN
export const listCategories = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORIE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/categories/all`, config);

    dispatch({ type: CATEGORIE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORIE_LIST_FAIL,
      payload: message,
    });
  }
};

// CREATE  CATEGORIE
export const createCategorie =
  (name, description, image) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORIE_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/categories/`,
        { name, description, image },
        config
      );

      dispatch({ type: CATEGORIE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CATEGORIE_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT CATEGORIE
export const editCategorie = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORIE_EDIT_REQUEST });
    const { data } = await axios.get(`/api/categories/${id}`);
    dispatch({ type: CATEGORIE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORIE_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateCategorie = (categorie) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORIE_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/categories/${categorie._id}`,
      categorie,
      config
    );

    dispatch({ type: CATEGORIE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: CATEGORIE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORIE_UPDATE_FAIL,
      payload: message,
    });
  }
};
