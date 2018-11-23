import * as types from "../types";

function controlPressedAction(action) {
  return {
    type: types.CONTROL_PRESSED,
    payload: action
  };
}

export const controlPressed = controlPressedAction;
