import {
  Scene,
  Mesh,
  StandardMaterial,
  PhysicsImpostor,
  Vector3,
  Camera
} from "babylonjs";
import localAxes from "../../helpers/localAxis";
import { ObjectOptions } from "./types";

const DEFAULT_ITEM_SIZE = 0.5;
const DEFAULT_ITEM_MASS = 0.2;
const DEFAULT_POSITION = Vector3.Zero();
const DEFAULT_PHYSICS = {
  mass: DEFAULT_ITEM_MASS,
  restitution: 0.3,
  friction: 0.05
};

// an Object is something with physics
class PhysicsObject {
  private _scene: Scene;
  private _body: Mesh;
  private _debug: boolean = false;
  public name: string;
  private _debugOrigin: Mesh;
  constructor(scene: Scene, options: ObjectOptions) {
    let { name, physics = DEFAULT_PHYSICS, size=DEFAULT_ITEM_SIZE, position=DEFAULT_POSITION } = options;
    this.name = name;
    this._scene = scene;
    this._body = Mesh.CreateBox(name, size, scene);
    let bodyMaterial = new StandardMaterial(name + "_material", scene);
    this._body.material = bodyMaterial;
    this._body.position = position;
    this._body.physicsImpostor = new PhysicsImpostor(
      this._body,
      PhysicsImpostor.BoxImpostor,
      physics,
      scene
    );
    this._body.isVisible = false;
  }

  public toggleDebug(debug?: boolean): boolean {
    if (this._debug || debug) {
      if (this._debugOrigin) {
        this._debugOrigin.dispose();
      }
      this._body.material.wireframe = false;
      this._body.isVisible = false;
      this._debug = false;
    } else {
      this._debugOrigin = localAxes(this.name, 2, this._scene);
      this._debugOrigin.parent = this._body;
      this._body.material.wireframe = true;
      this._body.isVisible = true;
      this._debug = true;
    }
    return this._debug;
  }

  public getBodyPosition(): Vector3 {
    return this._body.position;
  }

  public set position(position: Vector3) {
    this._body.position = position;
  }

  public get body () {
    return this._body;
  }

  public render(camera?: Camera): void {}

  public destroy(): void {
    this._body.dispose();
    if (this._debugOrigin) {
      this._debugOrigin.dispose();
    }
  }
}

export default PhysicsObject;
