import * as types from "../types";
import { controlMapping as DEFAULT_CONTROL_MAPPING } from "../../Defaults";

export default function controlMap(state = DEFAULT_CONTROL_MAPPING, action) {
  switch (action.type) {
    default:
      return state;
  }
}
