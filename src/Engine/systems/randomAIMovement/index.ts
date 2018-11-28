const DEGTORAD = 0.01745327;

// These should all be put somewhere localized like action types?
export const SYSTEM_FILTER_KEY = "randomAIMovement";

// TODO should this be done via a reducer?
// As in UPDATE_ENTITY?
// I think so
function update() {
  return entity => {
    let componentData = entity.components[SYSTEM_FILTER_KEY];
    if (!componentData.stop) {
      componentData.stop = 1;
    }
    if (!componentData.time) {
      componentData.time = 0;
    }
    componentData.time += 0.01;
    if (componentData.time > componentData.stop) {
      entity.rotation[1] = Math.random() * 360;
      componentData.stop = componentData.time + Math.random() * 1;
    }
    entity.positionDelta[2] += 0.01;
  };
}

function randomAIMovement(entities: any[], store): void {
  let entitiesICareAbout = entities.filter(
    entity => !!entity.components[SYSTEM_FILTER_KEY]
  );
  entitiesICareAbout.forEach(update());
}
export default randomAIMovement;
