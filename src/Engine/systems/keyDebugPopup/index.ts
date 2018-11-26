import { addEntity, destroyEntity } from "../../../Store/actions/entities";

export const SYSTEM_FILTER_KEY = "keyDebugPopup";

function random(a, b) {
  return Math.random() * b + a;
}

function update(entitiesICareAbout, store) {
  // if there are pressed keys, we will make one entity
  let keysPressed = store.getState().controls;
  let makeEntity = entity => store.dispatch(addEntity(entity));
  let deleteEntity = id => store.dispatch(destroyEntity(id));
  let IDToTrack = "things";
  if (keysPressed.ACTION) {
    let entitiesWithThisKey = entitiesICareAbout.filter(entity => {
      return entity.id === IDToTrack;
    });
    if (entitiesWithThisKey.length <= 0) {
      let newEntity = {
        type: ["thing"],
        id: IDToTrack,
        position: [random(1, 5), 1, random(1, 5)],
        components: {
          [SYSTEM_FILTER_KEY]: {},
          renderable: {
            sprite: {
              asset: "helmet"
            }
          }
        }
      };
      makeEntity(newEntity);
    } else {
      deleteEntity(IDToTrack);
    }
  }
}

function keyDebugPopup(entities: any[], store): void {
  let entitiesICareAbout = entities.filter(
    entity => !!entity.components[SYSTEM_FILTER_KEY]
  );
  update(entitiesICareAbout, store);
}
export default keyDebugPopup;
