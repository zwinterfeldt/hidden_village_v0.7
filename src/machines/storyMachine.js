import { createMachine, assign } from "xstate";

export const StoryMachine = createMachine({
  initial: "ready",
  context: {
    holistic: undefined,
  },
  states: {
    ready: {
      on: {
        TOGGLE: "playing",  // move to game
        CONJECT: "conjecture", // move to conjecture editor
        AUTHOR: "edit", // move to poseauthoring
      },
    },
    playing: {},
    conjecture: {},
    edit: {
      on: {
        HOME: "ready",  // move to home
      }
    },
  },
});
