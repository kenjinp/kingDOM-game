// These should all be put somewhere localized like action types?
export const SYSTEM_FILTER_KEY = "playerControl";

function update(store) {
  return entity => {
    // if there are pressed keys, we will make one entity
    let keysPressed = store.getState().controls;
    if (keysPressed.UP) {
    }
    if (keysPressed.DOWN) {
    }
    if (keysPressed.LEFT) {
    }
    if (keysPressed.RIGHT) {
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
