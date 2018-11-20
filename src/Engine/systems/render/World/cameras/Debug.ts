import { ArcRotateCamera, Vector3, Scene } from "babylonjs";

const DEFAULT_POSITION = new BABYLON.Vector3(0, 5, -10)

class Debug extends ArcRotateCamera {
  constructor (scene: Scene) {
    // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
    super("Debug", 0, 0, 10, DEFAULT_POSITION, scene);

    // Positions the camera overwriting alpha, beta, radius
    this.setPosition(new BABYLON.Vector3(0, 5, 20));
  }
}

export default Debug;