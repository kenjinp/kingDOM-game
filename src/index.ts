import World from "./World";

const CANVAS_ID = "render";
const canvas = document.getElementById(CANVAS_ID);
const world = new World(canvas);
world.render();
// const engine = new BABYLON.Engine(canvas, true);

// function createScene() {
//   const scene = new BABYLON.Scene(engine);
//   const camera = new BABYLON.FreeCamera(
//     "Camera1",
//     new BABYLON.Vector3(0, 5, -10),
//     scene
//   );
//   camera.setTarget(BABYLON.Vector3.Zero());
//   camera.attachControl(canvas, false);
//   const light = new BABYLON.HemisphericLight(
//     "Light1",
//     new BABYLON.Vector3(0, 1, 0),
//     scene
//   );
//   const sphere = BABYLON.Mesh.CreateSphere("Sphere1", 16, 2, scene);
//   sphere.position.y = 1;
//   const ground = BABYLON.Mesh.CreateGround("Ground1", 6, 6, 2, scene);
//   return scene;
// }

// let scene = createScene();

// // run the render loop
// engine.runRenderLoop(function() {
//   scene.render();
// });

// // the canvas/window resize event handler
// window.addEventListener("resize", function() {
//   engine.resize();
// });
