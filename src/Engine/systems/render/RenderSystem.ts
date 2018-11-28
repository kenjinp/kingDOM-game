import * as THREE from "three";
import * as VisualTypes from "./VisualTypes";
import _ from "lodash";

const DEFAULT_TYPE = "thing";

class World {
  private _scene: THREE.Scene;
  private _renderer: THREE.WebGLRenderer;

  constructor() {
    let scene = (this._scene = new THREE.Scene());

    let renderer = (this._renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    }));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.id = "game";

    // TODO attach events elsewhere?
    // Abstract to UI / Window layer
    window.addEventListener("resize", () => {
      // resise
    });

    let gridHelper = new THREE.GridHelper(100, 100);
    scene.add(gridHelper);
    scene.clock = new THREE.Clock();
    this.debugScene = _.once(function(scene) {
      console.log("sceneDebugger", scene.children);
      let box = scene.getObjectByName("debugCube");
    });
  }

  update(renderableEntities) {
    const { _renderer: renderer, _scene: scene } = this;
    // Check if entity exist
    renderableEntities.forEach(entity => {
      let sceneVisualization = scene.getObjectByName(entity.id);
      if (!sceneVisualization) {
        let type = entity.type[entity.type.length - 1];
        if (!VisualTypes[type]) {
          console.warn(`There's no VisualType to render type "${type}"`);
        }
        let VisualType = VisualTypes[type] || VisualTypes[DEFAULT_TYPE];
        let visualization = new VisualType(entity);
        scene.add(visualization);
      } else {
        // update entity props
        let { rotationDelta, positionDelta, id } = entity;
        sceneVisualization.rotationDelta = rotationDelta;
        sceneVisualization.positionDelta = positionDelta;
      }
    });

    this.debugScene(scene);

    // Remove entities if not tracked
    // TODO
    let activeCamera;
    // Update each entity
    scene.children
      .filter(objects => !!objects.isEntity)
      .forEach(visualization => {
        // we need a way to get the current active camera here...
        if (
          visualization.entityData.type.indexOf("camera") >= 0 &&
          visualization.entityData.components.renderable.activeCamera === true
        ) {
          activeCamera = visualization;
        }
        visualization.update();
      });
    if (!activeCamera) {
      throw new Error("no active camera!");
    }

    // Update
    renderer.render(scene, activeCamera);
  }
}

export default World;
