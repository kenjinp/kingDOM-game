import Engine from "../Engine";

export default class Game {
  constructor () {
    this.engine = new Engine();
  }

  run () {
    this.engine.loop();
    window.requestAnimationFrame(this.run.bind(this));
  }
 }