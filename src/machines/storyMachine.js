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
        AUTHOR: "edit", // move to poseauthoring
      },
    },
    playing: {},
    edit: {
      on: {
        HOME: "ready",  // move to home
      },
    },
    home: {}, // when uncommented, freezes entire program
  },
});
