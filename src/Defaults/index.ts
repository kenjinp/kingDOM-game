import * as controlTypes from "../Controls/types";

// should defaults be loaded as data, the same as entities?

export const controlMapping = {
  w: controlTypes.UP,
  a: controlTypes.LEFT,
  s: controlTypes.DOWN,
  d: controlTypes.RIGHT,
  t: controlTypes.MENU,
  f: controlTypes.ACTION,
  " ": controlTypes.JUMP
};
