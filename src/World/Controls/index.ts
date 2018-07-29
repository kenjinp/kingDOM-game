import consts from "./consts";

class Controls {
  constructor(canvas: HTMLCanvasElement, emitter) {
    document.onkeydown = e => {
      let down = true;
      if (e.key == "w") {
        emitter.emit(consts.UP, { down })
      }
      if (e.key == "a") {
        emitter.emit(consts.LEFT, { down })
      }
      if (e.key == "s") {
        emitter.emit(consts.DOWN, { down })
      }
      if (e.key == "d") {
        emitter.emit(consts.RIGHT, { down })
      }
    };
    document.onkeyup = e => {
      let down = false;
      if (e.key == "w") {
        emitter.emit(consts.UP, { down })
      }
      if (e.key == "a") {
        emitter.emit(consts.LEFT, { down })
      }
      if (e.key == "s") {
        emitter.emit(consts.DOWN, { down })
      }
      if (e.key == "d") {
        emitter.emit(consts.RIGHT, { down })
      }
      if (e.key == "t") {
        emitter.emit(consts.MENU)
      }
    };
    document.onmousemove = e => {
    }
  }
}

export default Controls;
