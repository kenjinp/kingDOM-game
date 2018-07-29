import BABYLON from "babylonjs"
import CANNON from "cannon";
import Player from "../Player";
import Ground from "../Ground";
import Axis from "./Axis";
import cameras from "../cameras";
import consts from "../Controls/consts";

class Scene extends BABYLON.Scene {
  private _canvas: HTMLCanvasElement;
  private _debugMode: boolean = false;
  constructor (engine: BABYLON.Engine, canvas: HTMLCanvasElement, emitter) {
    super(engine);
    this._emitter = emitter;
    this._canvas = canvas;
    this.createScene();
    this.attachCameras();
    this.enablePhysics();
    this._emitter.on(consts.MENU, this.toggleDebug.bind(this));
  }

  createScene () : void {
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this);
    this.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);
    this.gravity = new BABYLON.Vector3(0, -9.81, 0);

    this.player = new Player(this);
    // Create a built-in "ground" shape.
    this.ground = new Ground(this);
    this.ground.checkCollisions = true;
    this.collisionsEnabled = true;
  }

  attachCameras () : void {
    this._cameras = {
      debug: new cameras.Debug(this),
      follow: new cameras.Follow(this)
    };
    this.activeCamera = this._cameras.follow;
    this._cameras.follow.lockedTarget = this.player.collisionMesh;
    this._cameras.follow.attachControl(this._canvas, false);
  }

  toggleDebug () : void {
    this._debugMode = !this._debugMode;
    if (this._debugMode) {
      this.axisTool = new Axis(this);
      this.activeCamera = this._cameras.debug;
      this._cameras.follow.detachControl(this._canvas);
      this._cameras.debug.attachControl(this._canvas, false);
      this._cameras.follow.showDebug(this)
    } else {
      this.axisTool.destroy();
      this.activeCamera = this._cameras.follow;
      this._cameras.debug.detachControl(this._canvas);
      this._cameras.follow.attachControl(this._canvas, false);
    }
  }

  render () : void {
    this.player.render(this);
    super.render();
  }
}

export default Scene;