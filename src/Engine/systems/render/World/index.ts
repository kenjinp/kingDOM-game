import BABYLON from "babylonjs"
import Scene from "./Scene";
import Controls from "./Controls";

class World {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  private _camera: BABYLON.FreeCamera;

  constructor (canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._engine = new BABYLON.Engine(canvas, true);
    this._scene = new Scene(this._engine, canvas);
  }

  render (entitiesToRender) {
    this._scene.updateEntities(entitiesToRender);
    this._scene.render();

    // TODO attach events elsewhere?
    window.addEventListener('resize', () => {
        this._engine.resize();
    });
  }
}

export default World;