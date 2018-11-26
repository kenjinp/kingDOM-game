import * as THREE from "three";
import Thing from "./Thing";
import * as sprites from "../Sprites";

class Tree extends Thing {
  constructor(entity) {
    super(entity);

    const DEFAULT_SPRITE_ASSET = "tree";
    // Trees should have default scales

    // Basically a tree is a double-no-billboard sprite

    // TODO move to sprite manager?
    let spriteAsset = sprites[DEFAULT_SPRITE_ASSET];
    let spriteMapAsset = sprites[DEFAULT_SPRITE_ASSET + "Mask"];

    if (!spriteAsset) {
      console.warn(`There is no sprite asset with the name "${spriteAsset}"`);
    }

    const alphaTest = 1;

    // Save sprites in a spriteManager
    let spriteMap = new THREE.TextureLoader().load(spriteAsset);
    let alphaMap = new THREE.TextureLoader().load(spriteMapAsset);
    // Make sure sprite is nice and blurry!
    spriteMap.magFilter = THREE.NearestFilter;
    spriteMap.minFilter = THREE.NearestFilter;
    let material = new THREE.MeshBasicMaterial({
      map: spriteMap,
      alphaMap,
      // opacity: 1,
      alphaTest,
      transparent: false,
      // depthWrite: false,
      side: THREE.DoubleSide
    });
    let geometry = (this.geometry = new THREE.PlaneGeometry(
      this.scaleFactor,
      this.scaleFactor,
      this.scaleFactor
    ));
    let mesh1 = new THREE.Mesh(geometry, material);
    this.add(mesh1);

    // TODO fix the transparency fighting!
    let material2 = new THREE.MeshBasicMaterial({
      map: spriteMap,
      alphaMap,
      // opacity: 1,
      alphaTest,
      transparent: false,
      // depthWrite: false,
      side: THREE.DoubleSide
    });
    let geometry = (this.geometry = new THREE.PlaneGeometry(
      this.scaleFactor,
      this.scaleFactor,
      this.scaleFactor
    ));
    let mesh2 = new THREE.Mesh(geometry, material2);
    mesh2.rotation.set(0, (90 * Math.PI) / 180, 0);
    this.add(mesh2);
  }

  update() {
    // Add tree stuff! Maybe Particle Effects!
  }
}

export default Tree;
