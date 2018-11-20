import World from "./World";

let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game");
let world = new World(canvas);

export default function render (entities) {
  // runs once per loop
  // add entities
  let entitiesToRender = entities.filter(entity =>
    Object.keys(entity.components).indexOf("renderable") >= 0
  )

  // how can we make sure that the entities are itempotent on each render?
  world.render(entitiesToRender);
}