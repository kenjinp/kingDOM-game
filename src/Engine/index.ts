import systems from "./systems";

function select(state) {
  return state.entities.entitiesList;
}

export default class Engine {
  systems = systems;
  constructor(store) {
    this.store = store;
    this.getState = () => select(store.getState());
  }
  loop() {
    // Call the system and pass in entities
    // NOTE: One optimal solution would be to only pass in entities
    // that have the relevant components for the system, instead of
    // forcing the system to iterate over all entities
    this.systems.forEach(system => system(this.getState(), this.store));
  }
}
