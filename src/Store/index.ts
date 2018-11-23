import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import * as customReducers from "./reducers";
import middleware from "./middleware";

const reducers = combineReducers({
  ...customReducers
});

const reduxStore = createStore(
  reducers,
  compose(applyMiddleware(...middleware))
);

if (module.hot) {
  module.hot.accept("./reducers", () => {
    let customReducers = require("./reducers");
    let finalReducer = {
      ...customReducers
    };
    store.replaceReducer(combineReducers(finalReducer));
  });
}

export default reduxStore;
