import * as THREE from "three";
class Camera extends THREE.PerspectiveCamera {
  constructor(entity) {
    super(45, window.innerWidth / window.innerHeight, 0.01, 1000);
    this.position.set(0, 10, 10);
    this.entityData = entity;
    this.name = entity.id;
    this.isEntity = true;
  }

  update() {
    if (this.entityData.components.renderable.following) {
      let target = this.parent.getObjectByName(
        this.entityData.components.renderable.following
      );
      if (!target) {
        throw new Error(
          `attempting to follow target "${target} but none found in scene"`
        );
      }

      let relativeCameraOffset = new THREE.Vector3(0, 3, -10);
      let cameraOffset = relativeCameraOffset.applyMatrix4(target.matrixWorld);
      this.position.set(cameraOffset.x, cameraOffset.y, cameraOffset.z);

      this.lookAt(target.position); //Look at object
    }
  }
}
export default Camera;
