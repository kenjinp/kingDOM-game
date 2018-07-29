import {
  Scene,
  Mesh,
  DynamicTexture,
  StandardMaterial,
  Color3,
  Vector3
} from "babylonjs";

function makeTextPlane(
  scene: Scene,
  text: string,
  color: number,
  size: number
) {
  let dynamicTexture = new DynamicTexture("DynamicTexture", 50, scene, true);
  dynamicTexture.hasAlpha = true;
  dynamicTexture.drawText(
    text,
    5,
    40,
    "bold 36px Arial",
    color,
    "transparent",
    true
  );

  let plane = new Mesh.CreatePlane("TextPlane", size, scene, true);
  plane.material = new StandardMaterial("TextPlaneMaterial", scene);
  plane.material.backFaceCulling = false;
  plane.material.specularColor = new Color3(0, 0, 0);
  plane.material.diffuseTexture = dynamicTexture;

  return plane;
}

class GlobalAxisTool {
  private _meshes = [];
  constructor(scene: Scene, size: number = 8) {
    this.axisX = BABYLON.Mesh.CreateLines(
      "axisX",
      [
        new Vector3.Zero(),
        new Vector3(size, 0, 0),
        new Vector3(size * 0.95, 0.05 * size, 0),
        new Vector3(size, 0, 0),
        new Vector3(size * 0.95, -0.05 * size, 0)
      ],
      scene
    );
    this.axisX.color = new Color3(1, 0, 0);
    this.xChar = makeTextPlane(scene, "X", "red", size / 10);
    this.xChar.position = new Vector3(0.9 * size, -0.05 * size, 0);

    this.axisY = BABYLON.Mesh.CreateLines(
      "axisY",
      [
        new Vector3.Zero(),
        new Vector3(0, size, 0),
        new Vector3(-0.05 * size, size * 0.95, 0),
        new Vector3(0, size, 0),
        new Vector3(0.05 * size, size * 0.95, 0)
      ],
      scene
    );
    this.axisY.color = new Color3(0, 1, 0);
    this.yChar = makeTextPlane(scene, "Y", "green", size / 10);
    this.yChar.position = new Vector3(0, 0.9 * size, -0.05 * size);

    this.axisZ = BABYLON.Mesh.CreateLines(
      "axisZ",
      [
        new Vector3.Zero(),
        new BABYLON.Vector3(0, 0, size),
        new Vector3(0, -0.05 * size, size * 0.95),
        new Vector3(0, 0, size),
        new Vector3(0, 0.05 * size, size * 0.95)
      ],
      scene
    );
    this.axisZ.color = new Color3(0, 0, 1);
    this.zChar = makeTextPlane(scene, "Z", "blue", size / 10);
    this.zChar.position = new Vector3(0, 0.05 * size, 0.9 * size);

    this._meshes = [
      this.axisX,
      this.axisY,
      this.axisZ,
      this.xChar,
      this.yChar,
      this.zChar
    ];
  }

  destroy(): void {
    this._meshes.forEach(mesh => mesh.dispose());
  }
}

export default GlobalAxisTool;
