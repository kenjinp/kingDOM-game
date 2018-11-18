import { Vector3 } from "babylonjs";

interface ObjectOptions {
  name: string,
  size?: number,
  position?: Vector3,
  physics?: {
    mass: number;
    restitution: number;
    friction: number;
  };
}

export {
  ObjectOptions
}