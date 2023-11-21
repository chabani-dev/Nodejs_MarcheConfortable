import {
  CATEGORIE_CREATE_FAIL,
  CATEGORIE_CREATE_REQUEST,
  CATEGORIE_CREATE_RESET,
  CATEGORIE_CREATE_SUCCESS,
  CATEGORIE_EDIT_FAIL,
  CATEGORIE_EDIT_REQUEST,
  CATEGORIE_EDIT_SUCCESS,
  CATEGORIE_LIST_FAIL,
  CATEGORIE_LIST_REQUEST,
  CATEGORIE_LIST_SUCCESS,
  CATEGORIE_UPDATE_FAIL,
  CATEGORIE_UPDATE_REQUEST,
  CATEGORIE_UPDATE_RESET,
  CATEGORIE_UPDATE_SUCCESS,
} from "../Constants/CategorieConstants";

// ALL CATEGORIES
export const categorieListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORIE_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORIE_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORIE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// CREATE CATERORIE
export const categorieCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIE_CREATE_REQUEST:
      return { loading: true };
    case CATEGORIE_CREATE_SUCCESS:
      return { loading: false, success: true, categorie: action.payload };
    case CATEGORIE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORIE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT CATEGORIE
export const categorieEditReducer = (
  state = { categorie: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case CATEGORIE_EDIT_REQUEST:
      return { ...state, loading: true };
    case CATEGORIE_EDIT_SUCCESS:
      return { loading: false, categorie: action.payload };
    case CATEGORIE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE CATEGORIE
export const categorieUpdateReducer = (state = { categorie: {} }, action) => {
  switch (action.type) {
    case CATEGORIE_UPDATE_REQUEST:
      return { loading: true };
    case CATEGORIE_UPDATE_SUCCESS:
      return { loading: false, success: true, categorie: action.payload };
    case CATEGORIE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORIE_UPDATE_RESET:
      return { categorie: {} };
    default:
      return state;
  }
};
