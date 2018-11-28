import * as THREE from "three";
import { RENDER_SYSTEM_FILTER_KEY } from "../index";
import * as sprites from "../Sprites";
import { ADD_ENTITY } from "../../../../Store/types";
import _ from "lodash";

const DEFAULT_DIMENSIONS = 1;

let debugOnce = _.once(function(msg) {
  console.log(msg);
});

class Thing extends THREE.Object3D {
  public defaultScaleX = DEFAULT_DIMENSIONS;
  public defaultScaleY = DEFAULT_DIMENSIONS;
  public defaultScaleZ = DEFAULT_DIMENSIONS;
  constructor(entity) {
    super();
    this.entityData = entity;
    this.name = entity.id;
    this.isEntity = true;
    let renderComponent = (this.renderComponent =
      entity.components[RENDER_SYSTEM_FILTER_KEY]);
    this.scaleFactor = renderComponent.scaleFactor || DEFAULT_DIMENSIONS;
    this.geoSize = renderComponent.scaleFactor || DEFAULT_DIMENSIONS;

    // TODO Move to subCompnent?
    // FIXED SPRITES (no billboard)
    if (this.renderComponent.fixedSprite) {
      // Required Fixed Sprite Asset Behavior
      let fixedSpriteOptions = this.renderComponent.fixedSprite;
      let { asset } = fixedSpriteOptions;

      // TODO move to sprite manager?
      let spriteAsset = sprites[asset];

      if (!spriteAsset) {
        console.warn(`There is no sprite asset with the name "${spriteAsset}"`);
      }

      // Save sprites in a spriteManager
      let spriteMap = new THREE.TextureLoader().load(
        spriteAsset || sprites[DEFAULT_SPRITE_ASSET]
      );
      // Make sure sprite is nice and blurry!
      spriteMap.magFilter = THREE.NearestFilter;
      let material = new THREE.MeshBasicMaterial({
        map: spriteMap,
        transparent: true
      });
      material.side = THREE.DoubleSide;
      let geometry = (this.geometry = new THREE.PlaneGeometry(
        this.scaleFactor,
        this.scaleFactor,
        this.scaleFactor
      ));
      let mesh = (this.mesh = new THREE.Mesh(geometry, material));
      this.add(mesh);
    }

    // TODO Move to subCompnent?
    // SPRITE
    if (this.renderComponent.sprite) {
      const DEFAULT_SPRITE_ASSET = "potion";

      // Required Sprite Asset Behavior
      let spriteOptions = this.renderComponent.sprite;
      let { asset, center } = spriteOptions;
      let spriteAsset = sprites[asset];

      if (!spriteAsset) {
        console.warn(`There is no sprite asset with the name "${spriteAsset}"`);
      }

      // Save sprites in a spriteManager
      let spriteMap = new THREE.TextureLoader().load(
        spriteAsset || sprites[DEFAULT_SPRITE_ASSET]
      );
      // Make sure sprite is nice and blurry!
      spriteMap.magFilter = THREE.NearestFilter;

      let spriteMaterial = new THREE.SpriteMaterial({
        map: spriteMap,
        color: 0xffffff
      });
      let sprite = (this.sprite = new THREE.Sprite(spriteMaterial));
      this.add(sprite);
    }

    // These should be subComponents?
    // ROTATION
    if (entity.rotation && Array.isArray(entity.rotation)) {
      // Convert to Eular
      this.rotation.set(...entity.rotation.map(deg => (deg * Math.PI) / 180));
    }

    // These should be subComponents?
    // POSTITION
    if (entity.position && Array.isArray(entity.position)) {
      this.position.set(...entity.position);
    }
    // These should be subComponents?
    // DEBUG AXES
    if (renderComponent.debug) {
      let debug = (this.debug = new THREE.AxesHelper(
        renderComponent.scaleFactor || DEFAULT_DIMENSIONS
      ));
      this.add(debug);
    }

    var sphere = new THREE.SphereGeometry();
    var object = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial(0xff0000));
    this.boxHelper = new THREE.BoxHelper(object, 0xffff00);
    this.add(this.boxHelper);
    // this.boundingBoxHelper = new THREE.BoundingBoxHelper(this, 0xff0000);
    // this.add(this.boundingBoxHelper);
  }

  update() {
    this.boxHelper.update();
    // this.boundingBoxHelper.update();
    // These should be subComponents?
    // POSTITION
    // directional vector
    // current pos + directional vector

    // if (this.entityData.position && Array.isArray(this.entityData.position)) {
    //   this.position.set(...this.entityData.position);
    // }

    // These should be subComponents?
    // ROTATION
    // if (this.entityData.rotation && Array.isArray(this.entityData.rotation)) {
    //   this.entityData.rotation.forEach((rotationDeg, index) => {
    //     let axis = new THREE.Vector3([index === 0 ? 1 : 0, index === 1 ? 1 : 0, index === 2 ? 1 : 0]);
    //     this.rotateOnAxis(axis, (rotationDeg * Math.PI) / 180);
    //   });
    // }

    // I dont like how I'm stacking all this behavior
    // should be mixins by inheritance or so
    // translation commands?
    if (
      this.entityData.positionDelta &&
      Array.isArray(this.entityData.positionDelta)
    ) {
      debugOnce(this);
      let clockDelta = this.parent.clock.getDelta();
      // Convert to Eular
      this.translateX(this.entityData.positionDelta[0] * clockDelta);
      this.translateY(this.entityData.positionDelta[1] * clockDelta);
      this.translateZ(this.entityData.positionDelta[2] * clockDelta);
    }

    // I dont like how I'm stacking all this behavior
    // should be mixins by inheritance or so
    // translation commands?
    if (
      this.entityData.rotationDelta &&
      Array.isArray(this.entityData.rotationDelta)
    ) {
      debugOnce(this);
      let clockDelta = this.parent.clock.getDelta();
      // Convert to Eular
      this.rotateX(this.entityData.rotationDelta[0] * clockDelta);
      this.rotateY(this.entityData.rotationDelta[1] * clockDelta);
      this.rotateZ(this.entityData.rotationDelta[2] * clockDelta);
    }
  }
}

export default Thing;
