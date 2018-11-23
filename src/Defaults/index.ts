import * as controlTypes from "../Controls/types";
import { entities as gameEntities } from "./entities.yaml";

// To be decided how the entities manager works.
// Now we just load a debug yaml
export const entities: any[] = gameEntities;

// should defaults be loaded as data, the same as entities?

export const controlMapping = {
  w: controlTypes.UP,
  a: controlTypes.LEFT,
  s: controlTypes.DOWN,
  d: controlTypes.RIGHT,
  t: controlTypes.MENU,
  f: controlTypes.ACTION,
  ArrowUp: controlTypes.ARROW_UP,
  ArrowLeft: controlTypes.ARROW_LEFT,
  ArrowDown: controlTypes.ARROW_DOWN,
  ArrowRight: controlTypes.ARROW_RIGHT,
  " ": controlTypes.JUMP
};
