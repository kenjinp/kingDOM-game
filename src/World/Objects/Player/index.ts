import Character from "../Character";
import { ObjectOptions } from "../PhysicsObject/types";
import {
  Scene,
  Camera,
  Mesh
} from "babylonjs";
import consts from "../../Controls/consts";

interface CharacterOptions extends ObjectOptions {
}

class Player extends Character {
  // Movement directions : top, bot, left, right
  private _movementDirection : number [] = [0,0,0,0];
  private _speed : number = 0.5;
  private _body : Mesh;
  private _emitter : any;
  constructor (scene: Scene, options: CharacterOptions) {
    super(scene, options);
    let emitter = this._emitter = scene._emitter;
    emitter.on(consts.UP, ({ down }) => {
      this.chooseDirection(0, 1);
    });
    emitter.on(consts.DOWN, ({ down }) => {
      this.chooseDirection(1, 1);
    });
    emitter.on(consts.LEFT, ({ down }) => {
      this.chooseDirection(2, 1);
    });
    emitter.on(consts.RIGHT, ({ down }) => {
      this.chooseDirection(3, 1);
    });
    console.log("phys", this._body.physicsImpostor)
  }

  public chooseDirection (direction, value) : void {
    console.log(direction, value);
    this._movementDirection[direction] = value;
  }

  private move () : void {

    let s = this._speed;
    let scale = 0.9
    console.log()
    if (this._movementDirection[0] != 0) {
        this._body.applyImpulse(new BABYLON.Vector3(0,0,s), this._body.position);
    }
    if (this._movementDirection[1] != 0) {
        this._body.applyImpulse(new BABYLON.Vector3(0,0,-s), this._body.position);
    }
    if (this._movementDirection[2] != 0) {
        this._body.applyImpulse(new BABYLON.Vector3(-s,0,0), this._body.position);
    }
    if (this._movementDirection[3] != 0) {
        this._body.applyImpulse(new BABYLON.Vector3(s,0,0), this._body.position);
    }
    // this._body.physicsImpostor.linearVelocity.scaleEqual(scale);
    this._body.physicsImpostor.physicsBody.linearVelocity.scaleEqual(scale)
    // console.log(this._body.physicsImpostor.physicsBody.velocity);
    this._body.physicsImpostor.physicsBody.angularVelocity.scaleEqual(0)
    // this._body.physicsImpostor.angularVelocity
  }

  render (camera: Camera) : void {
    this.move()
    super.render(camera);
  }

}

export default Player;