import systems from "./systems";
import entities from "./entities";

export default class Engine {
  entities = entities;
  systems = systems;
  constructor(store) {
    this.store = store;
  }
  loop() {
    // Call the system and pass in entities
    // NOTE: One optimal solution would be to only pass in entities
    // that have the relevant components for the system, instead of
    // forcing the system to iterate over all entities
    this.systems.forEach(system => system(this.entities, this.store));
  }
}
