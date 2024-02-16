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
        AUTHOR: "edit", // move to poseauthoring// move to test
        POSE: "pose", // move to pose
      },
    },
    pose: {
      on: {
        HOME: "ready", // move to home
      }
    },
    playing: {},
    conjecture: {
      on: {
        AUTHOR: "edit", // move to poseauthoring
        HOME: "ready", // move to home
      }
    },
    edit: {
      on: {
        CONJECT: "conjecture", // move to conjecture editor
      }
    },
  },
});
