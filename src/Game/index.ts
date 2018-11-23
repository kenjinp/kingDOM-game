import Engine from "../Engine";
import Controls from "../Controls";
import store from "../Store";

// Maybe we can have the game coordinate between the UI / Input / Engine / Data layers
// Maybe it can be some sort of broker between them?
export default class Game {
  constructor(document: HTMLDocument) {
    this.engine = new Engine(store);
    this.controls = new Controls(document, store);
  }

  run() {
    this.engine.loop();
    window.requestAnimationFrame(this.run.bind(this));
  }
}
