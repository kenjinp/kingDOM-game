// These should all be put somewhere localized like action types?
export const SYSTEM_FILTER_KEY = "playerControl";

// TODO should these actions be dispatched or change the data of
// entities directly?

function update(store) {
  return entity => {
    // if there are pressed keys, we will make one entity
    let keysPressed = store.getState().controls;
    let translationSpeed = entity.components.playerControl.translationSpeed;
    let rotationSpeed = entity.components.playerControl.rotationSpeed;
    if (!entity.positionDelta) {
      entity.positionDelta = [0, 0, 0];
    }
    if (!entity.rotationDelta) {
      entity.rotationDelta = [0, 0, 0];
    }
    if (keysPressed.UP) {
      entity.positionDelta[2] += translationSpeed;
    }
    if (keysPressed.DOWN) {
      entity.positionDelta[2] -= translationSpeed;
    }
    if (keysPressed.LEFT) {
      entity.positionDelta[0] += translationSpeed;
    }
    if (keysPressed.RIGHT) {
      entity.positionDelta[0] -= translationSpeed;
    }
    if (keysPressed.ARROW_LEFT) {
      entity.rotationDelta[1] += rotationSpeed;
    }
    if (keysPressed.ARROW_RIGHT) {
      entity.rotationDelta[1] -= rotationSpeed;
    }
  };
}

function playerControls(entities: any[], store): void {
  let entitiesICareAbout = entities.filter(
    entity => !!entity.components[SYSTEM_FILTER_KEY]
  );
  entitiesICareAbout.forEach(update(store));
}
export default playerControls;
