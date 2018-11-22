import RenderSystem from "./RenderSystem";

export const RENDER_SYSTEM_FILTER_KEY = "renderable";

// Initialize on load
const canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game");
let renderWorld
if (!canvas) {
  renderWorld = new RenderSystem();
}

// Maybe listen to atomic update events, rather then updating every time?
// Alternatively, maybe hash editions of an object, to prevent updating?
// What about memCacheing?

function renderSystem (entities: any[]) : void {
  let renderableEntities = entities
    .filter(entity => !!entity.components[RENDER_SYSTEM_FILTER_KEY]);
  renderWorld.update(renderableEntities);
}
export default renderSystem;