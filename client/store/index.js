import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import productsReducer from "./products";
import productReducer from "./singleProduct";
import userReducer from "./singleUser";
import usersReducer from "./users";
import cartReducer from "./cart";

const reducer = combineReducers({
  auth,
  products: productsReducer,
  product: productReducer,
  users: usersReducer,
  user: userReducer,
  cart: cartReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
