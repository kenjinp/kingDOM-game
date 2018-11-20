import { Sprite, SpriteManager, Scene, Vector3 } from "babylonjs";
import * as Assets from "../../Assets";
import HeroSpriteSheet from "./Hero";

interface orientations {
  north: string;
  south: string;
  east: string;
  west: string;
}

interface animations {
  idle: Int8Array;
  walk: Int8Array;
}

interface OrientationSpriteSheet {
  orientations: orientations;
  animations: animations;
}

interface spriteManagers {
  [key: string]: Assets.manager;
}

function setSpriteManagers(
  name: string,
  spriteSheets: OrientationSpriteSheet,
  scene: Scene
): spriteManagers {
  return Object.keys(spriteSheets.orientations).reduce(
    (spriteManagers, orientation) => {
      let spriteSheet: string = spriteSheets.orientations[orientation];
      let managerName: string = name + "_" + orientation;
      let manager: Assets.manager = new Assets.manager(
        managerName,
        spriteSheet,
        scene
      );
      spriteManagers[orientation] = manager;
      return spriteManagers;
    },
    {}
  );
}

class OrientationSprites {
  private _spriteSheets: OrientationSpriteSheet = HeroSpriteSheet;
  private _sprite: Sprite;
  private _spriteManagers: spriteManagers;
  private _position: Vector3;
  private _scene: Scene;
  private _animation: string = "idle";
  private _orientation: string = "south";
  private _name: string;

  constructor(scene: Scene, name: string) {
    this._scene = scene;
    this._name = name;
    this._spriteManagers = setSpriteManagers(name, this._spriteSheets, scene);
  }

  public setPosition (newPosition: Vector3) : void {
    this._position = newPosition;
    if (this._sprite) {
      this._sprite.position = newPosition;
    }
  }

  public animate(
    animationName: string,
    orientation: string ,
    speed: number,
    loop: boolean = true
  ) {
    animationName = animationName || this._animation;
    speed = speed || 450;
    let [begin, end] = this._spriteSheets.animations[animationName];
    let shouldUpdate = animationName !== this._animation ||
      orientation !== this._orientation;
    if (shouldUpdate) {
      this.setAnimation(animationName, orientation);
      this._sprite.playAnimation(
        begin,
        end,
        loop,
        speed,
        null
      );
    }
  }

  private setAnimation(animationName: string, orientation: string) {
    if (this._sprite) {
      this._sprite.dispose();
    }
    let spriteName = this._name + "_" + animationName + "_" + orientation;
    let manager = this._spriteManagers[orientation];
    this._sprite = new Sprite(spriteName, manager);
    this._animation = animationName;
    this._orientation = orientation;
  }

}

export default OrientationSprites;
