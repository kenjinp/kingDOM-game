import * as types from "../types";
import { entities as DEFAULT_ENTITIES } from "../../Defaults";

export default function controls(
  state = {
    entitiesList: DEFAULT_ENTITIES
  },
  action
) {
  switch (action.type) {
    case types.ADD_ENTITY:
      //   let newState = Object.assign({}, state);
      //   delete newState[actionKeyword];
      let entitiesList = [...state.entitiesList];
      entitiesList.push({
        // TODO UUID generator
        id: "newID" + entitiesList.length,
        ...action.payload
      });
      return Object.assign({}, state, {
        entitiesList: entitiesList
      });
    case types.UPDATE_ENTITY:
      //   let newState = Object.assign({}, state);
      //   delete newState[actionKeyword];
      return state;
    case types.DESTROY_ENTITY:
      //   let { actionKeyword, direction } = action.payload;
      //   let newState = Object.assign({}, state, entity);
      //   delete newState[actionKeyword];
      return state;
    default:
      return state;
  }
}
