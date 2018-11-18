import {
  Scene,
  Sprite,
} from "babylonjs";
import * as sprites from "./sprites";
import * as Assets from "../../Assets";
import PhysicsObject from "../PhysicsObject";
import { ObjectOptions } from "../PhysicsObject/types";

const DEFAULT_ITEM_SIZE = 0.5;

// an Item is an object with a sprite and collision
// maybe with some extra properties to be able to be added
// to an inventory or so?
class Item extends PhysicsObject {
  private _manager: Assets.manager;
  private _sprite: Sprite;
  constructor(scene: Scene, options: ObjectOptions) {
    let { name } = options;
    super(scene, options)
    let spriteSheet = sprites[name];
    this._manager = new Assets.manager(name, spriteSheet, scene);
    this._sprite = new Sprite(name, this._manager);
    this._sprite.size = DEFAULT_ITEM_SIZE;
  }

  public render(): void {
    this._sprite.position = this.getBodyPosition();
    super.render();
  }

  public destroy(): void {
    this._sprite.dispose();
    super.destroy();
  }

  public static get items(): string[] {
    return Object.keys(sprites).filter(key => key !== "__esModule");
  }
}

export default Item;
