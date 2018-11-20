import { SpriteManager, Scene } from "babylonjs";

const NUM_SPRITES = 100;
const SPRITE_SIZE = 16;
const TEXTURE_POINTER = 1;
const EPSILON = null;

interface managerObj {
  [key: string]: SpriteManager;
}

let managers: managerObj = {};

// asset management for sprites
class Manager extends SpriteManager {
  constructor(name: string, spriteSheet: string, scene: Scene) {
    if (!name) {
      throw new Error("name for sprites not defined")
    }
    if (!spriteSheet) {
      throw new Error("spriteSheet for sprites not defined")
    }
    if (managers[name]) {
      return managers[name]
    } else {
      super(
        name,
        spriteSheet,
        NUM_SPRITES,
        SPRITE_SIZE,
        scene,
        EPSILON,
        TEXTURE_POINTER
      );
      managers[name] = this;
    }
  }
  public static get managers(): managerObj {
    return managers;
  }
}

export default Manager;
