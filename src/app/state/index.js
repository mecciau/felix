import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import content from "./content/reducer";
import authentication from "./authentication/reducer";
import middleware from "./middleware";

const allMiddleware =
  process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION__
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware);

const store = createStore(
  combineReducers({
    content,
    authentication,
  }),

  allMiddleware

  // process.env.NODE_ENV === "development" &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
