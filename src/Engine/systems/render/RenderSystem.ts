import * as THREE from "three";
import * as VisualTypes from "./VisualTypes";
import _ from "lodash";
import OrbitControls from "three-orbitcontrols"

const DEFAULT_TYPE = "thing";

class World {
  private _scene: THREE.Scene;
  private _camera: THREE.Camera;
  private _renderer: THREE.WebGLRenderer;

  constructor() {
    let scene = this._scene = new THREE.Scene();

    let camera = this._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.z = 5
    camera.position.y = 5

    let renderer = this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );
    renderer.domElement.id = "game"

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.3
    controls.enableZoom = true

    // TODO attach events elsewhere?
    // Abstract to UI / Window layer
    window.addEventListener('resize', () => {
      // resise
    });

    this.debugScene = _.once(function(scene) {
      console.log("sceneDebugger", scene.children);
      let box = scene.getObjectByName("debugCube");
      console.log(box.position);
   });
  }

  update(renderableEntities) {
    const { _renderer: renderer, _scene: scene, _camera: camera } = this;
    // Check if entity exist
    renderableEntities.forEach(entity => {
      let sceneVisualization = scene.getObjectByName(entity.id);
      if (!sceneVisualization) {
        let type = entity.type.pop();
        if (!VisualTypes[type]) {
          console.warn(`There's no VisualType to render type "${type}"`);
        }
        let VisualType = VisualTypes[type] || VisualTypes[DEFAULT_TYPE];
        let visualization = new VisualType(entity);
        scene.add(visualization);
      }
    })

    this.debugScene(scene);


    // Remove entities if not tracked
    // TODO

    // Update each entity
    scene.children.filter(objects => !!objects.isEntity).forEach(visualization => visualization.update());

    // Update
    renderer.render(scene, camera)
  }
}

export default World;