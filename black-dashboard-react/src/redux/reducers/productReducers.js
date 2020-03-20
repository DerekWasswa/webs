import {
    ADD_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCT,
    GET_PRODUCTS,
    RATE_PRODUCT,
    GET_PRODUCT_BY_TAG,
    GET_BEST_SELLERS,
    GET_DEALS_OF_THE_WEEK,
    ADD_DEAL_OF_THE_WEEK,
    SUCCESS,
    GET_FRUITS,
    GET_BITES,
    GET_JUICE,
    GET_VEGETABLES,
    GET_FOOD,
    ERRORS,
    GET_PRODUCTS_LOADING
  } from "./constants";

  const previousState = {
    products: [],
    product: {},
    food: {},
    juice: {},
    fruits: {},
    bites: {},
    vegetables: {},
    loading: true
  };

  /**
   * @param {any} state and action
   * @returns {any} state
   */
  export default function(state = previousState, action = {}) {
    switch (action.type) {
      case ADD_PRODUCT:
        return {
          ...state,
          meal: action.data
        };
      case ADD_DEAL_OF_THE_WEEK:
        return {
          ...state,
          meal: action.data
        };
      case EDIT_PRODUCT:
        return {
          ...state,
          meal: action.data
        };
      case RATE_PRODUCT:
        return {
          ...state,
          meal: action.data
        };
      case GET_PRODUCTS:
        return {
          ...state,
          products: state.products.concat(action.data)
        };
      case GET_PRODUCT:
        return {
          ...state,
          product: action.data
        };
      case GET_PRODUCTS_LOADING:
        return {
          ...state,
          loading: action.data
        };
      case GET_FRUITS:
        return {
          ...state,
          fruits: action.data
        };
      case GET_FOOD:
        return {
          ...state,
          food: action.data
        };
      case GET_BITES:
        return {
          ...state,
          bites: action.data
        };

      case GET_JUICE:
        return {
          ...state,
          juice: action.data
        };
      case GET_VEGETABLES:
        return {
          ...state,
          vegetables: action.data
        };

      case GET_PRODUCT_BY_TAG:
        return {
          ...state,
          meal: action.data
        };
      case GET_BEST_SELLERS:
        return {
          ...state,
          meals: action.data
        };
      case GET_DEALS_OF_THE_WEEK:
        return {
          ...state,
          meal: action.data
        };
      case DELETE_PRODUCT:
        return {
          ...state
        };
      case ERRORS:
        return state;
      case SUCCESS:
        return state;
      default:
        return state;
    }
  }
