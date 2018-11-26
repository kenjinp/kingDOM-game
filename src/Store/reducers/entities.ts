import * as types from "../types";
import { entities as DEFAULT_ENTITIES } from "../../Defaults";

export default function controls(
  state = {
    // INSTANTIATE ENTITIES WITH DEFAULT FIELDS?
    entitiesList: DEFAULT_ENTITIES.map(entity => {
      // All entities get
      // position
      // rotation
      // localPosition
      entity.position = entity.position ? entity.position : [0, 0, 0];
      entity.rotation = entity.rotation ? entity.rotation : [0, 0, 0];
      entity.localPosition = entity.localPosition
        ? entity.localPosition
        : [0, 0, 0];
      return entity;
    })
  },
  action
) {
  try {
    switch (action.type) {
      case types.ADD_ENTITY:
        //   let newState = Object.assign({}, state);
        //   delete newState[actionKeyword];
        let newEntitiesList = [...state.entitiesList];
        newEntitiesList.push(
          Object.assign(
            {
              // TODO UUID generator
              id: "newID" + newEntitiesList.length
            },
            {
              ...action.payload
            }
          )
        );
        return Object.assign({}, state, {
          entitiesList: newEntitiesList
        });
      case types.UPDATE_ENTITY:
        //   let newState = Object.assign({}, state);
        //   delete newState[actionKeyword];
        return state;
      case types.DESTROY_ENTITY:
        let id = action.payload;
        return Object.assign({}, state, {
          entitiesList: [...state.entitiesList].filter(entity => {
            return entity.id !== id;
          })
        });
        return state;
      default:
        return state;
    }
  } catch (error) {
    console.log("something terrible");
    console.error(error);
  }
}
