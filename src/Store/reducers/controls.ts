import * as types from "../types";

export default function controls(state = {}, action) {
  switch (action.type) {
    case types.CONTROL_PRESSED:
      let { actionKeyword, direction } = action.payload;
      // Don't change state if it's the same
      if (!state[actionKeyword] && direction === "down") {
        return Object.assign({}, state, {
          [actionKeyword]: direction
        });
      } else {
        let newState = Object.assign({}, state);
        delete newState[actionKeyword];
        return state;
      }
    default:
      return state;
  }
}
