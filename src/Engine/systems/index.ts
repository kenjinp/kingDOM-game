import render from "./render";
import keyDebugPopup from "./keyDebugPopup";
import playerControl from "./playerControl";
import randomAIMovement from "./randomAIMovement";

// Just a simple list of the systems to be enacted on in order
// via the game loop
export default [keyDebugPopup, playerControl, randomAIMovement, render];
