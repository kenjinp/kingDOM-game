import {
  Scene,
  Camera
} from "babylonjs";

import OrientationSprites from "./OrientationSprites";
import { ObjectOptions } from "../PhysicsObject/types";
import PhysicsObject from "../PhysicsObject";
import {throttle} from "underscore";

const DEFAULT_CHARACTER_SIZE = 1;
const DEFAULT_CHARACTER_MASS = 1;

const DEFAULT_PHYSICS = {
  mass: DEFAULT_CHARACTER_MASS,
  friction: 0.5,
  restitution: 0.03
};

function getBoxSideFacingCam(box, camera) {

  var vecBoxToCam = camera.position.subtract(box.position).normalize();

  var wm = box.getWorldMatrix();

  var xaxis = new BABYLON.Vector3(wm.m[0], wm.m[1], wm.m[2]);
  var yaxis = new BABYLON.Vector3(wm.m[4], wm.m[5], wm.m[6]);
  var zaxis = new BABYLON.Vector3(wm.m[8], wm.m[9], wm.m[10]);

  var threshold = .9;

  if (BABYLON.Vector3.Dot(xaxis, vecBoxToCam) > threshold) {
    return new BABYLON.Vector3(1, 0, 0);
  } else if (BABYLON.Vector3.Dot(yaxis, vecBoxToCam) > threshold) {
    return new BABYLON.Vector3(0, 1, 0);
  } else if (BABYLON.Vector3.Dot(zaxis, vecBoxToCam) > threshold) {
    return new BABYLON.Vector3(0, 0, 1);
  }

  xaxis.scaleInPlace(-1);
  yaxis.scaleInPlace(-1);
  zaxis.scaleInPlace(-1);

  if (BABYLON.Vector3.Dot(xaxis, vecBoxToCam) > threshold) {
    return new BABYLON.Vector3(-1, 0, 0);
  } else if (BABYLON.Vector3.Dot(yaxis, vecBoxToCam) > threshold) {
    return new BABYLON.Vector3(0, -1, 0);
  } else if (BABYLON.Vector3.Dot(zaxis, vecBoxToCam) > threshold) {
    return new BABYLON.Vector3(0, 0, -1);
  }

}

const DEFAULT_ORIENTATION = "south";
const DEFAULT_IDLE_SPEED = 450;
const DEFAULT_WALK_SPEED = 250;
interface CharacterOptions extends ObjectOptions {
}

// a Character is like an item but the sprites are oriented based on the camera
class Character extends PhysicsObject {
  private _sprites: OrientationSprites;
  private _idleSpeed: number;
  private _walkSpeed: number;
  private _orientation: string;
  constructor(scene: Scene, options: CharacterOptions) {
    let {
      name = "character",
      size = DEFAULT_CHARACTER_SIZE,
      physics = DEFAULT_PHYSICS,
      position
    } = options;
    super(scene, { name, size, physics, position });
    this._sprites = new OrientationSprites(scene, name);
    this._idleSpeed = DEFAULT_IDLE_SPEED;
    this._walkSpeed = DEFAULT_WALK_SPEED;
    this._orientation = DEFAULT_ORIENTATION;
    // this.body.isVisible = true;
    this.idle();
    this.toggleDebug()
    // this.calculateOrientationFromCamera = throttle(this.calculateOrientationFromCamera.bind(this), 50);
  }

  setOrientation(orientation) {
    if (orientation) {
      this._orientation = orientation;
      // this._sprites.animate(null, orientation);
    }
  }

  animate(animation, speed, once?) {
    let loop = !once;
    this._sprites.animate(animation, this._orientation, speed, loop);
  }

  idle(orientation?) {
    this.setOrientation(orientation);
    this.animate("idle", this._idleSpeed);
  }

  walk(orientation?) {
    this.setOrientation(orientation);
    this.animate("walk", this._walkSpeed);
  }

  calculateOrientationFromCamera (camera: Camera) {
    let vector = getBoxSideFacingCam(this.body, camera)
    if (!vector) { return; }
    if (vector.z === 1) {
      this.setOrientation("north")
    }
    if (vector.z === -1) {
      this.setOrientation("south")
    }
    if (vector.x === -1) {
      this.setOrientation("east");
    }
    if (vector.x === 1) {
      this.setOrientation("west");
    }
  }

  render (camera: Camera) : void {
    this._sprites.setPosition(this.getBodyPosition());
    super.render();
    // this.calculateOrientationFromCamera(camera);
  }
}

export default Character;
