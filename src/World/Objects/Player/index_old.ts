import BABYLON, {
  Sprite,
  SpriteManager,
  Scene,
  Vector3
} from "babylonjs";
import emitter from "event-emitter";
import consts from "../Controls/consts";
import PlayerSprites from "./sprites";

const DEFUALT_POS = new Vector3(0, 1, 0);
const SPEED_THRESHOLD = 0.02;

//Local Axes
function localAxes(size, scene) {
  let pilot_local_axisX = BABYLON.Mesh.CreateLines(
    "pilot_local_axisX",
    [
      new BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(size, 0, 0),
      new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
      new BABYLON.Vector3(size, 0, 0),
      new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
    ],
    scene
  );
  let pilot_local_axisX.color = new BABYLON.Color3(1, 0, 0);

  let pilot_local_axisY = BABYLON.Mesh.CreateLines(
    "pilot_local_axisY",
    [
      new BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(0, size, 0),
      new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
      new BABYLON.Vector3(0, size, 0),
      new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
    ],
    scene
  );
  let pilot_local_axisY.color = new BABYLON.Color3(0, 1, 0);

  let pilot_local_axisZ = BABYLON.Mesh.CreateLines(
    "pilot_local_axisZ",
    [
      new BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(0, 0, size),
      new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
      new BABYLON.Vector3(0, 0, size),
      new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
    ],
    scene
  );
  let pilot_local_axisZ.color = new BABYLON.Color3(0, 0, 1);

  let local_origin = BABYLON.MeshBuilder.CreateBox(
    "local_origin",
    { size: 1 },
    scene
  );
  local_origin.isVisible = false;

  pilot_local_axisX.parent = local_origin;
  pilot_local_axisY.parent = local_origin;
  pilot_local_axisZ.parent = local_origin;

  return local_origin;
}

class Player {
  private _idleSpeed: Number = 450;
  private _walkSpeed: Number = 250;
  private _sprites;
  private _orientation: string = "south";
  private _pos: Vector3 = DEFUALT_POS;
  private velocityX: number = 0;
  private velocityZ: number = 0;
  private _friction: number = 0.09;

  constructor(scene: Scene) {
    this._sprites = new PlayerSprites(scene);
    this.idle();
    this._sprites.setPosition(this._pos);

    this.collisionMesh = BABYLON.Mesh.CreateBox("crate", 1, scene);
    this.collisionMesh.position = this._pos;
    this.collisionMesh.checkCollisions = true;
    let myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
    this.collisionMesh.material = myMaterial;
    this.collisionMesh.material.wireframe = true;
    this.collisionMesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.collisionMesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, friction:0.05 }, scene);
    this.emitter = scene._emitter;
    let localOrigin = localAxes(2, scene);
    localOrigin.parent = this.collisionMesh;
    this.listen();
  }

  listen() {
    let character = this.collisionMesh;
    let speed = 0.035;
    this.emitter.on(consts.UP, ({ down }) => {
      if (this.velocityZ < SPEED_THRESHOLD) {
        this.velocityZ += speed;
      }
      // volocity = magnitude * acceleration;
      let direction = "north";
      if (down) {
        this.walk(direction);
      } else {
        this.idle(direction)
      }
      // this.collisionMesh.locallyTranslate(
      //   new BABYLON.Vector3(0, 0, magnitude)
      // );
    });
    this.emitter.on(consts.LEFT, ({ down }) => {
      if (this.velocityX < SPEED_THRESHOLD) {
        this.velocityX -= speed;
      }
      let direction = "west";
      if (down) {
        this.walk(direction);
      } else {
        this.idle(direction)
      }
      // this.collisionMesh.locallyTranslate(
      //   new BABYLON.Vector3(-magnitu
      de, 0, 0)
      // );
    });
    this.emitter.on(consts.JUMP, ({ down }) => {
      this.collisionMesh.physicsImpostor.applyImpulse(new BABYLON.Vector3(0,2,0), this.collisionMesh.position);
    });
    this.emitter.on(consts.DOWN, ({ down }) => {
      if (this.velocityZ < SPEED_THRESHOLD) {
        this.velocityZ -= speed;
      }
      let direction = "south";
      if (down) {
        this.walk(direction);
      } else {
        this.idle(direction)
      }
      // this.collisionMesh.locallyTranslate(
      //   new BABYLON.Vector3(0, 0, -magnitude)
      // );
    });
    this.emitter.on(consts.RIGHT, ({ down }) => {
      if (this.velocityX < SPEED_THRESHOLD) {
        this.velocityX += speed;
      }
      let direction = "east";
      if (down) {
        this.walk(direction);
      } else {
        this.idle(direction)
      }
      // this.collisionMesh.locallyTranslate(
      //   new BABYLON.Vector3(magnitude, 0, 0)
      // );
    });
    // this.collisionMesh.physicsImpostor.angularVelocity.scaleEqual(0);
    // this.velocityX += (velocityX * friction);
    // this.velocityZ += (velocityZ * friction);
  }

  animate(animation, speed, once?) {
    let loop = !once;
    this._sprites.animate(animation, this._orientation, speed, loop);
  }

  setOrientation(orientation) {
    if (orientation) {
      this._orientation = orientation;
    }
  }

  move() {
    let x = this.velocityX -= (this.velocityX * this._friction)
    let z = this.velocityZ -= (this.velocityZ * this._friction)
    // if (x > SPEED_THRESHOLD) {
    //   this.walk("east")
    // } else if (x < -SPEED_THRESHOLD) {
    //   this.walk("west");
    // }
    this.collisionMesh.locallyTranslate(
      new BABYLON.Vector3(x, 0, z)
    );
  }

  idle(orientation?) {
    this.setOrientation(orientation);
    this.animate("idle", this._idleSpeed);
  }

  walk(orientation?) {
    this.setOrientation(orientation);
    this.animate("walk", this._walkSpeed);
  }

  render(scene) {
    this.move()
    // this.collisionMesh.lookAt(scene._cameras.follow.position);
    this._sprites.setPosition(this.collisionMesh.position);
  }
}

export default Player;
