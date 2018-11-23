import { addEntity } from "../../../Store/actions/entities";

export const SYSTEM_FILTER_KEY = "keyDebugPopup";

// Maybe listen to atomic update events, rather then updating every time?
// Alternatively, maybe hash editions of an object, to prevent updating?
// What about memCacheing?
function random(a, b) {
  return Math.random() * b + a;
}

function update(entitiesICareAbout, store) {
  // if there are pressed keys, we will make one entity
  let keysPressed = store.getState().controls;
  let makeEntity = entity => store.dispatch(addEntity(entity));
  Object.keys(keysPressed).forEach(key => {
    let entitiesWithThisKey = entitiesICareAbout.filter(entity => {
      return entity.components[SYSTEM_FILTER_KEY] === key;
    }).length;
    if (entitiesWithThisKey <= 0) {
      let newEntity = {
        type: ["thing"],
        components: {
          [SYSTEM_FILTER_KEY]: key,
          renderable: {
            sprite: {
              asset: "potion"
            },
            position: [random(1, 5), 1, random(1, 5)]
          }
        }
      };
      makeEntity(newEntity);
    }
  });
}

function keyDebugPopup(entities: any[], store): void {
  let entitiesICareAbout = entities.filter(
    entity => !!entity.components[SYSTEM_FILTER_KEY]
  );
  update(entitiesICareAbout, store);
}
export default keyDebugPopup;
