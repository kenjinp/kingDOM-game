import BABYLON, { Vector3 } from "babylonjs"
import Ground from "../Ground";
import cameras from "../cameras";
import renderTypes from "../../renderTypes";

class Scene extends BABYLON.Scene {
  private _canvas: HTMLCanvasElement;
  private _debugMode: boolean = false;
  private _entities: any = {};
  private _defaultEntities = {
  }
  constructor (engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    super(engine);
    this._canvas = canvas;
    this.createScene();
    this.attachCameras();
  }

  createScene () : void {
    // Default Scene settings
    this.clearColor = new BABYLON.Color4(0.5, 0.8, 0.5, -1);
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this)

    // phyics exists in the world. How to move this to.. a physics system?
    var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
    var physicsPlugin = new BABYLON.OimoJSPlugin();
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, this);
    this.enablePhysics(gravityVector, physicsPlugin);
    this.collisionsEnabled = true;
  }

  updateEntities (entities) {
    // NOTE: should only render things that ask to be re-rendered, somehow.
    // only keep the entities that the system wants us to render?
      this._entities = entities.reduce((memo, entity) => {
        // if it don't exist in the world, make it.
        if (this._entities[entity.id]) {
          memo[entity.id] = this._entities[entity.id];
        } else {
          let RenderType = renderTypes[entity.type];
          console.log(RenderType);
          memo[entity.id] = new RenderType(this);
        }
        return memo;
      }, this._defaultEntities)
  }

  attachCameras () : void {
    // default cameras
    this._cameras = {
      debug: new cameras.Debug(this),
      follow: new cameras.Follow(this)
    };
    this.activeCamera = this._cameras.debug;
    this._cameras.debug.attachControl(this._canvas, false);
  }

  render () : void {
    Object.keys(this._entities).forEach(entityKey => {
      let entity = this._entities[entityKey]
      if (entity.shouldUpdate) { entity.render() }
    });
    super.render();
  }
}

export default Scene;