import { controlPressed } from "../Store/actions/controls";

function select(state) {
  return state.controlMapping;
}

class Controls {
  constructor(document: HTMLDocument, store) {
    // this is dumb, right?
    this.document = document;
    this.boundControlPressed = action => store.dispatch(controlPressed(action));
    this.getState = () => select(store.getState());
    this.currentState = this.getState();
    let handleChange = this.handleChange.bind(this);
    store.subscribe(handleChange);
    this.assignListeners();
  }

  assignListeners() {
    document.onkeyup = this.createKeyboardEvents("up", this.currentState);
    document.onkeydown = this.createKeyboardEvents("down", this.currentState);
  }

  createKeyboardEvents(direction, controlMapping) {
    return (e: KeyboardEvent) => {
      let { key } = e;
      let actionKeyword = controlMapping[key];
      if (actionKeyword) {
        this.boundControlPressed({
          actionKeyword,
          direction
        });
      }
    };
  }

  handleChange() {
    let previousValue = this.currentState;
    let currentValue = this.getState();
    if (previousValue !== currentValue) {
      console.log(
        "Some deep nested property changed from",
        previousValue,
        "to",
        currentValue
      );
      this.assignListeners();
    }
  }
}

export default Controls;
