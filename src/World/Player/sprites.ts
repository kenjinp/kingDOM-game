import { Sprite, SpriteManager, Scene, Vector3 } from "babylonjs";
import HeroNorth from "../../../assets/hero/HeroNorth.png";
import HeroSouth from "../../../assets/hero/HeroSouth.png";
import HeroEast from "../../../assets/hero/HeroEast.png";
import HeroWest from "../../../assets/hero/HeroWest.png";

const NUM_SPRITES = 1;
const SPRITE_SIZE = 16;
const TEXTURE_POINTER = 1;

class PlayerSprites {
  private _spriteSheetData = {
    orientations: {
      north: HeroNorth,
      south: HeroSouth,
      east: HeroEast,
      west: HeroWest
    },
    animations: {
      idle: [0, 3],
      walk: [4, 6]
    }
  };
  private _sprite;
  private _spriteManagers;
  private _position: Vector3;
  private _scene: Scene;
  private _animation: string;
  private _orientation: string;

  constructor(scene: Scene) {
    this._scene = scene;
    this._spriteManagers = this.setSpriteManagers();
  }

  public setPosition (newPosition: Vector3) {
    this._position = newPosition;
    if (this._sprite) {
      this._sprite.position = newPosition;
    } else {
      console.warn("tried to set sprite but sprite wasn't created yet")
    }
  }

  public animate(
    animationName: string,
    orientation: string,
    speed: Number,
    loop: Boolean = true
  ) {
    let [begin, end] = this._spriteSheetData.animations[animationName];
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

  private setAnimation(animationName, orientation) {
    if (this._sprite) {
      this._sprite.dispose();
    }
    let name = "player_" + animationName + "_" + orientation;
    let manager = this._spriteManagers[orientation];
    this._sprite = new Sprite(name, manager);
    this._animation = animationName;
    this._orientation = orientation;
  }

  private setSpriteManagers () {
    return Object.keys(this._spriteSheetData.orientations).reduce(
      (spriteManagers, orientation) => {
        let spriteSheet = this._spriteSheetData.orientations[orientation];
        let managerName = "playerManager_" + orientation;
        let manager = new SpriteManager(
          managerName,
          spriteSheet,
          NUM_SPRITES,
          SPRITE_SIZE,
          this._scene,
          1,
          TEXTURE_POINTER
        );
        spriteManagers[orientation] = manager;
        return spriteManagers;
      },
      {}
    );
  }
}

export default PlayerSprites;
