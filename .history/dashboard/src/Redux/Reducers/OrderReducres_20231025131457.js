import {
  ORDERS_DETAILS_FAIL,
  ORDERS_DETAILS_REQUEST,
  ORDERS_DETAILS_SUCCESS,
  ORDERS_LIST_FAIL,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_SUCCESS,
} from "../Constants/OrderConstants";

// ALL PRODUCTS
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_LIST_REQUEST:
      return { loading: true };
    case ORDERS_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//  ORDER DETAILS
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDERS_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDERS_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDERS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
