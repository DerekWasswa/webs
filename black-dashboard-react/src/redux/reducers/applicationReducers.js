import { combineReducers } from "redux";
import authenticationReducer from "./authenticationReducer";
import productReducers from "./productReducers";
import ordersReducers from "./ordersReducers";

export const applicationReducers = combineReducers({
  authenticationReducer,
  productReducers,
  ordersReducers
});
