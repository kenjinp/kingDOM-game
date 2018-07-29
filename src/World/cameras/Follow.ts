import { ArcRotateCamera, Vector3, Scene } from "babylonjs";

const DEFAULT_POSITION = new BABYLON.Vector3(0, 5, -10)

class Follow extends ArcRotateCamera {
  constructor (scene: Scene) {
    // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
    super("Debug", 0, 0, 10, DEFAULT_POSITION, scene);
    this.cameraAcceleration = 0.005
    this.maxCameraSpeed = 10
    this.checkCollisions = true;
    this.ellipsoid = new Vector3(1, 1, 1);
    this.checkCollisions = true;
    // Positions the camera overwriting alpha, beta, radius
    this.setPosition(new BABYLON.Vector3(0, 10, 10));
  }

  showDebug (scene) {
    this.collisionMesh = BABYLON.Mesh.CreateBox("crate", 1, scene);
    this.collisionMesh.position = this.position;
    this.collisionMesh.checkCollisions = true;
    let myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
    this.collisionMesh.material = myMaterial;
    this.collisionMesh.material.wireframe = true;
  }
}

export default Follow;