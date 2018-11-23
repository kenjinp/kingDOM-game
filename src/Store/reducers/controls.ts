import * as types from "../types";
import { controlMapping as DEFAULT_CONTROL_MAPPING } from "../../Defaults";

export default function controls(state = {}, action) {
  switch (action.type) {
    case types.CONTROL_PRESSED:
      let { actionKeyword, direction } = action.payload;
      if (direction === "down") {
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
