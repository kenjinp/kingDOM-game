import * as types from "../types";

function addEntityAction(entity) {
  return {
    type: types.ADD_ENTITY,
    payload: entity
  };
}
function updateEntityAction(entity) {
  return {
    type: types.ADD_ENTITY,
    payload: entity
  };
}
function destroyEntityAction(id) {
  return {
    type: types.ADD_ENTITY,
    payload: id
  };
}

export const addEntity = addEntityAction;
export const updateEntity = updateEntityAction;
export const destroyEntity = destroyEntityAction;
