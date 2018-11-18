import BABYLON, { Vector3 } from "babylonjs"
import Oimo from "oimo";
import Ground from "../Ground";
import Axis from "./Axis";
import cameras from "../cameras";
import consts from "../Controls/consts";
import item from "../../../assets/items/Item__31.png";
import {Item, Character, Player} from "../Objects";

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
    this._emitter.on(consts.ACTION, this.toggleCamera.bind(this));
  }

  createScene () : void {
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this);
    this.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);
    var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
    var physicsPlugin = new BABYLON.OimoJSPlugin();
    this.enablePhysics(gravityVector, physicsPlugin);
    this.player = new Player(this, { name: "player", position: new Vector3(0, 2, 0) });
    //new Player(this);
    // Create a built-in "ground" shape.
    this.ground = new Ground.TiledGround(this);
    this.collisionsEnabled = true;

    // Link
    let items = [];
    for (let index = 0; index < 10; index++) {
      let itemName = Item.items[ Math.floor( Math.random() * Item.items.length)];
      console.log(itemName);
      let x =Math.round(Math.random() * 100 - 50);
      let y = 2
      let z = Math.round(Math.random() * 100 - 50);
      console.log(x, y, z)
      let item = new Item(this, { name: itemName, position: new Vector3(x, y, z) });
      items.push(item);

        // let sphere = BABYLON.Mesh.CreateSphere("Sphere" + index, 16, 1, this);
        // spheres.push(sphere);
        // let materialAmiga2 = new BABYLON.StandardMaterial("amiga", this);
        // materialAmiga2.diffuseTexture = new BABYLON.Texture(item, this);
        // materialAmiga2.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        // sphere.material = materialAmiga2;
        // sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, 20, Math.random() * 10 - 5);

        // // shadowGenerator.addShadowCaster(sphere);

        // sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 }, this);
    }
    this.items = items;
    // for (let index = 0; index < 9; index++) {
    //     spheres[index].setPhysicsLinkWith(spheres[index + 1], new BABYLON.Vector3(0, 0.5, 0), new BABYLON.Vector3(0, -0.5, 0));
    // }
    this.fred = new Character(this, { name: "fred" });
    this.fred.position = new Vector3(5, 1, 5);
  }

  attachCameras () : void {
    this._cameras = {
      debug: new cameras.Debug(this),
      follow: new cameras.Follow(this)
    };
    this.activeCamera = this._cameras.follow;
    this._cameras.follow.lockedTarget = this.player.body;
    this._cameras.follow.attachControl(this._canvas, false);
  }

  toggleCamera () : void {
  }

  toggleDebug () : void {
    this._debugMode = !this._debugMode;
    this.fred.toggleDebug();
    this.items.forEach(item => item.toggleDebug());
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
    this.player.render(this.activeCamera);
    this.items.forEach(item => item.render());
    this.fred.render(this.activeCamera);
    super.render();
  }
}

export default Scene;