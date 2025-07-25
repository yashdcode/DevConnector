import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import rootReducers from "./reducers";

const initialState = {};
const middleware = [thunk];

// Use Redux DevTools if available, else fallback to regular compose
console.log(
  "window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__",
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

console.log("middleware", composeEnhancers(applyMiddleware(...middleware)));
console.log("stroe");
const store = createStore(
  rootReducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
