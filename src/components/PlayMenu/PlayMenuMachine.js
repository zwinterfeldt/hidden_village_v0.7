import { createMachine, assign } from "xstate";

export const PlayMenuMachine = createMachine({
  initial: "ready",
  context: {
    holistic: undefined,
  },
  states: {
    ready: {
      on: {
        NEWLEVEL: "newLevel", // move to new level
      },
    },
    newLevel: {
      on: {
        HOME: "ready", // move to home
      },
    },
    }
});
