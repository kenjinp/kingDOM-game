import * as THREE from "three";
import Thing from "./Thing";

class Visualization extends Thing {
  constructor(entity) {
    super(entity);
    let geometry = (this.geometry = new THREE.BoxGeometry(
      this.scaleFactor || this.defaultScaleX,
      this.scaleFactor || this.defaultScaleY,
      this.scaleFactor || this.defaultScaleZ
    ));
    let material = (this.material = new THREE.MeshNormalMaterial());
    let mesh = (this.mesh = new THREE.Mesh(geometry, material));
    this.add(mesh);
  }

  update() {
    // this.rotation.x += 0.01;
    // this.rotation.y += 0.02;
    super.update();
  }
}

export default Visualization;
