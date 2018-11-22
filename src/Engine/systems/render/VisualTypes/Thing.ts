import * as THREE from "three";
import {RENDER_SYSTEM_FILTER_KEY} from "../index";
import * as sprites from "../Sprites";

const DEFAULT_DIMENSIONS = 1;

class Thing extends THREE.Object3D {

  public defaultScaleX = DEFAULT_DIMENSIONS;
  public defaultScaleY = DEFAULT_DIMENSIONS;
  public defaultScaleZ = DEFAULT_DIMENSIONS;
  constructor(entity) {
    super();
    this.name = entity.id;
    this.isEntity = "yes";
    let renderComponent = this.renderComponent = entity.components[RENDER_SYSTEM_FILTER_KEY];
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
      let spriteMap = new THREE.TextureLoader().load(spriteAsset || sprites[DEFAULT_SPRITE_ASSET]);
      // Make sure sprite is nice and blurry!
      spriteMap.magFilter = THREE.NearestFilter
      let material = new THREE.MeshBasicMaterial({ map : spriteMap, transparent: true });
      material.side = THREE.DoubleSide;
      let geometry = this.geometry = new THREE.PlaneGeometry(this.scaleFactor, this.scaleFactor, this.scaleFactor);
      let mesh = this.mesh = new THREE.Mesh(geometry, material);
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
      let spriteMap = new THREE.TextureLoader().load(spriteAsset || sprites[DEFAULT_SPRITE_ASSET]);
      // Make sure sprite is nice and blurry!
      spriteMap.magFilter = THREE.NearestFilter

      let spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
      let sprite = this.sprite =  new THREE.Sprite( spriteMaterial );

      // Optional Centering Behavior
      if (center && Array.isArray(center)) {
        console.log("sprite center", center);
        sprite.center = center;
      }
      this.add( sprite );
    }

    // These should be subComponents?
    // ROTATION
    if (renderComponent.rotation && Array.isArray(renderComponent.rotation)) {
      // Convert to Eular
      this.rotation.set(...renderComponent.rotation.map(deg => deg * Math.PI / 180));
    }

    // These should be subComponents?
    // POSTITION
    if (renderComponent.position && Array.isArray(renderComponent.position)) {
      this.position.set(...renderComponent.position);
    }
    // These should be subComponents?
    // DEBUG AXES
    if (renderComponent.debug) {
      let debug = this.debug = new THREE.AxesHelper(renderComponent.scaleFactor || DEFAULT_DIMENSIONS);
      this.add(debug);
    }
  }

  update() {

  }
}

export default Thing;