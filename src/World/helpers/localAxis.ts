import {
  Scene,
  Vector3,
  Mesh,
  MeshBuilder,
  Color3
} from "babylonjs"

function localAxes(name: string, size : number = 2, scene: Scene) {
  let pilot_local_axisX = Mesh.CreateLines(
    name + "_pilot_local_axisX",
    [
      Vector3.Zero(),
      new Vector3(size, 0, 0),
      new Vector3(size * 0.95, 0.05 * size, 0),
      new Vector3(size, 0, 0),
      new Vector3(size * 0.95, -0.05 * size, 0)
    ],
    scene
  );
  pilot_local_axisX.color = new Color3(1, 0, 0);

  let pilot_local_axisY = Mesh.CreateLines(
    name + "_pilot_local_axisY",
    [
      Vector3.Zero(),
      new Vector3(0, size, 0),
      new Vector3(-0.05 * size, size * 0.95, 0),
      new Vector3(0, size, 0),
      new Vector3(0.05 * size, size * 0.95, 0)
    ],
    scene
  );
  pilot_local_axisY.color = new Color3(0, 1, 0);

  let pilot_local_axisZ = Mesh.CreateLines(
    name + "_pilot_local_axisZ",
    [
      Vector3.Zero(),
      new Vector3(0, 0, size),
      new Vector3(0, -0.05 * size, size * 0.95),
      new Vector3(0, 0, size),
      new Vector3(0, 0.05 * size, size * 0.95)
    ],
    scene
  );
  pilot_local_axisZ.color = new Color3(0, 0, 1);

  let local_origin = MeshBuilder.CreateBox(
    name + "_local_origin",
    { size: 1 },
    scene
  );
  local_origin.isVisible = false;

  pilot_local_axisX.parent = local_origin;
  pilot_local_axisY.parent = local_origin;
  pilot_local_axisZ.parent = local_origin;

  return local_origin;
}

export default localAxes;