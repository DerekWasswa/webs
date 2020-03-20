import {
    USER_REGISTERED,
    USER_LOGGED_IN,
    LOGGED_USER,
    USER_LOGGED_OUT,
    SHOP_LOGGED_IN,
    SHOP_REGISTERED,
    SHOP_LOGGED_OUT,
    ADMIN_LOGIN,
    ADMIN_LOGOUT,
    ERRORS,
    SUCCESS
  } from "./constants";

  const previousState = {
    loading: false,
    auth: {
      user_id: "",
      logInStatus: false,
      user_name: "",
      totUserToken: "",
      number: "",
      email: "",
      admin: ""
    }
  };

  /**
   * @param {any} state and action
   * @returns {any} state
   */
  export default function(state = previousState, action = {}) {
    switch (action.type) {
      case USER_REGISTERED:
        return {
          ...state,
          auth: action.data
        };
      case LOGGED_USER:
        return {
          ...state,
          auth: action.data
        };
      case USER_LOGGED_IN:
        return {
          ...state,
          auth: JSON.parse(action.data)
        };
      case USER_LOGGED_OUT:
        return {
          ...state
        };
      case ADMIN_LOGIN:
        return {
          ...state,
          auth: action.data
        };
      case ADMIN_LOGOUT:
        return {
          ...state,
          auth: action.data
        };
      case SHOP_LOGGED_IN:
        return {
          ...state
        };
      case SHOP_REGISTERED:
        return {
          ...state,
          auth: action.data
        };
      case SHOP_LOGGED_OUT:
        return {
          ...state
        };
      case SUCCESS:
        return state;
      case ERRORS:
        return state;
      default:
        return state;
    }
  }
