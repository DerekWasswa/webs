import {
    GET_CART_ITEMS,
    GET_CART_LOADING,
    GET_CART_ITEMS_COUNT,
    GET_ORDERS,
    PLACE_ORDER,
    UPDATE_ORDER,
    GET_CUSTOMER_ORDERS,
    SERVE_ORDER,
    CANCEL_ORDER,
    REJECT_ORDER,
    CONFIRM_ORDER,
    GET_SUBSCRIPTIONS,
    RETURNS,
    SUCCESS,
    ERRORS
  } from "./constants";
  import swal from 'sweetalert';

  const previousState = {
    order: {
      order_id: 0,
      menu_id: 0,
      meal_id: 0,
      user: "",
      date: ""
    },
    orders: {
    },
    subscriptions: {},
    returns: {},
    cart: [],
    cartCount: 0,
    loading: true
  };

  /**
   * @param {any} state and action
   * @returns {any} state
   */
  export default function(state = previousState, action = {}) {
    switch (action.type) {
      case PLACE_ORDER:
        return {
          ...state,
          order: action.data
        };
      case GET_ORDERS:
        return {
          ...state,
          orders: action.data
        };
      case RETURNS:
          return {
            ...state,
            returns: action.data
          };
      case GET_SUBSCRIPTIONS:
        return {
          ...state,
          subscriptions: action.data
        };
      case UPDATE_ORDER:
        return {
          ...state,
          order: action.data
        };
      case SERVE_ORDER:
        return {
          ...state,
          order: action.data
        };
      case CONFIRM_ORDER:
        return {
          ...state,
          orders: action.data
        };
      case REJECT_ORDER:
        return {
          ...state,
          order: action.data
        };
      case GET_CUSTOMER_ORDERS:
        return {
          ...state,
          orders: action.data
        };
      case CANCEL_ORDER:
        return {
          ...state,
          order: action.data
        };
      case GET_CART_LOADING:
        return {
          ...state,
          loading: action.data
        };
      case GET_CART_ITEMS:
        return {
          ...state,
          cart: [...state.cart, action.data]
        };
      case GET_CART_ITEMS_COUNT:
        return {
          ...state,
          cartCount: action.data
        };
      case SUCCESS:
        swal(JSON.parse(action.data)['title'], JSON.parse(action.data)['message'], "success");
        return state;
      case ERRORS:
        swal(JSON.parse(action.data)['title'], JSON.parse(action.data)['message'], "error");
        return state;
      default:
        return state;
    }
  }
